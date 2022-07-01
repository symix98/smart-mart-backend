const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
app.use(cors());
app.use(bodyparser.json());

//database connection settings

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smartmart',
  port: 3306,
});

//check db connection

db.connect(error=>{
  if(error){console.log(error,"database error");}
  console.log("Database Connected...")
});


//METHODS

//get all products
app.get('/products', (req,res)=>{
  let qr = `select * from product`;
  db.query(qr,(err,result)=>
  {
    if(err)
    {
      console.log(err,'error in get products method');
    }
    if(result.length > 0)
    {
      res.send({
      message: 'all products data',
      data: result
    });
  }
  });
});



//get product with specific id
app.get('/products/:id', (req,res)=>{
  let pID = req.params.id;
  let qr = `select * from product where id = ${pID}`;
  db.query(qr,(err,result)=>
  {
    if(err)
    {
      console.log(err,'error in get products method');
    }
    if(result.length > 0)
    {
      res.send({
      message: 'get single product data',
      data: result
    });
  }
  else
  {
    res.send({
      message: 'data not found'
    });
  }
  });
});




// insert product method
app.post('/products', (req,res)=>{
  console.log(req.body, 'create data');

  let name = req.body.name;
  let description = req.body.description;
  let price = req.body.price;
  let countinstock = req.body.countinstock;
  let imageurl = req.body.imageurl;

  let qr = `insert into product(name,description,price,countinstock,imageurl)
  values('${name}','${description}','${price}','${countinstock}','${imageurl}')`;


db.query(qr, (error,result)=>{
  if(error)
  {
    console.log(error);
  }
    res.send({
      message: 'New Product Inserted successfully!'
    });
});
});







// update product with specific id method
app.put('/products/:id', (req,res)=>{
  console.log(req.body, 'update data');
  let pID = req.params.id;

  let name = req.body.name;
  let description = req.body.description;
  let price = req.body.price;
  let countinstock = req.body.countinstock;
  let imageurl = req.body.imageurl;

  let qr = `update product set name = '${name}', description = '${description}', price = '${price}', countinstock = '${countinstock}', imageurl = '${imageurl}' where id = ${pID}`;


db.query(qr, (error,result)=>{
  if(error)
  {
    console.log(error);
  }
    res.send({
      message: 'Product Updated successfully!'
    });
});
});


app.delete('/products/:id',(req,res)=>{
  let pID = req.params.id;

  let qr = `delete from product where id = ${pID}`;
  db.query(qr,(error,result)=>{
    if(error){console.log(error,"Error Delete MEthod");}
    res.send({
      message: 'Product Deleted Successfully!'
    })
  })
})


app.listen(3000, ()=>{
    console.log(`Server is running on port 3000`);
})