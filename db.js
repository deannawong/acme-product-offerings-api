const Sequelize = require("sequelize");
const { STRING, UUID, UUIDV4, DECIMAL } = Sequelize;

const chalk = require("chalk");

const connection = new Sequelize(
  "postgres://localhost:5432/acme_product_offerings_api",
  { logging: false }
);

const Company = connection.define("company", {
  name: {
    type: STRING,
    unique: true
  },
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  }
});

const Product = connection.define("product", {
  name: {
    type: STRING,
    unique: true
  },
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  suggestedPrice: {
    type: DECIMAL
  }
});

const Offer = connection.define("offer", {
  name: {
    type: STRING,
    unique: true
  },
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  price: {
    type: DECIMAL
  }
});

Company.hasMany(Offer);
Offer.belongsTo(Company);

Product.hasMany(Offer);
Offer.belongsTo(Product);

const syncAndSeed = async () => {
  await connection.sync({ force: true });

  const DonutsForEliot = await Company.create({
    name: "donutsForEliot"
  });

  const GlazedDonut = await Product.create({
    name: "glazedDonut",
    suggestedPrice: 10
  });

  const freeDonut = await Offer.create({
    name: "freeDonut",
    price: 0
  });

  await freeDonut.setCompany(DonutsForEliot);
  await freeDonut.setProduct(GlazedDonut);
};

module.exports = {
  connection,
  Company,
  Product,
  Offer,
  syncAndSeed
};
