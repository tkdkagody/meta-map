const Ground: React.FC = () => {
  return (
    <>
      <mesh rotation-x={Math.PI * -0.5} receiveShadow>
        <planeBufferGeometry args={[5, 5]} />
        <meshStandardMaterial color={"#458745"} />
      </mesh>
    </>
  );
};

export default Ground;
