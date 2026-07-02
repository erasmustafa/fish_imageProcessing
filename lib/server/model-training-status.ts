import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import path from "path";

export type SpeciesTrainingRow = {
  className: string;
  displayName: string;
  trainImages: number;
  valImages: number;
  totalImages: number;
  status: "ready" | "needs_more_sources" | "trained" | "pending";
};

export type NewSpeciesStatus = {
  label: string;
  count: number;
  tone: "ready" | "warning" | "trained" | "pending";
};

export type ModelTrainingStatus = {
  activeModelVersion: string;
  activeModelPath: string;
  trainedSpeciesCount: number;
  totalTrainingImages: number;
  averageImagesPerSpecies: number;
  lastTrainingDate: string;
  accuracy: number | null;
  validationLoss: number | null;
  top5Accuracy: number | null;
  trainingEpoch: number | null;
  yoloTop1: number | null;
  yoloTop5: number | null;
  speciesRows: SpeciesTrainingRow[];
  newSpeciesStatuses: NewSpeciesStatus[];
  sourceFiles: string[];
};

type TurkeySeedSpecies = {
  class_name?: string;
  scientific_name?: string;
  name_tr?: string;
  licensed_research_photo_count?: number;
  training_status?: string;
};

const projectRoot = process.cwd();
const backendRoot = path.join(projectRoot, "backend");
const turkeyModelRoot = path.join(backendRoot, "models", "turkey_retrain");
const yoloModelRoot = path.join(backendRoot, "models", "yolo", "fish_species_cls");
const trainingRoot = path.join(backendRoot, "training_runs", "yolo_classification");
const seedPath = path.join(backendRoot, "data", "turkey_species_seed.json");

export function getModelTrainingStatus(): ModelTrainingStatus {
  const classNames = readJson<string[]>(path.join(turkeyModelRoot, "class_names.json"), []);
  const trainCounts = countImagesByClass(path.join(trainingRoot, "train"));
  const valCounts = countImagesByClass(path.join(trainingRoot, "val"));
  const seedSpecies = readTurkeySeedSpecies();
  const seedByClass = new Map(seedSpecies.map((item) => [item.class_name, item]));
  const allClassNames = classNames.length ? classNames : Array.from(new Set([...Array.from(trainCounts.keys()), ...Array.from(valCounts.keys())]));
  const speciesRows = allClassNames
    .map((className) => {
      const trainImages = trainCounts.get(className) ?? 0;
      const valImages = valCounts.get(className) ?? 0;
      const seed = seedByClass.get(className);
      const totalImages = trainImages + valImages || seed?.licensed_research_photo_count || 0;
      return {
        className,
        displayName: seed?.name_tr || prettifyClassName(className),
        trainImages,
        valImages,
        totalImages,
        status: normalizeTrainingStatus(seed?.training_status, totalImages),
      } satisfies SpeciesTrainingRow;
    })
    .sort((a, b) => b.totalImages - a.totalImages || a.displayName.localeCompare(b.displayName, "tr"));

  const latestTrainingRow = readLastCsvRow(path.join(turkeyModelRoot, "training_log.csv"));
  const yoloSummary = readFileIfExists(path.join(yoloModelRoot, "training_summary.json"));
  const activeModelPath = chooseActiveModelPath();
  const modelStat = statIfExists(activeModelPath) || statIfExists(path.join(turkeyModelRoot, "training_log.csv"));
  const totalTrainingImages = speciesRows.reduce((sum, row) => sum + row.totalImages, 0);

  return {
    activeModelVersion: buildModelVersion(modelStat?.mtime),
    activeModelPath: path.relative(projectRoot, activeModelPath).replace(/\\/g, "/"),
    trainedSpeciesCount: allClassNames.length,
    totalTrainingImages,
    averageImagesPerSpecies: speciesRows.length ? Math.round(totalTrainingImages / speciesRows.length) : 0,
    lastTrainingDate: modelStat ? modelStat.mtime.toISOString() : "",
    accuracy: toNumber(latestTrainingRow?.val_accuracy),
    validationLoss: toNumber(latestTrainingRow?.val_loss),
    top5Accuracy: toNumber(latestTrainingRow?.val_top5_accuracy),
    trainingEpoch: toNumber(latestTrainingRow?.epoch),
    yoloTop1: parseMetricFromText(yoloSummary, "metrics/accuracy_top1"),
    yoloTop5: parseMetricFromText(yoloSummary, "metrics/accuracy_top5"),
    speciesRows,
    newSpeciesStatuses: buildNewSpeciesStatuses(seedSpecies),
    sourceFiles: [
      path.relative(projectRoot, path.join(turkeyModelRoot, "training_log.csv")),
      path.relative(projectRoot, path.join(turkeyModelRoot, "class_names.json")),
      path.relative(projectRoot, seedPath),
      path.relative(projectRoot, path.join(yoloModelRoot, "training_summary.json")),
    ].map((item) => item.replace(/\\/g, "/")),
  };
}

