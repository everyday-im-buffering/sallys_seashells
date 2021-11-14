import { expect } from "chai";
const {
  db,
  models: { Order, Shell, Order_Details },
} = require("../server/db/index");
const seed = require('../script/seed');

describe("addToCart", function () {
  // clear the database before all tests
  before(() => {
    return db.sync({ force: true });
  });

  it("increments cart's subtotal by added shell's price", async function () {
    // beforeEach(async () => {
    const order = await Order.create({ isFulfilled: false, subTotal: 2000, numberOfItems: 2 });
    const shell = await Shell.create({
      name: "Tan Channeled Whelk",
      marineType: "gastropoda",
      color: "brown",
      waterType: "marine",
      quantity: 7,
      price: 1000,
      imageUrl:
        "http://thchanneledwhelk.weebly.com/uploads/1/7/0/8/17085520/9516195.jpg"
    });
    order.addToCart(shell);
    expect(order.subTotal).to.be.equal(3000);
    expect(order.numberOfItems).to.be.equal(3);

    // expect(order.numberOfItems).to.be(3);
    console.log(order.subTotal)
    console.log(order.numberOfItems)
    // });

  })
});