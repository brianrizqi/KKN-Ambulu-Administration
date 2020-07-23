const MongoAPI = require('../configs/mongo');

const FIELDS = {
  date: {
    title: 'Tanggal',
    name: 'date',
    type: 'date'
  },
  nik: {
    title: 'NIK',
    name: 'nik',
    type: 'text',
    length: 16
  },
  no_kk: {
    title: 'No KK',
    name: 'no-kk',
    type: 'text',
    length: 16
  },
  name: {
    title: 'Nama',
    name: 'name',
    type: 'text',
    length: 64
  },
  gender: {
    title: 'Jenis Kelamin',
    name: 'gender',
    type: 'select',
    data: [
      'Laki-Laki',
      'Perempuan'
    ]
  },
  ttl: {
    title: 'TTL',
    name: 'ttl',
    type: 'text',
    length: 32
  },
  religion: {
    title: 'Agama',
    name: 'religion',
    type: 'select',
    data: [
      'Islam',
      'Kristen',
      'Khatolik',
      'Budha',
      'Hindu',
      'Lain-Lain'
    ]
  },
  job: {
    title: 'Pekerjaan',
    name: 'job',
    type: 'text',
    length: 32
  },
  address: {
    title: 'Alamat',
    name: 'address',
    type: 'text',
    length: 128
  },
  target: {
    title: 'Tujuan',
    name: 'target',
    type: 'text',
    length: 64
  },
  etc: {
    title: 'Keterangan',
    name: 'etc',
    type: 'text',
    length: 256
  },
  age: {
    title: 'Umur',
    name: 'age',
    type: 'number',
  }
}

async function exec(){
  const data = [
    {
      name: 'Pindah Nikah',
      slug: 'pindah-nikah',
      number_format: 'asd/asd/asd',
      letter_format_file: 'pindah-nikah',
      counter: 1,
      fields: [
        FIELDS.name,
        FIELDS.address,
        FIELDS.target
      ]
    },
    {
      name: 'Pindah Tempat',
      slug: 'pindah-tempat',
      number_format: 'asd/asd/asd',
      letter_format_file: 'pindah-tempat',
      counter: 1,
      fields: [
        FIELDS.date,
        FIELDS.nik,
        FIELDS.no_kk,
        FIELDS.name,
        FIELDS.gender,
        FIELDS.ttl,
        FIELDS.religion,
        FIELDS.job,
        FIELDS.address,
        FIELDS.target
      ]
    },
    {
      name: 'SKCK',
      slug: 'skck',
      number_format: 'asd/asd/asd',
      letter_format_file: 'skck',
      counter: 1,
      fields: [
        FIELDS.date,
        FIELDS.name,
        FIELDS.gender,
        FIELDS.ttl,
        FIELDS.religion,
        FIELDS.job,
        FIELDS.address,
        FIELDS.etc
      ]
    },
    {
      name: 'Kelahiran (Akte/KK)',
      slug: 'kelahiran',
      number_format: 'asd/asd/asd',
      letter_format_file: 'birth',
      counter: 1,
      fields: [
        FIELDS.date,
        FIELDS.name,
        FIELDS.gender,
        FIELDS.ttl,
        FIELDS.address,
        {
          title: 'Anak Ke',
          name: 'number-of-kid',
          type: 'number',
        },
        {
          title: 'Nama Ortu',
          name: 'parent_name',
          type: 'text',
          length: 64
        },
        FIELDS.etc
      ]
    },
    {
      name: 'Kematian',
      slug: 'kematian',
      number_format: 'asd/asd/asd',
      letter_format_file: 'death',
      counter: 1,
      fields: [
        FIELDS.date,
        FIELDS.nik,
        FIELDS.no_kk,
        FIELDS.name,
        FIELDS.gender,
        FIELDS.age,
        FIELDS.address,
        {
          title: 'Tanggal Kematian',
          name: 'death_date',
          type: 'date'
        },
        FIELDS.etc
      ]
    },
    {
      name: 'Ahli Waris',
      slug: 'ahli-waris',
      number_format: 'asd/asd/asd',
      letter_format_file: 'legacy',
      counter: 1,
      fields: [
        FIELDS.date,
        {
          title: 'Nama Almarhum',
          name: 'name_past',
          type: 'text',
          length: 32
        },
        {
          title: 'Nomor Surat',
          name: 'letter_number',
          type: 'text',
          length: 32
        },
        {
          title: 'Jumlah Ahli Waris',
          name: 'legacy_count',
          type: 'number'
        },
        {
          title: 'Nama Ahli Waris',
          name: 'legacy_name',
          type: 'text',
          length: 32
        },
        FIELDS.etc
      ]
    },
    {
      name: 'Lain Lain',
      slug: 'lain-lain',
      number_format: 'asd/asd/asd',
      letter_format_file: 'other',
      counter: 1,
      fields: [
        FIELDS.date,
        FIELDS.name,
        FIELDS.gender,
        FIELDS.ttl,
        FIELDS.religion,
        FIELDS.job,
        FIELDS.address,
        FIELDS.etc
      ]
    }
  ]
  await MongoAPI.clearCollection('letter_categories');
  await MongoAPI.insertMany(data, 'letter_categories');
}

module.exports = exec;
