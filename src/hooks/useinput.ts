import { useEffect, useState } from "react";

export const useInput = () => {
  const [input, setInput] = useState({
    foward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
    jump: false,
  });

  const keys: any = {
    KeyW: "foward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    ShiftLeft: "shift",
    Space: "jump",
  };

  //키 문자열 반환 화살표함수.
  const findKey = (key: string) => keys[key];

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      setInput((k) => ({ ...k, [findKey(e.code)]: true }));
    };

    const handleKeyUp = (e: any) => {
      setInput((k) => ({ ...k, [findKey(e.code)]: false }));
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
    };
  }, []);

  return input;
};
