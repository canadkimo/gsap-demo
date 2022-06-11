import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import styled from "styled-components";
import car from "./assets/car.svg";
import road from "./assets/road.svg";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 400px;
  bottom: 0;
`;

const ImgWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Road = styled.img`
  width: 460px;
  height: auto;
`;

const Car = styled.img`
  width: 66px;
  height: auto;
`;

export default function CarAnimation() {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    gsap.set(element.querySelector(".car"), { xPercent: 0, yPercent: -50 });
    gsap
      .timeline({
        defaults: { duration: 10, ease: "none" },
        scrollTrigger: {
          trigger: element,
          start: "top",
          end: "+=3000",
          scrub: 1
        }
      })
      .from(
        element.querySelector(".car"),
        {
          motionPath: {
            path: element.querySelector(".pathLine"),
            align: element.querySelector(".pathLine"),
            offsetX: 10,
            offsetY: 0,
            autoRotate: 90,
            transformOrigin: "100% 50%"
          }
        },
        0
      );
  }, []);

  return (
    <Container ref={ref}>
      <ImgWrapper>
        <Road className="road" src={road} />
      </ImgWrapper>
      <ImgWrapper>
        <Car className="car" src={car} />
      </ImgWrapper>
      <ImgWrapper>
        <svg
          className="path"
          width="460"
          height="760"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="pathLine"
            d="M182,748C182,748 184,517 184,390C184,263 162,317 162,317C162,317 99,465 78,364C57,263 162,267 162,267L161,9m"
            stroke="none"
            fill="none"
          />
          {/* <path
            className="pathLine"
            d="M171,776C171,776 173,467 173,467C173,467 182,435 190,382C198,329 138,299 136,296C134,293 100,276 78,313C56,350 100,351 101,351C102,351 163,345 158,290C153,235 176,270 176,270C176,270 177,126 177,126C177,126 180,34 181,17m"
            opacity="NaN"
            stroke="#fff"
            fill="none"
          /> */}
        </svg>
      </ImgWrapper>
    </Container>
  );
}
