// import { isAuthenticated } from 'auth-next'

export default function({ store, route, redirect }) {

    if (!store.getters['isAuthenticated']) {
        return redirect('/')
    }

    // console.log(store.getters['isAuthenticated'])
}