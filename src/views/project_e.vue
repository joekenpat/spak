<template>
  <v-container grid-list-xs  class="pa-0 ma-0">
    <v-row no-gutters class="d-flex justify-center" style="height: calc(100vh - 104px);">
      <v-col  cols="4" lg="4" xl="4" align-self="center" class="py-1 px-1">
        <v-card class="secondary mx-auto py-1" outlined>
          <v-row justify="space-around">
            <v-avatar color="warning" size="65">
              <v-icon dark large>mdi-briefcase-clock</v-icon>
            </v-avatar>
          </v-row>
          <v-row class="text-center">
            <v-card-text
              class="warning--text text-uppercase text-center d-inline-block mx-auto pa-1"
            >Awaiting Approval</v-card-text>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4" lg="4" xl="4" align-self="center" class="py-1 px-1">
        <v-card class="secondary mx-auto py-1" outlined>
          <v-row justify="space-around">
            <v-avatar color="warning" size="65">
              <v-icon dark large>mdi-briefcase-clock</v-icon>
            </v-avatar>
          </v-row>
          <v-row class="text-center">
            <v-card-text
              class="warning--text text-uppercase text-center d-inline-block mx-auto pa-1"
            >AWaiting Review</v-card-text>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4" lg="2" xl="2" align-self="center" class="py-1 px-1">
        <v-card class="secondary mx-auto py-1" outlined :to="{name: 'createProjectView'}">
          <v-row justify="space-around">
            <v-avatar color="green" size="65">
              <v-icon dark large>mdi-briefcase-plus-outline</v-icon>
            </v-avatar>
          </v-row>
          <v-row class="text-center">
            <v-card-text
              class="green--text text-uppercase text-center d-inline-block mx-auto pa-1"
            >Create</v-card-text>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4" lg="2" xl="2" align-self="center" class="py-1 px-1">
        <v-card class="secondary mx-auto py-1" outlined :to="{name: 'createProjectView', param: project_data.proposal_rejection_reason}">
          <v-row justify="space-around">
            <v-avatar color="error" size="65">
              <v-icon dark large>mdi-briefcase-edit-outline</v-icon>
            </v-avatar>
          </v-row>
          <v-row class="text-center">
            <v-card-text
              class="error--text text-uppercase text-center d-inline-block mx-auto pa-1"
            >RECREATE</v-card-text>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4" lg="2" xl="2" align-self="center" class="py-1 px-1">
        <v-card class="secondary mx-auto py-1" outlined :to="{name: 'ProjectPartnerView'}">
          <v-row justify="space-around">
            <v-avatar color="green" size="65">
              <v-icon dark large>mdi-account-group-outline</v-icon>
            </v-avatar>
          </v-row>
          <v-row class="text-center">
            <v-card-text
              class="green--text text-uppercase text-center d-inline-block mx-auto pa-1"
            >Partner</v-card-text>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4" lg="2" xl="2" align-self="center" class="py-1 px-1">
        <v-card class="secondary mx-auto py-1" outlined :to="{name: 'sendProjectChapterView'}">
          <v-row justify="space-around">
            <v-avatar color="blue" size="65">
              <v-icon dark large>mdi-briefcase-upload</v-icon>
            </v-avatar>
          </v-row>
          <v-row class="text-center">
            <v-card-text class="blue--text text-uppercase text-center d-inline-block mx-auto pa-1">
              UPLOAD
            </v-card-text>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4" lg="2" xl="2" align-self="center" class="py-1 px-1">
        <v-card class="secondary mx-auto py-1" outlined :to="{name: 'sendProjectChapterView', params: project_data.chapter_rejection_reason}">
          <v-row justify="space-around">
            <v-avatar color="error" size="65">
              <v-icon dark large>mdi-briefcase-remove-outline</v-icon>
            </v-avatar>
          </v-row>
          <v-row class="text-center">
            <v-card-text class="error--text text-uppercase text-center d-inline-block mx-auto pa-1">
              reviewed
            </v-card-text>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'vuex';
const fb = require('../firebaseConfig');

export default {
  data() {
    return {
      dashboard_tab_model: 1,
      project_data: undefined,
    };
  },
  created() {
    this.load_data()
  },
  methods: {
    load_data() {
      console.log({"initial_project_data: ": this.project_data})
      this.project_data = this.studentProjectData;
      console.log({"Student_project_data: ": this.project_data})
      console.log({"updated_project_data: ": this.project_data})
    }
  },
  computed: {
    ...mapState(['currentUser', 'studentProfile', 'studentProjectData']),
  },
  watch: {

  },
};
</script>
<style scoped>
</style>
