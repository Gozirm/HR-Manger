import DEPARTMENT from "../modals/departmentModal.js";
import USER from "../modals/userModals.js"; // Ensure this is the correct path to your user model

// Create Department
export const createDepartment = async (req, res) => {
  const { name, managerFirstName, managerLastName } = req.body; // Expecting manager's first and last name

  // Validate input
  if (!name || !managerFirstName || !managerLastName) {
    return res
      .status(400)
      .json({ success: false, errMsg: "All fields are required" });
  }

  try {
    // Find the manager by first and last name
    const manager = await USER.findOne({
      firstName: managerFirstName,
      lastName: managerLastName,
    });

    // Check if the manager exists
    if (!manager) {
      return res
        .status(404)
        .json({ success: false, errMsg: "Manager not found" });
    }

    // Create the department with the manager's ObjectId
    const department = await DEPARTMENT.create({ name, manager: manager._id });

    // Optionally, you can populate the manager's name in the response
    const populatedDepartment = await DEPARTMENT.findById(
      department._id
    ).populate("manager", "firstName lastName"); // Populate manager's first and last name

    res.status(201).json({
      success: true,
      message: "Department created",
      department: populatedDepartment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const role = "admin";
    const user = await USER.aggregate([
      { $match: { role } },
      {
        $addFields: {
          fullName: { $concat: ["$firstName", " ", "$lastName"] },
        },
      },
      { $project: { _id: 0, fullName: 1, role: 1 } },
    ]);
    if (!user || user.length === 0) {
      res.status(404).json({ success: false, errMsg: "Role Not found" });
    }
    const count = user.length;
    res.status(200).json({ success: true, user, count });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const departments = await DEPARTMENT.find({})
      .populate("manager", "firstName lastName profileImage")
      .populate("members", "firstName lastName profileImage jobTitle")
      .sort({ createdAt: -1 });

    // If no departments are found
    if (!departments || departments.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No departments found." });
    }

    const formattedDepartments = departments.map((department) => ({
      _id: department._id,
      name: department.name,
      membersLenght: department.members.length,
      manager: department.manager
        ? {
            _id: department.manager._id,
            fullName: `${department.manager.firstName} ${department.manager.lastName}`,
            profileImage: department.manager.profileImage,
          }
        : null,
      members: department.members.map((member) => ({
        _id: member._id,
        fullName: `${member.firstName} ${member.lastName}`,
        profileImage: member.profileImage,
        jobTitle: member.jobTitle,
      })),
    }));

    res.status(200).json({ success: true, departments: formattedDepartments });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching departments" });
  }
};

// export const getTotalCountsOfAdmins = async (req, res) => {
//   try {
//     const departments = await DEPARTMENT.find({})
//       .populate("manager", "firstName lastName profileImage")
//       .populate("members", "firstName lastName profileImage jobTitle")
//       .sort({ createdAt: -1 });

//     // If no departments are found
//     if (!departments || departments.length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No departments found." });
//     }

//     const formattedDepartments = departments.map((department) => ({
//       _id: department._id,
//       name: department.name,
//       membersLength: department.members.length + 1, // Get the length of members
//     }));

//     res.status(200).json({ success: true, departments: formattedDepartments });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ success: false, message: "Error fetching departments" });
//   }
// };

export const getTotalCountsOfAdmins = async (req, res) => {
  try {
    const departments = await DEPARTMENT.find({})
      .populate("manager", "firstName lastName profileImage")
      .populate("members", "firstName lastName profileImage jobTitle")
      .sort({ createdAt: -1 });

    // If no departments are found
    if (!departments || departments.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No departments found." });
    }

    // Create an object to hold the departments
    const formattedDepartments = {};

    departments.forEach((department) => {
      formattedDepartments[department.name] = {
        _id: department._id,
        membersLength: department.members.length, // Get the length of members
        manager: department.manager
          ? {
              _id: department.manager._id,
              fullName: `${department.manager.firstName} ${department.manager.lastName}`,
              profileImage: department.manager.profileImage,
            }
          : null,
      };
    });

    res.status(200).json({ success: true, departments: formattedDepartments });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching departments" });
  }
};

// single dept
export const getSingleDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await DEPARTMENT.findById(id)
      .populate({
        path: "members",
        select: "firstName lastName profileImage jobTitle employmentStatus",
      })
      .populate({
        path: "manager",
        select: "firstName lastName profileImage jobTitle employmentStatus",
      });

    // If the department is not found
    if (!department) {
      return res
        .status(404)
        .json({ success: false, errMsg: "Department not found." });
    }

    // Create a member array with the manager included
    const membersWithDetails = department.members.map((member) => ({
      fullName: `${member.firstName} ${member.lastName}`,
      profileImage: member.profileImage,
      jobTitle: member.jobTitle,
      status: member.employmentStatus,
    }));

    // Add the manager details to the members array
    if (department.manager) {
      membersWithDetails.push({
        fullName: `${department.manager.firstName} ${department.manager.lastName}`,
        profileImage: department.manager.profileImage,
        jobTitle: department.manager.jobTitle,
        status: department.manager.employmentStatus,
      });
    }

    // Return the department with member details
    res.status(200).json({
      success: true,
      department: {
        ...department.toObject(),
        members: membersWithDetails,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, errMsg: "Server error." });
  }
};
