import {
  Object3D,
  TextureLoader,
  MeshStandardMaterial,
  Mesh,
  SphereGeometry,
  RingBufferGeometry,
  MeshBasicMaterial,
  DoubleSide,
  Vector3
} from "three";
import Orbit from "./Orbit";

const Planet = function(options) {
  this.params = options;
  this.group = new Object3D();
  const loader = new TextureLoader();

  this.groupPlanet = new Object3D();

  loader.load(options.textureUrl, texture => {
    const geometry = new SphereGeometry(options.sizePlanet, 400, 400);

    const material = new MeshStandardMaterial({
      roughness: 0.8,
      color: 0xffffff,
      metalness: 0.2,
      bumpScale: 0.0005
    });
    material.map = texture;
    material.needsUpdate = true;

    this.mesh = new Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = false; //default
    this.group.add(this.groupPlanet);
    this.groupPlanet.add(this.mesh);
    this.mesh.position.x = options.startPositionX;
    this.mesh.position.z = options.startPositionZ;

    this.orbit = new Orbit(this.group, this.params.orbitRadius, this.params.intensive);

    options.scene.add(this.group);
  });

  this.createRings = rOptions => {
    const loadRings = new TextureLoader();
    loadRings.load(rOptions.textureUrl, textureRing => {
      const geometryRing = new RingBufferGeometry(
        rOptions.maxRadius,
        rOptions.minRadius,
        rOptions.segment,
        1
      );
      geometryRing.rotateX(-Math.PI / 2);

      // texturing
      const uvs = geometryRing.attributes.uv.array;
      var phiSegments = geometryRing.parameters.phiSegments || 0;
      var thetaSegments = geometryRing.parameters.thetaSegments || 0;
      phiSegments = phiSegments !== undefined ? Math.max(1, phiSegments) : 1;
      thetaSegments =
        thetaSegments !== undefined ? Math.max(3, thetaSegments) : 8;
      for (var c = 0, j = 0; j <= phiSegments; j++) {
        for (var i = 0; i <= thetaSegments; i++) {
          (uvs[c++] = i / thetaSegments), (uvs[c++] = j / phiSegments);
        }
      }

      var materialRing = new MeshStandardMaterial({
        map: textureRing,
        side: DoubleSide,
        transparent: true
      });

      this.ring = new Mesh(geometryRing, materialRing);
      this.ring.position.x = options.startPositionX;
      this.ring.position.z = options.startPositionZ;
      this.ring.lookAt(
        new Vector3(rOptions.lookAt.x, rOptions.lookAt.y, rOptions.lookAt.z)
      );
      this.ring.castShadow = true;
      this.ring.receiveShadow = false;

      this.groupPlanet.add(this.ring);
    });
  };

  this.createSatellite = sOptions => {
    if (this[sOptions.name]) {
      return false;
    }

    const myGroup = new Object3D();

    // add orbit sattelite

    const orbitSatellite = new Orbit(
      myGroup,
      sOptions.orbitRadius,
      sOptions.intensive,
      {
        x: this.params.startPositionX,
        z: this.params.startPositionZ
      }
    );

    this.groupPlanet.add(myGroup);
    console.log(this);

    // const loadSattelite = new TextureLoader();
    // loadSattelite.load(sOptions.textureUrl, sTexture => {

    // })
  };
};

export default Planet;
