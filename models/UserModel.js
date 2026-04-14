import pool from './db.js'
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";


export const getUser = async (id) =>{
    if(parseInt(id) === NaN){
        throw new Error('Invalid id');
    }

    const [user] = await pool.query('SELECT * FROM tbluser WHERE id = ? ', [id]);
    return user;
}



export const createUser = async (userProfile, email, password, conn) => {
    //if empty
    if (email.trim() === '' || password.trim() === ''){
        throw new Error('Invalid email');
    }

    //invalid format
    if (!validator.isEmail(email,)){
        throw new Error('Invalid email format');
    }

    // if existing
    const user = await pool.query(
        'SELECT * From tbluser WHERE email = ?',
        [email]
    )

    if(user.length === 1){
    const error  = new Error (`The email ${email} is already used.`)
    error.statusCode = 400;
    throw error;
    }

    //if password is empty
    if(password === ''){
        throw new Error('Invalid Password');
    }
    //if weak password
    if(!validator.isStrongPassword(password)){
        throw new Error('Password too weak.');
    }

    const salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(password, salt);

    //on this side it send to authentication system into ais

    const response = await fetch(
        'https://ais-simulated-legacy-.onrender.com/api/students', 
        {
        method: "POST",
    headers: {
        'Content-Type'  : 'application/json'
    },
    body:JSON.stringify(userProfile)
});    

   const result = await response.json();

    
    const newUser = await pool.query(
        'INSERT INTO tbluser(email, password) VALUES(?,?)',
        [email, newPassword]
    )

        return newUser.insertId;
    
}

export const login = async (email,password) =>{
    if(email === '' || password === ''){
        throw new Error('Email and Password is required');
    }

    const [user] = await pool.query("SELECT * FROM tbluser WHERE email = ?", [email]);
    if(user.length === 0){
        throw new Error(`An account with email: ${email} does not exist.`);
    }

    console.log(user)

    if(!bcrypt.compareSync(password, user[0].password)){

        throw new Error('Incorrect password');
}
    //generate token
    const token = jwt.sign({id: user[0].id}, process.env.SECRET, {expiresIn: '1d'})

    return token;
}