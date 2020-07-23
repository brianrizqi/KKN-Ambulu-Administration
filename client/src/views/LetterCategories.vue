<template>
  <v-main>
    <v-container>

    </v-container>
  </v-main>
</template>

<script>
  import AdminService from "@/services/admin.service";

  export default {
    mounted() {
      this.init();
    },
    methods: {
      async init(){
        const data = await AdminService.getLetterCategories();
        console.log(data);
      }
    }
  }
</script>
