import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";

const registerUser = async (request, response) => {
  try {
    const { name, email, password, profile_pic } = request.body;
    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      return response.status(400).json({
        message: "Already User Exists!",
        error: true,
      });
    }
    // password into hashpassword
    const salt = await bcryptjs.genSalt(10);
    console.log("salt", salt);
    const hashpassword = await bcryptjs.hash(password, salt);
    console.log("hashpassword", hashpassword);
    const payload = {
      name,
      email,
      profile_pic,
      password: hashpassword,
    };
    const user = new UserModel(payload);
    const userSave = await user.save();
    return response.status(201).json({
      message: "User Created Successfully",
      data: userSave,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export default registerUser;
