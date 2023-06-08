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
  //count: 부모컴포넌트에서 지정해준 나무개수
  const model = useLoader(GLTFLoader, "./models/tree.glb");
  const [trees, setTrees] = useState<treeType[]>([]);

  //gltf 씬 안의 속성 조정하려면 traverse사용
  model.scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
    }
  });

  const boxIntersect = (
    minAx: number,
    minAz: number,
    maxAx: number,
    maxAz: number,
    minBx: number,
    minBz: number,
    maxBx: number,
    maxBz: number
  ) => {
    //오버래핑 여부 체킹해주는 함수
    let aLeftOfB = maxAx < minBx;
    let aRightOfB = minAx > maxBx;
    let aAboveB = minAz > maxBz;
    let aBelowB = maxAz < minBz;

    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
  };

  const isOverlapping = (index: number, tree: any, trees: any[]) => {
    console.log("tree.position", tree.position);
    const minTargetX = tree.position.x - tree.box / 2;
    const maxTargetX = tree.position.x + tree.box / 2;
    const minTargetZ = tree.position.z - tree.box / 2;
    const maxTargetZ = tree.position.z + tree.box / 2;
    for (let i = 0; i < index; i++) {
      let minChildX = trees[i].position.x - trees[i].box / 2;
      let maxChildX = trees[i].position.x - trees[i].box / 2;
      let minChildZ = trees[i].position.z - trees[i].box / 2;
      let maxChildZ = trees[i].position.z - trees[i].box / 2;
      if (
        boxIntersect(
          minTargetX,
          minTargetZ,
          maxTargetX,
          maxTargetZ,
          minChildX,
          minChildZ,
          maxChildX,
          maxChildZ
        )
      ) {
        console.log("content box overlappoing!!", tree.position);
        return true;
      }
    }
    return false;
  };

  const newPosition = (box: number, boundary: number) => {
    //boudary 50 * 50 안에 분포
    return (
      boundary / 2 -
      box / 2 -
      (boundary - box) * (Math.round(Math.random() * 100) / 100)
    );
  };

  const updatePosition = (treeArray: treeType[], boundary: number) => {
    //overlapping한것이 한개도 없을때까지 루프
    //overlapping하면, do문이 새로운 위치 생성
    treeArray.forEach((tree, idx) => {
      do {
        tree.position.x = newPosition(tree.box, boundary);
        tree.position.z = newPosition(tree.box, boundary);
      } while (isOverlapping(idx, tree, treeArray));
    });

    setTrees(treeArray);
  };

  useEffect(() => {
    const tempTrees: treeType[] = [];
    for (let i = 0; i < count; i++) {
      tempTrees.push({ position: { x: 0, z: 0 }, box: 1 });
    }
    console.log(tempTrees, "temptrees");
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
