const MongoConnection = require('../configs/mongo');
const slugify = require('slugify');
const {getUser} = require('../middlewares/auth');
const dateformat = require('dateformat');
const {ObjectId} = require('mongodb');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const Joi = require('joi');
var path = require('path');
var fs = require('fs');

const LetterCategoryService = class LetterCategoryService {
  static downloadExample(req, res) {
    res.download(path.resolve('./misc/temporary', `example.docx`));
  }
  
  static async downloadType(req, res){
    const categorySlug = req.params.category;
    const slug = req.params.slug;
    const category = await MongoConnection.findOne({
      slug: categorySlug
    }, 'letter_categories');
    const type = category.letters.find(t => t.slug === slug);
    res.download(path.resolve(`./misc/templates/${type.letter_format_file}`));
  }
  
  static async addCategory(req, res, next) {
    const category = req.params.category;
    
    const attachment = req.files.attachment;
    
    const data = req.body;
    data.slug = slugify(data.name);
    data.fields = JSON.parse(data.fields);
    data.letter_format_file = `${category}/${data.slug}.docx`;
    await attachment.mv(path.resolve(`./misc/templates/${data.letter_format_file}`));
    await MongoConnection.push({
        slug: category
      },
      {
        letters: data
      }, 'letter_categories');
    
    res.send({
      statusCode: 200,
      message: "Tipe surat berhasil ditambahkan"
    })
  }
  
  static async deleteCategoryType(req, res){
    const category = req.params.category;
    const type = req.params.type;
    await MongoConnection.pull({
      slug: category
    }, {
      letters: {
        slug: type
      }
    }, 'letter_categories');
    fs.unlink(path.resolve(`./misc/templates/${category}/${type}.docx`), () => {
      res.send({
        statusCode: 200,
        message: 'Tipe Surat Berhasil dihapus'
      })
    });
  }
  
  static async updateCategoryType(req, res){
    const category = await MongoConnection.findOne({
      slug: req.params.category,
    }, 'letter_categories');
    
    const letterType = category.letters.find(letter => letter.slug === req.params.type);
  
    try {
      const attachment = req.files.attachment;
      await attachment.mv(path.resolve(`./misc/templates/${letterType.letter_format_file}`));
    } catch (e) {
      console.log(e);
    }
    
    await MongoConnection.updateOne({
      slug: req.params.category,
      'letters.slug': req.params.type
    }, {
      "letters.$.fields": JSON.parse(req.body.fields)
    }, 'letter_categories');
  
    res.send({
      statusCode: 200,
      message: 'Update berhasil'
    });
    
  }
}

module.exports = LetterCategoryService;
