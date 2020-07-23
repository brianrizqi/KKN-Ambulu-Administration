const MongoConnection = require('../configs/mongo');
const {getUser} = require('../middlewares/auth');
const dateformat = require('dateformat');

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
  
  static async getLetter(req, res, next) {
    const conn = await MongoConnection.connectMongo();
    const {category, year, page, itemsPerPage, sortBy, sortDesc, search} = req.query;
    let sort, query = {};
    if (sortBy && sortBy.length > 0) {
      const sortIndex = sortBy[0];
      sort[sortIndex] = sortDesc + '' === 'true' ? 1 : -1;
    }
    
    if (year) {
      query["$expr"] = {
        "$eq": [{"$year": "$created_at"}, parseInt(year)]
      }
    }
    
    if (search && search !== '') {
      query["$or"] = [
        {name: new RegExp(search, "i")},
        {creator: new RegExp(search, "i")},
        {number: new RegExp(search, "i")},
        {'category.name': new RegExp(search, "i")}
      ];
    }
    
    if(category && category !== 'all'){
      query["category.slug"] = category;
    }
    
    const data = await conn
      .collection('letters')
      .find(query)
      .sort(sort)
      .limit(parseInt(itemsPerPage))
      .skip((page - 1) * itemsPerPage)
      .toArray();
    
    let counter = itemsPerPage * (page - 1);
    
    data.forEach((data) => {
      data.created_at = dateformat(new Date(data.created_at), "d mmmm yyyy");
      data.no = ++counter;
    });
    
    const totalData = await conn.collection('letters').find(query).count();
    
    res.send({
      statusCode: 200,
      message: 'Success',
      data: {
        totalData: totalData,
        items: data
      }
    });
  }
}

module.exports = LetterService;
