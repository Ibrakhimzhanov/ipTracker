export function addOffset(map) {
  console.log("Offset added");
  const offset = map.getSize().y * 0.15;

  map.panBy([0, -offset], { animate: false });
}
