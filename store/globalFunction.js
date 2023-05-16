export const actions = {
    async encodeToUTF8({ commit }, input) {
        const str = input.toString(); // Convert the input to string
        const base64 = btoa(unescape(encodeURIComponent(str))); // Convert the string to Base64
        return base64; // Return the Base64 encoded result
    },
    getStatusColor(status) {
        if (status === 'Approved') {
            return 'green';
        } else if (status === 'Pending Approval') {
            return 'yellow';
        } else if (status === 'Draft') {
            return '';
        } else {
            return 'red';
        }
    },
}