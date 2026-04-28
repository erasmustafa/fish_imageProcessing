import { marinePoints } from "./constants";

export function getMarinePointById(id: string) {
  return marinePoints.find((point) => point.id === id) ?? null;
}

export function getAverageDensity() {
  return Math.round(
    marinePoints.reduce((total, point) => total + point.density, 0) / marinePoints.length
  );
}
