<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-card>
        <v-card-text>
          <v-row class="mx-auto my-auto">
            <v-col col="12" md="12" lg="12">
              <div>
                <v-card color="blue lighten-4" class="mx-auto" max-width="1500" min-width="300" outlined>
                  <v-card-title>
                    <h1 class="text-h5 mb-1">Welcome! "{{ Fname }}"</h1>
                  </v-card-title>
                  <v-card-subtitle>
                  </v-card-subtitle>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>




// Import the pdfmake library
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jsQR from 'jsqr';
export default {

  flag: false,
  layout: 'admin',
  auth: 'guest',
  data() {
    return {

    };
  },
  computed: {
    Fname() {
      return this.$auth.$state.user.fname
    },
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  beforeRouteLeave(to, from, next) {
    next()
  },
  methods:
  {
  }
};
</script>
