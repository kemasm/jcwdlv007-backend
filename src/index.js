const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jsonParser);
const cors = require("cors");
const { userRoutes, moviesRoutes, actorsRoutes, genreRoutes } = require("./routes");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration


const PORT = 2000;

const products = [
    {
        id: 2,
        productName: "Pisang",
        price: 8000,
        category: "Fruit",
        stock: 100
      },
      {
        id: 3,
        productName: "Pir",
        price: 7000,
        category: "Fruit",
        stock: 100
      },
      {
        id: 7,
        productName: "Pisang 2",
        price: 8000,
        category: "Fruit",
        stock: 100
      },
      {
        id: 8,
        productName: "manggis",
        price: 8000,
        category: "Fruit",
        stock: 100
      },
      {
        productName: "Terong Belanda",
        price: "20000",
        category: "Fruit",
        id: 9
      },
      {
        productName: "Apel yellow",
        price: "20000",
        category: "Fruit",
        id: 10
      }
]

const cart = []
const order = [
]
const { sequelize } = require("./lib/sequelize");
// sequelize.sync({ alter: true });


app.use("/user_accounts", userRoutes)
app.use("/movies", moviesRoutes)
app.use("/actors", actorsRoutes)
app.use("/genres", genreRoutes)

app.use("/post_images", express.static(`${__dirname}/public/post_images`));
// c:/nama_project_be/src/public/post_images/
// localhost:2000/post_images/

//1. frontend 
//2. routes => middleware => controller 
//3. express.static => menampilkan image file dari dalam folder di backend

// localhost:2000/user_accounts/

app.get("/products/", (req,res)=> {
  console.log("masuk")
    let qparam = req.query.productname;
    let limit = req.query._limit;
    let page = req.query._page;


    let listProducts = products;
    if (qparam) { 
        listProducts = listProducts.filter((val,index)=>{
            return val.productName == qparam
        })
    }
    res.send(listProducts);
})

// app.get("/user_accounts", (req,res)=> {
//   let username = req.query.username;
//   let password = req.query.password;

//   console.log(req.query)
//   let listUsers = user_accounts;
//   if (username) { 
//       listProducts = listUsers.filter((val)=>{
//           return val.username == username && val.password == password
//       })
//   }
//   res.send(listUsers);
// })

app.get("/cart", (req,res)=> {
  let userid = req.query.userid;
  let listCart = cart;
  if (qparam) { 
      listProducts = listUsers.filter((val)=>{
          return val.userid == userid
      })
  }
  res.send(listCart);
})

app.post("/products",jsonParser, (req,res)=> {
   const bodyData = req.body;
   console.log(bodyData)
    const { productName, price,category,id, stock} =  req.body;

    
    const data = {
        productName , 
        price,
        category,
        stock,
        id,
    }

    products.push(data)
    
    res.send(data)

})

//front end
//method get,patch,post,delete 
// menentukan layouting 
// menentukan data yang ditampilkan (request). spec data apa saja yang dibutuhkan

//frontend => request data => backend => fetch ke database => backend dalam sebuah tampilan json string => front end
//                       (logic backend) ================   (fetching data dari database)    
// relational database non relational database

//back end
//menjalankan request dari front end
// fetching , posting, delete, updating data 
// database 
// provide request dari si frontend 

//thunder
//postman 
// untuk melakukan testing backend tanpa harus jadi dulu si frontendnya 





//browser = hanya dapat memanggil method get 



app.get("/", (req, res) => {
    res.send("this is express");
  });

app.listen(PORT, () => {
    console.log("server running in port", PORT);
  });
  
