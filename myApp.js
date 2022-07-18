require('dotenv').config({path: './sample.env'});
const { Mongoose } = require('mongoose');
var mongoose = require("mongoose");
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true});

let personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);
//let documentPerson = new Person({name:"Andrew",age:31,favoriteFoods:["Rigatoni"]});
//console.log(documentPerson.proto);
//console.log(Person);

const createAndSavePerson = (done) => {
  let documentPerson = new Person({name:"Andrew",age:31,favoriteFoods:["Rigatoni"]});
  documentPerson.save(function(err,data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

let arrayOfPeople = [
  {name:"Andrew",age:31,favoriteFoods:["Rigatoni"]},
  {name:"Janice",age:31,favoriteFoods:["Noodle"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err,data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

//let personName = {name:"Andrew"};
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err,data) {
    console.log(personName);
    if (err) return console.error(err);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFood: {food}}, function(err,data) {
    if (err) return console.error(err);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err,data) {
    if (err) return console.error(err);
    done(null,data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err,person) {
    if (err) return console.error(err);
    person.favoriteFoods.push(foodToAdd)
    person.save(function(err,updatedPerson) {
      if (err) return console.error(err);
      done(null,updatedPerson)
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({"name": personName}, {"age": ageToSet}, { new: true }, function(err,updatedPerson)) {
    if (err) return console.error(err);
    done(null,updatedPerson);
  }
  
  /* Person.find({name: personName}, function(err,person) {
    if (err) return console.error(err);
    person.age = ageToSet;
    person.save(function(err,updatedPerson) {
      if (err) return console.error(err);
      done(null,updatedPerson)
    });
  }); */
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
