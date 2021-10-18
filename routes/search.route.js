const express = require("express");
const router = express.Router();
const { JSDOM } = require("jsdom");
const fetch = require("isomorphic-fetch");

router.get("/list", async (req, res) => {
  const { search_item, category } = req.query;
  try {
    const url = `https://www.flipkart.com/search?q=${search_item}&otracker=search&otracker1=search&marketplace=FLIPKART&suggestionId=${category}`;
    const response = await fetch(url);
    const textResponse = await response.text();
    const dom = new JSDOM(textResponse);

    let giveUserResponse = {
      product: [],
    };
    for (
      let index = 0;
      index < dom.window.document.getElementsByClassName("_4rR01T").length;
      index++
    ) {
      // Title Of The Product
      const productTitle =
        dom.window.document.getElementsByClassName("_4rR01T")[index]
          .textContent;

      // Image Of The Product
      const productImg = dom.window.document
        .getElementsByClassName("_396cs4")
      [index].getAttribute("src");

      // Product Price
      const productPrice = dom.window.document
        .getElementsByClassName("_30jeq3")
      [index].textContent.replace("₹", "");

      // The Actual Price Of The Product
      let productActualPrice = dom.window.document
        .getElementsByClassName("_3I9_wc")
      [index] ? dom.window.document
        .getElementsByClassName("_3I9_wc")
      [index].textContent.split("₹")[1] : productPrice;

      // The Rating Of The Product
      var productRating =
        dom.window.document.getElementsByClassName("_3LWZlK")[index]
          .childNodes[0].textContent;

      // Product Features Array
      const productFeaturesArray = [];

      for (
        let i = 0;
        i <
        dom.window.document.getElementsByClassName("_1xgFaf")[index].children
          .length;
        i++
      ) {
        const productFeatures =
          dom.window.document.getElementsByClassName("rgWa7D")[i].textContent;

        productFeaturesArray[i] = productFeatures;
      }

      giveUserResponse.product.push({
        name: productTitle,
        image: productImg,
        price: productPrice,
        actualPrice: productActualPrice,
        features: productFeaturesArray,
        rating: productRating,
      });
    }

    res.status(200).json(giveUserResponse);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
// Route 02 :- Get Grid Products Details
router.get("/grid", async (req, res) => {
  const { search_item } = req.query;
  try {
    const url = `https://www.flipkart.com/search?q=${search_item}&otracker=search&otracker1=search&marketplace=FLIPKART`;
    const response = await fetch(url);
    const textResponse = await response.text();
    const dom = new JSDOM(textResponse);

    let giveUserResponse = {
      product: [],
    };
    for (
      let index = 0;
      index < dom.window.document.getElementsByClassName("s1Q9rs").length;
      index++
    ) {
      // Title Of The Product
      const productTitle =
        dom.window.document.getElementsByClassName("s1Q9rs")[index].getAttribute("title");

      // Image Of The Product
      const productImg = dom.window.document
        .getElementsByClassName("_396cs4")
      [index].getAttribute("src");

      // A Link To Flipkart Product Page

      const productLink =
        `https://flipkart.com${dom.window.document.getElementsByClassName("s1Q9rs")[index].getAttribute("href")}`;

      // Product Price
      const productPrice = dom.window.document
        .getElementsByClassName("_30jeq3")
      [index].textContent.replace("₹", "");

      // The Actual Price Of The Product
      let productActualPrice = dom.window.document
        .getElementsByClassName("_3I9_wc")
      [index] ? dom.window.document
        .getElementsByClassName("_3I9_wc")
      [index].textContent.split("₹")[1] : productPrice;

      // The Rating Of The Product
      var productRating =
        dom.window.document.getElementsByClassName("_3LWZlK")[index]
          .childNodes[0].textContent;

      giveUserResponse.product.push({
        name: productTitle,
        image: productImg,
        price: productPrice,
        actualPrice: productActualPrice,
        rating: productRating,
        url: productLink
      });
    }

    res.status(200).json(giveUserResponse);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route 02 :- This Gives The List Of Mobile Phones | List View
router.get("/mobiles", async (req, res) => {
  const search_item = "mobiles";
  const category = "mobiles";
  try {
    const url = `https://www.flipkart.com/search?q=${search_item}&otracker=search&otracker1=search&marketplace=FLIPKART&suggestionId=${category}`;
    const response = await fetch(url);
    const textResponse = await response.text();
    const dom = new JSDOM(textResponse);

    let giveUserResponse = {
      product: [],
    };
    for (
      let index = 0;
      index < dom.window.document.getElementsByClassName("_4rR01T").length;
      index++
    ) {
      // Title Of The Product
      const productTitle =
        dom.window.document.getElementsByClassName("_4rR01T")[index]
          .textContent;

      // Image Of The Product
      const productImg = dom.window.document
        .getElementsByClassName("_396cs4")
      [index].getAttribute("src");

      // Product Price
      const productPrice = dom.window.document
        .getElementsByClassName("_30jeq3")
      [index].textContent.replace("₹", "");

      // The Actual Price Of The Product
      let productActualPrice = dom.window.document
        .getElementsByClassName("_3I9_wc")
      [index] ? dom.window.document
        .getElementsByClassName("_3I9_wc")
      [index].textContent.split("₹")[1] : productPrice;





      // The Rating Of The Product
      var productRating =
        dom.window.document.getElementsByClassName("_3LWZlK")[index]
          .childNodes[0].textContent;

      // Product Features Array
      const productFeaturesArray = [];

      for (
        let i = 0;
        i <
        dom.window.document.getElementsByClassName("_1xgFaf")[index].children
          .length;
        i++
      ) {
        const productFeatures =
          dom.window.document.getElementsByClassName("rgWa7D")[i].textContent;

        productFeaturesArray[i] = productFeatures;
      }

      giveUserResponse.product.push({
        name: productTitle,
        image: productImg,
        price: productPrice,
        actualPrice: productActualPrice,
        features: productFeaturesArray,
        rating: productRating,
      });
    }

    res.status(200).json(giveUserResponse);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/laptops", async (req, res) => {
  const search_item = "laptop";
  const category = "laptops";
  try {
    const url = `https://www.flipkart.com/search?q=${search_item}&otracker=search&otracker1=search&marketplace=FLIPKART&suggestionId=${category}`;
    const response = await fetch(url);
    const textResponse = await response.text();
    const dom = new JSDOM(textResponse);

    let giveUserResponse = {
      product: [],
    };
    for (
      let index = 0;
      index < dom.window.document.getElementsByClassName("_4rR01T").length;
      index++
    ) {
      // Title Of The Product
      const productTitle =
        dom.window.document.getElementsByClassName("_4rR01T")[index]
          .textContent;

      // Image Of The Product
      const productImg = dom.window.document
        .getElementsByClassName("_396cs4")
      [index].getAttribute("src");

      // Product Price
      const productPrice = dom.window.document
        .getElementsByClassName("_30jeq3")
      [index].textContent.replace("₹", "");

      // The Actual Price Of The Product
      let productActualPrice = dom.window.document
        .getElementsByClassName("_3I9_wc")
      [index] ? dom.window.document
        .getElementsByClassName("_3I9_wc")
      [index].textContent.split("₹")[1] : productPrice;





      // The Rating Of The Product
      var productRating =
        dom.window.document.getElementsByClassName("_3LWZlK")[index]
          .childNodes[0].textContent;

      // Product Features Array
      const productFeaturesArray = [];

      for (
        let i = 0;
        i <
        dom.window.document.getElementsByClassName("_1xgFaf")[index].children
          .length;
        i++
      ) {
        const productFeatures =
          dom.window.document.getElementsByClassName("rgWa7D")[i].textContent;

        productFeaturesArray[i] = productFeatures;
      }

      giveUserResponse.product.push({
        name: productTitle,
        image: productImg,
        price: productPrice,
        actualPrice: productActualPrice,
        features: productFeaturesArray,
        rating: productRating,
      });
    }

    res.status(200).json(giveUserResponse);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
