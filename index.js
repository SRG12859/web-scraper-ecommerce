// Packages
const express = require("express");

// App PORT
const PORT = process.env.PORT || 8080;

// Initialixing The app
const app = express();

// Using Express JSON Because We Want JSON Input From The Frontend And JSON Output From The Backend
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Flipkart Web Scrapper");
});

app.use("/search", require("./routes/search.route"));

// Listening The App
app.listen(PORT, () => {
  console.log(
    `flipkart-web-scrapper is listening on the http://localhost:${PORT}`
  );
});
