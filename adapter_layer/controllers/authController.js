import * as AuthService from "../services/authService.js";
export const registerStudent = async (req, res) => {
    const {firstName, lastName, dob, course, major, address, status} = req.body;
    try{
        const studentProfile = {
            firstName, lastName, dob, course, major, address, status
        }
        const result = await AuthService.registerStudent(studentProfile);
        res.status(201).json({
            success: true,
            message: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while registering the student.",
        });
    }
}


export const getStudentsInfo = async (req, res) => {
  try {
    const students = await AuthService.getStudents();

    // const studentIds = students.map(student => student._id);

    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "An error occurred while fetching students.",
    });
  }
};