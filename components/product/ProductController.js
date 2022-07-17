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
					'pid',
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
			console.log("IDS: ",id)
			const response = await Product.findOne({
                where: {
					pid: id,
				}
            });
			if(response){console.log("THIS IS RESPONSE: ",response);}
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
			const { description } = req.body;
			const { price } = req.body;
			const { imageurl } = req.body;
			const { ShowHide } = req.body;
			console.log(req.body)
			await Product.create({
				pdesc: description,
				pprice: price,
				imageurl,
				pshow: ShowHide,
			})
			successResponse(res, true, "Product Inserted Successfully!");
			next();
		} catch (error) {
			console.log(error.message);
			errorResponse(res, 'Could not perform operation!', 400) && next(error);
		}
},
// This Method Updates a Single Product
async updateProduct(req, res, next){
		try {
			console.log("REQ>BODY",req.body);
			console.log("REQ>PARAMS",req.params);
			const { description } = req.body;
			const { price } = req.body;
			const { imageurl } = req.body;
			const { ShowHide } = req.body;
			const { pid } = req.params;
			await Product.update({
				
				pdesc: description,
				pprice: price,
				imageurl,
				pshow: ShowHide,
			}
				,
				{
					where:{
						pid
					}
				}
			);
			successResponse(res, true, "Product Updated Successfully!");
			next();
		} catch (error) {
			console.log(error.message);
			errorResponse(res, 'Could not perform operation!', 400) && next(error);
		}
},
};