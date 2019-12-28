<template>
  <v-container grid-list-xs  class="pa-0 ma-0" fluid>
    <v-alert type="info" class="text-center" prominent text :value="true"	transition="fade-transition" style="border-radius:0;">
      Click on the <span class="font-weight-bold">CREATE</span> button to start a new project proposal.
    </v-alert>
    <v-alert type="warning" class="text-center" prominent text :value="false"	transition="fade-transition" style="border-radius:0;">
      Project Propsal rejected. Click the <span class="font-weight-bold">Edit</span> button to view the reason and make changes to your project proposal.
    </v-alert>
    <v-row no-gutters class=" justify-space-around">
      <v-col  cols="4" lg="2" xl="2" align-self="center" class="py-1 px-1">
        <v-card class="secondary mx-auto py-1" outlined :to="{name: 'Create Project'}">
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
        <v-card class="secondary mx-auto py-1" outlined :to="{name: 'Create Project'}">
          <v-row justify="space-around">
            <v-avatar color="error" size="65">
              <v-icon dark large>mdi-briefcase-edit-outline</v-icon>
            </v-avatar>
          </v-row>
          <v-row class="text-center">
            <v-card-text
              class="error--text text-uppercase text-center d-inline-block mx-auto pa-1"
            >EDIT</v-card-text>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4" lg="2" xl="2" align-self="center" class="py-1 px-1">
        <v-card class="secondary mx-auto py-1" outlined :to="{name: 'Project Partner'}">
          <v-row justify="space-around">
            <v-avatar color="green" size="65">
              <v-icon dark large>mdi-account-group</v-icon>
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
        <v-card class="secondary mx-auto py-1" outlined :to="{name: 'Send Project Chapter'}">
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
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'vuex';

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
