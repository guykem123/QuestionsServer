const express = require("express");
const app = express();
const yamljs = require('yamljs')
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require('path');
const swagger = require('swagger-ui-express')
const swaggerDocument = yamljs.load('./swagger.yaml');

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/doc', swagger.serve, swagger.setup(swaggerDocument));


// ROUTES
app.use("/auth", require("./routes/auth"));
app.use("/qa", require("./routes/qa"));

// ERROR HANDLING
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
