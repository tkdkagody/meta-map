import type { NextPage } from "next";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import Lights from "../components/Lights";
import Ground from "../components/Ground";
import Trees from "../components/Trees";
import Player from "../components/Player";

const Home: NextPage = () => {
  const testing = true;

  return (
    <div className="container">
      <Canvas shadows>
        {testing ? <Stats /> : null}
        {testing ? <axesHelper args={[2]} /> : null}
        {testing ? <gridHelper args={[50, 50]} /> : null}
        <OrbitControls />
        <Trees boundary={40} count={20} />
        <Lights />
        <Player />
        <Ground />
      </Canvas>
    </div>
  );
};

export default Home;
