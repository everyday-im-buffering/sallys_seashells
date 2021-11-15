"use strict";
const faker = require("faker");
const {
  db,
  models: { User, Shell, Order, Order_Details },
} = require("../server/db");
const shells = require("./seedData/shells");
const userData = require("./seedData/users");
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

let users = [
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    // has a 50 and 30% chance of getting assigned to true
    isLoggedIn: Math.random() < 0.5,
    isAdmin: Math.random() < 0.3,
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    // has a 50 and 30% chance of getting assigned to true
    isLoggedIn: Math.random() < 0.5,
    isAdmin: Math.random() < 0.3,
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    // has a 50 and 30% chance of getting assigned to true
    isLoggedIn: Math.random() < 0.5,
    isAdmin: Math.random() < 0.3,
  },
];

let orders = [
  {
    isFulfilled: false,
    subTotal: 500,
    numberOfItems: 2
  },
  {
    isFulfilled: true,
    subTotal: 2000,
    numberOfItems: 3
  },
  {
    isFulfilled: false,
    subTotal: 1000,
    numberOfItems: 2
  },
];

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // creating Users
  const [user1, user2, user3] = await Promise.all(
    users.map((users) => {
      return User.create(users);
    })
  );

  //creating Orders
  const [order1, order2, order3] = await Promise.all(
    orders.map((order) => {
      return Order.create(order);
    })
  );

  //creating Shells
  const [shell1, shell2, shell3] = await Promise.all(
    shells.map((shell) => {
      return Shell.create(shell);
    })
  );
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  await user2.addOrder(order1)
  await order1.addShell(shell2)
}



/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");

  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
