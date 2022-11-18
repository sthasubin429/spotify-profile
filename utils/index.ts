export const encodeParams = (params: Object) => {
  return encodeURIComponent(JSON.stringify(params));
}