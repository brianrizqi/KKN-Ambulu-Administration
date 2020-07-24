<template>
  <v-main>
    <v-container>
      <v-data-table
          :headers="headers"
          :items="data"
          :options.sync="options"
          :server-items-length="totalData"
          :loading="loading"
          :search="search"
          class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Daftar Surat</v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="row mt-8 hidden-sm-and-down">
              <v-select
                  v-model="category"
                  :items="categories"
                  label="Kategori"
                  item-text="name"
                  item-value="slug"
                  @change="getDataFromApi"
                  data-vv-name="category"
              >
              </v-select>
              <v-spacer></v-spacer>
              <v-select
                  v-model="year"
                  :items="years"
                  label="Tahun"
                  @change="getDataFromApi"
                  data-vv-name="category"
              >
              </v-select>
              <v-spacer></v-spacer>
              <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  @keyup="searchLetter"
                  single-line
                  hide-details
              ></v-text-field>
            </div>
            <v-spacer></v-spacer>
            <v-btn
                :to="{ name: 'LetterCreate' }"
                color="primary"
                dark
                class="mb-2"
            >Tambah Surat
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn @click="edit(item)" fab x-small dark class="mr-2 orange">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn fab x-small dark class="green" v-on:click="download(item)">
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>

<script>

  import AdminService from "../services/admin.service";

  export default {
    data() {
      return {
        category: 'all',
        categories: [],
        year: (new Date()).getFullYear(),
        years: [
          2020,
          2021,
          2022,
          2023
        ],
        search: '',
        totalData: 0,
        data: [],
        loading: true,
        options: {},
        headers: [
          {text: 'No', value: 'no', sortable: false, searchable: false},
          {text: 'Nama', value: 'name'},
          {text: 'Kategori', value: 'category.name'},
          {text: 'Nomor Surat', value: 'number'},
          {text: 'Pembuat', value: 'creator'},
          {text: 'Tanggal', value: 'created_at'},
          {text: 'Action', value: 'action', sortable: false, searchable: false},
        ],
      }
    },
    watch: {
      options: {
        handler() {
          this.getDataFromApi();
        },
        deep: true,
      },
    },
    mounted() {
      AdminService.getLetterCategories()
        .then((res) => {
          if (res.statusCode === 200) {
            res.data.unshift({
              name: 'Semua',
              slug: 'all'
            });
            this.categories = res.data;
          } else {
            this.$store.dispatch('errorSnackbar', res.message);
          }
        });
      // this.getDataFromApi();
    },
    methods: {
      download(letter) {
        AdminService.downloadLetter(letter._id)
          .then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', `${letter.number}.docx`);
            document.body.appendChild(fileLink);

            fileLink.click();
          });
      },
      getDataFromApi() {
        this.options.year = this.year;
        this.options.search = this.search;
        this.options.category = this.category;
        AdminService.getLetters(this.options)
          .then((response) => {
            if (response.statusCode === 200) {
              this.data = response.data.items;
              this.totalData = response.data.totalData;
            } else if (response.statusCode === 401) {
              this.$router.push('/logout');
            } else {
              this.$store.dispatch('errorSnackbar', response.message);
            }
          })
          .catch((err) => {
            this.$store.dispatch('errorSnackbar', err.message);
          });
        this.loading = false;
      },
      searchLetter() {
        clearTimeout(this._timerId)

        // delay new call 500ms
        this._timerId = setTimeout(() => {
          this.getDataFromApi();
        }, 500)
      }
    }
  }
</script>
