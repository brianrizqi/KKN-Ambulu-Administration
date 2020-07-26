<template>
  <v-main>
    <v-container class="mb-15">
      <v-row dense>
        <v-col
            sm="12"
            md="6"
            lg="4"
            xl="3"
            class="pa-3 d-flex flex-column"
            v-for="category
            in categories"
            :key="category.slug"
        >
          <v-card
              :color="category.color"
              dark
              class="elevation-5 flex d-flex flex-column">
            <v-card-title class="headline">{{ category.name }}</v-card-title>

            <v-card-subtitle class="font-weight-bold">
              {{ category.number_format }}
            </v-card-subtitle>

            <v-card-text class="flex">
              <div class="body-1">
                {{ category.letter_types }}
              </div>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions class="">
              <v-btn text v-on:click="detailCategory(category.slug)">
                <v-icon sm class="mr-2">
                  mdi-information-outline
                </v-icon>
                Detail
              </v-btn>
              <v-btn text v-on:click="createLetterType(category.slug)">
                <v-icon sm class="mr-2">
                  mdi-plus
                </v-icon>
                Tambah
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
  import AdminService from "@/services/admin.service";

  export default {
    mounted() {
      this.init();
    },
    data: () => {
      return {
        categories: []
      }
    },
    methods: {
      async init() {
        AdminService.getLetterCategories()
          .then((response) => {
            if (response.statusCode === 200) {
              const categories = response.data;
              categories.forEach(category => {
                category.color = this.$randomColor({
                  luminosity: 'dark',
                  hue: 'blue'
                });
                category.letter_types = category.letters.map(type => type.name).join(", ");
              });
              this.categories = categories;
            } else if (response.statusCode === 401) {
              this.$router.push('/logout');
            } else {
              this.$store.dispatch('errorSnackbar', response.message);
            }
          })
      },
      createLetterType(category) {
        this.$router.push({
          name: 'LetterCategoryTypeCreate', params: {
            category: category
          }
        });
      },
      detailCategory(category){
        this.$router.push({
          name: 'LetterCategoryDetail', params: {
            category: category
          }
        });
      }
    }
  }
</script>

<style>
  .scale-hover {
    transition: 0.5s;
  }
</style>
