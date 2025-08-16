const data = {};

function record(route, latency, status) {
  if (!data[route]) {
    data[route] = { count: 0, durations: [], errors4xx: 0, errors5xx: 0 };
  }
  const item = data[route];
  item.count += 1;
  item.durations.push(latency);
  if (status >= 400 && status < 500) {
    item.errors4xx += 1;
  } else if (status >= 500) {
    item.errors5xx += 1;
  }
}

function percentile(arr, p) {
  if (arr.length === 0) return 0;
  const sorted = arr.slice().sort((a, b) => a - b);
  const idx = Math.floor(sorted.length * p);
  return sorted[Math.min(idx, sorted.length - 1)];
}

function summary() {
  const result = {};
  for (const [route, info] of Object.entries(data)) {
    result[route] = {
      count: info.count,
      p50: percentile(info.durations, 0.5),
      p95: percentile(info.durations, 0.95),
      errors4xx: info.errors4xx,
      errors5xx: info.errors5xx
    };
  }
  return result;
}

module.exports = { record, summary };
