export const extractDomain = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return domain;
  } catch {
    return url;
  }
};
