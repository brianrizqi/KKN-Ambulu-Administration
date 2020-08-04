const FIELDS = [
  {
    title: 'Tanggal',
    name: 'date',
    type: 'date'
  },
  {
    title: 'Nomor KTP / NIK',
    name: 'nik',
    type: 'text',
    length: 16
  },
  {
    title: 'No KK',
    name: 'no-kk',
    type: 'text',
    length: 16
  },
  {
    title: 'Nama',
    name: 'name',
    type: 'text',
    length: 64
  },
  {
    title: 'Jenis Kelamin',
    name: 'gender',
    type: 'select',
    data: [
      'Laki-Laki',
      'Perempuan'
    ]
  },
  {
    title: 'TTL',
    name: 'ttl',
    type: 'text',
    length: 32
  },
  {
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
  {
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
  {
    title: 'Pekerjaan',
    name: 'job',
    type: 'text',
    length: 32
  },
  {
    title: 'Alamat (Baris 1)',
    name: 'address_1',
    type: 'text',
    length: 64
  },
  {
    title: 'Alamat (Baris 2)',
    name: 'address_2',
    type: 'text',
    length: 64
  },
  {
    title: 'Tujuan',
    name: 'target',
    type: 'text',
    length: 64
  },
  {
    title: 'Keterangan',
    name: 'etc',
    type: 'text',
    length: 256
  },
  {
    title: 'Umur',
    name: 'age',
    type: 'number',
  }
];

for (const key in FIELDS){
  FIELDS[key].template = FIELDS[key].name;
}

export default FIELDS;
