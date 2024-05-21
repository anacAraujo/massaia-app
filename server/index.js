import express from "express";
import logger from "pino-http";
import cookieParser from "cookie-parser";
import multer from "multer";

import albumsRoutes from "./resources/albums/albumsRoutes.js";
import songsRoutes from "./resources/songs/songsRoutes.js";
import artistsRoutes from "./resources/artists/artistsRoutes.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(logger());
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_FOLDER);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;

  res.status(200).json({ filename: file.filename });
});

app.use("/api/albums/:album_id/songs", songsRoutes);
app.use("/api/albums", albumsRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/artists", artistsRoutes);

app.use(function (req, res, next) {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log("Started server in port: " + port);
});
