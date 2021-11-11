"use strict";

const {
  db,
  models: { User, Shell },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
const shells = [
  {
    name: "Grey Channeled Whelk",
    marineType: "gastropda",
    color: "grey",
    waterType: "marine",
    quantity: 2,
    price: 1000,
    imageUrl:
      "https://i.pinimg.com/originals/ca/ab/50/caab50438784d40ab67def790929d4c9.jpg",
  },
  {
    name: "Tan Channeled Whelk",
    marineType: "gastropda",
    color: "brown",
    waterType: "marine",
    quantity: 7,
    price: 1000,
    imageUrl:
      "http://thchanneledwhelk.weebly.com/uploads/1/7/0/8/17085520/9516195.jpg",
  },
  {
    name: "Common Tower Shell",
    marineType: "gastropda",
    color: "brown",
    waterType: "marine",
    quantity: 32,
    price: 799,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Turritella_communis_fossiel.jpg/440px-Turritella_communis_fossiel.jpg",
  },
  {
    name: "False Margined Cowry",
    marineType: "gastropda",
    color: "brown",
    pattern: "spotted",
    waterType: "marine",
    quantity: 25,
    price: 500,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a6/Cypraea_nebrites.jpg",
  },
  {
    name: "Precious Wentletrap",
    marineType: "gastropda",
    color: "white",
    waterType: "marine",
    quantity: 8,
    price: 3025,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Epitonium_scalare_shell.jpg/440px-Epitonium_scalare_shell.jpg",
  },
  {
    name: "Giant Clam",
    marineType: "bivalvia",
    color: "grey",
    waterType: "marine",
    quantity: 1,
    price: 19999,
    imageUrl: "https://i.ebayimg.com/images/g/iyIAAOSwSbZevvrm/s-l400.jpg",
  },
  {
    name: "Sword Razor",
    marineType: "bivalvia",
    color: "brown",
    pattern: "striped",
    waterType: "marine",
    quantity: 20,
    price: 1200,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ensis_ensis_%28Baix_Ebre%29.jpg/440px-Ensis_ensis_%28Baix_Ebre%29.jpg",
  },
  {
    name: "Cuttlebone",
    marineType: "cephalopoda",
    color: "white",
    waterType: "marine",
    quantity: 12,
    price: 1699,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Cuttlefish-Cuttlebone2.jpg/440px-Cuttlefish-Cuttlebone2.jpg",
  },
  {
    name: "Black Leather Chiton",
    marineType: "polyplacophora",
    color: "multi",
    waterType: "marine",
    quantity: 8,
    price: 200,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Katharina_tunicata_2.jpg/1920px-Katharina_tunicata_2.jpg",
  },
  {
    name: "Blue Lined Chiton",
    marineType: "polyplacophora",
    color: "multi",
    pattern: "striped",
    waterType: "marine",
    quantity: 15,
    price: 2000,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9e/Tonicella-lineata.jpg",
  },
  {
    name: "Gumboot Chiton",
    marineType: "polyplacophora",
    color: "red",
    waterType: "marine",
    quantity: 10,
    price: 2000,
    imageUrl: "https://i.redd.it/nqwye0cohom21.jpg",
  },
];

async function seed() {
  await db.sync(); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      email: "cody",
      password: "123",
      cart: { products: ["sundial"], total: 80.0 },
      isAdmin: true,
    }),
    User.create({
      email: "murphy",
      password: "123",
      cart: { products: ["abalone", "conche"], total: 40.0 },
    }),
  ]);

  //creating shells
  await Promise.all(
    shells.map((shell) => {
      return Shell.create(shell);
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
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
