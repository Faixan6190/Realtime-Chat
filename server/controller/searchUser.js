import UserModel from "../models/UserModel.js";

const searchUser = async (request, response) => {
  try {
    const { search } = request.body;
    const query = new RegExp(search, "ig");
    const user = await UserModel.find({
      $or: [{ name: query }, { email: query }],
    }).select("-password");
    return response.json({
      message: "all user",
      data: user,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
  else
  
};

export default searchUser;
