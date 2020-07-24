const MongoConnection = require('../configs/mongo');
const {getUser} = require('../middlewares/auth');
const dateformat = require('dateformat');
const {ObjectId} = require('mongodb');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
var path = require('path');
var fs = require('fs');

dateformat.i18n = {
  dayNames: [
    'Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab',
    'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu'
  ],
  monthNames: [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ],
  timeNames: [
    'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
  ]
};

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
    
    const type = category.letters.find(letter => letter.slug === req.body.letter_type);
    
    if (!type) {
      return res.send({
        statusCode: 500,
        message: 'Letter Type not found'
      });
    }
    
    const letterData = {};
    
    type.fields.forEach(field => {
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
    
    delete category['letters'];
    
    letterData.category = category;
    letterData.letter_type = type;
    letterData.number = category.number_format.replace(':no', category.counter);
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
    let sort = {};
    let query = {};
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
    
    if (category && category !== 'all') {
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
  
  static async downloadLetter(req, res, next) {
    const id = req.body.letterId;
    const letter = await MongoConnection.findOne({
      _id: ObjectId(id)
    }, 'letters');
    
    if (!letter) {
      res.send({
        statusCode: 404,
        message: 'Letter Not Found'
      });
    }
    
    letter.date = dateformat(new Date(letter.created_at), "d mmmm yyyy");
    
    const content = fs.readFileSync(path.resolve(`./misc/templates/${letter.letter_type.letter_format_file}`), 'binary');
    var zip = new PizZip(content);
    var doc;
    try {
      doc = new Docxtemplater(zip);
      doc.setData(letter);
      doc.render();
    } catch (e) {
      res.send({
        statusCode: 500,
        message: e.message
      });
    }
    
    var buf = doc.getZip()
      .generate({type: 'nodebuffer'});
  
    fs.writeFileSync(path.resolve('./misc/temporary', `${letter.letter_type.name} - ${letter.name}.docx`), buf);
    
    res.download(path.resolve('./misc/temporary', `${letter.letter_type.name} - ${letter.name}.docx`));
  }
}

module.exports = LetterService;
