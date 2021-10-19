
const express = require("express");
const router = express.Router();
const { JSDOM } = require("jsdom");
const fetch = require("isomorphic-fetch");

router.get("/get-productDetails", (req, res) => {
    const { url } = req.query;
    try {
        const fetchUrl = await fetch(url);
        const fetchResult = await fetchUrl.text();

        var dom = new JSDOM(fetchResult);

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})