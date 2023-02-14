export default function setQueryParams(props: object): string {
  let results = "?";
  const getEntries = Object.entries(props).filter(([, value]) => value !== undefined);

  getEntries.forEach(([key, value], index) => {
      results += `${key}=${value}${index === (getEntries.length - 1) ? "" : "&"}`;
  });

  return results;
}