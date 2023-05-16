export const state = () => ({
    accounts: [],
})

export const getters = {
        accounts(state) {
            return state.accounts
        },
    } //getter

export const actions = {
    updateAccounts({ commit }, accounts) {
        commit('updateAccounts', accounts);
    },
    async fetch({ commit }) {
        try {
            // Set the Authorization header with the JWT
            const config = {
                    headers: {
                        Authorization: this.$auth.$storage._state["_token.local"]
                    }
                }
                // console.log(this.$auth.$storage._state["_token.local"])
            await this.$strapi.get('/users?populate=*', config)
                .then((response) => {
                    // Handle success.
                    commit('SET_ACCOUNTS', response.data)
                })
                .catch((error) => {
                    // Handle error.
                    console.log("An error occurred:", error.response);
                });
        } catch (e) {
            console.log(e)
        }
    },

    async editUser({ commit }, account) {
        try {
            console.log(account)
                // Set the Authorization header with the JWT
            const config = {
                headers: {
                    Authorization: this.$auth.$storage._state["_token.local"]
                }
            }
            const response = await this.$strapi.put(`/users/${account.id}`, {
                username: account.username,
                fname: account.fname,
                mname: account.mname,
                lname: account.lname,
                email: account.email,
                role: account.role,
                office: account.office,
            }, config)
            console.log(response)
        } catch (err) {
            console.log("An error occurred: err" + err)
        }
    },

    async changePassword({ commit }, account) {
        try {
            console.log(account)
                // Set the Authorization header with the JWT
            const config = {
                headers: {
                    Authorization: this.$auth.$storage._state["_token.local"]
                }
            }
            const response = await this.$strapi.put(`/users/${account.id}`, {
                password: account.password,
            }, config)
            console.log(response)
        } catch (err) {
            console.log("An error occurred: err" + err)
        }
    },
    async editAvatar({ commit }, link) {
        try {
            // Set the Authorization header with the JWT
            const config = {
                headers: {
                    Authorization: this.$auth.$storage._state["_token.local"]
                }
            }
            const response = await this.$strapi.put(`/users/${this.$auth.$state.user.id}`, {
                avatar: link
            }, config)
            console.log(response)
        } catch (err) {
            console.log("An error occurred: err" + err)
        }
    },
    async deleteUser({ commit }, account) {
        try {
            const response = await this.$strapi.delete(`/users/${account.id}`)
            console.log(response)
        } catch (err) {
            console.log("An error occurred: err" + err)
        }
    },
    async newAccount({ commit }, account) {
        try {
            // Set the Authorization header with the JWT
            const config = {
                headers: {
                    Authorization: this.$auth.$storage._state["_token.local"]
                }
            }
            const response = await this.$strapi.post(`/users`, {
                    username: account.username,
                    fname: account.fname,
                    mname: account.mname,
                    lname: account.lname,
                    email: account.email,
                    role: account.role,
                    office: account.office,
                    confirmed: account.confirmed,
                    password: '12345admin',
                }, config)
                // console.log(response)
        } catch (err) {
            console.log('newAccount error: ' + err)
        }
    },

    async removeAccount({ commit }, account) {
        const response = await this.$strapi.delete(`/users/${account.id}`)
    },
}

export const mutations = {
    updateAccounts(state, accounts) {
        state.accounts = accounts;
    },
    SET_ACCOUNTS: (state, accounts) => (state.accounts = accounts),
    // setFeaturedAccounts: (state, Accounts) => (state.featuredAccounts = Accounts),
    EDIT_CATEGORY: (state, accounts) => {
        const index = state.accounts.findIndex((item) => item.id === accounts.id)
        state.accounts[index].attributes.name = category.name
    },
    NEW_CATEGORY: (state, item) => state.accounts.push(item),
    REMOVE_CATEGORY: (state, id) =>
        state.accounts.splice(
            state.accounts.findIndex((el) => el.id === id),
            1
        ),
}