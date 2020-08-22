const MongoAPI = require('../configs/mongo');
const BcryptHash = require('../configs/hash');

function userSeeder(){
  MongoAPI.insertOne({
    name: 'Admin',
    username: 'admin',
    password: BcryptHash.hash('wagalama')
  }, 'users');
}
