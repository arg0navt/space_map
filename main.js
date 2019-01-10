var SCREEN_WIDTH = window.innerWidth,
  SCREEN_HEIGHT = window.innerHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
var controls = new THREE.OrbitControls( camera );

camera.position.set( 0, 20, 100 );
controls.update();

// var controls = new THREE.OrbitControls( camera );

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
document.body.appendChild(renderer.domElement);

var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

var loader = new THREE.TextureLoader();
loader.load('./green.jpg', function (texture) {
  createSun(texture);
  var render = function () {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  };

  render();
});

const createSun = (texture) => {
  const geometry = new THREE.SphereGeometry(10, 100, 100, 10);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  material.light = false;
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  createSunLighting();
}

const createSunLighting = function () {
  var spotLight = new THREE.SpotLight(0xffffff);

  spotLight.position.set(0, 1, 0);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 0;
  spotLight.shadow.mapSize.height = 0;
  spotLight.shadow.camera.near = 0;
  spotLight.shadow.camera.far = 0;
  spotLight.shadow.camera.fov = 0;

  scene.add(spotLight);

  // var spotLightHelper = new THREE.SpotLightHelper(spotLight);
  // scene.add(spotLightHelper);
}