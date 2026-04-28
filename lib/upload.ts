export const acceptedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export function validateImageFile(file: File) {
  if (!acceptedImageTypes.includes(file.type)) {
    return "Lütfen JPG, PNG veya WEBP formatında görsel yükleyin.";
  }

  if (file.size > 8 * 1024 * 1024) {
    return "Görsel 8 MB sınırını aşmamalı.";
  }

  return null;
}
