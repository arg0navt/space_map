import React from "react";
import * as THREE from "three";
import {
  KernelSize,
  GodRaysEffect,
  EffectComposer,
  EffectPass,
  RenderPass
} from "postprocessing";
import Sun from "../objects/Sun";
import Planet from "../objects/Planet";
import Stars from "../objects/Stars";

var OrbitControls = require("three-orbit-controls")(THREE);

export default class App extends React.Component {
  componentDidMount() {
    this.scenes = {
      help: new THREE.Scene(),
      main: new THREE.Scene()
    };
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      15000
    );
    camera.position.z = 1000;
    camera.position.y = 200;
    const controls = new OrbitControls(camera);
    // const gridHelper = new THREE.GridHelper(1000, 10);
    // console.log(gridHelper);
    // this.scenes.help.add(gridHelper);

    const renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.autoClear = false;
    renderer.shadowMapEnabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var light = new THREE.PointLight(0xeedca5, 4, 10000);
    light.position.set(0, 0, 0);
    light.castShadow = true; // default false
    this.scenes.main.add(light);

    const otherLigh = [
      new THREE.PointLight(0xeedca5, 1, 50000),
      new THREE.PointLight(0xeedca5, 1, 50000),
      new THREE.PointLight(0xeedca5, 1, 50000),
      new THREE.PointLight(0xeedca5, 1, 50000),
      new THREE.PointLight(0xeedca5, 1, 50000),
      new THREE.PointLight(0xeedca5, 1, 50000)
    ];

    otherLigh[0].position.set(0, 45000, 0);
    otherLigh[1].position.set(0, -45000, 0);
    otherLigh[2].position.set(0, 0, 45000);
    otherLigh[3].position.set(0, 0, -45000);
    otherLigh[4].position.set(45000, 0, 0);
    otherLigh[5].position.set(-45000, 0, 0);

    otherLigh[0].castShadow = true;
    otherLigh[1].castShadow = true;
    otherLigh[2].castShadow = true;
    otherLigh[3].castShadow = true;
    otherLigh[4].castShadow = true;
    otherLigh[5].castShadow = true;

    this.scenes.main.add(otherLigh[0]);
    this.scenes.main.add(otherLigh[1]);
    this.scenes.main.add(otherLigh[2]);
    this.scenes.main.add(otherLigh[3]);
    this.scenes.main.add(otherLigh[4]);
    this.scenes.main.add(otherLigh[5]);

    // var helper1 = new THREE.CameraHelper(otherLigh[0]);
    // this.scenes.main.add(helper1);

    // var helper2 = new THREE.CameraHelper(otherLigh[1]);
    // this.scenes.main.add(helper2);

    //Set up shadow properties for the light

    const sun = new Sun(this.scenes.main, camera, renderer, animate);
    const stars = new Stars(this.scenes.main, camera, sun.composer);
    const mercury = new Planet({
      scene: this.scenes.main,
      radius: 50,
      sizePlanet: 1,
      intensive: 400,
      startPositionX: 50,
      startPositionZ: 0,
      textureUrl: "/static/texture/mercury.jpg"
    });

    const venus = new Planet({
      scene: this.scenes.main,
      radius: 100,
      sizePlanet: 1,
      intensive: 500,
      startPositionX: 100,
      startPositionZ: 0,
      textureUrl: "/static/texture/8k_venus_atmosphere.jpg"
    });

    const earn = new Planet({
      scene: this.scenes.main,
      radius: 200,
      sizePlanet: 1,
      intensive: 600,
      startPositionX: 0,
      startPositionZ: 200,
      textureUrl: "/static/texture/2k_earth_daymap.jpg"
    });

    const mars = new Planet({
      scene: this.scenes.main,
      radius: 250,
      sizePlanet: 1,
      intensive: 700,
      startPositionX: 0,
      startPositionZ: 250,
      textureUrl: "/static/texture/8k_mars.jpg"
    });

    const jupiter = new Planet({
      scene: this.scenes.main,
      radius: 400,
      sizePlanet: 4,
      intensive: 800,
      startPositionX: 0,
      startPositionZ: 400,
      textureUrl: "/static/texture/8k_jupiter.jpg"
    });

    const animate = () => {
      requestAnimationFrame(animate);
      if (sun && sun.mesh) {
        sun.mesh.rotation.x += 0.01;
        sun.mesh.rotation.y += 0.01;
      }
      if (mercury && mercury.mesh) {
        mercury.group.rotation.y += ((0.001 * Math.PI) / 180) % 360;
      }
      if (venus && venus.mesh) {
        venus.group.rotation.y -= ((0.001 * Math.PI) / 180) % 360;
      }
      if (earn && earn.mesh) {
        earn.group.rotation.y -= ((0.001 * Math.PI) / 180) % 360;
      }
      if (mars && mars.mesh) {
        mars.group.rotation.y -= ((0.001 * Math.PI) / 180) % 360;
      }
      if (jupiter && jupiter.mesh) {
        jupiter.group.rotation.y -= ((0.001 * Math.PI) / 180) % 360;
      }
      sun.composer.render();
    };

    animate();
  }

  render() {
    return null;
  }
}