function chooseActiveModelPath() {
  const candidates = [
    path.join(turkeyModelRoot, "fish_model.best.keras"),
    path.join(turkeyModelRoot, "fish_model.h5"),
    path.join(yoloModelRoot, "weights", "best.pt"),
  ];
  return candidates.find((candidate) => existsSync(candidate)) ?? candidates[candidates.length - 1];
}

function buildModelVersion(date?: Date) {
  if (!date) return "AquaScope Fish Classifier";
  const stamp = date.toISOString().slice(0, 10).replace(/-/g, ".");
  return "AquaScope Fish Classifier v" + stamp;
}

function countImagesByClass(dir: string) {
  const counts = new Map<string, number>();
  if (!existsSync(dir)) return counts;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const classDir = path.join(dir, entry.name);
    const files = readdirSync(classDir, { withFileTypes: true }).filter((file) => file.isFile() && /\.(jpe?g|png|webp|bmp)$/i.test(file.name));
    counts.set(entry.name, files.length);
  }
  return counts;
}

function readTurkeySeedSpecies() {
  const seed = readJson<{ species?: TurkeySeedSpecies[] }>(seedPath, { species: [] });
  return Array.isArray(seed.species) ? seed.species : [];
}

function buildNewSpeciesStatuses(species: TurkeySeedSpecies[]) {
  const counts = new Map<string, number>();
  for (const item of species) {
    const status = item.training_status || "pending";
    counts.set(status, (counts.get(status) ?? 0) + 1);
  }
  const labelMap: Record<string, string> = {
    ready: "Eğitime hazır",
    needs_more_sources: "Ek görsel gerekli",
    trained: "Eğitildi",
    pending: "Beklemede",
  };
  const toneMap: Record<string, NewSpeciesStatus["tone"]> = {
    ready: "ready",
    needs_more_sources: "warning",
    trained: "trained",
    pending: "pending",
  };
  return Array.from(counts.entries()).map(([status, count]) => ({
    label: labelMap[status] ?? prettifyClassName(status),
    count,
    tone: toneMap[status] ?? "pending",
  }));
}

function normalizeTrainingStatus(status: string | undefined, imageCount: number): SpeciesTrainingRow["status"] {
  if (status === "ready" || status === "needs_more_sources" || status === "trained") return status;
  if (imageCount > 0) return "trained";
  return "pending";
}

function readLastCsvRow(filePath: string) {
  const text = readFileIfExists(filePath);
  if (!text) return null;
  const rows = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (rows.length < 2) return null;
  const headers = rows[0].split(",").map((item) => item.trim());
  const values = rows[rows.length - 1].split(",").map((item) => item.trim());
  return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
}

function parseMetricFromText(text: string, key: string) {
  const keyIndex = text.indexOf(key);
  if (keyIndex < 0) return null;
  const afterKey = text.slice(keyIndex + key.length);
  const match = afterKey.match(/:\s*([0-9.]+)/);
  return match ? Number(match[1]) : null;
}

function readJson<T>(filePath: string, fallback: T): T {
  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as T;
  } catch {
    return fallback;
  }
}

function readFileIfExists(filePath: string) {
  try {
    return existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  } catch {
    return "";
  }
}

function statIfExists(filePath: string) {
  try {
    return existsSync(filePath) ? statSync(filePath) : null;
  } catch {
    return null;
  }
}

function toNumber(value: unknown) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

function prettifyClassName(value: string) {
  return value.replace(/[_-]+/g, " ").replace(/\b\w/g, (char) => char.toLocaleUpperCase("tr-TR"));
}

