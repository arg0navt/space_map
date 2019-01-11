import React from "react";
import * as THREE from "three";
import {
  BlendFunction,
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass
} from "postprocessing";

var OrbitControls = require("three-orbit-controls")(THREE);

export default class App extends React.Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const effectBloom = new BloomEffect({
      blendFunction: BlendFunction.SCREEN,
      resolutionScale: 0.05,
      distinction: 1
    });
    effectBloom.blendMode.opacity.value = 4;

    const effectPass = new EffectPass(camera, effectBloom);
    effectPass.renderToScreen = true;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const renderScene = new RenderPass(scene, camera);
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(effectPass);

    const geometry = new THREE.SphereGeometry(1, 100, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 5;

    const loader = new THREE.TextureLoader();
    loader.load("/static/texture/green.jpg", texture => {
      const geometry = new THREE.SphereGeometry(1, 100, 100);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      animate();
    });

    var animate = function() {
      requestAnimationFrame(animate);

      composer.render();
    };
  }

  render() {
    return null;
  }
}
