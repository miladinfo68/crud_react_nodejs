// var Schema = new Schema({properties}, { versionKey: false });
// var Schema = new Schema({ __v: { type: Number, select: false}})

const mongoose = require("mongoose");
const empSchema = mongoose.Schema({
    'userName': String,
    'password': String,
    'fullName': String,
    __v: { type: Number, select: false }
});
module.exports = mongoose.model("Employee", empSchema);




// make auto-increament id column

// var EmployeeSchema = Schema({
//     _id: {type: String, required: true},
//     seq: { type: Number, default: 0 },
//     userName:{type:String } ,
//     email:{type:String }
//     
// });
// var employee = mongoose.model('employee', EmployeeSchema);
// 
// var entitySchema = mongoose.Schema({
//     testvalue: {type: String}
// });
// 
// entitySchema.pre('save', next=> {
//     var doc = this;
//     employee.findByIdAndUpdate({_id:'entityId'},{$inc:{seq:1}},(error,counter)=>{
//         if(error)  return next(error);
//         doc.testvalue = counter.seq;
//         next();
//     });
// });