const express = require("express");
const router = express.Router();
const { JSDOM } = require("jsdom");
const fetch = require("isomorphic-fetch");

// Route 01 :- This Gives The List Of Mobile Phones | List View
router.get("/mobiles", async (req, res) => {
  const { company } = req.query;
  try {
    let url = "";
    if (company === "realme") {
      url = "https://www.flipkart.com/mobiles/pr?sid=tyy%2C4io&p%5B%5D=facets.brand%255B%255D%3DRealme&otracker=nmenu_sub_Electronics_0_Realme"
    }
    else if (company === "mi") {
      url = "https://www.flipkart.com/mobiles/mi~brand/pr?sid=tyy,4io&otracker=nmenu_sub_Electronics_0_Mi"
    }
    else if (company === "infinix") {
      url = "https://www.flipkart.com/mobiles/pr?sid=tyy%2C4io&otracker=categorytree&p%5B%5D=facets.brand%255B%255D%3DInfinix&otracker=nmenu_sub_Electronics_0_Infinix"
    }
    else if (company === "apple") {
      url = "https://www.flipkart.com/mobiles/~iphone-xr-series/pr?sid=tyy,4io&otracker=clp_banner_1_3.banner.BANNER_apple-products-store_2XLEYVFO3M8Z"
    }
    else if (company === "vivo") {
      url = "https://www.flipkart.com/mobiles/pr?sid=tyy%2C4io&p%5B%5D=facets.serviceability%5B%5D%3Dfalse&p%5B%5D=facets.brand%255B%255D%3DVivo&otracker=nmenu_sub_Electronics_0_Vivo"
    }
    else if (company === "asus") {
      url = "https://www.flipkart.com/mobiles/pr?sid=tyy%2C4io&p%5B%5D=facets.brand%255B%255D%3DAsus&otracker=nmenu_sub_Electronics_0_Asus"
    }
    else if (company === "samsung") {
      url = "https://www.flipkart.com/samsung-mobile-store?otracker=nmenu_sub_Electronics_0_Samsung"
    }
    else if (company === "oppo") {
      url = "https://www.flipkart.com/oppo-mobile-phones-store?otracker=nmenu_sub_Electronics_0_OPPO"
    }
    else {
      return res.status(404).send("Not Found")
    }


    const response = await fetch(url);
    const textResponse = await response.text();
    const dom = new JSDOM(textResponse);

    let giveUserResponse = {
      product: [],
    };
    if (company === "oppo" || company === "samsung") {
      for (let index = 0; index < dom.window.document.getElementsByClassName("_1DYSFX").length; index++) {
        for (var titleLoop = 0; titleLoop < dom.window.document.getElementsByClassName("_1DYSFX").length; titleLoop++) {
          var productPriceCategory = "Top " + dom.window.document.getElementsByClassName("_1DYSFX")[index].textContent

          const productTitleElement = dom.window.document.getElementsByClassName("s1Q9rs")[titleLoop].textContent;

          var productTitle = productTitleElement;

          // Product Price
          var productPrice = dom.window.document
            .getElementsByClassName("_30jeq3")
          [titleLoop].textContent.replace("₹", "");

          // The Actual Price Of The Product
          var productActualPrice = dom.window.document
            .getElementsByClassName("_3I9_wc")
          [titleLoop] ? dom.window.document
            .getElementsByClassName("_3I9_wc")
          [titleLoop].textContent.split("₹")[1] : productPrice;
        }

        const productImg = dom.window.document
          .getElementsByClassName("_396cs4")
        [titleLoop].getAttribute("src");

        // The Rating Of The Product
        var productRating =
          dom.window.document.getElementsByClassName("_3LWZlK")[titleLoop]
            .childNodes[0].textContent;

        var productInOff = dom.window.document.getElementsByClassName("_3Ay6Sb")[titleLoop]
          .childNodes[0].textContent ? dom.window.document.getElementsByClassName("_3Ay6Sb")[titleLoop]
            .childNodes[0].textContent : "No Offer";

        var productLink = "https://flipkart.com" + dom.window.document.getElementsByClassName("s1Q9rs")[titleLoop].getAttribute("href");

        giveUserResponse.product.push({
          priceCategory: productPriceCategory,
          name: productTitle,
          image: productImg,
          price: productPrice,
          actualPrice: productActualPrice,
          rating: productRating,
          off: productInOff,
          offerLink: productLink
        });
      }

    } else {
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

        var productInOff = dom.window.document.getElementsByClassName("_3Ay6Sb")[index] ? dom.window.document.getElementsByClassName("_3Ay6Sb")[index].firstChild.textContent : "No Offer";

        var productLink = "https://flipkart.com" + dom.window.document.getElementsByClassName("_1fQZEK")[index].getAttribute("href");

        giveUserResponse.product.push({
          name: productTitle,
          image: productImg,
          price: productPrice,
          actualPrice: productActualPrice,
          features: productFeaturesArray,
          rating: productRating,
          off: productInOff,
          offerLink: productLink,
        });
      }
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
