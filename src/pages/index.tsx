import type { NextPage } from "next";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stats } from "@react-three/drei";
import Lights from "../components/Lights";
import Ground from "../components/Ground";
import Trees from "../components/Trees";
import Player from "../components/Player";
import { Suspense } from "react";
import { Sky } from "../components/Sky";
import Intro from "../components/portfolio/Intro";
import InfoTxt from "../components/InfoTxt";
import Manipulation from "../components/Manipulation";

const Home: NextPage = () => {
  const testing = false;

  return (
    <div className="container">
      <Manipulation />
      <Canvas shadows camera={{ fov: 45 }}>
        <Suspense fallback={"loading......"}>
          <PerspectiveCamera position={[0, -20, -80]}>
            {testing ? <Stats /> : null}
            {testing ? <axesHelper args={[2]} /> : null}
            {testing ? <gridHelper args={[50, 50]} /> : null}
            <OrbitControls maxDistance={150} />
            <InfoTxt />
            <Trees boundary={800} count={30} />
            <Lights testing={testing} />
            <Player />
            <Intro />
            <Ground />
            <Sky />
          </PerspectiveCamera>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Home;
