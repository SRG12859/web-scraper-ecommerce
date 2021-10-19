// Packages
const express = require("express");
const cors = require("cors")

// App PORT
const PORT = process.env.PORT || 8080;

// Initialixing The app
const app = express();

// Using Express JSON Because We Want JSON Input From The Frontend And JSON Output From The Backend
app.use(express.json());
app.use(cors({
  origin: "*"
}))

app.get("/flipkart", (req, res) => {
  res.status(200).send("Flipkart Web Scrapper");
});

app.use("/flipkart/search", require("./routes/flipkart/search.route"));
app.use("/flipkart/product", require("./routes/flipkart/product.route"));

// Listening The App
app.listen(PORT, () => {
  console.log(
    `flipkart-web-scrapper is listening on the http://localhost:${PORT}`
  );
});
