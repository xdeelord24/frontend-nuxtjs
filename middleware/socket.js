export default ({ $strapi, $auth, store }) => {
    const socket = new WebSocket($strapi.defaults.socketURL);

    const handleMessage = async(event) => {
        const message = JSON.parse(event.data);
        store.dispatch('webhook/fetchWebhookData', message);

        switch (message.model) {
            case 'document':
                console.log("FETCH DOCUMENTS");
                await store.dispatch('document/fetchCategoriesPopulate');
                break;

            case 'office':
                console.log("FETCH OFFICES");
                await store.dispatch('office/fetchCategoriesPopulate');
                break;

            case 'office-document':
                console.log("FETCH OFFICE-DOCUMENTS");
                await store.dispatch('officeDocument/fetchCategoriesPopulate');
                break;

            case 'notification':
                console.log("FETCH NOTIFICATION");
                await store.dispatch('notification/fetchCategoriesPopulate', "");
                break;

            case 'user':
                console.log("FETCH USER");
                await store.dispatch('account/fetch');
                await store.dispatch('index/fetchMe');
                break;

            default:
                console.log("Unhandled model `", message.model, "`");
        }
    };

    socket.addEventListener('message', handleMessage);

    const disconnect = () => {
        socket.removeEventListener('message', handleMessage);
        socket.close();
    };

    return {
        disconnect,
    };
};