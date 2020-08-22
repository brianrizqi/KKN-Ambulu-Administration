const MongoAPI = require('../configs/mongo');

const FIELDS = {
  phone: {
    title: 'Nomor Telepon',
    name: 'phone',
    type: 'text',
    
  },
  date: {
    title: 'Tanggal',
    name: 'date',
    type: 'date',
    
  },
  nik: {
    title: 'Nomor KTP / NIK',
    name: 'nik',
    type: 'text',
    length: 16,
    
  },
  no_kk: {
    title: 'No KK',
    name: 'no-kk',
    type: 'text',
    length: 16,
    
  },
  name: {
    title: 'Nama',
    name: 'name',
    type: 'text',
    length: 64,
    
  },
  gender: {
    title: 'Jenis Kelamin',
    name: 'gender',
    type: 'select',
    data: [
      'Laki-Laki',
      'Perempuan'
    ],
    
  },
  ttl: {
    title: 'TTL',
    name: 'ttl',
    type: 'text',
    length: 32,
    
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
    ],
    
  },
  marriage_status: {
    title: 'Status Pernikahan',
    name: 'marriage_status',
    type: 'select',
    data: [
      'Belum Menikah',
      'Menikah',
      'Cerai Mati',
      'Lain-Lain'
    ],
    
  },
  job: {
    title: 'Pekerjaan',
    name: 'job',
    type: 'text',
    length: 32,
    
  },
  address_1: {
    title: 'Alamat (Baris 1)',
    name: 'address_1',
    type: 'text',
    length: 64,
    
  },
  address_2: {
    title: 'Alamat (Baris 2)',
    name: 'address_2',
    type: 'text',
    length: 64,
    
  },
  target: {
    title: 'Tujuan',
    name: 'target',
    type: 'text',
    length: 64,
    
  },
  etc: {
    title: 'Keterangan',
    name: 'etc',
    type: 'text',
    length: 256,
    
  },
  age: {
    title: 'Umur',
    name: 'age',
    type: 'number',
    
  },
  nationality: {
    title: 'Kebangsaan / Suku',
    name: 'nationality',
    type: 'text',
    length: 64,
  },
}

