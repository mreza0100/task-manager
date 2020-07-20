const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

console.log("dont forgot to start MONGOD");

mongoose
	.connect("mongodb://localhost/task-manager", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("mongo DB connected >>>>"))
	.then(require("dotenv").config)
	.then(start)
	.catch(() => () => console.log("Error while connecting to mongo DB"));

const app = express();

// $ middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
// $ middlewares

// ! routes********************

app.get("/", (req, res) => {
	res.status(200).json({ msg: "main index is empity" }).end();
});

app.use("/user", require("./routes/user.route"));
app.use("/tasks", require("./routes/tasks.route"));

app.all("*", (req, res) => {
	res.status(404).json({ msg: "not found" }).end();
});

// ! routes********************

function start() {
	global.__SERVER__ = app
		.listen(process.env.PORT, () => {
			console.log(`listinning on PORT: ${process.env.PORT}`);
		})
		.on("error", shutDonw);
}
process.on("uncaughtException", shutDonw);
process.on("SIGTERM", shutDonw);
function shutDonw() {
	console.log("<<<<<<<<<server shutDown>>>>>>>>>");
	global.__SERVER__.close();
	try {
		process.exit(0 /* clean exit */);
	} catch (err) {
		process.exit(1 /* force exit */);
	}
}
