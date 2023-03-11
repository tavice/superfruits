// EXPRESS BOILERPLATE
// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Fruit = require('./models/fruit.js');
const methodOverride = require("method-override");


// DATABASE CONNECTION
// How to connect to the database either via heroku or locally

const MONGODB_URI = process.env.MONGODB_URI


//get rid of deprecations
mongoose.set('strictQuery', true)
mongoose.connect(MONGODB_URI, {
    useNewUrlParser : false,

});


// Mongo error/success
const db = mongoose.connection
db.on('error', (err) => console.log(`${err.message} MongoDB Not Running!`))
db.on('connected', () => console.log('mongo connected'))
db.on('disconnected', () => console.log('mongo disconnected'))

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static('public'));

// ROUTES - INDUCES

//HOME
app.get('/', (req, res)=>{
 res.send("HOME PAGE")
});

//INDEX
app.get('/fruits/', (req, res) => {
    Fruit.find({}, (error, allFruits) => {
        res.render('index.ejs', {
            fruits: allFruits,
        })
    })
});

// //NEW
// app.get('/fruits/new', (req, res) => {
//     res.render('new.ejs');
// });

// //DELETE
// app.delete("/fruits/:id", (req, res) => {
//     Fruit.findByIdAndRemove(req.params.id, (err, data) => {
//         res.redirect("/fruits")
//     })
// });

// //UPDATE
// app.put("/fruits/:id", (req, res) => {
//     if (req.body.readyToEat === "on") {
//         req.body.readyToEat = true
//     } else {
//         req.body.readyToEat = false
//     }

//     Fruit.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {
//             new: true,
//         },
//         (error, updatedFruit) => {
//             res.redirect(`/fruits/${req.params.id}`)
//         }
//     )
// })

// //CREATE
// app.post('/fruits/', (req, res) => {
//     if (req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
//         req.body.readyToEat = true;
//     } else { //if not checked, req.body.readyToEat is undefined
//         req.body.readyToEat = false;
//     }

//     Fruit.create(req.body, (error, createdFruit) => {
//         if (error) {
//             console.log(error);
//             res.send(error);
//         }
//         else {
//             res.redirect('/fruits');
//         }
//     });
// });

// //EDIT
// app.get("/fruits/:id/edit", (req, res) => {
//     Fruit.findById(req.params.id, (error, foundFruit) => {
//         res.render("edit.ejs", {
//             fruit: foundFruit,
//         })
//     })
// })

// //SHOW
// app.get('/fruits/:id', (req, res) => {
//     Fruit.findById(req.params.id, (err, foundFruit) => {
//         res.render('show.ejs', {
//             fruit: foundFruit
//         });
//     });
// });

// PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});