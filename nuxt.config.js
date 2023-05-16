import colors from 'vuetify/es5/util/colors'

export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,
    server: {
        // port: 8001, // default: 3000
        host: '0.0.0.0', // default: localhost,
        timing: false
    },
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - INSERT CAPTION HERE',
        title: 'Sample System',
        version: '1.0.0',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [

    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/pdfmake.js' },
        { src: '~/plugins/strapi.js', mode: 'client' },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
        '@nuxtjs/fontawesome',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        '@nuxt/http',
    ],

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        },
        icons: {
            iconfont: 'faSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    axios: {
        baseURL: process.env.STRAPI_URL || 'http://localhost:1337/api',
    },

    auth: {
        // Options
        strategies: {
            local: {
                token: {
                    property: 'jwt',
                },
                user: {
                    property: false,
                },
                endpoints: {
                    login: {
                        url: 'auth/local',
                        method: 'post',
                    },
                    user: {
                        url: 'users/me?populate=*',
                        method: 'get',
                    },
                    logout: false,
                },
            },
        },
    },

    cli: {
        badgeMessages: ['Welcome!'],
        bannerColor: 'magentaBright',
    },
    serverMiddleware: [
        { path: '/middleware/cors', handler: '~/middleware/cors' },
        { path: '/api/socket', handler: '~/api/socket' },
    ],
}