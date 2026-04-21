import express from "express";
import 'dotenv/config.js';

import authRoutes from "./routes/authRoute.js";


const app = express();


//middlefuckingwear
app.use(express.json());



app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
})  


app
try{
app.listen(process.env.PORT || 4000, () => {
    console.log(`Listening to port ${process.env.PORT || 4000}...`);
});
}catch(e){
    console.log(e);
}


app.use('/auth', authRoutes);

/*try{
app.listen(port, () => {
    console.log(`listening to port 3000...`);
});
}catch(e){
    console.log(e);
}

app.get('/david', async (request, response) => {
    response.status(200).json({messgae: "Hello! I'm David Emanuel Haboc"})
});*/