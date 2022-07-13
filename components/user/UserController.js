const db = require('../../db/models/index')
const User = db.users;
var bcrypt = require('bcryptjs');
const {
	successResponse,
	errorResponse,
} = require('../../responseService');
module.exports = {

async getAllUsers(req, res, next){
		try {
			const response = await User.findAll({
        attributes: [
          'email',
          'password',
          'role',
        ],
      });
      res.status(200).send(response);
			// successResponse(res, response);
			// next();
		} catch (error) {
			console.log(error.message);
			// res.sendStatus(500) && next(error)
			errorResponse(res, 'Could not perform operation!', 400) && next(error);
		}
},

async getSingleUserById(req, res, next){
		try {
      const { id } = req.params;
			const response = await User.findOne({
        where: {
          id,
        }
      });
      res.status(200).send(response);
			// successResponse(res, response);
			// next();
		} catch (error) {
			console.log(error.message);
			// res.sendStatus(500) && next(error)
			errorResponse(res, 'Could not perform operation!', 400) && next(error);
		}
},

async registerNewUser(req, res, next){
  try{
    const { email } = req.body;
    const { password } = req.body;
    const { role } = req.body;
    console.log("REQ>BODY",req.body);
    console.log(email);
    console.log(password);
    console.log(role);
    let insertedPassword = password;
    const salt = await bcrypt.genSalt(10);

    await bcrypt.hash(password , salt).then(hashedPassword => {
        if(hashedPassword) {
          console.log('hashed password' , hashedPassword);
          insertedPassword = hashedPassword;
        }
    });

    await User.create({username: email, password: insertedPassword, level: role});
    successResponse(res, true, "User Inserted Successfully!");
			next();
  }
  catch(error){
    console.log(error);
  }
},
};