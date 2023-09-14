import express from "express";
import morganBody from "morgan-body";
import bodyParser from "body-parser";
import getAllImages from "./image_sharpener.js";

const app = express();

app.use(bodyParser.json());

//morgan body to the app
morganBody(app);

app.get("/", (request, response) => {
  response.json({
    info: "Batch image cropper in node and express using sharp npm package.",
  });
});

getAllImages();

app.listen(3031, () => {
  console.log("started on port 3031");
});
