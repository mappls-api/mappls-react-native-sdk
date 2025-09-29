const EARTH_RADIUS = 6371009.0;

type LatLng = [number, number]; // [latitude, longitude]

/**
 * Compute the list of points to draw a semicircle
 * @param p1 Start Point [lat, lng]
 * @param p2 End Point [lat, lng]
 * @param k  Radius factor of semicircle curvature
 * @returns Array of [lng, lat] coordinates forming the curve
 */
export function showCurvedPolyline(p1: LatLng, p2: LatLng, k: number): [number, number][] {
  const latLngs: [number, number][] = [];

  const d = computeDistanceBetween(p1, p2);
  const h = computeHeading(p1, p2);

  const p = computeOffset(p1, d * 0.5, h);

  const x = ((1 - k * k) * d * 0.5) / (2 * k);
  const r = ((1 + k * k) * d * 0.5) / (2 * k);

  const c = computeOffset(p, x, h + 90.0);

  const h1 = computeHeading(c, p1);
  const h2 = computeHeading(c, p2);

  const numpoints = 100;
  const step = (h2 - h1) / numpoints;

  for (let i = 0; i < numpoints; i++) {
    const pi = computeOffset(c, r, h1 + i * step);
    latLngs.push([pi[1], pi[0]]); // [lng, lat]
  }

  return latLngs;
}

function computeHeading(from: LatLng, to: LatLng): number {
  const fromLat = toRadians(from[0]);
  const fromLng = toRadians(from[1]);
  const toLat = toRadians(to[0]);
  const toLng = toRadians(to[1]);
  const dLng = toLng - fromLng;
  const heading = Math.atan2(
    Math.sin(dLng) * Math.cos(toLat),
    Math.cos(fromLat) * Math.sin(toLat) -
    Math.sin(fromLat) * Math.cos(toLat) * Math.cos(dLng),
  );
  return wrap(toDegrees(heading), -180.0, 180.0);
}

function wrap(n: number, min: number, max: number): number {
  return n >= min && n < max ? n : mod(n - min, max - min) + min;
}

function mod(x: number, m: number): number {
  return ((x % m) + m) % m;
}

function computeOffset(from: LatLng, distance: number, heading: number): LatLng {
  let dis = distance / EARTH_RADIUS;
  heading = toRadians(heading);
  const fromLat = toRadians(from[0]);
  const fromLng = toRadians(from[1]);

  const cosDistance = Math.cos(dis);
  const sinDistance = Math.sin(dis);
  const sinFromLat = Math.sin(fromLat);
  const cosFromLat = Math.cos(fromLat);

  const sinLat =
    cosDistance * sinFromLat + sinDistance * cosFromLat * Math.cos(heading);
  const dLng = Math.atan2(
    sinDistance * cosFromLat * Math.sin(heading),
    cosDistance - sinFromLat * sinLat,
  );

  return [toDegrees(Math.asin(sinLat)), toDegrees(fromLng + dLng)];
}

function computeDistanceBetween(from: LatLng, to: LatLng): number {
  return computeAngleBetween(from, to) * EARTH_RADIUS;
}

function computeAngleBetween(from: LatLng, to: LatLng): number {
  return distanceRadians(
    toRadians(from[0]),
    toRadians(from[1]),
    toRadians(to[0]),
    toRadians(to[1]),
  );
}

function distanceRadians(lat1: number, lng1: number, lat2: number, lng2: number): number {
  return arcHav(havDistance(lat1, lat2, lng1 - lng2));
}

function havDistance(lat1: number, lat2: number, dLng: number): number {
  return hav(lat1 - lat2) + hav(dLng) * Math.cos(lat1) * Math.cos(lat2);
}

function hav(x: number): number {
  const sinHalf = Math.sin(x * 0.5);
  return sinHalf * sinHalf;
}

function arcHav(x: number): number {
  return 2.0 * Math.asin(Math.sqrt(x));
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}
