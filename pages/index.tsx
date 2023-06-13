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
import { useEffect } from "react";

const MyCube = () => {
  const model = useGLTF("/models/cube.glb");
  const { actions } = useAnimations(model.animations, model.scene);
  console.log(model, "model");

  useEffect(() => {
    actions?.bounce?.play();
  }, []);

  return <primitive object={model.scene} />;
};

const Home: NextPage = () => {
  const testing = true;

  return (
    <div className="container">
      <Canvas shadows>
        {testing ? <Stats /> : null}
        {testing ? <axesHelper args={[2]} /> : null}
        {testing ? <gridHelper args={[10, 10]} /> : null}
        <OrbitControls />
        <Trees boundary={50} count={50} />
        <Lights />
        <MyCube />
        <Ground />
      </Canvas>
    </div>
  );
};

export default Home;
