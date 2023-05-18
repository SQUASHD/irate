export function toTitleCase(str: string) {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");
}

export function createSlug(str: string) {
  return str
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
}
