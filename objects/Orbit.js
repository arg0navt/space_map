import { CircleGeometry, LineBasicMaterial, Line } from "three";

var geometryOrbit = new CircleGeometry(1, 99500);
geometryOrbit.vertices.shift();
geometryOrbit.rotateX(-Math.PI / 2);

const Orbit = function(group, radius, intensive) {
  var material = new LineBasicMaterial({ color: 0x191919 });
  const mesh = new Line(geometryOrbit, material);
  mesh.scale.set(radius, radius, radius);
  group.add(mesh);
};

export default Orbit;