import { Object3D, TextureLoader, MeshBasicMaterial, Mesh, SphereGeometry } from "three";
import Orbit from "./Orbit";

const Planet = function(options) {
  this.group = new Object3D();
  const loader = new TextureLoader();

  loader.load(options.textureUrl, texture => {
    const geometry = new SphereGeometry(options.sizePlanet, 100, 100);
    const material = new MeshBasicMaterial({ map: texture, overdraw: true });
    this.mesh = new Mesh(geometry, material);
    
    this.group.add(this.mesh);
    this.mesh.position.x = options.startPositionX;
    this.mesh.position.z = options.startPositionZ;

    this.orbit = new Orbit(this.group, options.radius, options.intensive);
    options.scene.add(this.group);
  });
};

export default Planet;
