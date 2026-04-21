import * as AuthAdapter from "../adapters/authAdapter.js";

export const registerStudent = async (studentProfile) => {
    if(studentProfile.firstName === ''){
        throw new Error("First name is required");
    }

    return await AuthAdapter.create(studentProfile);
}