export function trimDescription(description, maxLength = 120) {
  const text = typeof description === 'string' ? description.trim() : '';

  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength - 3).trimEnd()}...`;
}
