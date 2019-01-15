import {
  Object3D,
  TextureLoader,
  MeshStandardMaterial,
  Mesh,
  SphereGeometry,
  RepeatWrapping
} from "three";
import Orbit from "./Orbit";

const Planet = function(options) {
  this.group = new Object3D();
  const loader = new TextureLoader();

  loader.load(options.textureUrl, texture => {
    const geometry = new SphereGeometry(options.sizePlanet, 400, 400);
    const material = new MeshStandardMaterial( {
      roughness: 0.8,
      color: 0xffffff,
      metalness: 0.2,
      bumpScale: 0.0005
    } );
    material.map = texture;
    material.needsUpdate = true;
    this.mesh = new Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = false; //default

    this.group.add(this.mesh);
    this.mesh.position.x = options.startPositionX;
    this.mesh.position.z = options.startPositionZ;

    this.orbit = new Orbit(this.group, options.radius, options.intensive);
    options.scene.add(this.group);
  });
};

export default Planet;
