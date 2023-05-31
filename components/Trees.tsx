import { useLoader } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type treeType = {
  position: { x: number; z: number };
  box: number;
};

type props = {
  boundary: number;
  count: number;
};

const Trees: React.FC<props> = ({ boundary, count }) => {
  const model = useLoader(GLTFLoader, "./models/tree.glb");
  const [trees, setTrees] = useState<treeType[]>([]);

  //gltf 씬 안의 속성 조정하려면 traverse사용
  model.scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
    }
  });

  const updatePosition = (treeArray: treeType[], boundary: number) => {
    treeArray.forEach((tree, idx) => {
      tree.position.x = Math.random() * 100;
      tree.position.z = Math.random() * 100;
    });
    setTrees(treeArray);
  };

  useEffect(() => {
    const tempTrees: treeType[] = [];
    for (let i = 0; i < count; i++) {
      tempTrees.push({ position: { x: 0, z: 0 }, box: 1 });
    }
    console.log(tempTrees);
    updatePosition(tempTrees, boundary);
  }, [boundary, count]);

  return (
    <group rotation={[0, 4, 0]}>
      {trees.map((tree, idx) => {
        return (
          <object3D key={idx} position={[tree.position.x, 0, tree.position.z]}>
            <mesh scale={[tree.box, tree.box, tree.box]}>
              <boxGeometry />
              <meshBasicMaterial color={"blue"} wireframe />
            </mesh>
            <primitive object={model.scene.clone()} scale={[0.2, 0.2, 0.2]} />
          </object3D>
        );
      })}
    </group>
  );
};

export default Trees;
