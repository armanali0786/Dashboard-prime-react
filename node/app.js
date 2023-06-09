const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();

const Routers = require('./Routes/routes');
const exp = require('constants');

dotenv.config();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)));
app.use(Routers);

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});
mongoose
  .connect(process.env.MONGODB_URI)
  .then(result => {
    console.log("Mongodb Connected")
  })
  .catch(err => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`App listening on port http://localhost:${process.env.PORT}`)
})
