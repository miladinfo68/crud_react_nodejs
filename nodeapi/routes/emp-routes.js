// const express = require('express');
// const router = express.Router();
// const empController=require("../controllers/emp-controller.js");
// const empController=require("../controllers/emp-controller-mock.js");

const empController=require("../controllers/empController.js");
module.exports=function(app){

	app.get("/",empController.fetchAll);
	app.get("/api",empController.fetchAll);
	app.get("/api/all",empController.fetchAll);

	app.get("/api/:id",empController.fetchOne);

	app.post("/api/add",empController.add);

	app.put("/api/update",empController.update);

	app.delete("/api/delete/:id",empController.delete);
};
// module.exports=router;