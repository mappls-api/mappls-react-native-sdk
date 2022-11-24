import Toast from 'react-native-simple-toast';

export function validateCoordinates(longitude,latitude) {
  const lng = parseFloat(longitude);
  const lat = parseFloat(latitude);

  //180 < lng < 180 && -90 < lat < 90 for world coordinates
  //68.7 < lng < 97.25 && 8.4 < lat < 37.6 for Indian coordinates
  if (longitude === '' && latitude === '') {
    Toast.show("Values can't empty", Toast.SHORT);
    return false;
  }
  if (!longitude.includes(',') && !latitude.includes(',')) {
    if (
      lng > 68.7 &&
      lng < 97.25 &&
      lat > 8.4 &&
      lat < 37.6 &&
      lng != 0 &&
      lat !== 0
    ) {
      return true;
    }
  }

  Toast.show(
    'please enter valid coordinates(India)...',
    Toast.SHORT,
  );
  return false;
}
