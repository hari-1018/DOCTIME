// const express = require('express');
// require('dotenv').config();
// const app = require('./app');
// // const connectDB = require('./config/dbconnect');



// // connectDB();

// // const PORT = process.env.PORT || 8001;
// const PORT = 6000;
// app.get('/',(req,res)=>{
//     res.send('Hello, World!');
// });

// app.listen(PORT, ()=>{
//     console.log(`Server is running on http://localhost:${PORT}`)
// });

const express = require('express');
const app = express();
const PORT = 5555;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
