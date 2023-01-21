const express = require("express");
const app = express();
const port = 8000;

console.log("holis ");

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
