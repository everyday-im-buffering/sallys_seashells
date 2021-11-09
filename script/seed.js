const { green, red } = require("chalk");
const {
  db,
  moderls: { Shell },
} = require("../server/db");

//  this is  not completed

const shells = [
  {
    name: "Grey Channeled Whelk",
    marineType: "gastropda",
    color: "grey",
    waterType: "marine",
    quantity: 2,
    price: 10.0,
    imageUrl:
      "https://i.pinimg.com/originals/ca/ab/50/caab50438784d40ab67def790929d4c9.jpg",
  },
  {
    name: "Tan Channeled Whelk",
    marineType: "gastropda",
    color: "brown",
    waterType: "marine",
    quantity: 7,
    price: 10.0,
    imageUrl:
      "http://thchanneledwhelk.weebly.com/uploads/1/7/0/8/17085520/9516195.jpg",
  },
  {
    name: "Common Tower Shell",
    marineType: "gastropda",
    color: "brown",
    waterType: "marine",
    quantity: 32,
    price: 7.99,
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
    price: 5.0,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a6/Cypraea_nebrites.jpg",
  },
  {
    name: "Precious Wentletrap",
    marineType: "gastropda",
    color: "white",
    waterType: "marine",
    quantity: 8,
    price: 30.25,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Epitonium_scalare_shell.jpg/440px-Epitonium_scalare_shell.jpg",
  },
  {
    name: "Giant Clam",
    marineType: "bivalvia",
    color: "grey",
    waterType: "marine",
    quantity: 1,
    price: 199.99,
    imageUrl: "https://i.ebayimg.com/images/g/iyIAAOSwSbZevvrm/s-l400.jpg",
  },
  {
    name: "Sword Razor",
    marineType: "bivalvia",
    color: "brown",
    pattern: "striped",
    waterType: "marine",
    quantity: 20,
    price: 12.0,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ensis_ensis_%28Baix_Ebre%29.jpg/440px-Ensis_ensis_%28Baix_Ebre%29.jpg",
  },
  {
    name: "Cuttlebone",
    marineType: "cephalopoda",
    color: "white",
    waterType: "marine",
    quantity: 12,
    price: 16.99,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Cuttlefish-Cuttlebone2.jpg/440px-Cuttlefish-Cuttlebone2.jpg",
  },
  {
    name: "Black Leather Chiton",
    marineType: "polyplacophora",
    color: "multi",
    waterType: "marine",
    quantity: 8,
    price: 20.0,
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
    price: 20.0,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9e/Tonicella-lineata.jpg",
  },
  {
    name: "Gumboot Chiton",
    marineType: "polyplacophora",
    color: "red",
    waterType: "marine",
    quantity: 10,
    price: 20.0,
    imageUrl: "https://i.redd.it/nqwye0cohom21.jpg",
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(
      shells.map((shell) => {
        return Shell.create(shell);
      })
    );
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch((err) => {
      console.error(red("Oops! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
