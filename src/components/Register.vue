<template>
  <div>
    <v-layout row justify-center>
      <v-overlay :value="form_submition" z-index="99999">
        <v-progress-circular width="15" size="120" indeterminate color="orange"></v-progress-circular>
      </v-overlay>
      <v-dialog max-width="500" v-model="registration_status" persistent>
        <v-card>
          <v-card-title
            :class="{'headline red--text': (registration_status_code == (404 || 400)), 'headline green--text': (registration_status_code == 201)}"
            v-text="registration_status_code == 201 ? 'REGISTRATION SUCCESSFUL' : 'REGISTRATION FAIL'"
          ></v-card-title>
          <v-card-text v-if="registration_status_code == (404 || 400)">
            <p class="text-center red--text">
              <v-icon color="red" size="100" class="mx-auto">mdi-cancel</v-icon>
              <v-alert
                color="error"
                text
                :value="registration_status_message != null"
                transition="fade-transition"
              >{{registration_status_message}}</v-alert>
              <br />Click Retry to register again
            </p>
          </v-card-text>
          <v-card-text v-if="registration_status_code == 201">
            <p class="text-center green--text">
              <v-icon color="green" size="100" class="mx-auto">mdi-checkbox-marked-circle-outline</v-icon>
              <br />Click continue, to proceed in order to submit your proposal
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="registration_status_code ==(null || 404 || 400)"
              color="secondary"
              text
              @click="registration_status = false"
            >Cancel</v-btn>
            <v-btn
              v-if="registration_status_code == (404 || 400)"
              color="error"
              text
              @click="registration_status = false,form_submition = true"
            >Yes, Retry</v-btn>
            <v-btn
              v-if="registration_status_code == 201"
              color="success"
              text
              @click="registration_status = false"
              to="project"
            >Yes, Continue</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-card outlined class="elevation-1 my-2">
      <v-card-text class="pa-0">
        <v-form>
          <div>
            <v-stepper v-model="el" class="elevation-0">
              <v-stepper-header class="elevation-0">
                <v-stepper-step :complete="el > 1" color="orange" step="1">Name</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="el > 2" color="orange" step="2">Session</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="el > 3" color="orange" step="3">Login</v-stepper-step>
              </v-stepper-header>
              <v-stepper-items>
                <v-stepper-content step="1" class="py-1">
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" class="mb-2 pa-0">
                        <v-text-field
                          name="student_first_name"
                          label="First Name"
                          type="text"
                          outlined color="orange"
                          v-model="new_student_data.first_name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" class="mb-2 pa-0">
                        <v-text-field
                          name="student_last_name"
                          label="Last Name"
                          type="text"
                          outlined color="orange"
                          v-model="new_student_data.last_name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" class="mb-2 pa-0">
                        <v-text-field
                          name="student_middle_name"
                          label="Middle Name"
                          type="text"
                          outlined color="orange"
                          v-model="new_student_data.middle_name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" class="mb-2 pa-0">
                        <v-select
                          :items="gender_items"
                          name="student_gender"
                          label="Gender"
                          outlined color="orange"
                          v-model="new_student_data.gender"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-stepper-content>
                <v-stepper-content step="2" class="py-1">
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" class="pa-0 mb-2">
                        <v-text-field
                          name="student_mobile"
                          label="Mobile"
                          type="text"
                          outlined color="orange"
                          v-model="new_student_data.mobile"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" class="pa-0 mb-2">
                        <v-text-field
                          name="student_name"
                          label="Email"
                          type="email"
                          outlined color="orange"
                          v-model="new_student_data.email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" class="pa-0 mb-2">
                        <v-text-field
                          name="student_reg_no"
                          label="Reg No"
                          type="text"
                          outlined color="orange"
                          v-model="new_student_data.reg_no"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" class="pa-0 mb-2">
                        <v-text-field
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show1 ? 'text' : 'password'"
                          name="user_password"
                          label="Password"
                          outlined color="orange"
                          @click:append="show1 = !show1"
                          v-model="pwd"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-stepper-content>
                <v-stepper-content step="3" class="py-1">
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" class="pa-0 mb-2">
                        <image-input v-model="avatar" class="d-flex justify-center">
                          <div slot="activator">
                            <v-avatar
                              size="120px"
                              v-ripple
                              v-if="!avatar"
                              class="elevation-2 orange lighten-1 mb-3"
                            >
                              <img v-if="avatar != (''|| null)" :src="avatar" alt="avatar" />
                              <v-icon color="white" v-else size="80">mdi-camera-image</v-icon>
                            </v-avatar>
                            <v-avatar size="120" v-ripple v-else class="mb-3">
                              <img :src="avatar.imageURL" alt="avatar" />
                            </v-avatar>
                          </div>
                        </image-input>
                      </v-col>
                      <v-col cols="12" sm="12" class="pa-0 mb-2">
                        <v-select
                          :items="programme_year"
                          name="student_year"
                          label="Year"
                          outlined color="orange"
                          v-model="new_student_data.admission_year"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="12" class="pa-0 mb-2">
                        <v-select
                          :items="programme_items"
                          name="student_programme"
                          label="Programme"
                          outlined color="orange"
                          v-model="new_student_data.programme"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="12" class="pa-0 mb-2">
                        <v-select
                          :items="level_items"
                          name="student_level"
                          label="Level"
                          outlined color="orange"
                          v-model="new_student_data.level"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </div>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn v-if="el < 2" color="dark-grey" text to="loginView">Login Instead</v-btn>
        <v-btn v-if="el > 1" text color="dark-grey" @click="stepBack()">
          <v-icon right dark>mdi-chevron-left</v-icon>Prev
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="el < 3" text color="green" @click="stepForward()">
          Next
          <v-icon right dark>mdi-chevron-right</v-icon>
        </v-btn>
        <v-btn
          v-if="el > 2"
          color="orange"
          text
          @click.native="create_student_account()"
        >
          Register
          <v-icon right dark>mdi-check-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import ImageInput from './ImageInput';
