export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function percent(value: number) {
  return `%${Math.round(value * 100)}`;
}
