import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import {
  VApp,
  VForm,
  VDatePicker,
  VTextField,
  VSelect,
  VCheckbox,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCard,
  transitions
} from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VApp,
    VForm,
    VTextField,
    VSelect,
    VCheckbox,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VDatePicker,
    VGrid,
    VToolbar,
    VCard,
    transitions
  },
});

export default new Vuetify({
});
