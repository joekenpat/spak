<template>
  <v-container fluid grid-list-xs class="pa-0 ma-0">
    <v-row no-gutters justify="center" style="height: calc(100vh - 104px);">
      <v-col cols="12" sm="12" md="5" lg="5" xl="4" class="pa-0 ma-0">
        <v-toolbar dark dense flat class="mb-0 pb-0 orange">
          <v-btn icon :to="{name: 'ProjectPartnerView'}">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>ADD PROJECT PARTNER</v-toolbar-title>
        </v-toolbar>
        <addProjectPartner/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import addProjectPartner from '../components/addProjectPartner';

export default {
  components: {
    addProjectPartner,
  },
  data() {
    return {

    };
  },
  props: {


  },
  methods: {

  },
};
</script>
<style scoped>
</style>
