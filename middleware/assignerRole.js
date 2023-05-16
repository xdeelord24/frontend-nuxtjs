// import { isAuthenticated } from 'auth-next'

export default async function({ store, route, redirect, $auth }) {

    await store.dispatch('user/fetch', $auth.$state.user.id)
    let tempRole = await store.getters['user/getRole'].name
    console.log(tempRole)
    if (!store.getters['isAuthenticated'] || !(String(tempRole) == "Assigner") && !(String(tempRole) == "Admin")) {
        return redirect('/')
    }
}