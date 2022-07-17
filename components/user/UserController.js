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
          'username',
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

async getSingleUserByUsername(req, res, next){
		try {
      const { username } = req.params;
      console.log(username)
			const response = await User.findOne({
        where: {
          username,
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

async login(req, res, next){
  try{
    const { username } = req.body;
    const { password } = req.body;
    const response = await User.findOne({
      where:{
        username,
      }
    });
    if(response){
      if(response.password == password){
      successResponse(res, response.level, "User Logged In Successfully!");
			next();
      }
    }
    res.status(404).send(response);
  }
  catch(error){
    console.log(error);
  }
},
async editUser(req, res, next){
  try {
    const { username, password, level } = req.body;
    console.log(username,password,level)
    const response = await User.update(
      {
      password,
      level,
      },
      {
        where:{
          username
        }
      }
    );
    if(response){
      successResponse(res, response, "User Logged In Successfully!");
			next();
    }
    else{
      errorResponse(res, 'Could not perform operation!', 400) && next(error);
    }
  } catch (error) {
    errorResponse(res, 'Something went wrong, please try again!', 400) && next(error);
  }
},
async createNewUser(req, res, next){
  try{
    const { username } = req.body;
    const { password } = req.body;
    const { level } = req.body;
    await User.create({username, password, level});
    successResponse(res, true, "User Inserted Successfully!");
		next();
  }
  catch(error){
    console.log(error);
  }
}
};