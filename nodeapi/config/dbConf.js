const mongoose = require("mongoose");
const Employee = require('../models/emp-model.js');
mongoose.connect(process.env.BD_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    //Employee.countDocuments.drop();
    Employee.countDocuments((err, count) => {
        if (count == 0) {
            Employee.create([{
                userName: 'milad@jalali.com',
                password: '123456',
                fullName: 'milad jalali',
            }, {
                userName: 'taher@jalali.com',
                password: '123456',
                fullName: 'teher jalali',
            }]).then(emp => {
                console.log(`${emp.length} employees created`);
            }).catch((err) => {
                console.log(err);
            })
            // .finally(() => {
            //     mongoose.connection.close();
            // });
        }
    });
    console.log("connecting to database successfuly has done!");
}).catch(err => {
    console.log("error in conecting to db \n" + err);
});