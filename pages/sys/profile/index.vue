<template>
    <v-container fluid>
        <v-layout column>
            <v-card>
                <v-card-text>
                    <v-flex class="mb-4">
                        <v-list-item-avatar v-if="imageLink != null" size="200px">
                            <v-img :src="imageLink" />
                        </v-list-item-avatar>
                        <v-list-item-avatar v-else size="200px">
                            <v-img
                                :src="'https://randomuser.me/api/portraits/women/' + generateRandomIntegerNumber + '.jpg'" />
                        </v-list-item-avatar>
                        <v-file-input prepend-icon="mdi-pencil" label="Click here to choose image" ref="fileInput"
                            v-model="image" accept="image/*" @input="validateFile" style="height: 50px; width: 280px;" />
                        <template v-if="fileSizeError">
                            <p class="error">Error: File size exceeds the limit of 2MB.</p>
                        </template>
                        <v-btn @click="openAvatarPicker" :loading="uploading">Upload</v-btn>
                        <template v-if="uploading">
                            <p>Upload progress: {{ progress }}%</p>
                        </template>
                    </v-flex>
                    <!-- <v-divider></v-divider> -->
                    <v-row>
                        <v-col cols="4">
                            <v-text-field v-model="form.firstName" label="FirstName" readonly></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field v-model="form.middlename" label="Last Name" readonly></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field v-model="form.lastName" label="Last Name" readonly></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="form.contactEmail" label="Email Address"></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field v-model="form.password" label="Change Password"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-btn :loading="passwordLoading" @click="changePassword">
                        Change Password
                    </v-btn>
                </v-card-text>
                <!-- Add the v-snackbar component to display a success message -->
                <v-snackbar v-model="passwordChangedSnackbar" color="success" timeout="3000">
                    Password changed successfully
                </v-snackbar>
            </v-card>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    pageTitle: 'My Profile',
    layout: 'admin',
    middleware: 'auth',
    data() {
        return {
            passwordChangedSnackbar: false,
            passwordLoading: false,
            uploading: false,
            progress: 0,
            fileSizeError: false,
            loading: false,
            image: null,
            imageLink: null,
            form: {
                firstName: this.$auth.$state.user.fname,
                middlename: this.$auth.$state.user.mname,
                lastName: this.$auth.$state.user.lname,
                password: '',
                contactEmail: this.$auth.$state.user.email,
                avatar: this.$auth.$state.user.avatar,
            },
            showAvatarPicker: false
        }
    },
    computed: {
        generateRandomIntegerNumber() {
            return Math.floor(Math.random() * 100);
        },
    },
    created() {
        if (this.$auth.$state.user.avatar != null)
            this.imageLink = this.$strapi.defaults.apiURL + this.$auth.$state.user.avatar
        // console.log(this.$auth.$state.user)
    },
    beforeRouteLeave(to, from, next) {
        next()
    },
    methods: {
        async changePassword() {
            if (!this.form.password) {
                // Display error message about missing fields
                return;
            }
            this.passwordLoading = true;
            try {
                const response = await this.$store.dispatch('account/changePassword', {
                    id: this.$auth.$state.user.id,
                    password: this.form.password,
                });

                // Adding a 2-second delay
                await new Promise(resolve => setTimeout(resolve, 2000))
                // Display success message
                this.passwordChangedSnackbar = true
                this.form.password = null
            } catch (error) {
                // Display error message
                this.form.password = null
            } finally {
                this.passwordLoading = false;
                this.form.password = null
            }
        },
        validateFile() {
            if (this.image.size > 1000000) {  // 1MB = 1000000 bytes
                this.fileSizeError = true;
                this.loading = false;
                this.uploading = false;  // Stop the loading state
            } else {
                this.fileSizeError = false;
            }
        },

        async openAvatarPicker() {
            this.uploading = true;
            // Make sure that the fileInput element exists and a file has been selected
            if (!this.$refs.fileInput || !this.image) {
                console.error('fileInput element does not exist or no file selected')
                this.loading = false;
                this.uploading = false;
                return
            }

            // Validate the file size
            this.validateFile();
            if (this.fileSizeError) {
                this.uploading = false;
                return;
            }

            const formData = new FormData();
            formData.append('files', this.image);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', this.$strapi.defaults.apiURL + '/api/upload', true);
            xhr.upload.onprogress = (event) => {
                this.progress = Math.round((event.loaded / event.total) * 100);
            };
            xhr.onload = () => {
                if (xhr.status === 200) {

                    const data = JSON.parse(xhr.responseText);
                    // console.log(xhr.responseText);
                    // this.imageLink = data[0].url;

                    this.$store.dispatch('account/editAvatar', data[0].url).then(response => {
                        console.log(response)
                    })
                        .catch(error => {
                            console.log(error)
                        })

                    console.log(data[0].url);

                    this.imageLink = this.$strapi.defaults.apiURL + data[0].url
                    this.uploading = false;
                    this.progress = 0;
                }
            };
            xhr.send(formData);
        },
    }
}
</script>