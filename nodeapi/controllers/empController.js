const Employee = require('../models/emp-model');
const resModel = require('../models/responseModel');

module.exports.fetchAll = async (req, res) => {
    try {
        clearResponse();
        const employees = await Employee.find();

        resModel.success = true;
        resModel.data = employees;
    } catch (error) {
        resModel.error = error;
        resModel.message = "error in fetching data !";
    }
    res.json(resModel);
};

//@@@@@@@@@@@@@@@@@@@@

module.exports.fetchOne = async (req, res) => {
    try {
        clearResponse();
        const employee = await Employee.findOne({ _id: req.params.id });
        if (employee) {
            resModel.data = employee;
            resModel.success = true;
        } else {
            resModel.message = "item not found!";
        }
    } catch (error) {
        resModel.error = error;
        resModel.message = "error in fetching data !";
    }
    res.json(resModel);
};
//@@@@@@@@@@@@@@@@@@@@

module.exports.add = async (req, res) => {
    try {
        clearResponse();
        const employee = new Employee({
            userName: req.body.userName,
            password: req.body.password,
            fullName: req.body.fullName
        });
        await employee.save();

        resModel.data = employee;
        resModel.success = true;
        resModel.message = "item added successfuly !";
    } catch (error) {
        resModel.error = error;
        resModel.message = "error in adding !";
    }
    res.json(resModel);
};
//@@@@@@@@@@@@@@@@@@@@

module.exports.update = async (req, res) => {
    try {
        clearResponse();
        const id = req.body._id;
        if (id) {
            const employee = await Employee.findOne({ _id: id });
            if (employee) {
                if (req.body.userName) employee.userName = req.body.userName;
                if (req.body.password) employee.password = req.body.password;
                if (req.body.fullName) employee.fullName = req.body.fullName;

                await employee.save()

                resModel.data = employee;
                resModel.success = true;
                resModel.message = "update has done successfuly !";
            } else {
                resModel.message = "item not found to update!";
            }
        }
    } catch (error) {
        resModel.error = error;
        resModel.message = "error in updating !";
    }
    res.json(resModel);
};
//@@@@@@@@@@@@@@@@@@@@

module.exports.delete = async (req, res) => {
    try {
        clearResponse();
        const employee = await Employee.findOne({ _id: req.params.id });
        if (employee) {
            await Employee.deleteOne({ _id: req.params.id }, err => {
                if (err) {
                    resModel.error = error;
                    resModel.message = "error in deliting data! ";
                } else {
                    resModel.success = true;
                    resModel.message = "item deleted successfuly ! ";
                    resModel.data = employee;
                }
            });
        } else {
            resModel.message = "item not found to delete!";
        }
    } catch (error) {
        resModel.error = error;
        resModel.message = "error in deleting !";
    }
    res.json(resModel);

};
//@@@@@@@@@@@@@@@@@@@@

clearResponse = () => {
    resModel.success = false;
    resModel.error = null;
    resModel.message = null;
    resModel.data = null;
}