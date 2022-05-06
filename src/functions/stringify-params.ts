export function stringifyParams(params: Record<string, any>): string {
  const entries = Object.entries(params);
  return entries.length
    ? `{ ${entries
        .map(([k, v]) => {
          return `${k}: ${
            typeof v === 'object' && !Array.isArray(v) && v != null ? stringifyParams(v) : v
          }`;
        })
        .join(', ')} }`
    : `{}`;
}
