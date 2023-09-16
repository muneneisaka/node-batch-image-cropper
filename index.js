import express from "express";
import morganBody from "morgan-body";
import bodyParser from "body-parser";
import getAllImages from "./image_sharpener.js";

const app = express();
const PORT = process.env.PORT || 3031;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

morganBody(app);

app.get("/", (request, response) => {
  response.render("index");
});

app.post("/crop", (request, response) => {
  getAllImages(request.body, response);
});

app.listen(3031, () => {
  console.log("Started on port", PORT);
});
