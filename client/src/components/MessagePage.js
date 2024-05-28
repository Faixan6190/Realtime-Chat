import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import uploadFile from "../helpers/uploadFile";

const MessagePage = () => {
  const params = useParams();
  const socketConnection = useSelector((state) => state?.user?.socketConnection);
  const user = useSelector((state) => state?.user);
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });

  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload((preve) => !preve);
  };
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
  };
  const handleUploadVideo = () => {};

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);
      socketConnection.on("message-user", (data) => {
        setDataUser(data);
      });
    }
  }, [socketConnection, params?.userId, user]);

  return (
    <div>
      <header className="sticky top-0 h-16 bg-white flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <Link to={"/"} className="lg:hidden">
            <FaAngleLeft size={25} />
          </Link>
          <div>
            <Avatar width={50} height={50} imageUrl={dataUser?.profile_pic} name={dataUser?.name} userId={dataUser?._id} />
          </div>
          <div>
            <h3 className="font-semibold text-lg my-0 text-ellipsis line-clamp-1">{dataUser?.name}</h3>
            <p className="-my-2 text-sm">
              {dataUser.online ? <span className="text-primary">online</span> : <span className="text-slate-400">offline</span>}
            </p>
          </div>
        </div>
        <div>
          <button className="cursor-pointer hover:text-primary">
            <HiDotsVertical />
          </button>
        </div>
      </header>
      {/* show all message */}
      <section className="h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar">show all message</section>
      {/* send message */}
      <section className="h-16 bg-white flex items-center px-4">
        <div className="relative">
          <button
            onClick={handleUploadImageVideoOpen}
            className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white"
          >
            <FaPlus size={20} />
          </button>
          {/* video and image */}
          {openImageVideoUpload && (
            <div className="bg-white shadow rounded absolute bottom-14 w-36 p-2">
              <form>
                <label htmlFor="uploadImage" className="flex items-center p-2 gap-3 hover:bg-slate-200 px-3 cursor-pointer">
                  <div className="text-primary">
                    <FaImage size={18} />
                  </div>
                  <p>image</p>
                </label>
                <label htmlFor="uploadVideo" className="flex items-center p-2 gap-3  hover:bg-slate-200 px-3 cursor-pointer">
                  <div className="text-purple-500">
                    <FaVideo size={18} />
                  </div>
                  <p>video</p>
                </label>
                <input type="file" id="uploadImage" onChange={handleUploadImage} />
                <input type="file" id="uploadVideo" onChange={handleUploadVideo} />
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MessagePage;
