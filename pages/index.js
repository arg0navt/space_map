import React from "react";
import * as THREE from "three";

var OrbitControls = require("three-orbit-controls")(THREE);

export default class App extends React.Component {
  componentDidMount() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.camera.position.set( 0, 20, 100 );
    var controls = new OrbitControls(this.camera);


    //normalize the direction vector (convert to vector of length 1)

    // var helper = new THREE.CameraHelper(this.camera);
    // this.scene.add(helper);

    var gridHelper = new THREE.GridHelper(1000, 10000);
    this.scene.add(gridHelper);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    const loader = new THREE.TextureLoader();
    loader.load("/static/texture/green.jpg", texture => {
      this.createSun(texture);
      var render = () => {
        requestAnimationFrame(render);
        controls.update();
        this.renderer.render(this.scene, this.camera);
      };
      console.log(this);
      render();
    });
  }

  createSun = texture => {
    const geometry = new THREE.SphereGeometry(10, 100, 100);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
    var box = new THREE.BoxHelper(mesh, 0xffff00);
    this.scene.add(box);
    this.createSunLighting();
  };

  createSunLighting = () => {
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 1, 0);

    this.scene.add(spotLight);
  };

  render() {
    return null;
  }
}
