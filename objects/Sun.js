import { TextureLoader, MeshBasicMaterial, Mesh, SphereGeometry } from "three";
import {
  KernelSize,
  GodRaysEffect,
  EffectComposer,
  EffectPass,
  RenderPass
} from "postprocessing";

const Sun = function (scene, camera, renderer, callback) {
  const renderScene = new RenderPass(scene, camera);
  this.composer = new EffectComposer(renderer);
  this.composer.addPass(renderScene);

  const loader = new TextureLoader();

  loader.load("/static/texture/sun.jpg", texture => {
    const geometry = new SphereGeometry(3, 100, 100);
    const material = new MeshBasicMaterial({ map: texture });
    this.mesh = new Mesh(geometry, material);
    scene.add(this.mesh);

    const godRaysEffect = new GodRaysEffect(scene, camera, this.mesh, {
      resolutionScale: 0.75,
      kernelSize: KernelSize.SMALL,
      density: 0.6,
      decay: 1,
      weight: 0.4,
      exposure: 1,
      samples: 200,
      clampMax: 1.0
    });

    godRaysEffect.dithering = true;

    const effectPass = new EffectPass(camera, godRaysEffect);
    effectPass.renderToScreen = true;
    this.composer.addPass(effectPass);
  });
};

export default Sun;
