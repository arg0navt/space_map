import { CircleGeometry, LineBasicMaterial, Line } from "three";

const Orbit = function(group, radius, intensive, position) {
  console.log(radius);
  var geometry = new CircleGeometry(radius, intensive);
  geometry.vertices.shift();
  geometry.rotateX(-Math.PI / 2);
  var material = new LineBasicMaterial({ color: 0x191919 });
  const mesh = new Line(geometry, material);

  if (position) {
    mesh.position.x = position.x;
    mesh.position.z = position.z;
  }

  group.add(mesh);
};

export default Orbit;