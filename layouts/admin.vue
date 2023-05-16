<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list-item>
        <v-list-item-avatar v-if="imageLink != null">
          <v-img :src="imageLink"></v-img>
        </v-list-item-avatar>
        <v-list-item-avatar v-else>
          <v-img :src="'https://randomuser.me/api/portraits/women/79.jpg'"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ this.$auth.$state.user.fname }}</v-list-item-title>
        </v-list-item-content>
        <!-- <v-list-item-content>
            <v-list-item-title>{{ title }}</v-list-item-title>
          </v-list-item-content> -->
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="(item, i) in filteredItems" :key="i" :to="item.to" router exact>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }" >
              <v-list-item-action v-bind="attrs" v-on="on">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
            </template>
            <span>{{ item.label }}</span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click.prevent="userLogout" exact>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">

              <v-list-item-action v-bind="attrs" v-on="on">
                <v-icon>mdi-chevron-left-box-outline</v-icon>
              </v-list-item-action>
            </template>
            <span>Logout</span>
          </v-tooltip>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <!-- <v-btn icon @click.stop="clipped = !clipped">
          <v-icon>mdi-application</v-icon>
        </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
          <v-icon>mdi-minus</v-icon>
        </v-btn> -->
      <!-- <v-toolbar-title>{{ title }}</v-toolbar-title> -->
      <v-spacer />
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn> -->


    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>


import { mapGetters } from 'vuex'
export default {
  middleware: ['authenticate', ],
  name: 'AdminLayout',
  data() {
    return {
      clipped: false,
      drawer: true,
      avatar: null,
      fixed: false,
      imageLink: null,
      items: [
        { title: 'Home', icon: 'mdi-home', to: '/sys', label: "Home", role: ["Admin","Authenticated","Assigner"], },
        { title: 'Accounts', icon: 'mdi-account', to: '/sys/accounts', label: "Accounts", role: ["Admin",], },
        { title: 'My Profile', icon: 'mdi-account', to: '/sys/profile', label: "My Profile" },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: localStorage.getItem("role")
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => !item.role || (item.role && item.role.includes(this.Role.name)));
    },
    Role() {
      return this.$store.getters['user/getRole']
    },
  },
  created() {
    this.fetcher()
    if (this.$auth.$state.user.avatar != null)
      this.imageLink = this.$strapi.defaults.apiURL + this.$auth.$state.user.avatar
  },
  updated() {
  },
  methods: {
    testFucntion(item){
      console.log("THIS IS TEST", item)
    },
    async fetcher() {
      this.$store.dispatch('user/fetch', this.$auth.$state.user.id)
    },
    async userLogout() {
      await this.$auth.logout()
      this.remove()
      this.$router.push('/')
    },
    remove() {
      return this.$store.getters['removeAll/resetCartState']
    },
  },
}
</script>
