import axios from "axios";
export const getAllLeaves = async (token) => {
  try {
    const req = await axios.get("https://hr-manger.onrender.com/api/leave/all-leaves", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return req.data.formattedLeaves;
  } catch (error) {
    console.error("Error fetching leaves:", error);
    throw new Error("Error fetching leaves");
  }
};
