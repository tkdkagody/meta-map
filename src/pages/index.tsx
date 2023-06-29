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

const Home: NextPage = () => {
  const testing = false;

  return (
    <div className="container">
      <Canvas shadows camera={{ fov: 40 }}>
        <Suspense fallback={"loading......"}>
          <PerspectiveCamera position={[0, -3, -20]}>
            {testing ? <Stats /> : null}
            {testing ? <axesHelper args={[2]} /> : null}
            {testing ? <gridHelper args={[50, 50]} /> : null}
            <OrbitControls />
            <Trees boundary={90} count={15} />
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
