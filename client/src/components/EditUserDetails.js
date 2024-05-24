import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import uploadFile from "../helpers/uploadFile";
import Divider from "./Divider";

const EditUserDetails = ({ onClose, user }) => {
  const [data, setData] = useState({
    name: user?.user,
    profile_pic: user?.profile_pic,
  });
  useEffect(() => {
    setData((preve) => {
      return {
        ...preve,
        ...user,
      };
    });
  }, [user]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    // console.log("uploadPhoto", uploadPhoto);
    setData((preve) => {
      return {
        ...preve,
        profile_pic: uploadPhoto?.url,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-4 py-6 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit user details</p>
        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onClick={handleOnChange}
              className="w-full px-2 py-1 focus:outline-primary border"
            />
          </div>
          <div>
            <label htmlFor="profile_pic">Photo</label>
            <div className="my-1 flex items-center gap-4">
              <Avatar width={40} height={40} imageUrl={data?.profile_pic} name={data?.name} />
              <button className="font-semibold ">Change Photo</button>
              <input type="fle" className="hidden" onChange={handleUploadPhoto} />
            </div>
          </div>
          <Divider />
          <div className="flex gap-2 w-fit ml-auto mt-3">
            <button className="border-primary border px-4 py-1 text-primary rounded">Cancel</button>
            <button className="border-primary border px-4 py-1 bg-primary text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(EditUserDetails);
