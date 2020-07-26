<template>
  <v-main>
    <v-container>
      <v-card :loading="loading">
        <template slot="progress">
          <v-progress-linear color="green" indeterminate></v-progress-linear>
        </template>
        <v-card-title class="primary white--text">Edit Surat</v-card-title>
        <ValidationObserver ref="observer">
          <v-container>
            <v-form ref="form" lazy-validation v-model="isFormValid">
              <v-text-field
                  v-model="categoryNameAndNumber"
                  disabled>
              </v-text-field>

              <v-select
                  v-model="letterTypeSlug"
                  v-if="categorySlug !== ''"
                  :items="letterTypes"
                  label="Tipe Surat"
                  item-text="name"
                  item-value="slug"
                  v-on:change="generateForm"
                  required
              >

              </v-select>
              <v-form-base :value="letterData" :schema="letterSchema"></v-form-base>
              <v-btn v-if="showSubmit" color="primary" @click="updateLetter" :disabled="!isFormValid">Submit</v-btn>
            </v-form>
          </v-container>
        </ValidationObserver>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
  import {required, max} from 'vee-validate/dist/rules';
  import {extend, ValidationObserver, setInteractionMode} from 'vee-validate';
  import AdminService from "../services/admin.service";
  import VFormBase from 'vuetify-form-base';

  setInteractionMode('eager');
  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  });
  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  });

  export default {
    components: {
      ValidationObserver,
      VFormBase
    },
    data() {
      return {
        categoryNameAndNumber: '',
        letterTypeSlug: '',
        letterType: {},
        letterTypes: [],
        loading: false,
        category: {},
        categorySlug: '',
        letterData: {},
        letterSchema: {},
        showSubmit: false,
        isFormValid: false,
        no: 0,
      }
    },
    props: ["showSnackbar"],
    mounted() {
      this.loading = true;
      this.categorySlug = this.$route.params.category;
      this.letterTypeSlug = this.$route.params.type;
      this.no = this.$route.params.no;
      console.log(this.$route.params);
      this.getLetterCategories();
      this.findLetter();
    },
    methods: {
      validate() {
        return this.$refs.form.validate()
      },
      getLetterType() {
        this.category = this.letterCategories.find(cat => cat.slug === this.categorySlug);
        this.letterTypes = this.category.letters;
        this.letterSchema = {};
      },
      getLetterCategories() {
        AdminService.getLetterCategories()
          .then((result) => {
            if (result.statusCode === 200) {
              this.category = result.data.find(category => category.slug === this.categorySlug);
              this.letterTypes = this.category.letters;
            } else if (result.statusCode === 401) {
              this.$router.push('/logout');
            }

            this.loading = false;
          })
      },
      findLetter() {
        const query = {
          'category.slug': this.categorySlug,
          'letter_type.slug': this.letterTypeSlug,
          number: this.no
        };

        AdminService.findLetter(query)
          .then((res) => {
            if (res.statusCode === 200) {
              this.categoryNameAndNumber = `${res.data.category.name} (${res.data.letter_number})`;
              this.generateForm();
              this.letterData = res.data;
            } else if (res.statusCode === 401) {
              this.$router.push('/logout');
            } else {
              this.$store.dispatch('errorSnackbar', res.message);
              this.$router.push({name: 'Letter'});
            }
          })
      },
      generateForm() {
        const required = msg => v => !!v || msg;
        const maxLen = l => v => (v && v.length <= l) || `max. ${l} Characters`;
        const type = this.letterTypes.find(type => type.slug === this.letterTypeSlug);
        this.letterType = type;
        const fields = {};
        type.fields.forEach(field => {
          let rules = [required(`${field.name} is required`)];
          if (field.length) {
            rules.push(maxLen(field.length));
          }
          fields[field.name] = {
            type: field.type,
            label: field.title,
            items: field.data,
            ext: field.type === 'date' ? 'text' : field.type,
            rules: rules,
            flex: 12
          }
        });
        this.letterSchema = fields;
        this.showSubmit = true;
      },
      updateLetter() {
        if (this.validate()) {
          const cat = this.category;
          delete cat['letters'];
          this.letterData.category = cat;
          this.letterData.letter_type = this.letterType;
          AdminService.updateLetter(this.letterData)
            .then((response) => {
              console.log(response);
              if (response.statusCode === 200) {
                this.$store.dispatch('successSnackbar', response.message)
                this.$router.push({name: 'Letter'});
              } else {
                this.$store.dispatch('errorSnackbar', response.message)
              }
            })
            .catch((err) => {
              this.$store.dispatch('errorSnackbar', err.message);
            })
        }
      }
    },
  }
</script>
