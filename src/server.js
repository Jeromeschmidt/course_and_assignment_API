require('dotenv/config');
const port=3000
const path = require("path");
const express = require('express');
const exphbs  = require('express-handlebars');
var app = express();

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser()); // Add this after you initialize express.

// app.use(express.static('public'));

// Add after body parser initialization!
app.use(expressValidator());

app.engine('handlebars', exphbs({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);


// require('dotenv/config');
// const port=3000
// const path = require("path");
// const express = require('express');
// const exphbs  = require('express-handlebars');
// var app = express();
//
// const bodyParser = require('body-parser');
// const expressValidator = require('express-validator');
//
// var cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');
//
//
// // Use Body Parser
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
//
// app.use(cookieParser()); // Add this after you initialize express.
// //
// // app.use(express.static('public'));
// //
// // // Add after body parser initialization!
// app.use(expressValidator());
// //
// app.engine('handlebars', exphbs({
//     layoutsDir: __dirname + '/views/layouts',
//     defaultLayout: 'main'
// }));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'handlebars');
//
// var checkAuth = (req, res, next) => {
//   console.log("Checking authentication");
//   if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
//     req.user = null;
//   } else {
//     var token = req.cookies.nToken;
//     var decodedToken = jwt.decode(token, { complete: true }) || {};
//     req.user = decodedToken.payload;
//   }
//
//   next();
// };
// app.use(checkAuth);
//
//


// #################################

app.use((req, res, next) => {
    const now = new Date().toString()
    console.log(`Requested ${req.url} at ${now}`)
    next()
})

// Database Setup
require('./config/db-setup.js')

// Routes
require('./routes/auth.js')(app)
// require('./routes/assignment.js')(app);
// require('./routes/course.js')(app)

Course = require('./models/course');
Assignment = require('./models/assignment');

app.get("/", (req, res) => {
  var currentUser = req.user;

  Course.find({})
    .then(courses => {
      res.render("layouts/course-index", { courses, currentUser });
    })
    .catch(err => {
      console.log(err.message);
    });
});

// console.log(Course.find({}))
// console.log("*******************")
// console.log(Assignment.find({}))
app.get('/courses/new', (req, res) => res.render('layouts/course-new'))

app.get('/assignment/new', (req, res) => res.render('layouts/assignment-new'))

const router = require('./routes/index.js')
app.use(router)

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
})

module.exports = app
