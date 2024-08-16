import mongoose from "mongoose";

// arrow function
const dbConnect =(url)=>{
    return mongoose.connect(url);
}

// noraml function
//  function dbConnect(url){
//     return mongoose.connect(url);
// }

export default dbConnect;