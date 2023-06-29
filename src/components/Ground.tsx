import { Plane, useTexture } from "@react-three/drei";

const Ground: React.FC = () => {
  const groundTexture = useTexture({
    map: "/ground/brick.jpg",
  });

  return (
    <mesh rotation-x={Math.PI * -0.5} receiveShadow>
      <planeBufferGeometry args={[100, 100]} />
      <meshStandardMaterial
        {...groundTexture}
        // color={"#458745"}
      />
    </mesh>
  );
};

export default Ground;
