import * as UserModel from "../models/UserModel.js";

export const register = async (req, res, next) =>{
    const {firstname,
        lastname,
        dob,
        address,
        course,
        major,
        status,
        email,
        password,} = req.body;

    try{
        const userProfile = {firstname, lastname, dob, address, course, major, status};
    const user = await UserModel.createUser(userProfile,email, password, conn);
    res.status(201).json({success:true, message:user});
    }catch(err){
        console.log(err);
        res.status(400).json({succes:false, message:err})
    }

}

export const login = async (req, res) =>{
    const {email, password} = req.body;

    try{
    const token = await UserModel.login(email, password);
    res.status(200).json({success:true, message:[{result: "Login successful!"},token]
    });
    }catch(err){
        console.log(err);
        res.status(400).json({succes:false, message:err})
    }



}