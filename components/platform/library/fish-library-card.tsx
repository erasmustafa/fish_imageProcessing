import type { FishSpecies } from "../../../types/fish";

export default function FishLibraryCard({ fish }: { fish: FishSpecies }) {
  return (
    <article className="surface section">
      <p className="muted" style={{ marginTop: 0 }}>
        {fish.latinName}
      </p>
      <h2 style={{ margin: "6px 0" }}>{fish.name}</h2>
      <p className="muted" style={{ lineHeight: 1.6 }}>{fish.habitat}</p>
      <div className="grid grid-2" style={{ marginTop: 16 }}>
        <span>Boy: {fish.idealSize}</span>
        <span>Sezon: {fish.season}</span>
        <span>Risk: {fish.riskLevel}</span>
        <span>Yem: {fish.recommendedBaits[0]}</span>
      </div>
    </article>
  );
}
