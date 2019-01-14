import React from "react";
import * as THREE from "three";
import {
  KernelSize,
  GodRaysEffect,
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
    camera.position.z = 100;
    const controls = new OrbitControls(camera);
    const gridHelper = new THREE.GridHelper(1000, 10000);
    scene.add(gridHelper);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const renderScene = new RenderPass(scene, camera);
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);

    const loader = new THREE.TextureLoader();
    loader.load("/static/texture/green.jpg", texture => {
      const geometry = new THREE.SphereGeometry(1, 100, 100);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.mesh = new THREE.Mesh(geometry, material);
      scene.add(this.mesh);

      const godRaysEffect = new GodRaysEffect(scene, camera, this.mesh, {
        resolutionScale: 0.75,
        kernelSize: KernelSize.SMALL,
        density: 1,
        decay: 1,
        weight: 0.4,
        exposure: 0.55,
        samples: 60,
        clampMax: 1.0
      });

      godRaysEffect.dithering = true;

      const effectPass = new EffectPass(camera, godRaysEffect);
      effectPass.renderToScreen = true;
      composer.addPass(effectPass);
      animate();
    });

    var animate = () => {
      requestAnimationFrame(animate);
      this.mesh.rotation.x += 0.01;
			this.mesh.rotation.y += 0.01;
      composer.render();
    };
  }

  render() {
    return null;
  }
}
