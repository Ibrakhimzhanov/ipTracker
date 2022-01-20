export function addOffset(map) {
  const offset = map.getSize().y * 0.15;

  map.panBy([0, -offset], { animate: false });
}
