export type MarinePoint = {
  id: string;
  name: string;
  region: string;
  coordinates: [number, number];
  density: number;
  trend: "Artıyor" | "Sabit" | "Azalıyor";
  dominantSpecies: string;
  waterTemp: number;
};
