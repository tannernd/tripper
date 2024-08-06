import React, {useState} from "react";
import { FileUploader } from "react-drag-drop-files";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILE, SAVE_USER_INFO } from "../utils/mutations";

const fileTypes = ["JPG", "PNG", "GIF"];

function Upload(props) {
  const {userId} = props;
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [saveUserInfo] = useMutation(SAVE_USER_INFO);
  const [userImg, setUserImg] = useState();
  const handleChange = async (e) => {
    
    try {
      e.preventDefault();

      const { data:uploadData } = uploadFile({
        variables: {
          file: userImg,
          userId:userId
        }
      });
      const fileExt = userImg.name.substr(userImg.name.length - 3); 
      const { data:userData } = saveUserInfo({
        variables:{
          userId:userId,
          avatarImg:`${userId}.${fileExt}`
        }
      })

    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <>
    <input id="upload-image" onChange={(e)=>setUserImg(e.target.files[0])} type="file"/>
    <button onClick={handleChange}>Upload Image</button>
    </>
  );
}

export default Upload;