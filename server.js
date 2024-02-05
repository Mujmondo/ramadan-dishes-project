const express = require("express");
const cooktimeRoute = require("./routes/cooktime");
const suggestRoute = require("./routes/suggest");
const app = express();
const port = 3000;

// middlewares
app.use(express.json());

// routes
app.use("/cooktime", cooktimeRoute);
app.use("/suggest", suggestRoute);

app.listen(port, () => {
  console.log(`listening to requests on port ${port}`);
});


module.exports = app;