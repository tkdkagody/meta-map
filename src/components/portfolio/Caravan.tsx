import { useLoader } from "@react-three/fiber";
import React from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Caravan = () => {
  const model = useLoader(GLTFLoader, "./models/caravan.glb");
  model.scene.traverse((obj) => {
    if (obj.castShadow) {
      obj.castShadow = true;
    }
  });

  return (
    <primitive
      object={model.scene}
      rotation={[0, 0, 0]}
      scale={[130, 150, 200]}
      position={[40, 0, 0]}
    />
  );
};

export default Caravan;
