// ./capAnalyzer.js
export function analyzeCap(cap) {
  console.log(`Analyzing cap @ lat ${cap.lat}, lon ${cap.lon}`);
  return { isEmergency: false, bandStack: [], statusFlags: [] };
}

