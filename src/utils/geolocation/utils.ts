type Coords = {
  latitude: number;
  longitude: number;
};

export function deg_to_rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function distance(coords1: Coords, coords2: Coords) {
  const lat1 = deg_to_rad(coords1.latitude);
  const lat2 = deg_to_rad(coords2.latitude);
  const lon1 = deg_to_rad(coords1.longitude);
  const lon2 = deg_to_rad(coords2.longitude);
  return (
    6371000 *
    Math.acos(
      Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1) +
        Math.sin(lat1) * Math.sin(lat2),
    )
  );
}

export function travelTime(from: Coords, to: Coords, speed: number = 100) {
  return distance(from, to) / speed;
}
