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
      main: new THREE.Scene(),
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
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const sun = new Sun(this.scenes.main, camera, renderer, animate);
    const mercury = new Mercury(this.scenes.main, camera);

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
