import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";

type Props = {
  testing: boolean;
};
const Lights: React.FC<Props> = ({ testing }) => {
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  if (testing) useHelper(lightRef, DirectionalLightHelper, 100, "red");

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight
        ref={lightRef}
        position={[-100, 100, 10]}
        castShadow
        shadow-mapSize-height={1000}
        shadow-mapSize-width={1000}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      <hemisphereLight args={["#7cdbe6", "#5e9c49", 0.7]} />
    </>
  );
};

export default Lights;
