import * as THREE from "three";

const Stars = function(scene, camera, composer) {
  var starsGeometry = new THREE.Geometry();

  for (var i = 0; i < 2000000; i++) {
    var star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread(100000, 40000);
    star.y = THREE.Math.randFloatSpread(100000, 40000);
    star.z = THREE.Math.randFloatSpread(100000, 40000);

    starsGeometry.vertices.push(star);
  }

  var starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });

  var starField = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(starField)
};

export default Stars;
