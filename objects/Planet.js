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
    const materialPlanet = new MeshStandardMaterial({
      roughness: 0.8,
      color: 0xffffff,
      metalness: 0.2,
      bumpScale: 0.0005,
      map: texture
    });
    this.mesh = new Mesh(options.geometry, materialPlanet);
    this.mesh.scale.set(options.sizePlanet, options.sizePlanet, options.sizePlanet);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = false; //default
    this.group.add(this.groupPlanet);
    this.groupPlanet.add(this.mesh);
    this.mesh.position.x = options.startPositionX;
    this.mesh.position.z = options.startPositionZ;

    this.orbit = new Orbit(
      this.group,
      this.params.orbitRadius,
      this.params.intensive
    );

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

    this[sOptions.name] = new Object3D();

    this[sOptions.name].position.set(this.params.startPositionX, 0, this.params.startPositionZ);

    const loadSattelite = new TextureLoader();
    loadSattelite.load(sOptions.textureUrl, sTexture => {
      const geometrySatellite = new SphereGeometry(sOptions.size, 400, 400);

      const materialSatellite = new MeshStandardMaterial({
        roughness: 0.8,
        color: 0xffffff,
        metalness: 0.2,
        bumpScale: 0.0005
      });
      materialSatellite.map = sTexture;
      materialSatellite.needsUpdate = true;

      const generalName = "satellite_" + sOptions.name;
      this[generalName] = new Mesh(geometrySatellite, materialSatellite);
      this[generalName].castShadow = true;
      this[generalName].receiveShadow = false; //default
      this[generalName].position.x = 0;
      this[generalName].position.z = sOptions.orbitRadius;

      this[sOptions.name].add(this[generalName]);

      new Orbit(
        this[sOptions.name],
        sOptions.orbitRadius,
        sOptions.intensive
      );

      this.groupPlanet.add(this[sOptions.name]);
    });
  };
};

export default Planet;
