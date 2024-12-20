import Task from "../modals/taskModal.js";
import USER from "../modals/userModals.js";
import { sendTaskMail } from "../emails/emailHandlers.js";
// create a task
export const createTask = async (req, res) => {
    const { title, description, assignedMembers, startDate, endDate, status } = req.body;
  
    try {
      if (!title || !description || !assignedMembers || !startDate || !endDate || !status) {
        return res.status(400).json({ success: false, errMsg: "All fields are required" });
      }
  
      const task = await Task.create({
        title,
        description,
        assignedMembers,
        startDate,
        endDate,
        status,
      });
  
      const members = await USER.find({ _id: { $in: assignedMembers } });
      
  
      const clientUrl = process.env.CLIENT_URL;
  
      members.forEach((member) => {
        sendTaskMail({
          to: member.email,
          firstName: member.firstName,
          taskTitle: title, 
          taskDescription: description,  
          startDate, 
          endDate,
          assignedMembers: members,
          clientUrl, 
        });
      });
  
      res.status(201).json({
        success: true,
        message: "Task created successfully and emails sent to assigned members.",
        task,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, errMsg: "Server error." });
    }
  };

  // Get all tasks with specified details
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedMembers", "firstName lastName profileImage _id")
      .sort({ createdAt: -1 });
    const tasksWithDetails = tasks.map((task) => {
      return {
        title: task.title,
        assignedMembers: task.assignedMembers,
        startDate: task.startDate,
        endDate: task.endDate,
        status: task.status,
        _id:task._id,
        description:task.description
      };
    });

    res.status(200).json({
      success: true,
      tasks: tasksWithDetails,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, errMsg: "Server error." });
  }
};

// get total of status

export const getTotalStatusCounts = async (req, res) => {
  try {
    // Use aggregation to count tasks by status
    const counts = await Task.aggregate([
      {
        $group: {
          _id: "$status", 
          count: { $sum: 1 }, 
        },
      },
    ]);

    // Prepare the response object with default values
    const statusCounts = {
      planned: 0,
      completed: 0,
      "in-progress": 0,
      total: 0,
    };

    // Populate the counts into the response object
    counts.forEach((item) => {
      if (statusCounts[item._id] !== undefined) {
        statusCounts[item._id] = item.count;
      }
    });

        statusCounts.total = statusCounts.planned + statusCounts.completed + statusCounts["in-progress"];


    // Send the response
    res.status(200).json({
      success: true,
      statusCounts,
    });
  } catch (error) {
    console.error("Error fetching status counts:", error);
    res.status(500).json({ success: false, errMsg: "Server error." });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, errMsg: "Task not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, errMsg: "Server error." });
  }
};

// Get a task
export const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id).populate(
      "assignedMembers",
      "firstName lastName profileImage _id"
    );

    if (!task) {
      return res
        .status(404)
        .json({ success: false, errMsg: "Task not found." });
    }

    const taskDetails = {
      task:task._id,
      title: task.title,
      assignedMembers: task.assignedMembers,
      startDate: task.startDate,
      endDate: task.endDate,
      status: task.status,
    };

    res.status(200).json({
      success: true,
      task: taskDetails,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, errMsg: "Server error." });
  }
};

// Edit a task
export const editTask = async (req, res) => {
  const { id } = req.params; // Extract the task ID from the request parameters
  const { title, description, assignedMembers, startDate, endDate, status } =
    req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res
        .status(404)
        .json({ success: false, errMsg: "Task not found." });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, errMsg: "Server error." });
  }
};

// employee's assigned task
export const getAssignedTasks = async (req, res) => {
  const { userId } = req.user; 

  try {
    const tasks = await Task.find({ assignedMembers: userId })
      .populate('assignedMembers', 'firstName lastName email profileImage') 
      .select('title assignedMembers startDate endDate status description'); 

    if (tasks.length === 0) {
      return res.status(404).json({ success: false, errMsg: "No task(s) for you yet." });
    }

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, errMsg: "Server error." });
  }
};
// employee's get a single task
export const getSingleTask = async (req, res) => {
  const { taskId } = req.params; 

  try {
    const task = await Task.findById(taskId)
      .populate('assignedMembers', 'firstName lastName profileImage')

    if (!task) {
      return res.status(404).json({ success: false, errMsg: "Task not found" });
    }

    const responseTask = {
      title: task.title,
      description: task.description,
      assignedMembers: task.assignedMembers.map(member => ({
        id: member._id,
        fullName: `${member.firstName} ${member.lastName}`,
        profileImage: member.profileImage,
      })),
      startDate: task.startDate,
      endDate: task.endDate,
      status: task.status,
    };

    res.status(200).json({ success: true, task: responseTask });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};