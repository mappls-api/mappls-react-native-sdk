import Toast from 'react-native-simple-toast';

export function validateCoordinates(longitude: string, latitude: string): boolean {
  // Check for empty values
  if (longitude.trim() === '' || latitude.trim() === '') {
    Toast.show("Values can't be empty", Toast.SHORT);
    return false;
  }

  // Check if values contain commas (invalid format)
  if (longitude.includes(',') || latitude.includes(',')) {
    Toast.show('Please enter valid coordinates (India) without commas', Toast.SHORT);
    return false;
  }

  const lng = parseFloat(longitude);
  const lat = parseFloat(latitude);

  // Validate Indian coordinates range
  // 68.7 < lng < 97.25 && 8.4 < lat < 37.6 for Indian coordinates
  if (
    !isNaN(lng) &&
    !isNaN(lat) &&
    lng > 68.7 &&
    lng < 97.25 &&
    lat > 8.4 &&
    lat < 37.6
  ) {
    return true;
  }

  Toast.show('Please enter valid coordinates (India)...', Toast.SHORT);
  return false;
}