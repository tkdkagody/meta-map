import { Html } from "@react-three/drei";

const InfoTxt: React.FC = () => {
  return (
    <>
      <Html
        position={[-50, 15, 0]}
        rotation={[0, 1.7, 0]}
        style={{ width: "200px" }}
      >
        자기소개서
      </Html>
      <Html
        position={[40, 15, 0]}
        rotation={[0, 0, 0]}
        style={{ width: "200px" }}
      >
        Experience
      </Html>
    </>
  );
};

export default InfoTxt;
