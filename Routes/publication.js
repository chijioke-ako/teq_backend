const router = require("express").Router();
const pool = require("../db");
const multer = require("multer");
const path = require("path");

const valid = require("../middleware/vaildtion");
const pubValidation = require("../Validations/publicationsValidation");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") +
        "-" +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jfif" ||
    file.mimetype === "image/PNG"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

//get all publications
router.get("/", async (req, res) => {
  try {
    const allPublications = await pool.query("SELECT * FROM  publications ");
    res.json(allPublications.rows);
  } catch (err) {
    res.status(400).send({ message: "fail !!!" });
    console.error(err.message);
  }
});

//get one publications
router.get("/:id", async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM publications WHERE id = $1",
      [req.params.id]
    );
    res.status(200).send({ data: results.rows[0] });
  } catch (err) {
    res.status(400).send({ message: "publication not found !!!" });
    console.error(err.message);
  }
});

//post Publications

router.post(
  "/",
  valid(pubValidation),
  upload.single("feature_image"),
  (req, res) => {
    feature_image = req.file.path;
    const { title, sub_title, author, feature_image_caption, body } = req.body;

    pool.query(
      "INSERT INTO publications (  title, sub_title, author, feature_image, feature_image_caption, body ) VALUES (  $1, $2, $3, $4, $5, $6 ) RETURNING *",
      [title, sub_title, author, feature_image, feature_image_caption, body],

      (err, results) => {
        if (!title || !author || !feature_image_caption) {
          return res.status(400).json({ msg: "Please fill all fields" });
        } else {
          res.status(201).json({
            status: "Publications Submit Successfully !",
            data: {
              publications: results.rows[0],
            },
          });
        }
      }
    );
  }
);



//put Publications
router.put(
  "/:id",
  valid(pubValidation),
  upload.single("feature_image"),
  (req, res) => {
    feature_image = req.file.path;
    const { id } = req.params;
    const { title, sub_title, author, feature_image_caption, body } = req.body;

    pool.query(
      "UPDATE publications SET title=($1), sub_title=($2), author=($3), feature_image=($4), feature_image_caption=($5), body=($6) WHERE id=($7) returning *",
      [
        title,
        sub_title,
        author,
        feature_image,
        feature_image_caption,
        body,
        id,
      ],

      (err, results) => {
        if (!title || !author || !feature_image_caption) {
          return res.status(400).json({ msg: "Please fill all fields" });
        } else {
          res.status(201).json({
            status: "Updated  Successfully !",
            data: {
              publications: results.rows[0],
            },
          });
        }
      }
    );
  }
);

//delete Publications
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePublications = await pool.query(
      "DELETE FROM publications WHERE id= $1",
      [id]
    );
    res.json("publications was deleted Successfully !");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
