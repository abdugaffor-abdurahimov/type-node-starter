const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
