import fs from "fs";
import path from "path";
import sharp from "sharp";

let totalNumFiles = 0;

// ****************change this to the path you want to use as your base path************//
const basePath = path.join("D:\\node-js-batch-image-cropper");

const inputBasePath = path.join(basePath, "input-images");
const croppedBasePath = path.join(basePath, "cropped-images");

//chage the below dimensions
const top = 120; //how far from the top to begin
const left = 0; //how far from the left to begin
const width = 1366; //width of cropped image
const height = 560; //height of cropped image

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

  //uncomment this to display the metadata of the image like size, dimensions etc.
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
      //console.log("image cropped successfully: ", croppedImagePath);
    })
    .catch((error) => {
      console.log("An error has occurred: ", error);
    });

  //console.log(croppedImagePath);
}

function getAllImages() {
  console.log("Getting the images from the path:", inputBasePath);

  fs.readdir(inputBasePath, (err, files) => {
    if (err) {
      return console.log("Could not read files in the path due to error:", err);
    }

    totalNumFiles = files.length;
    let fileNum = 1;
    //get all the files using for each
    files.forEach((fileName) => {
      //console.log(fileName);

      console.log("Processing", fileNum, "out of", totalNumFiles, "images");

      cropAnImage(fileName);
      fileNum++;
    });

    console.log("Cropping of images completed.");
  });
}

export default getAllImages;