import { currentUser } from '../firebaseConfig';

const fb = require('../firebaseConfig');

export default {
  data() {
    return {
      avatar: null,
      form_submition: false,
      registration_status: false,
      registration_status_code: null,
      registration_status_message: null,
      show1: false,
      password1: 'password',
      programme_items: ['Morning', 'Evening', 'Weekend'],
      programme_values: '',
      gender_items: ['Male', 'Female'],
      level_items: ['ND1', 'ND2', 'HND1', 'HND2'],
      gender_value: '',
      el: 1,
      student_programme_year: null,
      programme_year: this.range(2010, 2019),
      pwd: '',
      new_student_data: {
        last_name: '',
        first_name: '',
        middle_name: '',
        email: '',
        admission_year: '',
        level: '',
        reg_no: '',
        mobile: '',
        gender: '',
        project_id: '',
        avatar_url: '',
        account_status: 'active',
        online_status: 'active',
      },
    };
  },
  components: {
    ImageInput,
  },
  computed: {},
  methods: {
    range(start, end) {
      const length = end - start + 1;
      return Array.from({ length }, (_, i) => start + i).reverse();
    },
    stepBack(n) {
      this.el--;
    },
    stepForward(n) {
      this.el++;
    },
    launchFilePicker() {
      this.$refs.file.click();
    },
    create_student_account() {
      this.form_submition = true;
      fb.auth
        .createUserWithEmailAndPassword(this.new_student_data.email, this.pwd)
        .then((user) => {
          this.$store.commit('setCurrentUser', user, user);
          fetch(this.avatar.imageURL)
            .then(res => res.blob())
            .then((blob) => {
              fb.storage
                .ref(`image/users/student/${user.user.uid}/avatar`)
                .put(blob)
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then((url) => {
                  console.log('image uploaded');
                  console.log(`download url: ${url}`);
                  this.new_student_data.avatar_url = url;
                  let project_ref = fb.projectData.doc();
                  project_ref.set({topic: ""})
                  this.new_student_data.project_id = project_ref.id
                  fb.studentsData
                    .doc(user.user.uid)
                    .set(this.new_student_data)
                    .then(() => {
                      this.$store.dispatch('fetchStudentProfile');
                      this.registration_status_code = 201;
                      this.form_submition = false;
                      this.registration_status = true;
                      console.log('Successful');
                      this.new_student_data = {
        last_name: '',
        first_name: '',
        middle_name: '',
        email: '',
        admission_year: '',
        level: '',
        reg_no: '',
        mobile: '',
        gender: '',
        project_id: '',
        avatar_url: '',
        account_status: 'active',
        online_status: 'active',
      }
                    })
                    .catch((err) => {
                      console.error(err);
                      this.registration_status_code = 400;
                      this.registration_status_message = err.message;
                      this.form_submition = false;
                      this.registration_status = true;
                    });
                })
                .catch((err) => {
                  console.error(err);
                  this.registration_status_code = 400;
                  this.registration_status_message = err.message;
                  this.form_submition = false;
                  this.registration_status = true;
                });
            })
            .catch((err) => {
              console.error(err);
              this.registration_status_code = 400;
              this.registration_status_message = err.message;
              this.form_submition = false;
              this.registration_status = true;
            });
        })
        .catch((err) => {
          console.error(err);
          this.registration_status_code = 400;
          this.registration_status_message = err.message;
          this.form_submition = false;
          this.registration_status = true;
        });
    },
  },
  watch: {
    avatar: {
      handler() {
        this.saved = false;
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.rounded-0 {
  border-radius: 0px;
}
</style>
