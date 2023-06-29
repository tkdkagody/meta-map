import type { NextPage } from "next";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stats } from "@react-three/drei";
import Lights from "../components/Lights";
import Ground from "../components/Ground";
import Trees from "../components/Trees";
import Player from "../components/Player";
import { Suspense } from "react";
import Intro from "../components/portfolio/into";

const Home: NextPage = () => {
  const testing = false;

  return (
    <div className="container">
      <Canvas shadows camera={{ fov: 50 }}>
        <Suspense fallback={"loading......"}>
          {" "}
          <PerspectiveCamera position={[0, -1, 0]}>
            {testing ? <Stats /> : null}
            {testing ? <axesHelper args={[2]} /> : null}
            {testing ? <gridHelper args={[50, 50]} /> : null}

            <OrbitControls />
            <Trees boundary={50} count={30} />
            <Lights testing={testing} />
            <Player />
            <Intro />
            <Ground />
          </PerspectiveCamera>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Home;
