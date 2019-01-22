import React from "react";
import * as THREE from "three";
import Sun from "../objects/Sun";
import Planet from "../objects/Planet";

var OrbitControls = require("three-orbit-controls")(THREE);
export default class App extends React.Component {
  componentDidMount() {
    this.scenes = {
      help: new THREE.Scene(),
      main: new THREE.Scene()
    };
    this.scenes.fog = new THREE.Fog(0x242426, 2000, 4000);
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.0001,
      15000
    );
    camera.position.z = 1000;
    camera.position.y = 200;
    camera.updateProjectionMatrix();
    new OrbitControls(camera);

    // const gridHelper = new THREE.GridHelper(1000, 10);
    // console.log(gridHelper);
    // this.scenes.help.add(gridHelper);

    const renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.shadowMapEnabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var light = new THREE.PointLight(0xeedca5, 4, 10000);
    light.position.set(0, 0, 0);
    light.castShadow = true; // default false
    this.scenes.main.add(light);

    const starsLight = [];

    for (let i = 0; i <= 5; i++) {
      const l = new THREE.PointLight(0xeedca5, 1, 50000);
      l.castShadow = true;
      starsLight.push(new THREE.PointLight(0xeedca5, 1, 50000));
    }

    new THREE.CubeTextureLoader()
      .setPath("/static/texture/")
      .load(
        [
          "8k_starss.jpg",
          "left.jpg",
          "8k_starss.jpg",
          "8k_starss.jpg",
          "8k_starss.jpg",
          "center.jpg"
        ],
        texture => {
          this.scenes.main.background = texture;
          animate();
        }
      );

    starsLight[0].position.set(0, 45000, 0);
    starsLight[1].position.set(0, -45000, 0);
    starsLight[2].position.set(0, 0, 45000);
    starsLight[3].position.set(0, 0, -45000);
    starsLight[4].position.set(45000, 0, 0);
    starsLight[5].position.set(-45000, 0, 0);
    starsLight.map(item => this.scenes.main.add(item));

    const sun = new Sun(this.scenes.main, camera, renderer);

    const mercury = new Planet({
      scene: this.scenes.main,
      orbitRadius: 50,
      sizePlanet: 1,
      intensive: 400,
      startPositionX: 50,
      startPositionZ: 0,
      textureUrl: "/static/texture/mercury.jpg"
    });

    const venus = new Planet({
      scene: this.scenes.main,
      orbitRadius: 100,
      sizePlanet: 1,
      intensive: 500,
      startPositionX: 100,
      startPositionZ: 0,
      textureUrl: "/static/texture/8k_venus_atmosphere.jpg"
    });

    const earn = new Planet({
      scene: this.scenes.main,
      orbitRadius: 200,
      sizePlanet: 1,
      intensive: 600,
      startPositionX: 0,
      startPositionZ: 200,
      textureUrl: "/static/texture/2k_earth_daymap.jpg"
    });

    earn.createSatellite({
      name: "moon",
      textureUrl: "/static/texture/8k_moon.jpg",
      orbitRadius: 7,
      intensive: 300,
      size: 0.27
    })

    const mars = new Planet({
      scene: this.scenes.main,
      orbitRadius: 250,
      sizePlanet: 1,
      intensive: 700,
      startPositionX: 0,
      startPositionZ: 250,
      textureUrl: "/static/texture/8k_mars.jpg"
    });

    const jupiter = new Planet({
      scene: this.scenes.main,
      orbitRadius: 400,
      sizePlanet: 4,
      intensive: 800,
      startPositionX: 0,
      startPositionZ: 400,
      textureUrl: "/static/texture/8k_jupiter.jpg"
    });

    const saturn = new Planet({
      scene: this.scenes.main,
      orbitRadius: 650,
      sizePlanet: 4,
      intensive: 1200,
      startPositionX: 0,
      startPositionZ: 650,
      textureUrl: "/static/texture/8k_saturn.jpg"
    });

    saturn.createRings({
      textureUrl: "/static/texture/8k_saturn_ring_alpha.png",
      minRadius: 5,
      maxRadius: 9,
      segment: 64,
      lookAt: {
        x: 0,
        y: 90,
        z: 0
      }
    })

    const animate = () => {
      requestAnimationFrame(animate);
      const r = (k) => ((k * Math.PI) / 180) % 360

      if (sun && sun.mesh) {
        sun.mesh.rotation.y += 0.01;
      }
      if (mercury && mercury.mesh) {
        mercury.group.rotation.y += r(0.001);
        mercury.mesh.rotation.y += 0.01;
      }
      if (venus && venus.mesh) {
        venus.group.rotation.y -= r(0.001);
        venus.mesh.rotation.y += 0.01;
      }
      if (earn && earn.mesh) {
        earn.group.rotation.y -= r(0.001);
        earn.mesh.rotation.y += 0.01;
        if (earn.moon) {
          earn.moon.rotation.y -= ((0.1 * Math.PI) / 180) % 360;
        }
      }
      if (mars && mars.mesh) {
        mars.group.rotation.y -= r(0.001);
        mars.mesh.rotation.y += 0.01;
      }
      if (jupiter && jupiter.mesh) {
        jupiter.group.rotation.y -= r(0.001);
        jupiter.mesh.rotation.y += 0.01;
      }
      if (saturn && saturn.mesh) {
        saturn.group.rotation.y -= r(0.001);
        // saturn.mesh.rotation.y += 0.01;
      }
      sun.composer.render();
    };

    animate();
  }

  render() {
    return null;
  }
}
