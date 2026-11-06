const isMobile = window.innerWidth <= 750;

export function trimDescription(description, maxLength = isMobile ? 110 : 140) {
  const text = typeof description === 'string' ? description.trim() : '';

  if (text.length <= maxLength) return text;

  const contentLength = maxLength - 3;
  const truncated = text.slice(0, contentLength);
  const lastWord = truncated.match(/\s+\S*$/);
  const cleanTruncated = lastWord
    ? truncated.slice(0, lastWord.index)
    : truncated;

  return `${cleanTruncated.trimEnd()}...`;
}
