import { TextureLoader, MeshBasicMaterial, Mesh, SphereGeometry, Geometry, Vector3, Points, PointsMaterial, Math } from "three";
import {
  KernelSize,
  GodRaysEffect,
  EffectComposer,
  EffectPass,
  RenderPass
} from "postprocessing";

const Sun = function(scene, camera, renderer, callback) {
  const renderScene = new RenderPass(scene, camera);
  this.composer = new EffectComposer(renderer);
  this.composer.addPass(renderScene);

  const loader = new TextureLoader();

  loader.load("/static/texture/2k/sun.jpg", texture => {
    const geometry = new SphereGeometry(115, 400, 400);
    const material = new MeshBasicMaterial({ map: texture });
    this.mesh = new Mesh(geometry, material);
    scene.add(this.mesh);

    const godRaysEffect = new GodRaysEffect(scene, camera, this.mesh, {
      resolutionScale: 0.75,
      kernelSize: KernelSize.SMALL,
      density: 1,
      decay: 0.98,
      weight: 0.4,
      exposure: 0.55,
      samples: 60,
      clampMax: 1.0,
      opacity: 1
    });

    const effectPass = new EffectPass(camera, godRaysEffect);
    effectPass.renderToScreen = true;
    this.composer.addPass(effectPass);
  });
};

export default Sun;
