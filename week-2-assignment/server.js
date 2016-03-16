const NAME = 'Uthapizza',
      DESCRIPTION = 'Test description',
      LABEL = 'Test label',
      PRICE_NUMBER = 5,
      PRICE = '$' + PRICE_NUMBER;

var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes');

// Connection URL
var url = 'mongodb://localhost:27017/';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("Connected correctly to server");

  // create a new user
  var newDish = Dishes({
      name: NAME,
      description: DESCRIPTION,
      label: LABEL,
      price: PRICE
  });

    // save the user
  newDish.save(function (err) {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log('Dish created!');

    // get all the users
    Dishes.find({}, function (err, dishes) {
      if (err) throw err;

      // object of all the users
      console.log(dishes);
      assert.equal(dishes.length, 1);

      var dish = dishes[0];
      assert.equal(dish.name, NAME);
      assert.equal(dish.description, DESCRIPTION);
      assert.equal(dish.label, LABEL);
      assert.equal(dish.price.toFixed(2), 500);

      db.collection('dishes').drop(function () {
      db.close();
      });
    });
  });
});
