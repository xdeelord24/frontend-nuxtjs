import axios from "axios";

export const state = () => ({
        user: '',
        jwt: '',
        authenticated: false,
        role: ''
    }) //variables

export const getDefaultState = () => ({
        user: '',
        jwt: '',
        authenticated: false,
        role: ''
    }) //variables

export const getters = {
        getUser(state) {
            return state.user
        },
        /* A getter. */
        getToken(state) {
            return state.jwt
        },
        getRole(state) {
            return state.role
        },
        isAuth(state) {
            return state.authenticated
        }
    } //getter

export const mutations = {
        SET_USER: (state, data) => (state.user = data),
        SET_ROLE: (state, data) => (state.role = data.role),

        SET_ACCOUNTS: (state, accounts) => (state.accounts = accounts),
        // SET_AUTHENTICATED: (state, authenticated) => (state.authenticated = authenticated),
        resetState(state) {
            // Merge rather than replace so we don't lose observers
            // https://github.com/vuejs/vuex/issues/1118
            Object.assign(state, getDefaultState())
        },
        increment(state) {
            state.user++
        },
        getToken(state, data) {
            state.jwt = data
        },
        getUser(state, data) {
            state.authenticated = !state.authenticated
            state.user = data
                // state.role=data.role.name
        },
        getRole(state, data) {
            state.role = data
                // state.role=data.role.name
        },
    } //commit

export const actions = {
        async fetch({ commit }, id) {
            try {

                // Set the Authorization header with the JWT
                const config = {
                    headers: {
                        Authorization: this.$auth.$storage._state["_token.local"]
                    }
                }

                // console.log(this.$auth.$storage._state["_token.local"])
                await this.$strapi.get(`/users/${id}?populate=*`, config)
                    .then((response) => {
                        // Handle success.
                        // console.log(response.data)
                        commit('SET_USER', response.data)
                        commit('SET_ROLE', response.data)
                        localStorage.setItem('role', response.data.role.name)
                    })
                    .catch((error) => {
                        // Handle error.
                        console.log("An error occurred:", error.response);
                    });
            } catch (e) {
                console.log(e)
            }
        },
        async fetchCounter(state) {
            // make request
            const res = { data: 10 };
            state.user = res.data;
            return res.data;
        },
        logout(context) {
            context.commit('resetState')
        },
        // searchRole(id) {
        //     console.log(id)
        //     axios
        //         .get(this.$axios.defaults.baseURL + ":1337/api/users/" + id + "?populate=*")
        //         .then((response) => {
        //             // Handle success.
        //             // console.log("User profile", response.data);
        //             // context.commit('getToken',response.data.jwt)
        //             // context.commit('getUser',response.data.user.username)
        //         })
        //         .catch((error) => {
        //             // Handle error.
        //             console.log("An error occurred:asdasd", error.response);
        //         });
        // },
        async doLogin(context, data) {
            axios
                .post(this.$axios.defaults.baseURL + ":1337/api/auth/local", {
                    identifier: data.emailLogin,
                    password: data.passwordLogin,
                })
                .then((response) => {
                    // Handle success.
                    // alert("You are now logged in");
                    // console.log("User profile", response.data);
                    context.commit('getToken', response.data.jwt)
                    context.commit('getUser', response.data.user.username)
                        // context.state.jwt = response.data.jwt;
                        // context.state.user = response.data.user;
                        // this.user = response.data.data.attributes.section;
                        // console.log("User token", response.data.jwt);
                        // searchRole(response.data.user.id)
                })
                .catch((error) => {
                    // Handle error.
                    console.log("An error occurred:", error.response);
                });
        },
        async userPassword() {
            try {
                await this.$axios.post('auth/forgot-password', {
                    email: this.email,
                })
            } catch (e) {
                if (e.response) this.err = e.response.data.error.message
            }
        },
    } //dispatch