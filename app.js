require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mongoose = require("mongoose");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// mongoose
mongoose.connect(`mongodb+srv://uditkaushik:${process.env.MONGO_ADMIN_PASS}@cluster0.kxx2n.mongodb.net/?retryWrites=true&w=majority/itemsDB`, { useNewUrlParser: true, useUnifiedTopology: true });

// items schema
const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  }
})

// mongoose model
const Item = mongoose.model("Item", itemSchema);




app.get("/", function (req, res) {
  Item.find({}, (err, foundItems) => {
    if (!err) {
      res.render("list", {
        newListItems: foundItems
      })
    }
  })
});

app.post("/", function (req, res) {
  // received data from bp
  const newListItem = req.body.newItem;

  // create
  const item1 = new Item({
    itemName: newListItem
  })
  item1.save((err) => {
    if (!err) {
      res.redirect("/")
    }
    else {
      res.redirect("/")
      console.log(err)
    }
  });

});


// the delete route
app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;
  Item.deleteOne({ _id: checkedItemId }, (err) => {
    if (!err) {
      res.redirect("/")
    }
  })
})


// app.get("/:customListName",(req,res)=>{
//   console.log(req.params.customListName);
// })

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000");
});














