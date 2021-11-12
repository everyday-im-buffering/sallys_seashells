const faker = require("faker");
let fakeUsers = [];
function createFakeusers() {

  for (let i = 0; i < 10; i++) {
    let fakeUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      // has a 50 and 30% chance of getting assigned to true
      isLoggedIn: Math.random() < 0.5,
      isAdmin: Math.random() < 0.3,
    };
    fakeUsers.push(fakeUser);
  }
  return fakeUsers;
}
createFakeusers()

module.exports = fakeUsers
