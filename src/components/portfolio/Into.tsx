import { useLoader } from "@react-three/fiber";
import React from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Intro = () => {
  const model = useLoader(GLTFLoader, "./models/house1.glb");
  console.log(model.scene, "=====");
  model.scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
    }
    // if (obj.children[0]) {
    //   obj.children[0].position.x = 10;
    //   obj.children[0].position.y = -10;
    // }
  });

  return (
    <primitive
      object={model.scene}
      rotation={[0, 1, 0]}
      scale={[0.3, 0.3, 0.3]}
      position={[-15, -0.1, 0]}
    />
  );
};

export default Intro;
