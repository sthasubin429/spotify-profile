export const encodeParams = (params: Record<string, unknown>): string => {
  return encodeURIComponent(JSON.stringify(params));
};
