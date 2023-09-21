import { Service } from "node-windows";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new service object
var svc = new Service({
  name: "Batch Image Cropper",
  script: path.join(__dirname, "index.js"),
});

// Listen for the "uninstall" event so we know when it's done.
svc.on("uninstall", function () {
  console.log("Uninstall complete.");
  console.log("The service exists: ", svc.exists);
});

// Uninstall the service.
svc.uninstall();
