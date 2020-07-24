const MongoAPI = require('../configs/mongo');

const FIELDS = {
  date: {
    title: 'Tanggal',
    name: 'date',
    type: 'date'
  },
  nik: {
    title: 'Nomor KTP / NIK',
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
  marriage_status: {
    title: 'Status Pernikahan',
    name: 'marriage_status',
    type: 'select',
    data: [
      'Single',
      'Menikah',
      'Janda/Duda',
      'Cerai',
      'Lain-Lain'
    ]
  },
  job: {
    title: 'Pekerjaan',
    name: 'job',
    type: 'text',
    length: 32
  },
  address_1: {
    title: 'Alamat (Baris 1)',
    name: 'address_1',
    type: 'text',
    length: 64
  },
  address_2: {
    title: 'Alamat (Baris 2)',
    name: 'address_2',
    type: 'text',
    length: 64
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

async function exec() {
  const data = [
    {
      name: 'SKCK',
      slug: 'skck',
      number_format: 'asd/asd/asd',
      counter: 1,
      letters: [
        {
          name: 'Standard',
          slug: 'standard',
          letter_format_file: 'skck/standard.docx',
          fields: [
            FIELDS.date,
            FIELDS.name,
            FIELDS.gender,
            FIELDS.ttl,
            FIELDS.religion,
            FIELDS.job,
            FIELDS.address_1,
            FIELDS.address_2,
            FIELDS.etc
          ]
        }
      ]
    },
    {
      name: 'Kelahiran (Akte/KK)',
      slug: 'kelahiran',
      number_format: 'asd/asd/asd',
      counter: 1,
      letters: [
        {
          name: 'Standard',
          slug: 'standard',
          letter_format_file: 'surat-kelahiran/standard.docx',
          fields: [
            FIELDS.date,
            FIELDS.name,
            FIELDS.gender,
            FIELDS.ttl,
            FIELDS.address_1,
            FIELDS.address_2,
            {
              title: 'Anak Ke',
              name: 'number_of_kid',
              type: 'number',
            },
            {
              title: 'Nama Ayah',
              name: 'father_name',
              type: 'text',
              length: 64
            },
            {
              title: 'Nama Ibu',
              name: 'mother_name',
              type: 'text',
              length: 64
            },
            FIELDS.etc
          ]
        }
      ]
    },
    {
      name: 'Kematian',
      slug: 'kematian',
      number_format: 'asd/asd/asd',
      counter: 1,
      letters: [
        {
          name: 'Standard',
          slug: 'standrad',
          letter_format_file: 'surat-kematian/standard.docx',
          fields: [
            FIELDS.date,
            FIELDS.nik,
            FIELDS.no_kk,
            FIELDS.name,
            FIELDS.gender,
            FIELDS.age,
            FIELDS.address_1,
            FIELDS.address_2,
            {
              title: 'Tanggal Kematian',
              name: 'death_date',
              type: 'date'
            },
            {
              title: 'Tempat Kematian',
              name: 'death_place',
              type: 'text'
            },
            FIELDS.etc
          ]
        }
      ]
    },
    {
      name: 'Lain Lain',
      slug: 'lain-lain',
      number_format: 'asd/asd/asd',
      counter: 1,
      letters: [
        {
          name: 'Surat Domisili',
          slug: 'domisili',
          letter_format_file: 'lain-lain/domisili.docx',
          fields: [
            FIELDS.name,
            FIELDS.gender,
            FIELDS.ttl,
            FIELDS.religion,
            FIELDS.job,
            FIELDS.marriage_status,
            FIELDS.nik,
            FIELDS.address_1,
            FIELDS.address_2,
            FIELDS.etc
          ]
        },
        {
          name: 'Surat Keterangan Tidak Mampu (Mahasiswa)',
          slug: 'sktm-mahasiswa',
          letter_format_file: 'lain-lain/sktm-mahasiswa.docx',
          fields: [
            FIELDS.name,
            FIELDS.gender,
            FIELDS.ttl,
            {
              title: 'Kampus',
              name: 'school',
              type: 'text',
              length: 64
            },
            FIELDS.religion,
            FIELDS.address_1,
            FIELDS.address_2,
            {
              title: 'Nama Wali',
              name: 'parent_name',
              type: 'text',
              length: 64
            },
            {
              title: 'Jenis Kelamin Wali',
              name: 'parent_gender',
              type: 'select',
              data: [
                'Laki-Laki',
                'Perempuan'
              ]
            },
            {
              title: 'TTL Wali',
              name: 'parent_ttl',
              type: 'text',
              length: 32
            },
            {
              title: 'Pekerjaan Wali',
              name: 'parent_job',
              type: 'text',
              length: 64
            },
            {
              title: 'Agama Wali',
              name: 'parent_religion',
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
            {
              title: 'Alamat Wali (Baris 1)',
              name: 'parent_address_1',
              type: 'text',
              length: 64
            },
            {
              title: 'Alamat Wali (Baris 2)',
              name: 'parent_address_2',
              type: 'text',
              length: 64
            },
            FIELDS.etc
          ]
        },
        {
          name: 'Surat Keterangan Tidak Mampu (Siswa)',
          slug: 'sktm-siswa',
          letter_format_file: 'lain-lain/sktm-siswa.docx',
          fields: [
            FIELDS.name,
            FIELDS.gender,
            FIELDS.ttl,
            {
              title: 'Sekolah',
              name: 'school',
              type: 'text',
              length: 64
            },
            FIELDS.religion,
            FIELDS.address_1,
            FIELDS.address_2,
            {
              title: 'Nama Wali',
              name: 'parent_name',
              type: 'text',
              length: 64
            },
            {
              title: 'Jenis Kelamin Wali',
              name: 'parent_gender',
              type: 'select',
              data: [
                'Laki-Laki',
                'Perempuan'
              ]
            },
            {
              title: 'TTL Wali',
              name: 'parent_ttl',
              type: 'text',
              length: 32
            },
            {
              title: 'Pekerjaan Wali',
              name: 'parent_job',
              type: 'text',
              length: 64
            },
            {
              title: 'Agama Wali',
              name: 'parent_religion',
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
            {
              title: 'Alamat Wali (Baris 1)',
              name: 'parent_address_1',
              type: 'text',
              length: 64
            },
            {
              title: 'Alamat Wali (Baris 2)',
              name: 'parent_address_2',
              type: 'text',
              length: 64
            },
            FIELDS.etc
          ]
        }
      ]
    },
    
    
    // {
    //   name: 'Pindah Nikah',
    //   slug: 'pindah-nikah',
    //   number_format: 'asd/asd/asd',
    //   counter: 1,
    //   letters: [
    //     {
    //       name: 'Pindah Nikah',
    //       slug: 'pindah-nikah',
    //       letter_format_file: 'pindah-nikah',
    //       fields: [
    //         FIELDS.name,
    //         FIELDS.address_1,
    //         FIELDS.address_2,
    //         FIELDS.target
    //       ]
    //     }
    //   ]
    // },
    // {
    //   name: 'Pindah Tempat',
    //   slug: 'pindah-tempat',
    //   number_format: 'asd/asd/asd',
    //   letter_format_file: 'pindah-tempat',
    //   counter: 1,
    //   fields: [
    //     FIELDS.date,
    //     FIELDS.nik,
    //     FIELDS.no_kk,
    //     FIELDS.name,
    //     FIELDS.gender,
    //     FIELDS.ttl,
    //     FIELDS.religion,
    //     FIELDS.job,
    //     FIELDS.address_1,
    //     FIELDS.address_2,
    //     FIELDS.target
    //   ]
    // },
    // {
    //   name: 'Ahli Waris',
    //   slug: 'ahli-waris',
    //   number_format: 'asd/asd/asd',
    //   letter_format_file: 'legacy',
    //   counter: 1,
    //   fields: [
    //     FIELDS.date,
    //     {
    //       title: 'Nama Almarhum',
    //       name: 'name_past',
    //       type: 'text',
    //       length: 32
    //     },
    //     {
    //       title: 'Nomor Surat',
    //       name: 'letter_number',
    //       type: 'text',
    //       length: 32
    //     },
    //     {
    //       title: 'Jumlah Ahli Waris',
    //       name: 'legacy_count',
    //       type: 'number'
    //     },
    //     {
    //       title: 'Nama Ahli Waris',
    //       name: 'legacy_name',
    //       type: 'text',
    //       length: 32
    //     },
    //     FIELDS.etc
    //   ]
    // }
  ]
  await MongoAPI.clearCollection('letter_categories');
  await MongoAPI.insertMany(data, 'letter_categories');
}

module.exports = exec;
