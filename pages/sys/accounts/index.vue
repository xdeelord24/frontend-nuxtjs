<template>
  <v-container fluid>
    <v-layout column>
      <v-card>
        <v-card-text>
          <v-progress-circular v-if="!Accounts" :rotate="360" :size="100" :width="15" :value="Accounts" color="teal">
            {{ Accounts.length }}
          </v-progress-circular>
          <v-data-table v-else :headers="headers" :items="Accounts" sort-by="username" class="elevation-1"
            :loading="loading" loading-text="Loading... Please wait" :item-class="itemClass">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>List of Accounts</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                      New Account
                    </v-btn>

                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.username" label="Account Name"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.email" label="Email Address"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select :items="roles" v-model="editedItem.role" item-text="name" item-value="id"
                              label="Role" prepend-inner-icon="mdi-account">
                              <template v-slot:item="{ item }">
                                {{ item.name }}
                              </template>
                            </v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.fname" label="First Name"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.mname" label="Middle Name"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.lname" label="Last Name"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancel
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Are you sure you want to delete this user?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
            </template>
            <template v-slot:[`item.createdAt`]="{ item }">
              {{ formatDate(item.createdAt) }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>

export default {
  layout: 'admin',
  middleware: ['authenticate', 'roles'],
  name: 'AccountsPage',
  data: () => ({
    roles: [{ id: 1, name: 'Authenticated' }, { id: 11, name: 'Admin' }, { id: 13, name: 'Assigner' }],
    loading: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'id', value: 'id' },
      {
        text: 'Name',
        align: 'start',
        value: 'username',
      },
      { text: 'Email Address', value: 'email' },
      { text: 'Role', value: 'role.name' },
      { text: 'Date Created', value: 'createdAt' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    allCategories: [],
    bodyContent: '',
    editedIndex: -1,
    editedItem: {
      id: '',
      username: '',
      fname: '',
      mname: '',
      lname: '',
      role: '',
      email: '',
      office: '',
    },
    defaultItem: {
      id: '',
      username: '',
      fname: '',
      mname: '',
      lname: '',
      role: '',
      email: '',
      office: '',
    },
  }),

  computed: {
    roleId() {
      return this.editedItem.role.id;
    },
    formTitle() {
      return this.editedIndex === -1 ? 'New Account' : 'Edit Account'
    },
    Accounts() {
      return this.$store.getters['account/accounts']
    },
    numAccounts() {
      return this.$store.getters['account/accounts'].length
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.fetchAccounts()
  },
  beforeRouteLeave(to, from, next) {
    next()
  },
  methods: {

    itemClass(item, index) {
      // console.log(index)
      return index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200';
    },
    fetchAccounts() {
      this.$store.dispatch('account/fetch')
      this.loading = false
    },
    fetchOffices() {
      this.$store.dispatch('office/fetchCategoriesNonPopulate')
      this.loading = false
    },
    formatDate(date) {
      if (date == null)
        return null
      const formattedDate = new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
      return formattedDate;
    },
    editItem(item) {
      console.log(item)
      this.editedIndex = this.Accounts.indexOf(item)
      console.log(this.editedIndex)
      this.editedItem = Object.assign({}, {
        id: item.id,
        username: item.username,
        fname: item.fname,
        mname: item.mname,
        lname: item.lname,
        email: item.email,
        role: Number.isInteger(item.role) ? item.role : item.role.id,
      })
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = item
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      // this.Accounts.splice(this.editedIndex, 1);
      this.$store.dispatch('account/deleteUser', this.editedIndex)
      this.$store.dispatch('account/updateAccounts', this.Accounts).then(response => {
        // refresh the table data
        this.fetchAccounts()
        this.loading = false
        this.dialogDelete = false
      })
        .catch(error => {
          console.log(error)
          this.loading = false
          this.dialogDelete = false
        })
      this.closeDelete();
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      // console.log(this.editedIndex)
      if (this.editedIndex > -1) {
        this.$store.dispatch('account/editUser', this.editedItem).then(response => {
          // refresh the table data
          this.fetchAccounts()
          this.loading = false
          this.dialogDelete = false
        })
          .catch(error => {
            console.log(error)
            this.loading = false
            this.dialogDelete = false
          })
      } else {
        // console.log(this.editedItem.role.id)
        this.$store.dispatch('account/newAccount', this.editedItem).then(response => {
          // refresh the table data
          this.fetchAccounts()
          this.loading = false
          this.dialogDelete = false
        })
          .catch(error => {
            console.log('save Function error: ' + error)
            this.loading = false
            this.dialogDelete = false
          })
      }
      this.close()
    },
  },
};
</script>