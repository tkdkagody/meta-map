import AnimatedBox from "../components/AnimatedBox";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect } from "react";

const CameraOrbitController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

const Home = () => {
  return (
    <div className="container">
      <Canvas>
        <CameraOrbitController />
        <ambientLight intensity={0.1} />
        <directionalLight color={"red"} position={[0, 0, 5]} />
        <AnimatedBox />
      </Canvas>
    </div>
  );
};

export default Home;
