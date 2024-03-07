import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import weatherRoute from "./routes/weatherRoutes.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/weather", weatherRoute);

app.get("/", (req, res) => {
  res.json({
    message: "welcome to weather application",
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `Server running on ${process.env.NODE_ENV} mode on PORT: ${port}`,
  );
});
