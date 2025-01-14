import { React, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import FullPageScroll from "../../components/FullPage/FullPageScroll";
import Carousels from "../../components/Main/Carousels";
import Caterogies from "../../components/Main/Categories";
import PointRank from "../../components/Main/PointRank";
import ImageCards from "../../components/Main/ImageCards";

import "../../styles/Main/Main.scss";
import { checkLogin, isCheckGuest } from "../../util/auth";
import About from "../../components/about";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const approved = searchParams.get("approved");
    if (approved === "false") {
      alert("승인된 유저가 아닙니다.");
    }
    setIsLoggedIn(checkLogin("accessToken"));
    setIsGuest(isCheckGuest());
  }, [isLoggedIn]);

  return (
    <>
      <FullPageScroll>
        <div className="w-full h-full m-auto">
          <img
            src="./img/frame3.png"
            className="w-full h-full bg-no-repeat"
            alt="일러스트"
          />
        </div>
        {/* <div className="w-full h-full m-auto bg-amber-300 flex justify-around items-center relative overflow-hidden ">
          <div className="absolute top-0 left-0 w-full h-6 bg-amber-400 transform -skew-y-3"></div>
          <img
            src="./img/frame.png"
            className="w-[700px] h-[400px] bg-no-repeat"
            alt="일러스트"
          />
          <span>
            <h1 className="text-right">동아리 소개</h1>
            <p>이 동아리는 이렇게 저렇게 요렇게 해서 만들어졌답니다~</p>
          </span>
        </div> */}
        <div className="w-[85vw] h-full mx-auto flex items-center">
          {/* {(!isLoggedIn || isGuest) && <Carousels />} */}
          <About />
          {/* <Caterogies isLoggedIn={isLoggedIn} isGuest={isGuest} />
          {isLoggedIn && !isGuest && <PointRank />} */}
        </div>
        {isLoggedIn && !isGuest && (
          <div className="w-[85vw] h-full m-auto flex justify-center items-center">
            <ImageCards />
          </div>
        )}
      </FullPageScroll>
    </>
  );
};

export default Main;
