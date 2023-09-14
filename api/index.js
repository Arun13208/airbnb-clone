const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const download = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const Place = require("./models/Place");
const Booking = require("./models/Booking");
require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "jnfnsclvv57vsd6sdqw2nvs78dsvasv4vsa5v131av4a78vs3";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromToken(req) {
  return new Promise((resolve, reject) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, doc) => {
      if (err) throw err;
      resolve(doc);
    });
  });
}

app.get("/test", (req, res) => {
  res.json("test ok");
});
/* DyTRZOyWd6GlPGlM */

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, userPassword } = req.body;
  const userData = await User.findOne({ email });
  if (userData) {
    const passwordOk = bcrypt.compareSync(userPassword, userData.password);
    if (passwordOk) {
      jwt.sign(
        { email: userData.email, id: userData._id, name: userData.name },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 10);
          res
            .cookie("token", token, { expires: expiryDate })
            .json({ userData, status: true });
        }
      );
    } else {
      res.json({ status: false, msg: "Invalid Password" });
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await download.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, filename, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  const placeDoc = await Place.findById(id);
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("OK");
    }
  });
});

app.get("/all-places", async (req, res) => {
  res.json(await Place.find());
});

app.get("/place/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.post("/bookings", async (req, res) => {
  const { place, price, checkIn, checkOut, numberOfGuests, name, phone } =
    req.body;
  const userDoc = await getUserDataFromToken(req);
  Booking.create({
    place,
    user: userDoc.id,
    price,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
  })
    .then((doc) => {
      res.json("ok");
    })
    .catch((err) => {
      res.json("Failed");
    });
});

app.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromToken(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.listen(4000);
