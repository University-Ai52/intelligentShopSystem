// ORD-20260909-X7K9
export function orderNumber(date = new Date()) {
  const ymd = date.toISOString().slice(0, 10).replace(/-/g, "");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let tail = "";
  for (let i = 0; i < 4; i++) tail += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `ORD-${ymd}-${tail}`;
}
