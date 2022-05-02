export function stringifyParams(params: Record<string, any>): string {
  const entries = Object.entries(params);
  return entries.length
    ? `{ ${entries
        .map(([k, v]) => `${k}: ${v && typeof v === 'object' ? stringifyParams(v) : v}`)
        .join(', ')} }`
    : `{}`;
}

export function getRandomFloat(min: number, max: number, decimals = 0): number {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return Number.parseFloat(str);
}
