<template>
  <v-container grid-list-xs class="pa-0 ma-0" fluid>
     <v-alert text class="text-center mb-0" type="info" style="border-radius:0;">
          Fill in the required fields to Proceed
        </v-alert>
    <v-row no-gutters class="justify-space-around">
      <v-col align-self="center" cols="12" sm="12" md="5" lg="5" xl="4" class="pa-0 ma-0">
        <register />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Register from '../components/Register.vue';

export default {
  components: {
    Register,
  },
};
</script>
