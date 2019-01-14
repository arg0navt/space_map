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
import Mercury from "../objects/Mercury";

var OrbitControls = require("three-orbit-controls")(THREE);

export default class App extends React.Component {
  componentDidMount() {
    this.scenes = {
      help: new THREE.Scene(),
      sun: new THREE.Scene(),
      planets: new THREE.Scene()
    };
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 100;
    camera.position.y = 0;
    const controls = new OrbitControls(camera);
    const gridHelper = new THREE.GridHelper(1000, 10);
    console.log(gridHelper);
    this.scenes.help.add(gridHelper);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const sun = new Sun(this.scenes.sun, camera, renderer, animate);
    const mercury = new Mercury(this.scenes.planets, camera);

    const animate = () => {
      requestAnimationFrame(animate);
      if (sun && sun.mesh) {
        sun.mesh.rotation.x += 0.01;
        sun.mesh.rotation.y += 0.01;
      }
      if (mercury && mercury.mesh) {
        const { x, z } = mercury.mesh.position;
      }
      sun.composer.render();
      renderer.render(this.scenes.help, camera);
      renderer.render(this.scenes.planets, camera);
    };

    animate();
  }

  render() {
    return null;
  }
}
