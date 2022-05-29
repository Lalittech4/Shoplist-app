const express = require('express');
require('./db/config');
const cors = require('cors')
const Shoplist = require('./db/Shoplist');
// const Products = require('./db/Product')
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 7000;

// ---------------------TO ADD SHOP IN THE LIST-------------------->>>>>>>>>>>>>>>>
app.post('/addshoplist', async (req, resp) => {
    let result = new Shoplist(req.body);
    let data = await result.save();
    resp.send(data);

});

// ---------------TO GET THE DATA FROM THE SHOP LIST--------------------->>>>>>>>>>>>.
app.get('/addshoplist', async (req, resp) => {
    let result = await Shoplist.find();
    resp.send(result);
});

// -----------------------TO DELETE ANY ONE SHOP FROM THE LIST-------->>>>>>>>>
app.delete("/addshoplist/:id", async (req, resp) => {
    let result = await Shoplist.deleteOne({ _id: req.params.id });
    resp.send(result);
});

// ----------------TO ENABLE THE SEACH KEY---------------->>>>>>>>>>>>>>>>>>
app.get("/search/:key",async(req,resp)=>{
    let result =await Shoplist.find({
        $or:[

            {shopname:{$regex:req.params.key}},
            {area:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {openingday:{$regex:req.params.key}},
            {closingday:{$regex:req.params.key}},
        ]
    })
    resp.send(result);
})

// ---------------this is for the prefill of the form----------------------///
app.get("/addshoplist/:id", async (req, resp) => {
    let result = await Shoplist.findOne({ _id: req.params.id });
    if (result) {

        resp.send(result);
    } else {
        resp.send({ result: "no record found" });
    }
});

app.put("/addshoplist/:id", async (req, resp) => {
    let result = await Shoplist.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(result);
});



app.listen(port, () => {
    console.log(`the port using is${port}`)
})