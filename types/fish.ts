export type FishSpecies = {
  id: string;
  name: string;
  latinName: string;
  edible: boolean;
  idealSize: string;
  habitat: string;
  season: string;
  riskLevel: "Düşük" | "Orta" | "Yüksek";
  recommendedBaits: string[];
  recommendedGear: string[];
  regionNotes: string[];
};

export type FishAnalysisResult = {
  id: string;
  species: string;
  confidence: number;
  imageUrl: string;
  location: string;
  date: string;
  edible: boolean;
};
