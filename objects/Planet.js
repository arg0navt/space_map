import {
  Object3D,
  TextureLoader,
  MeshStandardMaterial,
  Mesh,
  SphereGeometry,
  RingBufferGeometry,
  MeshBasicMaterial,
  DoubleSide,
  RepeatWrapping,
  MeshPhongMaterial,
  NearestFilter,
  Vector3
} from "three";
import Orbit from "./Orbit";

const Planet = function(options) {
  this.group = new Object3D();
  const loader = new TextureLoader();

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

    this.groupPlanet = new Object3D();

    if (options.textureCircleUrl) {
      const loadCircle = new TextureLoader();
      loadCircle.load(options.textureCircleUrl, textureCircle => {
        var geometryCircle = new RingBufferGeometry(9, 5, 64, 1);
        var uvs = geometryCircle.attributes.uv.array;
        var phiSegments = geometryCircle.parameters.phiSegments || 0;
        var thetaSegments = geometryCircle.parameters.thetaSegments || 0;
        phiSegments = phiSegments !== undefined ? Math.max(1, phiSegments) : 1;
        thetaSegments =
          thetaSegments !== undefined ? Math.max(3, thetaSegments) : 8;
        for (var c = 0, j = 0; j <= phiSegments; j++) {
          for (var i = 0; i <= thetaSegments; i++) {
            (uvs[c++] = i / thetaSegments), (uvs[c++] = j / phiSegments);
          }
        }
        geometryCircle.rotateX(-Math.PI / 2);
        var materialCircle = new MeshBasicMaterial({
          map: textureCircle,
          side: DoubleSide,
          transparent: true
        });

        const meshCircle = new Mesh(geometryCircle, materialCircle);
        meshCircle.position.x = options.startPositionX;
        meshCircle.position.z = options.startPositionZ;
        meshCircle.lookAt(new Vector3(0, 90, 0));

        this.groupPlanet.add(meshCircle);
      });
    }

    this.group.add(this.groupPlanet);

    this.groupPlanet.add(this.mesh);
    this.mesh.position.x = options.startPositionX;
    this.mesh.position.z = options.startPositionZ;

    this.orbit = new Orbit(this.group, options.radius, options.intensive);
    options.scene.add(this.group);
  });
};

export default Planet;
