const MongoConnection = require('../configs/mongo');
const {getUser} = require('../middlewares/auth');

const LetterService = class LetterService {
  static async getLetterCategories(req, res, next) {
    res.send({
      statusCode: 200,
      data: await MongoConnection.find({}, 'letter_categories')
    });
  }
  
  static async createLetter(req, res, next) {
    const categorySlug = req.body.category;
    const category = await MongoConnection.findOne({
      slug: categorySlug
    }, 'letter_categories');
    
    if (!category) {
      return res.send({
        statusCode: 500,
        message: 'Category not found'
      });
    }
    
    const letterData = {};
    
    category.fields.forEach(field => {
      if (!req.body[field.name]) {
        return res.send({
          statusCode: 422,
          message: `${field.name} is required`
        })
      } else {
        letterData[field.name] = req.body[field.name];
      }
    });
    
    const user = getUser(req);
    
    letterData.number = category.number_format.replace(':no', category.counter);
    letterData.category = category;
    letterData.created_at = new Date();
    letterData.updated_at = new Date();
    letterData.creator = user.name;
    
    await MongoConnection.insertOne(letterData, 'letters');
    await MongoConnection.updateOne({
      slug: category.slug
    }, {
      counter: category.counter + 1
    }, 'letter_categories');
    
    res.send({
      statusCode: 200,
      message: 'Surat Berhasil Dibuat',
      data: {
        letter: letterData
      }
    });
  }
}

module.exports = LetterService;
