import { useLoader } from "@react-three/fiber";
import React from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const House = () => {
  const model = useLoader(GLTFLoader, "./models/house1.glb");

  // model.scene.traverse((obj) => {
  //   if (obj.isMesh) {
  //     obj.castShadow = true;
  //   }
  // });

  return (
    <>
      <primitive
        object={model.scene}
        rotation={[0, 1.7, 0]}
        scale={[1, 1.2, 1]}
        position={[-50, 0, 0]}
      />
    </>
  );
};

export default House;
