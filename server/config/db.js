const mongoose = require('mongoose');


const connectDb = async ()=>{
    // console.log(process.env.MPNGO_URI);
    const conn = await mongoose.connect(process.env.MPNGO_URI,{});
    console.log(`mongo conected ${conn.connection.host}`)
}


module.exports = connectDb; 