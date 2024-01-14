export function formatRiyadhDateTime(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    timeZone: 'Asia/Riyadh',
  });
}

export function formatRiyadhTime(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Riyadh',
  });
}
