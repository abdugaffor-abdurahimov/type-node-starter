import express from "express";
import cors from "cors";
import helmet from "helmet";
import itemsRouter from "./items/items.router";
import expressListEndpoint from "express-list-endpoints";

import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/menu/items", itemsRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(expressListEndpoint(app));
  console.log(`App is running on port ${PORT}`);
});
