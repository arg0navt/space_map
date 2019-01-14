import {CircleGeometry, LineBasicMaterial, Line} from "three";

const Orbit = function(scene) {
  var geometry = new CircleGeometry(50, 400);
  geometry.vertices.shift();
  geometry.rotateX(-Math.PI / 2);
  var material = new LineBasicMaterial({ color: 0xcccccc });
  var mesh = new Line(geometry, material);
  scene.add(mesh);
};

export default Orbit; 
