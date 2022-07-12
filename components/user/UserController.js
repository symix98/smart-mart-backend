const db = require('../../db/models/index')
const User = db.users;
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
}
};