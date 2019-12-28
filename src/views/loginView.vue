<template>
  <v-container grid-list-xs class="pa-0 ma-0" fluid>
        <v-alert text class="text-center mb-0" type="info" style="border-radius:0;">
          Enter your Email and Password to Proceed
        </v-alert>
    <v-row no-gutters class="justify-space-around">
      <v-col cols="12" sm="12" md="5" lg="5" xl="4" align-self="center" class="pa-0 ma-0">
        <login />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import login from '../components/login.vue';

export default {
  components: {
    login,
  },
};
</script>
