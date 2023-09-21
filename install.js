import { Service } from "node-windows";

// Create a new service object
var svc = new Service({
  name: "Batch Image Cropper",
  description: "Service for Batch Image Cropper",
  script: "index.js",
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("install", function () {
  svc.start();
});

svc.install();
