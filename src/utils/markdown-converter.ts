/**
 * Convert multiline markdown text to single line
 */
export const convertToSingleline = (text: string): string => {
  if (!text) return "";
  
  // 把真实的换行符替换为字面的 \\n
  return text.split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join("\\n");
};

/**
 * Convert single line markdown text to multiline
 */
export const convertToMultiline = (text: string): string => {
  if (!text) return "";
  
  // 把字面的 \\n 替换为真实的换行符
  return text.replace(/\\n/g, "\n");
}; 