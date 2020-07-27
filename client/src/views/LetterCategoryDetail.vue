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
            v-for="type
            in types"
            :key="type._id"
        >
          <v-card
              :color="type.color"
              dark
              class="elevation-5 flex d-flex flex-column">
            <v-card-title class="headline">{{ type.name }}</v-card-title>
            <v-spacer></v-spacer>
            <v-card-actions class="">
              <v-btn text v-on:click="downloadType(type.slug)">
                <v-icon sm class="mr-2">
                  mdi-download
                </v-icon>
                Template
              </v-btn>
<!--              <v-btn text v-on:click="editType(type.slug)">-->
<!--                <v-icon sm class="mr-2">-->
<!--                  mdi-pencil-->
<!--                </v-icon>-->
<!--                Edit-->
<!--              </v-btn>-->
              <v-btn text v-on:click="deleteType(type.slug)">
                <v-icon sm class="mr-2">
                  mdi-delete
                </v-icon>
                Hapus
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
  import AdminService from "../services/admin.service";

  export default {
    name: "LetterCategoryDetail",
    data: () => {
      return {
        types: [],
        category: {}
      }
    },
    mounted() {
      AdminService.getLetterCategories()
        .then((response) => {
          if (response.statusCode === 200) {
            this.category = response.data.find(cat => cat.slug === this.$route.params.category);
            this.category.letters.forEach(type => {
              type.color = this.$randomColor({
                luminosity: 'dark',
              });
            });
            this.types = this.category.letters;
          } else if (response.statusCode === 401) {
            this.$router.push('/logout');
          } else {
            this.$store.dispatch('errorSnackbar', response.message);
          }
        })
    },
    methods: {
      editType(slug) {
        this.$router.push({
          name: 'LetterCategoryTypeEdit', params: {
            category: this.category.slug,
            type: slug
          }
        })
      },
      downloadType(slug) {
        AdminService.downloadCategoryType(this.category.slug, slug)
          .then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response]));
            var fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', `${slug}.docx`);
            document.body.appendChild(fileLink);

            fileLink.click();
          })
      },
      deleteType(slug) {
        AdminService.removeCategoryType(this.category.slug, slug)
          .then((res) => {
            if (res.statusCode === 200) {
              this.types = this.types.filter(type => type.slug !== slug);
              this.$store.dispatch('successSnackbar', res.message);
            } else if (res.statusCode === 401) {
              this.$router.push('/logout');
            } else {
              this.$store.dispatch('errorSnackbar', res.message);
            }
          });
      }
    }
  }
</script>

<style scoped>

</style>
