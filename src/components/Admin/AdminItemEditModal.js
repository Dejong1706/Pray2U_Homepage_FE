import { useRef, useState } from "react";
import { deleteFileList, extractS3Key, uploadFile } from "../../util/s3Upload";

const AdminItemEditModal = ({ itemInfo, onCancel, put_ItemInfo }) => {
  const imgRef = useRef();
  const [itemName, setItemName] = useState(itemInfo?.itemName);
  const [itemPoint, setItemPoint] = useState(itemInfo?.point);
  const [itemDescription, setItemDescription] = useState(
    itemInfo?.itemDescription
  );
  const [newItemImg, setNewItemImg] = useState(null);
  const [previewNewItemImg, setPreviewNewItemImg] = useState(null);

  const onChangeItemName = (e) => {
    setItemName(e.target.value);
  };

  const onChangeItemPoint = (e) => {
    setItemPoint(e.target.value);
  };

  const onChangeItemDescription = (e) => {
    setItemDescription(e.target.value);
  };

  const previewImgFile = () => {
    const file = imgRef.current.files[0];
    if (file) {
      setNewItemImg(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewNewItemImg(reader.result);
      };
    }
  };

  const onSave = async () => {
    if (itemName && itemPoint && itemDescription) {
      let postData = {
        imgUrl: itemInfo?.imgUrl,
        itemDescription: itemDescription,
        itemName: itemName,
        point: parseInt(itemPoint),
      };
      if (newItemImg) {
        const newImgUrl = await uploadFile(newItemImg);
        if (newImgUrl) {
          const s3ObjectKey = extractS3Key([itemInfo?.imgUrl]);
          if (s3ObjectKey) {
            await deleteFileList(s3ObjectKey);
            postData.imgUrl = newImgUrl;
            await put_ItemInfo(postData, itemInfo?.itemId);
          } else {
            alert("이미지 경로가 잘못되었습니다.");
          }
        } else {
          alert("이미지 업로드 과정에서 오류가 생겼습니다.");
        }
      } else {
        await put_ItemInfo(postData, itemInfo?.itemId);
      }
      onCancel();
    } else {
      if (!itemName) {
        alert("상품명이 입력되지 않았습니다.");
      } else if (!itemDescription) {
        alert("상품 설명칸이 입력되지 않았습니다.");
      } else if (!itemPoint) {
        alert("상품 포인트가 설정되지 않았습니다.");
      }
    }
  };

  return (
    <div className="flex fixed top-0 right-0 left-0 bottom-0 w-[100vw] h-[100vh] z-99 bg-[rgba(0,0,0,0.6)] items-center">
      <div className="flex justify-center items-center w-[60%] h-[70%] bg-white rounded-[1em] m-auto py-[2%]">
        <div className="flex justify-center items-center w-[40%] h-full flex-col w-[10rem] h-[13rem] font-bold text-md">
          <img
            className="w-[180px] y-[180px] 2xl:w-[280px] 2xl:h-[280px] xl:w-[220px] xl:h-[220px] border-3 border-solid border-[hsla(220,9%,46%,.3)] mb-4"
            src={previewNewItemImg ? previewNewItemImg : itemInfo?.imgUrl}
            alt="ItemImg"
          />
          <form className="flex justify-center">
            <label
              htmlFor="itemImg"
              className="flex items-center justify-center p-[0.25rem] w-[10rem] h-[2.5rem] rounded-[0.375rem] bg-[#6495ED] text-white cursor-pointer hover:bg-[#557DE1]"
            >
              이미지 변경
            </label>
            <input
              type="file"
              id="itemImg"
              accept="image/*"
              style={{ display: "none" }}
              className="w-[2rem] h-[2rem] display: none"
              onChange={previewImgFile}
              ref={imgRef}
            />
          </form>
        </div>
        <div className="w-[60%] pr-16">
          <div className="flex items-center justify-center w-[450px] h-16 font-bold text-md m-auto">
            <div className="flex w-[100px] items-center text-[17px] mr-1">
              상품명
            </div>
            <input
              className="flex w-[75%] h-[70%] items-center justify-center pl-2 text-[1rem] border-2 border-solid border-slate-300 rounded-md focus:border-[#6495ED] focus:outline-none"
              onChange={onChangeItemName}
              value={itemName || ""}
            />
          </div>
          <div className="flex items-center justify-center w-[450px] h-48 font-bold text-md m-auto">
            <div className="flex w-[100px] items-center text-[17px] mr-1">
              상품 설명
            </div>
            <textarea
              className="w-[75%] h-[7rem] border-solid border-[0.15rem] rounded-[0.375rem] border-[hsla(220,9%,46%,.3)] pl-2 text-[1rem] mb-2 resize-none focus:border-[#6495ED] focus:outline-none"
              onChange={onChangeItemDescription}
              value={itemDescription || ""}
            />
          </div>
          <div className="flex items-center justify-center w-[450px] h-16 font-bold text-md m-auto">
            <div className="flex w-[100px] items-center text-[17px] mr-1">
              상품 포인트
            </div>
            <input
              className="flex w-[75%] h-[45%] items-center justify-center pl-2 text-[1rem] border-2 border-solid border-slate-300 rounded-md focus:border-[#6495ED] focus:outline-none"
              onChange={onChangeItemPoint}
              value={itemPoint || ""}
            />
          </div>
          <div className="flex justify-end w-full mt-2">
            <div
              className="flex justify-center items-center w-[70px] h-[30px] mr-2 rounded-[0.5em] bg-[#F34F50] text-white font-bold cursor-pointer hover:bg-[#dc3a3a]"
              onClick={() => onCancel()}
            >
              취소
            </div>
            <div
              className="flex justify-center items-center w-[70px] h-[30px] rounded-[0.5em] bg-[#6495ED] text-white font-bold cursor-pointer hover:bg-[#557DE1]"
              onClick={() => onSave()}
            >
              저장
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminItemEditModal;
