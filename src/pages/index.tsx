import type { NextPage } from "next";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stats,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import Lights from "../components/Lights";
import Ground from "../components/Ground";
import Trees from "../components/Trees";
import { useEffect, useRef } from "react";
import { useInput } from "../hooks/useinput";

const MyPlayer = () => {
  const { foward, backward, left, right, jump, shift } = useInput();
  const model = useGLTF("/models/mouse_player.glb");
  const { actions } = useAnimations(model.animations, model.scene);

  model.scene.scale.set(1, 1, 1);

  model.scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
    }
  });

  const currentAction = useRef("");
  useEffect(() => {
    let action = "";

    if (foward || backward || left || right) {
      action = "walking";
      if (shift) {
        action = "running";
      }
    } else if (jump) {
      action = "jump";
    } else {
      action = "idle";
    }

    //현재  액션과 다른 명령이 입력되었을경우,
    if (currentAction.current !== action) {
      //넥스트에 새로올 액션 애니메이션값을 담아줌
      const nextActionToPlay = actions[action];

      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
  }, [foward, backward, left, right, jump, shift]);

  return (
    <primitive
      object={model.scene}
      //scale={[1.2, 1.2, 1.2]}
    />
  );
};

const Home: NextPage = () => {
  const testing = true;

  return (
    <div className="container">
      <Canvas shadows>
        {testing ? <Stats /> : null}
        {testing ? <axesHelper args={[2]} /> : null}
        {testing ? <gridHelper args={[50, 50]} /> : null}
        <OrbitControls />
        <Trees boundary={50} count={50} />
        <Lights />
        <MyPlayer />
        <Ground />
      </Canvas>
    </div>
  );
};

export default Home;
