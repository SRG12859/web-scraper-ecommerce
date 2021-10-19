
const express = require("express");
const router = express.Router();
const { JSDOM } = require("jsdom");
const fetch = require("isomorphic-fetch");

router.get("/get-productDetails", async (req, res) => {
    const { url } = req.query;
    // const url = "https://www.flipkart.com/redmi-9-sky-blue-64-gb/p/itm4fb151383983b"
    // Demo Url :- https://www.flipkart.com/redmi-9-sky-blue-64-gb/p/itm4fb151383983b
    try {
        const fetchUrl = await fetch(url);
        const fetchResult = await fetchUrl.text();

        var dom = new JSDOM(fetchResult);

        var responseUser = {
            title: "",
            description: "",
            offer: [],
            preview: [],
            actualPrice: "",
            off: "",
            offInCurrency: "",
            price: "",
            rating: {
                avgRating: "",
                five_star_rater: "",
                four_star_rater: "",
                three_star_rater: "",
                two_star_rater: "",
                one_star_rater: ""
            },
            paymentMethod: [],
            featuresHighLights: []
        };
        const productTitle = dom.window.document.getElementsByClassName("B_NuCI")[0].textContent
        responseUser.title = productTitle;

        const productDesc = dom.window.document.getElementsByClassName("_1mXcCf")[0] ? dom.window.document.getElementsByClassName("_1mXcCf")[0].textContent : "No Desc"
        responseUser.description = productDesc;

        const productFiveStarRating = dom.window.document.getElementsByClassName("_1uJVNT")[0] ? dom.window.document.getElementsByClassName("_1uJVNT")[0].textContent : "Not Available"
        responseUser.rating.five_star_rater = productFiveStarRating;

        const productFourStarRating = dom.window.document.getElementsByClassName("_1uJVNT")[1] ? dom.window.document.getElementsByClassName("_1uJVNT")[1].textContent : "Not Available"
        responseUser.rating.four_star_rater = productFourStarRating;

        const productThreeStarRating = dom.window.document.getElementsByClassName("_1uJVNT")[2] ? dom.window.document.getElementsByClassName("_1uJVNT")[2].textContent : "Not Available"
        responseUser.rating.three_star_rater = productThreeStarRating;

        const productTwoStarRating = dom.window.document.getElementsByClassName("_1uJVNT")[3] ? dom.window.document.getElementsByClassName("_1uJVNT")[3].textContent : "Not Available"
        responseUser.rating.two_star_rater = productTwoStarRating;

        const productOneStarRating = dom.window.document.getElementsByClassName("_1uJVNT")[4] ? dom.window.document.getElementsByClassName("_1uJVNT")[4].textContent : "Not Available"
        responseUser.rating.one_star_rater = productOneStarRating;

        const productAvgRating = dom.window.document.getElementsByClassName("_2d4LTz")[0] ? dom.window.document.getElementsByClassName("_1uJVNT")[4].textContent : "Not Available"
        responseUser.rating.avgRating = productAvgRating;

        for (let specRatingIndex = 0; specRatingIndex < dom.window.document.getElementsByClassName("_2Ix0io").length; specRatingIndex++) {
            const eachSpecRating = dom.window.document.getElementsByClassName("_2Ix0io")[specRatingIndex].textContent;
            const eachSpecName = dom.window.document.getElementsByClassName("_3npa3F")[specRatingIndex].textContent;

            responseUser.rating[eachSpecName] = eachSpecRating;
        }

        for (let paymentAvailIndex = 0; paymentAvailIndex < dom.window.document.getElementsByClassName("_1Ma4bX").length; paymentAvailIndex++) {
            const paymentMethodAvail = dom.window.document.getElementsByClassName("_1Ma4bX")[paymentAvailIndex].textContent;

            responseUser.paymentMethod[paymentAvailIndex] = paymentMethodAvail;
        }

        for (let highLightsIndex = 0; highLightsIndex < dom.window.document.getElementsByClassName("_21Ahn-").length; highLightsIndex++) {
            const highLights = dom.window.document.getElementsByClassName("_21Ahn-")[highLightsIndex].textContent;

            responseUser.featuresHighLights[highLightsIndex] = highLights;
        }

        const productPrice = dom.window.document.getElementsByClassName("_30jeq3")[0].textContent
        responseUser.price = productPrice;
        const productActualPrice = dom.window.document.getElementsByClassName("_3I9_wc")[0].textContent ? dom.window.document.getElementsByClassName("_3I9_wc")[0].textContent : productPrice;
        responseUser.actualPrice = productActualPrice;

        const productInOff = dom.window.document.getElementsByClassName("_3Ay6Sb")[0].textContent ? dom.window.document.getElementsByClassName("_3Ay6Sb")[0].textContent : "No Off";
        responseUser.off = productInOff;

        const productInOffCurrency = dom.window.document.getElementsByClassName("_1V_ZGU")[0].childNodes[0].textContent ? dom.window.document.getElementsByClassName("_1V_ZGU")[0].childNodes[0].textContent : "₹0 off";
        responseUser.offInCurrency = productInOffCurrency;

        for (let previewIndex = 0; previewIndex < dom.window.document.getElementsByClassName("q6DClP").length; previewIndex++) {
            const productImgPreview = dom.window.document.getElementsByClassName("q6DClP")[previewIndex].getAttribute("style").replace("background-image:url(", "").replace(")", "");

            responseUser.preview.push(productImgPreview)
        }
        for (let offerIndex = 0; offerIndex < dom.window.document.getElementsByClassName("_16eBzU").length; offerIndex++) {
            var offer = [];
            if (dom.window.document.getElementsByClassName("_16eBzU")[offerIndex].childNodes[0].textContent === "Bank Offer" || dom.window.document.getElementsByClassName("_16eBzU")[offerIndex].childNodes[0].textContent === "Special Price" || dom.window.document.getElementsByClassName("_16eBzU")[offerIndex].childNodes[0].textContent === "Partner Offer") {
                var whichOffer = dom.window.document.getElementsByClassName("_16eBzU")[offerIndex].childNodes[0].textContent;
                var offerDetails = dom.window.document.getElementsByClassName("_16eBzU")[offerIndex].childNodes[1].textContent;

                const eachoffer = whichOffer + " " + offerDetails

                offer.push(eachoffer);
            } else {
                var eachoffer = dom.window.document.getElementsByClassName("_16eBzU")[offerIndex].childNodes[0].textContent;

                offer.push(eachoffer);
            }
            responseUser.offer.push(offer);
        }

        res.status(200).json(responseUser)

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router;