import {CircleGeometry, LineBasicMaterial, Line} from "three";

const Orbit = function(group, radius, intensive) {
  var geometry = new CircleGeometry(radius, intensive);
  geometry.vertices.shift();
  geometry.rotateX(-Math.PI / 2);
  var material = new LineBasicMaterial({ color: 0xcccccc });
  const mesh = new Line(geometry, material);
  group.add(mesh);
};

export default Orbit; 
