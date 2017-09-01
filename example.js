const mongoose = require('mongoose');

  // Name of the database that we are connecting to
  //                                      |
mongoose.connect('mongodb://localhost/cattinder');
  //                              use cattinder



// Mongoose Model
// ==============
// A constructor function we create using Mongoose.
// Allows us to interact with ONE COLLECTION in the database.

const Schema = mongoose.Schema;

const catSchema = new Schema({
  name: String,
  color: String,
  age: Number
});


  // Create a Mongoose model for the "cats" collection
  //                                  schema object
  //                         model name    |
  //                              |        |
const CatModel = mongoose.model('Cat', catSchema);
              //  model name is "Cat"
              //                  |
              //                  v
              //  collection is "cats"




// C of CRUD
// =========
// Inserting a new document with Mongoose.

const myKitty = new CatModel({
  name: 'Bowser',
  color: 'Green',
  age: 3
});

// db.cats.insertOne({ name: 'Bowser' })
myKitty.save((err) => {

    if (err) {
        console.log('FUCK ERROR');
        console.log(err);
    }

    else {
        console.log('Bowser was saved!');
    }

}); // close myKitty.save((err) => { ...


// db.cats.insertOne({ name: 'Koopa' })
CatModel.create(
  // 1st argument -> information you want to save
  {
    name: 'Koopa',
    age: 7
  },

  // 2nd argument -> callback
  (err, savedCat) => {
      if (err) {
          console.log('SHIIIIIT');
          console.log(err);
      }

      else {
          console.log('Koopa was saved!');
          console.log(savedCat);
      }
  }
); // close CatModel.create( ...




// R of CRUD
// =========
// Retrieving documents with Mongoose.

// db.cats.find()
CatModel.find(
  // 1st argument -> criteria object (optional)
  // { name: 'Bowser' },

  // 2nd argument -> projection object (optional)
  // { name: 1, _id: 0 },

  // 3rd argument -> callback
  (err, allCats) => {
      if (err) {
          console.log('Could not retrieve cats');
          console.log(err);
      }

      else {
          allCats.forEach((oneCat) => {
              console.log('Cat ---> ' + oneCat.name);
          });

          console.log('Total Cats: ' + allCats.length);
      }
  }
); // close CatModel.find( ...



// U of CRUD
// =========
// Updating documents with Mongoose.

// db.cats.findOne()
CatModel.findOne(
  // 1st argument -> criteria object (optional)
  { name: 'Bowser' },

  // 2nd argument -> projection object (optional)
  // { name: 1, _id: 0 },

  // 3rd argument -> callback
  (err, catFromDb) => {
      if (err) {
          console.log('DAMN ERROR');
          console.log(err);
      }

      else {
          catFromDb.name = 'Byron';

          // db.cats.updateOne(
          //   { name: 'Bowser'},
          //   { $set: { name: 'Byron' } }
          // )
          catFromDb.save((err) => {
              if (err) {
                  console.log('Update error');
                  console.log(err);
              }

              else {
                  console.log('Update successful!');
              }
          });
      } // close else { ...
  } // close (err, catFromDb) => { ...
); // close CatModel.findOne( ...
