// const express = require('express');
// const router = express.Router();
module.exports= function(app){
	app.get("/",(req,res)=>{
		return res.json({message:"it is not common route !!!"});
	});
};	
// module.exports=router;