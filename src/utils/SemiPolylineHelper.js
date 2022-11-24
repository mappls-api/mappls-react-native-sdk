//Radius of the earth in meters
const EARTH_RADIUS = 6371009.0;

/**
 * Compute the list of points to draw a semicircle
 *
 * @param p1 Start Point
 * @param p2 End Point
 * @param k  Radius of semicircle
 * @return the list of points
 */
export function showCurvedPolyline(p1, p2, k) {
  const latLngs = [];
  //Calculate distance and heading between two points
  const d = computeDistanceBetween(p1, p2);
  const h = computeHeading(p1, p2);

  //Midpoint position
  const p = computeOffset(p1, d * 0.5, h);

  //Apply some mathematics to calculate position of the circle center
  const x = ((1 - k * k) * d * 0.5) / (2 * k);
  const r = ((1 + k * k) * d * 0.5) / (2 * k);

  const c = computeOffset(p, x, h + 90.0);

  //Calculate heading between circle center and two points
  const h1 = computeHeading(c, p1);
  const h2 = computeHeading(c, p2);

  //Calculate positions of points on circle border and add them to polyline options

  const numpoints = 100;
  const step = (h2 - h1) / numpoints;
  for (let i = 0; i < numpoints; i++) {
    let pi = computeOffset(c, r, h1 + i * step);
    latLngs.push([pi[1], pi[0]]);
  }

  //Draw polyline
  return latLngs;
}

/**
 * Compute the headings from one point to another. Headings are expressed in degrees clockwise from North within the range [-180,180).
 *
 * @param from first point
 * @param to second point
 * @return The heading in degrees clockwise from north
 */
function computeHeading(from, to) {
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

/**
 *  Wraps the given value into the inclusive-exclusive interval between min and max.
 *
 * @param n The value to wrap
 * @param min minimum value
 * @param max maximum value
 * @return this value should be between minimum value and maximum value
 */
function wrap(n, min, max) {
  return n >= min && n < max ? n : mod(n - min, max - min) + min;
}

/**
 * Non-negative value of x mod m
 *
 * @param x the operand
 * @param m the modulus
 * @return this is non negative remainder of x/m
 */
function mod(x, m) {
  return ((x % m) + m) % m;
}

/**
 * Compute the point resulting from moving a distance from an origin in the specified heading (expressed in degrees clockwise from north).
 *
 * @param from the point from which to start
 * @param distance distance to travel
 * @param heading heading in degrees from clockwise north
 * @return Resulting point
 */
function computeOffset(from, distance, heading) {
  let dis = distance;
  dis /= EARTH_RADIUS;
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
  return  [toDegrees(Math.asin(sinLat)), toDegrees(fromLng + dLng)];
}

/**
 * Calculate distance in radian
 *
 * @param lat1  Latitude of start point in radian
 * @param lng1  Longitude of start point in radian
 * @param lat2  Latitude of destination point in radian
 * @param lng2  Longitude of destination point in radian
 * @return Distance from start point to destination point in radian
 */
function distanceRadians(lat1, lng1, lat2, lng2) {
  return arcHav(havDistance(lat1, lat2, lng1 - lng2));
}

/**
 * Determines the great-circle distance between two points on a sphere given their longitudes and latitudes
 * This is also called Haversine Formula
 *
 * @param lat1 Latitude of first point
 * @param lat2 Latitude of second point
 * @param dLng difference between two longitude
 * @return haversine distance
 */
function havDistance(lat1, lat2, dLng) {
  return hav(lat1 - lat2) + hav(dLng) * Math.cos(lat1) * Math.cos(lat2);
}

/**
 * Computes half a versine of the angle.
 * hav(x) == (1 - cos(x)) / 2 == sin(x / 2)^2.
 *
 * @param x Parameter of which we find haversine
 * @return haversine(angle-in-radians)
 */
function hav(x) {
  const sinHalf = Math.sin(x * 0.5);
  return sinHalf * sinHalf;
}

/**
 * Computes inverse haversine. Has good numerical stability around 0.
 * arcHav(x) == acos(1 - 2 * x) == 2 * asin(sqrt(x)).
 * The argument must be in [0, 1], and the result is positive.
 *
 * @param x must be in [0, 1]
 * @return inverse haversine
 */
function arcHav(x) {
  return 2.0 * Math.asin(Math.sqrt(x));
}

/**
 * Compute the angle between two points in radian
 *
 * @param from Start Point
 * @param to Last Point
 * @return angle between the points
 */
function computeAngleBetween(from, to) {
  return distanceRadians(
    toRadians(from[0]),
    toRadians(from[1]),
    toRadians(to[0]),
    toRadians(to[1]),
  );
}

/**
 * Compute the Distance between two points in meters
 *
 * @param from Start Point
 * @param to Last Point
 * @return distance between the points
 */
function computeDistanceBetween(from, to) {
  return computeAngleBetween(from, to) * EARTH_RADIUS;
}

function toRadians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

function toDegrees(radians) {
  var pi = Math.PI;
  return radians * (180 / pi);
}
