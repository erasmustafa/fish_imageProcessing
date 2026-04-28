export function validatePostBody(body: string) {
  const trimmed = body.trim();

  if (trimmed.length < 10) {
    return "Paylaşım en az 10 karakter olmalı.";
  }

  if (trimmed.length > 280) {
    return "Paylaşım 280 karakteri aşmamalı.";
  }

  return null;
}
