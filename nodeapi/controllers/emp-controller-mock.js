
let employees=require("../config/mockdata.js");
module.exports.fetchAll=(req,res)=>{	
	return res.json({data:employees});
};

module.exports.fetchOne=(req,res)=>{
	let id=req.params.id;
	console.log(id);
	let emp=employees.find(x=>x.id==id);
	return res.json({data:emp});
};

module.exports.add=(req,res)=>{
	let emp;
	if(req.body){
		emp=employees.find(x=>{ return x.email == req.body.email});		
		//dont add to aray if emp already is exist
		if(!emp) {
			let empToAdd={
				id:employees.sort((a,b)=>{return (a.id - b.id)})[employees.length - 1].id + 1 ,
				firstName:req.body.firstName,
				lastName:req.body.lastName,
				email:req.body.email,
				married:req.body.married
			};
			// console.log(empToAdd);
			employees.push(empToAdd);	
		}			
	}
	return res.json({data:employees});
};

module.exports.update=(req,res)=>{
	let emp;
	if(req.body){
		emp=employees.find(x=>{ return x.id == req.body.id});		
		//dont add to aray if emp already is exist
		if(emp) {
			emp.firstName=req.body.firstName;
			emp.lastName=req.body.lastName;
			emp.email=req.body.email;
			emp.married=req.body.married === 'true' ? true : false;
		}			
	}
	return res.json({data:employees});
};

module.exports.delete=(req,res)=>{
	let id=req.params.id;
	if(id)
		employees=employees.filter(x=>{return  x.id != id});

	return res.json({data:employees});
};