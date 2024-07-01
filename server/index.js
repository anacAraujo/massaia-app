import express from "express";
import logger from "pino-http";
import cookieParser from "cookie-parser";
import multer from "multer";

import authRoutes from "./resources/auth/authRoutes.js";
import albumsRoutes from "./resources/albums/albumsRoutes.js";
import songsRoutes from "./resources/songs/songsRoutes.js";
import artistsRoutes from "./resources/artists/artistsRoutes.js";
import artPiecesRoutes from "./resources/artPieces/artPiecesRoutes.js";
import usersRoutes from "./resources/users/usersRoutes.js";
import momentsRoutes from "./resources/moments/momentsRoutes.js";
import rolesRoutes from "./resources/roles/rolesRoutes.js";
import contentRoutes from "./resources/contents/contentsRoutes.js"
import { errorHandlerMiddleware } from "./middlewares/errorHandler.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(logger());
app.use(express.json());
app.use(cookieParser());

const checkFileName = (filename) => {
  const fixName = filename
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.]/g, "_")
    .replace(/_+/g, "_")
    .toLowerCase();

  const parts = fixName.split(".");
  const extension = parts.pop();
  const fixedName = parts.join();

  return `${fixedName}.${extension}`;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_FOLDER);
  },
  filename: function (req, file, cb) {
    const correctFileName = checkFileName(file.originalname);
    cb(null, Date.now() + "_" + correctFileName);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;

  res.status(200).json({ filename: file.filename });
});

app.use("/api/auth", authRoutes);
app.use("/api/albums/:album_id/songs", songsRoutes);
app.use("/api/albums", albumsRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/artists", artistsRoutes);
app.use("/api/art_pieces", artPiecesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/moments", momentsRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/contents", contentRoutes);

app.use(function (req, res, next) {
  res.status(404).json({ message: "Route not found!", url: req.url });
});

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log("Started server in port: " + port);
});
