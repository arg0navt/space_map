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

var OrbitControls = require("three-orbit-controls")(THREE);

export default class App extends React.Component {
  componentDidMount() {
    this.scenes = {
      help: new THREE.Scene(),
      sun: new THREE.Scene(),
    }
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 100;
    const controls = new OrbitControls(camera);
    const gridHelper = new THREE.GridHelper(1000, 1000);
    this.scenes.help.add(gridHelper);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const sun = new Sun(this.scenes.sun, camera, renderer, animate);

    const animate = () => {
      requestAnimationFrame(animate);
      if (sun && sun.mesh) {
        sun.mesh.rotation.x += 0.01;
        sun.mesh.rotation.y += 0.01;
      }
      sun.composer.render();
      renderer.render( this.scenes.help, camera );
    };

    animate();
  }

  render() {
    return null;
  }
}
