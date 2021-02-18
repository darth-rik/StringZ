const express = require("express");
const connectDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5500;

//Connect database

connectDB();

app.use(express.json({ extended: false }));

//Define Routes

app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));

// app.use("/api/auth", require("./routes/api/auth"));

// app.get("/", (req, res) => {
// 	res.send("API running");
// });

app.listen(PORT, () => {
	console.log(`Server started on port:${PORT}`);
});
