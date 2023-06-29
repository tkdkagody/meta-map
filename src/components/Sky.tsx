import { useThree } from "@react-three/fiber";
import { CubeTextureLoader } from "three";

export const Sky = () => {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  const texture = loader.load([
    "/cube/px.jpg",
    "/cube/nx.jpg",
    "/cube/py.jpg",
    "/cube/ny.jpg",
    "/cube/pz.jpg",
    "/cube/nz.jpg",
  ]);

  scene.background = texture;
  return null;
};
