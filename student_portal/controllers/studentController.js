import * as studentModel from '../models/studentModel.js'

export const getStudentsInfoById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await studentModel.getStudentsProfileById();

    const students = response?.data || [];

    const student = students.find(
      (s) => s._id.toString() === id
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: student,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching students.",
    });
  }
};