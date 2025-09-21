import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';


// import GLSL shaders (thanks to vite-plugin-glsl)
import earthVertexShader from "../shaders/vertex.glsl";
import earthFragmentShader from "../shaders/fragment.glsl";

export default function Earth() {
  const mountRef = useRef(null);


  useEffect(() => {
    // Sizes
    const sizes = {
      width: mountRef.current.clientWidth,
      height: mountRef.current.clientHeight,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
    };

    // Scene
    const scene = new THREE.Scene();

     // Camera
    const camera = new THREE.PerspectiveCamera(
      25,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(6, 0, 9);
    scene.add(camera);

     // Textures
    const loader = new THREE.TextureLoader();
    const dayTexture = loader.load("/day.jpg");
    dayTexture.colorSpace = THREE.SRGBColorSpace;

    const nightTexture = loader.load("/night.jpg");
    nightTexture.colorSpace = THREE.SRGBColorSpace;

    const earthSpecularCloudsTexture = loader.load("/clouds.jpg");
    earthSpecularCloudsTexture.colorSpace = THREE.SRGBColorSpace;

    const lightDir = new THREE.Vector3(1, 0, 0).normalize();

    // Earth mesh
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
    const earthMaterial = new THREE.ShaderMaterial({
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
      uniforms: {
        dayTexture: new THREE.Uniform(dayTexture),
        nightTexture: new THREE.Uniform(nightTexture),
        specularTexture: new THREE.Uniform(earthSpecularCloudsTexture),
        lightDirection: { value: lightDir },
       
        

      },
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

  // Clouds (simple transparent texture)
    const cloudsGeometry = new THREE.SphereGeometry(2.03, 64, 64); // slightly bigger
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      map: earthSpecularCloudsTexture,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    scene.add(cloudsMesh);

 

 // Add a basic directional light for specular highlights i.e sunlight
    const directionalLight = new THREE.DirectionalLight(0xffffff, 4,0);
    directionalLight.position.set(-15,5,-10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Lensflare
    const flare0 = loader.load('/lensflare0.png');
    const flare3 = loader.load('/lensflare1.png');
    const lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement(flare0, 1200, 0, directionalLight.color));
    lensflare.addElement(new LensflareElement(flare3, 160, 0.6));
    lensflare.addElement(new LensflareElement(flare3, 170, 0.7));
    lensflare.addElement(new LensflareElement(flare3, 220, 0.9));
    lensflare.addElement(new LensflareElement(flare3, 170, 1));

    directionalLight.add(lensflare);

    


    // Ambient light for subtle illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 2); // subtle fill
    scene.add(ambientLight);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: mountRef.current,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(sizes.pixelRatio);
    renderer.setClearColor("#000011");

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Resize handling
    const handleResize = () => {
      sizes.width = mountRef.current.clientWidth;
      sizes.height = mountRef.current.clientHeight;
      sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(sizes.pixelRatio);
    };
    window.addEventListener("resize", handleResize);

    

    // Animation
    const clock = new THREE.Clock();
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      earth.rotation.y = elapsedTime * 0.1;
      cloudsMesh.rotation.y = elapsedTime * 0.12; // slightly faster clouds
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      earthGeometry.dispose();
      cloudsGeometry.dispose();
      earthMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={mountRef}
      style={{ width: "100%", height: "100vh", display: "block" }}
    />
  );
}







    