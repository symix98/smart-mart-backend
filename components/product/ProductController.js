const db = require('../../db/models/index')
const Product = db.products
const {
	successResponse,
	errorResponse,
} = require('../../responseService');
module.exports = {

// This Method Gets All Products	
async getAllProduct(req, res, next){
		try {
			const response = await Product.findAll({
				attributes:[
					'pdesc',
					'pprice',
					'imageurl',
					'pshow',
				],
			});
			res.status(200).send(response);
			// successResponse(res, response);
			// next();
		} catch (error) {
			console.log(error.message);
			errorResponse(res, 'Could not perform operation!', 400) && next(error);
		}
},

// This Method Gets a Single Product With Specific ID
async getSingleProductById(req, res, next){
		try {
			const { id } = req.params;
			const response = await Product.findOne({
                where: {
					id
				}
            });
			res.status(200).send(response);
			// successResponse(res, response);
			// next();
		} catch (error) {
			console.log(error.message);
			errorResponse(res, 'Could not perform operation!', 400) && next(error);
		}
},

// This Method Creates a new Product
async createNewProduct(req, res, next){
		try {
			const { pdesc } = req.params;
			const { pprice } = req.params;
			const { imageurl } = req.params;
			const { pshow } = req.params;
			await Product.create({
				pdesc,
				pprice,
				imageurl,
				pshow
			})
			res.status(200).send(response);
			// successResponse(res, response);
			// next();
		} catch (error) {
			console.log(error.message);
			errorResponse(res, 'Could not perform operation!', 400) && next(error);
		}
},
};