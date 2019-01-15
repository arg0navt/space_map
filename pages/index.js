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
    camera.position.z = 100;
    camera.position.y = 0;
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

    var light = new THREE.PointLight(0xeedca5, 3, 10000);
    light.position.set(0, 0, 0);
    light.castShadow = true; // default false
    this.scenes.main.add(light);

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

    const animate = () => {
      requestAnimationFrame(animate);
      if (sun && sun.mesh) {
        sun.mesh.rotation.x += 0.01;
        sun.mesh.rotation.y += 0.01;
      }
      if (mercury && mercury.mesh) {
        mercury.group.rotation.y += ((0.2 * Math.PI) / 180) % 360;
      }
      sun.composer.render();
    };

    animate();
  }

  render() {
    return null;
  }
}
