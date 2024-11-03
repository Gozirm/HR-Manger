import USER from "../modals/userModals.js";
import Task from "../modals/taskModal.js";

export const totalLenghtOfUsers = async (req, res) => {
  try {
    const user = await USER.find();
    const task = await Task.find();
    const totalLeaves = 3;
    const totalUsers = user.length
    const totalTasks = task.length
    res
      .status(200)
      .json({
        success: true,
        detailsForLeave: totalLeaves,
        detialsForUser: totalUsers,
        detialsForTask: totalTasks,
        message: `total user is ${totalUsers}, total Task is ${totalTasks}, and total Leaves are ${totalLeaves}`
        
      });
  } catch (error) {
    res.status(404).json({ error });
  }
  // };

  // export const totalLenghtOfTask = async (req, res) => {
  //   try {
  //     const task = await Task.find()
  //     res.status(200).json({ success: true, message: `total task is ${task.lenght}` });
  //   } catch (error) {
  //     res.status(404).json({errMsg})

  //   }
  // };

  // export const totalLenghtOfLeaves = async (req, res) => {
  //   try {
  //     const totalLeaves = 3;
  //     res.status(200).json({ success: true, message: `Total Leaves is ${totalLeaves}` });
  //   } catch (error) {
  //     res.status(404).json({errMsg})
  //   }
};
