export function getAbbreviation(text: string): string {
  return text
    .split(/\s+/) // split by spaces
    .filter(Boolean) // remove empty parts
    .map(word => word[0].toUpperCase()) // take first letter and capitalize
    .join(''); // join them together
}