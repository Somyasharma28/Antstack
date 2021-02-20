const express= require('express');
const mongoose= require('mongoose');
const cors= require('cors');

const port= 8080;
const app= express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Coupons', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>console.log("Database is running"))
  .catch(err => {
      console.log(err);
});


//Routes
const couponRoutes= require('./routes/couponRoute');

app.use("/coupon",couponRoutes);

app.listen(port,()=>{
    console.log(`Application is listening on ${port}`);
})



