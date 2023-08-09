import  express from 'express';
import mongoose from "mongoose";
import router from './routes/user-routes';
import blogRouter from './routes/blog-routes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog",blogRouter);


const uri="mongodb://rathore:rathore123@ac-fqnsmzd-shard-00-00.tj2dkn4.mongodb.net:27017,ac-fqnsmzd-shard-00-01.tj2dkn4.mongodb.net:27017,ac-fqnsmzd-shard-00-02.tj2dkn4.mongodb.net:27017/?ssl=true&replicaSet=atlas-56pdxb-shard-0&authSource=admin&retryWrites=true&w=majority"
async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Connected to mpngoDB");
    }catch(err) {
        console.log(err);
    }
}
connect();
app.listen(8000,()=>{
    console.log("server statted on port 8000");
});
