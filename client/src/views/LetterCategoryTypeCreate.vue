<template>
  <v-main>
    <v-form>
      <v-container>
        <v-row>
          <v-col class="col-lg-3 col-md-6 col-sm-12">
            <v-card class="elevation-4 flex d-flex flex-column pa-3 mb-5">
              <v-card-text>
                <p>Silahkan upload surat dengan memberi tanda <code>{}</code> di dalam variabel, lalu masukan variabel
                  pada form disamping untuk contoh silahkan download surat berikut : </p>
                <v-btn small class="primary">Download Contoh</v-btn>
              </v-card-text>
            </v-card>

            <v-card class="pa-3 elevation-4 d-flex flex-column mb-5">
              <v-file-input
                  v-model="documentFile"
                  placeholder="Upload file dokumen"
                  label="File input"
                  prepend-icon="mdi-paperclip"
              >
                <template v-slot:selection="{ text }">
                  <v-chip
                      small
                      label
                      color="primary"
                  >
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
            </v-card>
          </v-col>

          <v-col class="col-lg-9 col-md-6 col-sm-12">
            <v-slide-y-transition group name="fade-in-out">
              <v-card class="pa-6 elevation-4 flex d-flex flex-column mb-5 fade-transition"
                      v-for="(variable, index) in variables"
                      :key="index">
                <v-btn elevation="0" color="primary" class="mb-5">
                  Variabel - {{ index + 1 }}
                </v-btn>
                <v-select
                    label="Template"
                    :items="typeTemplates"
                    v-model="variables[index]"
                    return-object
                    item-text="title">
                </v-select>
                <v-row>
                  <v-col cols="4">
                    <v-text-field :label="' Nama Variabel ' + (index + 1)"
                                  v-model="variable.name"
                                  :disabled="variable.name !== 'custom'">

                    </v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field :label="' Label Variabel ' + (index + 1)"
                                  v-model="variable.title"
                                  :disabled="variable.name !== 'custom'">

                    </v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-select :items="variableTypes"
                              v-model="variable.type"
                              :disabled="variable.name !== 'custom'">

                    </v-select>
                  </v-col>
                </v-row>
                <v-combobox
                    v-if="variable.type === 'select'"
                    v-model="variable.data"
                    hide-selected
                    hide-no-data
                    label="Pilihan"
                    multiple
                    small-chips
                >
                </v-combobox>
                <v-btn small dark class="red lighten-1" top right v-if="variables.length > 1" v-on:click="deleteVariable(index)">
                  Hapus
                </v-btn>
              </v-card>
            </v-slide-y-transition>
            <v-btn width="100%" class="green lighten-1 mb-5" dark elevation="4" v-on:click="addVariable">
              Tambah
            </v-btn>
            <v-btn class="primary" dark width="100%" elevation="4">
              Submit
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-main>
</template>

<script>
  import FIELDS from "../misc/fields";
  import AdminService from "../services/admin.service";

  export default {
    name: "LetterCategoryTypeCreate",
    data: () => {
      return {
        category: {},
        documentFile: null,
        variableTypes: [
          'text',
          'number',
          'date',
          'select'
        ],
        typeTemplates: FIELDS,
        variables: [
          {
            name: 'custom',
            title: 'Custom',
            type: 'custom'
          }
        ]
      }
    },
    mounted() {
      const categorySlug = this.$route.params.category;
      AdminService.getLetterCategories()
        .then((res) => {
          if(res.statusCode === 200){
            this.category = res.data.find(cat => cat.slug === categorySlug);
          } else if(res.statusCode === 401){
            this.$router.push('/logout');
          } else {
            this.$store.dispatch('errorSnackbar', res.message);
          }
        });

      this.typeTemplates.unshift({
        name: 'custom',
        title: 'Custom',
        type: 'custom'
      });
    },
    methods: {
      deleteVariable(index) {
        this.variables.splice(index, 1);
      },
      addVariable() {
        console.log(this.variables);
        this.variables.push({
          name: '',
          title: '',
          type: ''
        });
        this.$vuetify.goTo(document.body.scrollHeight);
      }
    }
  }
</script>

<style scoped>
  .manual-v-layout {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    padding-bottom: 8px !important;
    padding-top: 8px !important;
  }
</style>
