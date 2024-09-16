const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class Product {
  constructor(title, price, imageUrl, description, id, userId) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id?  new mongodb.ObjectId(id) : null;
    this.userId = userId
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      // update
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findById(prodId) {
    const db = getDb();
    return (
      db
        .collection("products")
        // we cant compare string in mongodb like _id: prodId instead we need to use ObjectId
        // mongoDb compares entire object at once
        .find({ _id: new mongodb.ObjectId(prodId) })
        .next()
        .then((product) => {
          return product;
        })
        .catch((err) => console.log(err))
    );
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
