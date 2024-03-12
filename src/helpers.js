export function findMaxId(items) {
  return Math.max(0, ...items.map(i => i.id));
}