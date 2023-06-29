import { useLoader } from "@react-three/fiber";
import React from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const FirstHouse = () => {
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
      rotation={[0, 1.7, 0]}
      scale={[1, 1.2, 1]}
      position={[-25, 0, 0]}
    />
  );
};

export default FirstHouse;
