import styled from "styled-components";

const Manipulation: React.FC = () => {
  return (
    <div className="manipulation">
      How to Operate<br></br> <br></br>- foward: w <br></br>- backward: s{" "}
      <br></br>- left: a <br></br>- right: d <br></br>- shift + 키 : running{" "}
      <br></br> -마우스 휠: 확대축소
      <br></br>* 대각선이동가능
      <br></br>* 드래그시 360도 view
    </div>
  );
};

export default Manipulation;
