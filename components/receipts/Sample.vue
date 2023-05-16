<template>
      <v-btn
      class="ma-2"
      :loading="loading"
      :disabled="loading"
      color="secondary"
      @click="generatePDF"
    >
      Generate
    </v-btn>
</template>    
<script>
 export default {
    data(){
        return {
            loader: null,
            loading: false,
            docDefinition : {
                content: [
                    // if you don't need styles, you can use a simple string to define a paragraph
                    'Hello pdf',

                    // using a { text: '...' } object lets you set styling properties
                    { text: 'This paragraph will have a bigger font', fontSize: 15 },

                    // if you set the value of text to an array instead of a string, you'll be able
                    // to style any part individually
                    {
                    text: [
                        'This paragraph is defined as an array of elements to make it possible to ',
                        { text: 'restyle part of it and make it bigger ', fontSize: 15 },
                        'than the rest.'
                    ]
                    }
                ]
                }
        }
    },
    watch: {
        loader () {
            const l = this.loader
            this[l] = !this[l]

            setTimeout(() => (this[l] = false), 3000)

            this.loader = null
      },
    },
    mounted(){

    },
    methods: {
        generatePDF(){
            this.loader = 'loading'
            pdfMake.createPdf(this.docDefinition).open();
        }
    }
 };
</script>
<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>