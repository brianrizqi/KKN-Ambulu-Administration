const letterSeeder = require('../seeder/letter_categories');
const userSeeder = require('../seeder/users');

try {
  letterSeeder();
  userSeeder();
  console.log("Seeder Done! 🎉")
} catch (e) {
  console.log(e.message);
}
