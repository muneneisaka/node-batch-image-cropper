import fs from "fs";
import path from "path";
import sharp from "sharp";

let totalNumFiles = 0;

let basePath = "";

let inputBasePath = "";
let croppedBasePath = "";

//chage the below dimensions
let top = 0; //how far from the top to begin
let left = 0; //how far from the left to begin
let width = 0; //width of cropped image
let height = 0; //height of cropped image
let deleteFiles = "";

async function getImageMetadata(imagePath) {
  try {
    const metadata = await sharp(imagePath).metadata();
    console.log(metadata);
  } catch (error) {
    console.log("Error getting image metadata: ", error);
  }
}

function cropAnImage(imagePath) {
  const inputImagePath = path.join(inputBasePath, imagePath);

  //getImageMetadata(inputImagePath);

  const nameWithoutExt = path.parse(imagePath).name;
  const fileNameExtension = path.parse(imagePath).ext;

  //cropped name will be: input-name-cropped.png/jpg etc.
  const croppedImagePath = path.join(
    croppedBasePath,
    nameWithoutExt + "-cropped" + fileNameExtension
  );

  sharp(inputImagePath)
    .extract({
      width: width,
      height: height,
      left: left,
      top: top,
    })
    .toFile(croppedImagePath)
    .then(() => {
      if (deleteFiles === "on") {
        fs.unlinkSync(inputImagePath);
      }
    })
    .catch((error) => {
      console.log("Cropping error: ", error);
    });
}

function getAllImages(imageParameters, response) {
  basePath = path.join(imageParameters.basePath);
  inputBasePath = path.join(basePath, imageParameters.inputPath);
  croppedBasePath = path.join(basePath, imageParameters.croppedPath);
  top = parseInt(imageParameters.top);
  left = parseInt(imageParameters.left);
  width = parseInt(imageParameters.width);
  height = parseInt(imageParameters.height);
  deleteFiles = imageParameters.deleteFiles;

  console.log("Getting the images from the path:", inputBasePath);

  fs.readdir(inputBasePath, (err, files) => {
    if (err) {
      return response
        .status(400)
        .json({ info: "Cannot open input path: " + err });
    }

    totalNumFiles = files.length;

    if (totalNumFiles > 0) {
      let fileNum = 1;

      files.forEach((fileName) => {
        console.log("Cropping", fileNum, "out of", totalNumFiles, "images");

        cropAnImage(fileName);
        fileNum++;
      });

      response.status(200).json({ info: "Cropping of images completed." });
    } else response.status(400).json({ info: "No images to crop." });
  });
}

export default getAllImages;