async function exec() {
  for (const key in FIELDS) {
    FIELDS[key].template = key
  }
  
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
            FIELDS.nationality,
            FIELDS.marriage_status,
            FIELDS.religion,
            FIELDS.job,
            FIELDS.nik,
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
      number_format: ':no / 35.09.12.2004 / 2020',
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
        },
        {
          name: 'Surat Keterangan Beda Identitas',
          slug: 'surat-keterangan-beda-identitas',
          letter_format_file: 'lain-lain/surat-keterangan-beda-identitas.docx',
          fields: [
            FIELDS.name,
            {
              title: 'Nama KTP',
              name: 'nama_ktp',
              type: 'text',
              length: 64
            },
            {
              title: 'NIK KTP',
              name: 'nik_ktp',
              type: 'text',
              length: 64
            },
            {
              title: 'NIK KK',
              name: 'nik_kk',
              type: 'text',
              length: 64
            },
            {
              title: 'Nomor KK',
              name: 'no_ktp',
              type: 'text',
              length: 64
            },
            {
              title: 'Nama KK',
              name: 'nama_kk',
              type: 'text',
              length: 64
            },
            {
              title: 'Identitas Yang Benar',
              name: 'real',
              type: 'select',
              data: [
                'KTP',
                'Kartu Keluarga'
              ]
            },
            FIELDS.etc
          ]
        },
        {
          name: 'Surat Keterangan Belum Menikah',
          slug: 'surat-keterangan-belum-menikah',
          letter_format_file: 'lain-lain/surat-keterangan-belum-menikah.docx',
          fields: [
            FIELDS.name,
            FIELDS.gender,
            FIELDS.ttl,
            FIELDS.nik,
            FIELDS.religion,
            FIELDS.marriage_status,
            FIELDS.job,
            FIELDS.address_1,
            FIELDS.address_2,
            FIELDS.etc
          ]
        },
        {
          name: 'Tidak Tercatat KUA',
          slug: 'tidak-tercatat-kua',
          letter_format_file: 'lain-lain/tidak-tercatat-kua.docx',
          fields: [
            FIELDS.name,
            FIELDS.ttl,
            FIELDS.religion,
            FIELDS.job,
            FIELDS.address_1,
            FIELDS.address_2,
            {
              title: 'Nama Istri',
              name: 'name_istri',
              type: 'text',
              length: 64
            },
            {
              title: 'TTL Istri',
              name: 'ttl_istri',
              type: 'text',
              length: 64
            },
            {
              title: 'Agama Istri',
              name: 'religion_istri',
              type: 'select',
              data: [
                'Islam',
                'Kristen',
                'Khatolik',
                'Budha',
                'Hindu',
                'Lain-Lain'
              ],
            },
            {
              title: 'Pekerjaan Istri',
              name: 'job_istri',
              type: 'text',
              length: 64
            },
            {
              title: 'Alamat istri (Baris 1)',
              name: 'address_istri_1',
              type: 'text',
              length: 64,
            },
            {
              title: 'Alamat istri (Baris 2)',
              name: 'address_istri_2',
              type: 'text',
              length: 64,
            },
            FIELDS.etc
          ]
        },
        {
          name: 'Surat Pembetulan KK',
          slug: 'surat-pembetulan-kk',
          letter_format_file: 'lain-lain/surat-pembetulan-kk.docx',
          fields: [
            FIELDS.name,
            FIELDS.gender,
            FIELDS.religion,
            FIELDS.address_1,
            FIELDS.address_2,
            FIELDS.ttl,
            {
              title: 'Nama Ayah',
              name: 'father_name',
              type: 'text',
              length: 64
            },
            {
              title: 'Terhitung Anak No',
              name: 'kid_number',
              type: 'number'
            },
            {
              title: 'Nama Ibu',
              name: 'mother_name',
              type: 'text',
              length: 64
            },
            {
              title: 'Alamat Orang Tua (Baris 1)',
              name: 'parent_address_1',
              type: 'text',
              length: 64
            },
            {
              title: 'Alamat Orang Tua (Baris 2)',
              name: 'parent_address_2',
              type: 'text',
              length: 64
            },
            FIELDS.etc
          ]
        },
        {
          name: 'Surat Keterangan Penghasilan',
          slug: 'surat-keterangan-penghasilan',
          letter_format_file: 'lain-lain/surat-keterangan-penghasilan.docx',
          fields: [
            FIELDS.name,
            FIELDS.gender,
            FIELDS.ttl,
            {
              title: 'Sekolah / Kampus',
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
          name: 'Surat Domisili Usaha',
          slug: 'surat-domisili-usaha',
          letter_format_file: 'lain-lain/surat-domisili-usaha.docx',
          fields: [
            FIELDS.name,
            {
              title: 'Bidang Usaha',
              name: 'category',
              type: 'text',
              length: 64
            },
            {
              title: 'Nama Pemilik',
              name: 'owner_name',
              type: 'text',
              length: 64
            },
            FIELDS.address_1,
            FIELDS.etc
          ]
        },
        {
          name: 'Surat Domisili Lembaga',
          slug: 'surat-domisili-lembaga',
          letter_format_file: 'lain-lain/surat-domisili-lembaga.docx',
          fields: [
            FIELDS.name,
            {
              title: 'Bidang',
              name: 'category',
              type: 'text',
              length: 64
            },
            {
              title: 'Nama Kepala Lembaga',
              name: 'owner_name',
              type: 'text',
              length: 64
            },
            FIELDS.address_1,
            FIELDS.address_2,
            FIELDS.phone,
            FIELDS.etc
          ]
        },
        {
          name: 'Surat Keterangan Usaha',
          slug: 'surat-keterangan-usaha',
          letter_format_file: 'lain-lain/surat-keterangan-usaha.docx',
          fields: [
            FIELDS.name,
            FIELDS.gender,
            FIELDS.ttl,
            FIELDS.nik,
            FIELDS.religion,
            FIELDS.marriage_status,
            FIELDS.job,
            FIELDS.address_1,
            FIELDS.address_2,
            {
              title: 'Jenis Usaha',
              name: 'usaha',
              type: 'text',
              length: 64
            },
            FIELDS.etc
          ]
        },
        {
          name: 'Surat Keterangan Tidak Mampu (Umum)',
          slug: 'surat-keterangan-tidak-mampu-umum',
          letter_format_file: 'lain-lain/surat-keterangan-tidak-mampu-umum.docx',
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
  
  data.forEach(cat => {
    cat.letters.forEach(letter => {
      letter.fields.forEach(field => {
        field.template = field.template ?? 'custom';
      })
    })
  })
  await MongoAPI.clearCollection('letter_categories');
  await MongoAPI.insertMany(data, 'letter_categories');
}

module.exports = exec;
