import { Plane, useTexture } from "@react-three/drei";

const Ground: React.FC = () => {
  const groundTexture = useTexture({
    map: "/ground/brick.jpg",
  });

  return (
    <mesh rotation-x={Math.PI * -0.5} receiveShadow>
      <planeBufferGeometry args={[1000, 1000]} />
      <meshStandardMaterial
        //{...groundTexture}
        color={"#deedde"}
      />
    </mesh>
  );
};

export default Ground;
