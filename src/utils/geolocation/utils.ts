export function deg_to_rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function distance(coord1: GeolocationCoordinates, coord2: GeolocationCoordinates) {
  const lat1 = deg_to_rad(coord1.latitude);
  const lat2 = deg_to_rad(coord2.latitude);
  const lon1 = deg_to_rad(coord1.longitude);
  const lon2 = deg_to_rad(coord2.longitude);
  return 6371000 * Math.acos(
    Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1) +
    Math.sin(lat1) * Math.sin(lat2)
  );  
}
