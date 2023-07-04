import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useInput } from "../hooks/useinput";
import * as THREE from "three";

let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuarternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();

const directionOffset = ({ foward, backward, left, right }: any) => {
  let directionOffset = 0;
  if (foward) {
    if (left) {
      directionOffset = Math.PI / 4; // wa //  45도
    } else if (right) {
      directionOffset = -Math.PI / 4; //wd
    }
  } else if (backward) {
    if (left) {
      directionOffset = Math.PI / 4 + Math.PI / 2; //sa //+90
    } else if (right) {
      directionOffset = -Math.PI / 4 - Math.PI / 2; //sd
    } else {
      directionOffset = Math.PI; //s
    }
  } else if (left) {
    directionOffset = Math.PI / 2; //a
  } else if (right) {
    directionOffset = -Math.PI / 2; //d
  }
  return directionOffset;
};

const Player = () => {
  const { foward, backward, left, right, jump, shift } = useInput();
  const model = useGLTF("/models/mouse.glb");
  const { actions } = useAnimations(model.animations, model.scene);

  model.scene.scale.set(10, 10, 10);

  // model.scene.traverse((obj) => {
  //   if (obj.isMesh) {
  //     obj.castShadow = true;
  //   }
  // });

  const currentAction = useRef("");
  const controlsRef = useRef<any>(); //any!!
  const camera = useThree((state) => state.camera);

  const updateCameraTarget = (moveX: number, moveZ: number) => {
    //move camera;
    camera.position.x += moveX;
    camera.position.z += moveZ;

    //update camera target
    cameraTarget.x = model.scene.position.x;
    cameraTarget.y = model.scene.position.y - 0.3; // 카메라 수정
    cameraTarget.z = model.scene.position.z;
    if (controlsRef.current) controlsRef.current.target = cameraTarget;
  };
  useEffect(() => {
    let action = "";

    if (foward || backward || left || right) {
      action = "walking";
      if (shift) {
        action = "running";
      }
    } else if (jump) {
      action = "jump";
    } else {
      action = "idle";
    }

    //현재  액션과 다른 명령이 입력되었을경우,
    if (currentAction.current !== action) {
      //넥스트에 새로올 액션 애니메이션값을 담아줌
      const nextActionToPlay = actions[action];

      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
  }, [foward, backward, left, right, jump, shift]);

  useFrame((state, delta) => {
    if (
      currentAction.current == "running" ||
      currentAction.current == "walking"
    ) {
      //calculate  towards camera direction
      let angleYCameraDirection = Math.atan2(
        camera.position.x - model.scene.position.x,
        camera.position.z - model.scene.position.z
      );

      //diagonal movement angle offset
      let newDirectionOffset = directionOffset({
        foward,
        backward,
        left,
        right,
      });

      //rotate model
      rotateQuarternion.setFromAxisAngle(
        rotateAngle,
        angleYCameraDirection + newDirectionOffset
      );
      model.scene.quaternion.rotateTowards(rotateQuarternion, 0.2);

      //calculate direction
      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

      //run/walk velocity
      const velocity = currentAction.current == "running" ? 30 : 15;

      //move model & camera
      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;
      model.scene.position.x += moveX;
      model.scene.position.z += moveZ;
      updateCameraTarget(moveX, moveZ);
    }
  });

  return (
    <>
      <OrbitControls ref={controlsRef} />
      <primitive object={model.scene} />
    </>
  );
};

export default Player;
