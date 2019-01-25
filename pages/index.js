import React from "react";
import * as THREE from "three";
import Sun from "../objects/Sun";
import Planet from "../objects/Planet";
import GLTFLoader from "three-gltf-loader";

var OrbitControls = require("three-orbit-controls")(THREE);
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      courseTo: "mercury",
      positionCamera: { x: 0, y: 5000, z: 20700 }
    };
  }

  componentDidMount() {
    this.scenes = {
      help: new THREE.Scene(),
      main: new THREE.Scene()
    };
    this.scenes.fog = new THREE.Fog(0x242426, 2000, 4000);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      20000000
    );
    camera.position.z = this.state.positionCamera.z;
    camera.position.y = this.state.positionCamera.y;
    camera.position.x = this.state.positionCamera.x;
    camera.updateProjectionMatrix();

    this.control = new OrbitControls(camera);
    this.control.addEventListener("change", e => {
      this.setState({ positionCamera: e.target.object.position });
    });

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      autoClear: false
    });
    renderer.shadowMapEnabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    const loader2 = new GLTFLoader();

    var light = new THREE.PointLight(0xeedca5, 3, 200000);
    light.position.set(0, 0, 0);
    light.castShadow = true; // default false
    this.scenes.main.add(light);

    const starsLight = [];

    for (let i = 0; i <= 5; i++) {
      const l = new THREE.PointLight(0xeedca5, 3, 200000);
      l.castShadow = true;
      starsLight.push(new THREE.PointLight(0xeedca5, 3, 200000));
    }

    starsLight[0].position.set(0, 200000, 0);
    starsLight[1].position.set(0, -200000, 0);
    starsLight[2].position.set(0, 0, 200000);
    starsLight[3].position.set(0, 0, -200000);
    starsLight[4].position.set(200000, 0, 0);
    starsLight[5].position.set(-200000, 0, 0);
    starsLight.map(item => this.scenes.main.add(item));

    loader.load(
      // resource URL
      "/static/texture/saturn_planet/scene.gltf",
      // called when the resource is loaded
      gltf => {
        // called when the resource is loaded
        gltf.scene.position.z = 28680;
        this.scenes.main.add(gltf.scene);
      },
      xhr => {
        // called while loading is progressing
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      error => {
        // called when loading has errors
        console.error("An error happened", error);
      }
    );

    loader2.load(
      // resource URL
      "/static/texture/earth/scene.gltf",
      // called when the resource is loaded
      gltf => {
        // called when the resource is loaded
        console.log(gltf);
        gltf.scene.position.z = 2992;
        this.scenes.main.add(gltf.scene);
      },
      xhr => {
        // called while loading is progressing
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      error => {
        // called when loading has errors
        console.error("An error happened", error);
      }
    );

    new THREE.CubeTextureLoader()
      .setPath("/static/texture/stars_background/")
      .load(
        [
          "stars.jpg",
          "left.jpg",
          "stars.jpg",
          "stars.jpg",
          "stars.jpg",
          "center.jpg"
        ],
        texture => {
          this.scenes.main.background = texture;
          animate();
        }
      );

    const sun = new Sun(this.scenes.main, camera, renderer);

    const geometryPlanet = new THREE.SphereGeometry(1, 400, 400);

    const mercury = new Planet({
      scene: this.scenes.main,
      orbitRadius: 1158,
      sizePlanet: 0.38,
      intensive: 400,
      startPositionX: 0,
      startPositionZ: 1158,
      textureUrl: "/static/texture/2k/mercury.jpg",
      geometry: geometryPlanet
    });

    const venus = new Planet({
      scene: this.scenes.main,
      orbitRadius: 2164,
      sizePlanet: 0.94,
      intensive: 500,
      startPositionX: 0,
      startPositionZ: 2164,
      textureUrl: "/static/texture/2k/venus.jpg",
      geometry: geometryPlanet
    });

    // const earn = new Planet({
    //   scene: this.scenes.main,
    //   orbitRadius: 2992,
    //   sizePlanet: 1,
    //   intensive: 600,
    //   startPositionX: 0,
    //   startPositionZ: 2992,
    //   textureUrl: "/static/texture/8k/earn.jpg",
    //   geometry: geometryPlanet
    // });

    // earn.createSatellite({
    //   name: "moon",
    //   textureUrl: "/static/texture/2k/moon.jpg",
    //   orbitRadius: 7,
    //   intensive: 300,
    //   size: 0.27,
    //   geometry: geometryPlanet,
    // });

    const mars = new Planet({
      scene: this.scenes.main,
      orbitRadius: 4558,
      sizePlanet: 0.53,
      intensive: 700,
      startPositionX: 0,
      startPositionZ: 4558,
      textureUrl: "/static/texture/low/mars.jpg",
      geometry: geometryPlanet
    });

    const jupiter = new Planet({
      scene: this.scenes.main,
      orbitRadius: 15570,
      sizePlanet: 10,
      intensive: 800,
      startPositionX: 0,
      startPositionZ: 15570,
      textureUrl: "/static/texture/low/jupiter.jpg",
      geometry: geometryPlanet
    });

    const uranus = new Planet({
      scene: this.scenes.main,
      orbitRadius: 800,
      sizePlanet: 3.98,
      intensive: 1500,
      startPositionX: 0,
      startPositionZ: 800,
      textureUrl: "/static/texture/low/uranus.jpg",
      geometry: geometryPlanet
    });

    const neptune = new Planet({
      scene: this.scenes.main,
      orbitRadius: 57420,
      sizePlanet: 3.86,
      intensive: 1500,
      startPositionX: 0,
      startPositionZ: 57420,
      textureUrl: "/static/texture/low/neptune.png",
      geometry: geometryPlanet
    });

    const animate = () => {
      requestAnimationFrame(animate);
      const r = k => ((k * Math.PI) / 180) % 360;

      // if (sun && sun.mesh) {
      //   sun.mesh.rotation.y += 0.01;
      // }
      // if (mercury && mercury.mesh) {
      //   mercury.group.rotation.y += r(0.001);
      //   mercury.mesh.rotation.y += 0.01;
      // }
      // if (venus && venus.mesh) {
      //   venus.group.rotation.y -= r(0.001);с
      //   venus.mesh.rotation.y += 0.01;
      // }
      // if (earn && earn.mesh) {
      //   earn.group.rotation.y -= r(0.001);
      //   earn.mesh.rotation.y += 0.001;
      //   if (earn.moon) {
      //     earn.moon.rotation.y -= ((0.1 * Math.PI) / 180) % 360;
      //   }
      // }
      // if (mars && mars.mesh) {
      //   mars.group.rotation.y -= r(0.001);
      //   mars.mesh.rotation.y += 0.01;
      // }
      // if (jupiter && jupiter.mesh) {
      //   jupiter.group.rotation.y -= r(0.001);
      //   jupiter.mesh.rotation.y += 0.01;
      // }
      // if (saturn && saturn.mesh) {
      //   saturn.group.rotation.y -= r(0.001);
      //   saturn.mesh.rotation.y += 0.01;
      // }
      // if (uranus && uranus.mesh) {
      //   uranus.group.rotation.y -= r(0.001);
      //   uranus.mesh.rotation.y += 0.01;
      // }
      // if (neptune && neptune.mesh) {
      //   neptune.group.rotation.y -= r(0.001);
      //   neptune.mesh.rotation.y += 0.01;
      // }
      sun.composer.render();
    };
    animate();
  }

  changeCourseTo = name => {
    this.setState({ courseTo: name });
  };

  render() {
    const hasActiveCourse = name => name === this.state.courseTo;
    return (
      <div className="custom-control-wrap">
        <div className="title">
          <p>Track control</p>
        </div>
        <div className="corner-border" />
        <div className={"image_planet" + " " + this.state.courseTo} />
        <ul className="list_planet">
          <li
            className={`item${hasActiveCourse("mercury") ? " active" : ""}`}
            onClick={() => this.changeCourseTo("mercury")}
          >
            Mercury
          </li>
          <li
            className={`item${hasActiveCourse("venus") ? " active" : ""}`}
            onClick={() => this.changeCourseTo("venus")}
          >
            Venus
          </li>
          <li
            className={`item${hasActiveCourse("earn") ? " active" : ""}`}
            onClick={() => this.changeCourseTo("earn")}
          >
            Earn
          </li>
          <li
            className={`item${hasActiveCourse("mars") ? " active" : ""}`}
            onClick={() => this.changeCourseTo("mars")}
          >
            Mars
          </li>
          <li
            className={`item${hasActiveCourse("saturn") ? " active" : ""}`}
            onClick={() => this.changeCourseTo("saturn")}
          >
            Saturn
          </li>
          <li
            className={`item${hasActiveCourse("jupiter") ? " active" : ""}`}
            onClick={() => this.changeCourseTo("jupiter")}
          >
            Jupiter
          </li>
          <li
            className={`item${hasActiveCourse("uranus") ? " active" : ""}`}
            onClick={() => this.changeCourseTo("uranus")}
          >
            Uranus
          </li>
          <li
            className={`item${hasActiveCourse("neptune") ? " active" : ""}`}
            onClick={() => this.changeCourseTo("neptune")}
          >
            Nepyune
          </li>
        </ul>
        <button className="apply_course">Apply course</button>
      </div>
    );
  }
}
