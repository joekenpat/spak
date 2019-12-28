<template>
  <div>
    <v-layout row justify-center>
      <v-overlay :value="form_submition" z-index="99999">
        <v-progress-circular width="15" size="120" indeterminate color="orange"></v-progress-circular>
      </v-overlay>
      <v-dialog max-width="500" v-model="login_status" persistent>
        <v-card>
          <v-card-title
            :class="{'headline red--text': (login_status_code == (404 || 400)), 'headline green--text': (login_status_code == 201)}"
            v-text="login_status_code == 201 ? 'LOGIN SUCCESSFUL' : 'LOGIN FAIL'"
          ></v-card-title>
          <v-card-text v-if="login_status_code == (404 || 400)">
            <p class="text-center red--text">
              <v-icon color="red" size="100" class="mx-auto">mdi-cancel</v-icon>
              <v-alert
                color="error"
                text
                :value="login_status_message != null"
                transition="fade-transition"
              >{{login_status_message}}</v-alert>
              <br />Click Retry to Login again
            </p>
          </v-card-text>
          <v-card-text v-if="login_status_code == 201">
            <p class="text-center green--text">
              <v-icon color="green" size="100" class="mx-auto">mdi-checkbox-marked-circle-outline</v-icon>
              <br />Click continue, to proceed in order to submit your proposal
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="login_status_code != 201"
              color="error"
              text
              @click="form_submition = false, login_status= false"
            >cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="login_status_code == (404 || 400)"
              color="error"
              text
              @click="login_status = false,form_submition = true,login_user()"
            >Yes, Retry</v-btn>
            <v-btn
              v-if="login_status_code == 201"
              color="success"
              text
              @click="hot_reload()"
            >Yes, Continue</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-card outlined class="elevation-1 my-2">
      <v-card-text class="pb-0">
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" class="pa-0">
                <v-text-field color="orange" name="name" label="Email" type="email" outlined v-model="email"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" class="pa-0">
                <v-text-field
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  name="name"
                  label="Password"
                  outlined
                  @click:append="show = !show"
                  color="orange"
                  v-model="pwd"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="secondary" to="RegisterView" text>Register Instead</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="orange" text @click.native="login_user()" class="white--text">
          signin
          <v-icon right dark>mdi-check-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { currentUser } from "../firebaseConfig";

const fb = require("../firebaseConfig");

export default {
  data() {
    return {
      show: false,
      password: "password",
      loader: null,
      loading: false,
      email: "",
      pwd: "",
      form_submition: false,
      login_status: false,
      login_status_code: null,
      login_status_message: null
    };
  },
  watch: {},
  methods: {
    hot_reload(){
      this.login_status = false;
      location.reload(true)
    },
    login_user() {
      this.form_submition = true;
      fb.auth
        .signInWithEmailAndPassword(this.email, this.pwd)
        .then(user => {
          try {
            this.$store.commit("setCurrentUser", user.user);
          } catch (error) {
            console.error({ "currentUserDataSetError: ": error });
          }
          try {
            this.$store.dispatch("fetchStudentProfile");
          } catch (error) {
            console.error({ "studentProfileDataSetError: ": error });
          }
          try {
            this.$store.dispatch("fetchStudentProjectData");
          } catch (error) {
            console.error({ "studentProjectDataSetError: ": error });
          }
          console.log(
            `Found ID: ${user.user.uid} for : ${this.email} Successfully!`
          );
          this.login_status_code = 201;
          this.form_submition = false;
          this.login_status = true;
        })
        .catch(err => {
          console.error(err);
          this.login_status_message = err.message;
          this.login_status_code = 400;
          this.form_submition = false;
          this.login_status = true;
        });
    }
  }
};
</script>
