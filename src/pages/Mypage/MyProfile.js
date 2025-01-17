import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GitHubCalendar from "react-github-calendar";
import axios from "axios";
import { getCookie, removeCookie } from "../../util/auth";
import { deleteFileList, extractS3Key, uploadFile } from "../../util/s3Upload";

import MypageHeader from "../../components/Header/MypageHeader";
import Title from "../../components/Title/Title";
import Footer from "../../components/Footer";
import Reconfirm from "../../components/Reconfirm";

import "../../styles/MyPage/MyProfile.scss";

const MyProfile = () => {
  const imgRef = useRef();
  const navigate = useNavigate();

  const [myInfo, setMyInfo] = useState(null);
  const [myPoint, setMyPoint] = useState(null);
  const [phoneNum, setPhoneNum] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [newProfileImg, setNewProfileImg] = useState(null);
  const [previewNewProfileImg, setPreviewNewProfileImg] = useState(null);

  const onDeleteClick = () => {
    setIsDeleteModal(true);
  };

  const onCloseModal = () => {
    setIsDeleteModal(false);
  };

  const onHandlePhoneNum = (e) => {
    setPhoneNum(e.target.value);
  };

  const previewProfileFile = () => {
    const file = imgRef.current.files[0];
    if (file) {
      setNewProfileImg(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewNewProfileImg(reader.result);
      };
    }
  };

  const delete_user = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/users`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        alert("회원 탈퇴 성공");
        removeCookie("accessToken");
        window.location.replace("/");
      } else {
        alert("세션이 만료되었습니다.");
      }
    } catch (e) {
      alert(e.response.data.message);
    }
    setIsDeleteModal(false);
  };

  const put_myInfo = async (putData) => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/users`;
      const response = await axios.put(url, putData, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        alert(response.data.msg);
        window.location.replace("/mypage/profile");
      } else {
        alert("내 정보 수정하는데 실패했습니다.");
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const onSave = async () => {
    if (newProfileImg || phoneNum !== myInfo?.phoneNumber) {
      let putData = {
        profileImgUrl: myInfo?.profileImgUrl,
        phoneNumber: phoneNum ? phoneNum : myInfo?.phoneNumber,
      };
      if (newProfileImg) {
        const fileUrl = await uploadFile(newProfileImg);
        if (fileUrl) {
          const s3ObjectKey = extractS3Key([myInfo?.profileImgUrl]);
          if (s3ObjectKey) {
            await deleteFileList(s3ObjectKey);
          }
        }
        putData.profileImgUrl = fileUrl;
      }
      await put_myInfo(putData);
    } else {
      alert("바뀐 정보가 없습니다.");
    }
  };

  const read_myInfomation = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/users/me`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setMyInfo(response.data.data);
        setPhoneNum(response.data.data.phoneNumber);
      } else {
        alert("내 정보를 가져오는데 실패했습니다.");
        navigate("/");
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/");
    }
  };

  const read_myPoint = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/points/me`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setMyPoint(response.data.data);
      } else {
        alert("내 포인트를 가져오는데 실패했습니다.");
        navigate("/");
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/");
    }
  };

  useEffect(() => {
    read_myInfomation();
    read_myPoint();
  }, []);

  return (
    <>
      <div className="w-[1080px] h-auto m-auto">
        <Title title={"Mypage"} />
        <MypageHeader />
        <div className="w-full h-[90%] font-bold m-auto my-2">
          <div className="flex w-full h-[25rem] m-auto">
            <div className="w-[30%] h-[80%] m-auto">
              <img
                src={
                  previewNewProfileImg
                    ? previewNewProfileImg
                    : myInfo?.profileImgUrl
                }
                className="flex items-center justify-center m-auto w-[15rem] h-[15rem] rounded-[50%]"
                alt="Profile"
              />
              <form className="flex justify-center">
                <label
                  htmlFor="itemImg"
                  className="flex w-[80%] h-[35px] rounded-4 mt-[40px] items-center justify-center bg-[#6482FF] font-normal text-white cursor-pointer hover:bg-[#6478FF] font-jua"
                >
                  이미지 변경
                </label>
                <input
                  type="file"
                  id="itemImg"
                  accept="image/*"
                  style={{ display: "none" }}
                  className="w-[2rem] h-[2rem] display: none"
                  onChange={previewProfileFile}
                  ref={imgRef}
                />
              </form>
            </div>
            <div className="w-[50%] h-full content-between">
              <div className="flex items-center w-[80%] h-[20%] m-auto mt-[2.5%] mb-[2.5%]">
                <div className="flex items-center w-[50%] h-full text-[1.25vw] font-nanumgothic font-bold">
                  이름
                </div>
                <div className="flex items-center w-full h-[50%] text-gray text-[1vw] h-[2.25rem]">
                  {myInfo?.username}
                </div>
              </div>
              <div className="flex items-center w-[80%] h-[20%] m-auto mt-[2.5%] mb-[2.5%]">
                <div className="flex items-center w-[50%] h-full text-[1.25vw] font-nanumgothic font-bold">
                  전화번호
                </div>
                <input
                  className="flex items-center w-full h-[50%] border-solid border-[0.15rem] rounded-[0.375rem] border-[hsla(220,9%,46%,.3)] text-gray pl-[1%] text-[1rem] mb-[1%] mb-[1%] font-bold focus:border-[#0090F9] focus:outline-none focus:text-black"
                  value={phoneNum || ""}
                  onChange={onHandlePhoneNum}
                />
              </div>
              <div className="flex items-center w-[80%] h-[20%] m-auto mt-[2.5%] mb-[2.5%]">
                <div className="flex items-center w-[50%] h-full text-[1.25vw] font-nanumgothic font-bold">
                  이메일
                </div>
                <div className="flex items-center w-full h-[50%] text-gray text-[1vw] h-[2.25rem]">
                  {myInfo?.email}
                </div>
              </div>
              <div className="flex items-center w-[80%] h-[20%] m-auto mt-[2.5%] mb-[2.5%]">
                <div className="flex items-center w-[50%] h-full text-[1.25vw] font-nanumgothic font-bold">
                  Github
                </div>
                <div className="flex items-center w-full h-[50%] text-gray text-[1vw] h-[2.25rem]">
                  {myInfo?.githubId}
                </div>
              </div>
            </div>
            <div className="w-[30%] h-[90%] border-l-[0.5em] border-l-solid border-l-[#2B0086] m-auto relative">
              {/* <div className="MyGetPoint">누적 포인트&nbsp;&nbsp;&nbsp;{myPoint?.totalPoint} pt</div> */}
              <div className="flex items-center justify-center w-[90%] h-[25%] m-auto text-[1.2vw] font-nanumgothic font-bold">
                보유 포인트&nbsp;&nbsp;&nbsp;{myPoint?.currentPoint} pt
              </div>
              <div className="flex absolute bottom-[5%] w-full h-[15%]">
                <div
                  className="flex w-[30%] h-full items-center justify-center mr-[4%] ml-auto rounded-[0.5em] bg-[#F34F50] text-white font-jua font-normal cursor-pointer hover:bg-[#dc3a3a]"
                  onClick={() => onDeleteClick()}
                >
                  회원탈퇴
                </div>
                <div
                  className="flex w-[30%] h-full items-center justify-center rounded-[0.5em] bg-[#6482FF] text-white font-jua font-normal cursor-pointer hover:bg-[#6478FF]"
                  onClick={() => onSave()}
                >
                  저장
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full h-[12.5rem] justify-center items-center m-atuo mt-[3%] shadow-sm shadow-[#dadce0] rounded-[1em]">
            {myInfo ? (
              <GitHubCalendar
                username={(myInfo?.githubId).toLowerCase()}
                showWeekdayLabels
                colorScheme="light"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        {isDeleteModal ? (
          <Reconfirm
            message={"회원 탈퇴하시겠습니까?"}
            cancleButton="취소"
            OkButton="확인"
            onCancel={onCloseModal}
            onCheck={delete_user}
          />
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyProfile;
