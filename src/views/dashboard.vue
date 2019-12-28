<template>
  <v-app>
    <v-container grid-list-xs>
      <v-row justify="center">
        <v-col cols="4" lg="2" xl="2" class="py-1 px-1">
          <v-card class="secondary mx-auto py-1" outlined to="approveProposalView">
            <v-row justify="space-around">
              <v-avatar color="orange" size="65">
                <v-icon dark large>mdi-briefcase-check</v-icon>
              </v-avatar>
            </v-row>
            <v-row class="text-center">
              <v-card-text
                class="orange--text text-uppercase text-center d-inline-block mx-auto pa-1"
              >
                <span class="hidden-md-and-down">APPROVE</span> PROPOSAL
              </v-card-text>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="4" lg="2" xl="2" class="py-1 px-1">
          <v-card class="secondary mx-auto py-1" outlined to="reviewProjectChapterView">
            <v-row justify="space-around">
              <v-avatar color="orange" size="65">
                <v-icon dark large>mdi-briefcase-edit</v-icon>
              </v-avatar>
            </v-row>
            <v-row class="text-center">
              <v-card-text
                class="orange--text text-uppercase text-center d-inline-block mx-auto pa-1"
              >
                <span class="hidden-md-and-down">REVIEW</span> CHAPTERS
              </v-card-text>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="4" lg="2" xl="2" class="py-1 px-1">
          <v-card class="secondary mx-auto py-1" outlined to="createEventView">
            <v-row justify="space-around">
              <v-avatar color="orange" size="65">
                <v-icon dark large>mdi-calendar-edit</v-icon>
              </v-avatar>
            </v-row>
            <v-row class="text-center">
              <v-card-text
                class="orange--text text-uppercase text-center d-inline-block mx-auto pa-1"
              >
                <span class="hidden-md-and-down">SEND</span> MEETING
              </v-card-text>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      dashboard_tab_model: 1,
    };
  },
  methods: {
    xx_plus() {
      alert('View not yet available');
    },
  },
};
</script>
