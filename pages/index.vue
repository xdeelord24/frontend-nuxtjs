<template>
  <v-container class="back" fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4 lg3>
        <v-card class="elevation-1 pa-3 card-login">
          <v-card-text>
            <div class="layout column align-center">
              <img src="~/assets/images/Caraga_State_University_1.png" alt="Logo here" width="120" height="200">
              <h1 class="flex my-4 success--text">Sample System</h1>
            </div>
            <v-form lazy-validation>
              <v-text-field append-icon="mdi-account" name="username" label="Email" type="email" v-model="model.email"
                :rules="emailRules" required @keyup.enter="userLogin">
              </v-text-field>
              <v-text-field append-icon="mdi-lock" name="password" label="Password" id="password" type="password"
                v-model="model.password" :rules="passRules" required @keyup.enter="userLogin">
              </v-text-field>
            </v-form><v-alert v-if="err" :value="true" type="error" dismissible>{{ err }}</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="primary" :disabled="dialog" @click="userLogin" :loading="dialog">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
</v-container>
</template>

<script>

export default {
  layout: 'default',
  auth: 'guest',
  data: () => ({
    loading: false,
    dialog: false,
    err: null,
    model: {
      // email: 'xdeelord@gmail.com',
      // password: 'Adminp4ssw0rd',
      email: '',
      password: '',
    },
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    passRules: [
      v => !!v || 'Password is required',
    ],
  }),
  created() {
    this.checkUser()
  },
  watch: {
    dialog(val) {
      if (!val) return setTimeout(() => (this.dialog = false), 1000)
    },
  },
  beforeRouteLeave(to, from, next) {
    next()
  },
  methods: {
    fetchAccounts(data) {
      this.$store.dispatch('user/fetch', data.id)
    },
    checkUser() {
      if (!this.$store.getters['index/isAuthenticated']) {
        return this.$router.push('/sys')
      }
    },
    async userLogin() {
      try {
        this.dialog = true;
        const res = await this.$auth.loginWith('local', {
          data: { identifier: this.model.email, password: this.model.password },
        })
        // console.log(res)
        this.fetchAccounts(res.data.user)
        setTimeout(() => {
          this.$router.push('/sys');
          this.dialog = false;
        }, 1000);
      } catch (e) {
        if (e.response) {
          this.err = e.response.data.error.message
          this.dialog = false;
          setTimeout(() => {
            this.err = null;
          }, 3000);
        } else {
          this.err = "Cannot login. Please try again later."
        }
      }
    },
  }
};
</script>
<style scoped>
.back {
  background-image: url('~/assets/images/CSUBG.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
}

@keyframes opacity-in {
  from {
    opacity: 0.4;
  }

  to {
    opacity: 1;
  }
}

@keyframes opacity-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0.4;
  }
}

.card-login {
  opacity: 0.4;
  animation-name: opacity-out;
  animation-duration: 2s;
}

.card-login:hover {
  opacity: 1;
  animation-name: opacity-in;
  animation-duration: 2s;
}
</style>