import { Object3D, TextureLoader, MeshBasicMaterial, Mesh, SphereGeometry } from "three";
import Orbit from "./Orbit";

const Mercury = function(scene, camera) {
  this.group = new Object3D();
  const loader = new TextureLoader();

  loader.load("/static/texture/mercury.jpg", texture => {
    const geometry = new SphereGeometry(1, 100, 100);
    const material = new MeshBasicMaterial({ map: texture, overdraw: true });
    this.mesh = new Mesh(geometry, material);
    
    this.group.add(this.mesh);
    this.mesh.position.x = 50;
    this.mesh.position.z = 0;

    this.orbit = new Orbit(this.group);
    scene.add(this.group);
    console.log(this.group);
  });
};

export default Mercury;
