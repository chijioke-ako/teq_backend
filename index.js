const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");


dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;
// app.use(cors());
//Allow origin Access origin and method
app.use(cors({ origin: true, credentials: true, optionsSuccessStatus: 200 }));
app.set("trust proxy", 1);
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));
// app.use((error, req, res, next) => {
//   error.statusCode = error.statusCode || 500;
//   res.status(error.statusCode).json({
//      status:
//    });
//  })

app.use("/upload", express.static("upload"));
app.use("/uploads", express.static("uploads"));

const archmentRouter = require("./Routes/archment");
const contactRouter = require("./Routes/contcat");
const downloadRouter = require("./Routes/download");
const forgetRouter = require("./Routes/forget_password");
const loginRouter = require("./Routes/login");
const milRouter = require("./Routes/mail");
const mailContact = require("./Routes/mailCantcat");
const openbravoRouter = require("./Routes/openbravo");
const partnersRouter = require("./Routes/partner");
const pcmsRouter = require("./Routes/pcms");
const pubRouter = require("./Routes/pub");
const publicationRouter = require("./Routes/publication");
const usersRouter = require("./Routes/users");
const resumeRouter = require("./Routes/resume");
const signupRouter = require("./Routes/sginup");
// // const verifyRouter = require('./Routers/auth');
//  const adminRouter = require('./Routers/admin');
const recaptchaRouter = require("./Routes/recapca");

app.use("/api/archment", archmentRouter);
app.use("/api/contact", contactRouter);
app.use("/api/download", downloadRouter);
app.use("/api/forgetpassword", forgetRouter);
app.use("/api/login", loginRouter);
app.use("/api/mail", milRouter);
app.use("/api/mailcontact", mailContact);
app.use("/api/openbravo", openbravoRouter);
app.use("/api/partner", partnersRouter);
app.use("/api/pcms", pcmsRouter);
app.use("/api/lastPublications", pubRouter);
app.use("/api/publications", publicationRouter);
app.use("/api/users", usersRouter);
app.use("/api/resume", resumeRouter);
app.use("/api/register", signupRouter);
app.use("/api/recap", recaptchaRouter);

app.get("/", (req, res) => {
  res.send("ok now is working");
});

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fall",
    message: `can't find ${req.originUrl} on the server !`,
  });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
