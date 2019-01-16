import * as THREE from "three";

const Stars = function(scene, camera, composer) {
  const starsGeometry = new THREE.Geometry();

  for (var i = 0; i < 200000; i++) {
    const star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread(40000, 40000, 39000);
    star.y = THREE.Math.randFloatSpread(40000, 40000, 39000);
    star.z = THREE.Math.randFloatSpread(40000, 40000, 39000);

    starsGeometry.vertices.push(star);
  }

  const starsMaterial = new THREE.PointsMaterial({ color: 0x888888 });

  const starField = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(starField)
};

export default Stars;
