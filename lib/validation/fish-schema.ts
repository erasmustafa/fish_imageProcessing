import { acceptedImageTypes } from "../upload";

export function validateFishImageInput(file: File | null) {
  if (!file) {
    return "Önce bir görsel seç.";
  }

  if (!acceptedImageTypes.includes(file.type)) {
    return "Desteklenen formatlar: JPG, PNG, WEBP.";
  }

  return null;
}
