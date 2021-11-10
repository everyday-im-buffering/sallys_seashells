schema design
-what info do we need?
things to sell
user info
cart
dummy orders
website name
address
payment info

how do we seperate into tables?

three main tables:

user's table

products table

orders table
isf: n ---> cart
isf: y ---> order

_WHAT IS THE CART REALLY?_

-a cart is a boolean value on orders table
-it is a status on the order table

## -when we put something in a cart we need to update the db

-our orders and carts are the same thing with seperate statuses

the assocations among the tabels:
-users has a relationship with orders
-a user has many orders- a user has a one to many relationship with orders
-products and orders have a many to many relationships
----this creates a through table with order and product id

_DATAFLOW_

https://gyazo.com/e973cf0ad15f4caac3cdfba54b308e6b

-user puts something in their cart
-orders table as an fk association of user in their cart

https://i.gyazo.com/a24bc4836e5fa20047bce7fda96923a5.png

what happens when something is added to the cart?
https://gyazo.com/5610fc930335758b8938384b639951af

another item in the cart?
https://gyazo.com/addd90f1e54e9cc4cbb1636eb129aef8

another user adds to their cart
https://gyazo.com/14cfe7fde477d48429112fbfafe27504

_ORDER TABLE VS ORDER DETAIL TABLE_

order detail is the specific information at a given time and it needs an extra column for number of items - qty
https://gyazo.com/41fa78a354e561c6f45d29e0f62febb2

how to make another column? https://gyazo.com/42bc5fdb7ab905dd482b7aa9912024e7

we can create a seperate model called order detail and require that model

https://gyazo.com/8ce467ff8898c49b87e4bc5987a65b8b

-a normal through table but using a model to define it
-oid, pid, qty, px

-need to define another data type for price of items
https://gyazo.com/4c862db47015cfa8f5ad7c16e9e305fe

-need to sum up prices
-order table and order details are different tables

db models
-products
-order
-user
-order detail

-how to handle limited quantity? its much better to decrement immediately and give a user a time limit to purchase
-to handle quantity and price, there can be an instance method that mulitplies quantity by price

_RELATIONSHIPS BETWEEN TABLES_

https://gyazo.com/6f1fb58e398371276c28887441a6c267

https://gyazo.com/78b3444c3563eb798de5c5bcaf6d037b
-primary key and fk get created
-eager loading happens
-magic methods

-can console.log the object's prototype to look at all of the magic methods

-a many to many relation is two one to many relationships

-optimize for schema because they are static
-if you put a new column in users and you don't run your seed, you will you get an error that says 'relation does not exist' the db will be using the old column and re initial with db force true
-thats why the exception to the optimization rule is schema design
-confirmation order id is not the pk, it is usually generated with a hash bc security

schema design rules of thumb
if the info isnt specific, it usualy goes in a join table

ben's transit tracker example:
https://gyazo.com/87ffd99e23cb891c1d130b9001c98007

-transit times go in a seperate through table because its shared by many vehicles

no sequel database - firebase

_NORMALIZATION_

https://gyazo.com/ffd5dfccd289f9ad2e7928c4714b4174
-singular values should go in tables
-relational database go row by row

- firebase is easier than mongo db

guest cart
-store the geust cart in the browser and put the guest cart items into the current cart

pair programming with the guest cart

let coolStorage = window.localStorage

> coolStorage

    length: 0

coolStorage.setItem("myDog", "Yoshi")

> coolStorage

    Storage{myDog: 'Yoshi'}
    myDog: 'Yoshi'

const dog = coolStorage.getItem('myDog') >dog
'Yoshi'

https://gyazo.com/ec015016678cdb5793708d9195a9b02e

one Caveat to remember:
-when you re using a cart, you're using an object when you're using an object, the code is little different
-you need to convert the object to a string by using JSON.stringify
-to bring back from local storage you use JSON.parse

_GUEST CHECKOUT_
-this is where the order number comes into play
-store the order number in order history for guest checkout

-
