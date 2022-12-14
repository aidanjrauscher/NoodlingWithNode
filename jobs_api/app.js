require("dotenv").config();
require("express-async-errors");
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const app = express();

// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

//connectDB
const connectDB = require("./db/connect");

//custom middleware
const authenticate = require("./middleware/authentication");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send("<h1>Jobs API</h1><a href='/api-docs'>Documentation</a>");
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticate, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () =>
      console.log(`Server is listening on http://localhost:${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
