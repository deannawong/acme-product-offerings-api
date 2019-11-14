const express = require("express");
const app = express();
const PORT = 5555;
const path = require("path");

const chalk = require("chalk");

const { connection, Company, Product, Offer, syncAndSeed } = require("./db.js");

app.get("/", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "/index.html"));
  } catch (e) {
    next(e);
  }
});

app.get("/api/companies", (req, res, next) => {
  Company.findAll()
    .then(companies => {
      res.send(companies);
    })
    .catch(e => {
      console.log(chalk.bgRed("Issues finding all companies"));
    });
});
app.get("/api/products", (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.send(products);
    })
    .catch(e => {
      console.log(chalk.bgRed("Issues finding all products"));
    });
});
app.get("/api/offerings", (req, res, next) => {
  Offer.findAll()
    .then(offerings => {
      res.send(offerings);
    })
    .catch(e => {
      console.log(chalk.bgRed("Issues finding all offerings"));
    });
});

syncAndSeed().then(() => {
  app.listen(PORT, () => {
    console.log(chalk.cyan.bold(`Application launched on port ${PORT}`));
  });
});
