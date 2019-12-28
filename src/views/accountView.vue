<template>
  <v-container grid-list-xs class="pa-0 ma-0" fluid>
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="12" md="5" lg="5" xl="4" class="pa-0 ma-0">
        <account />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import account from '../components/account.vue';

export default {
  components: {
    account,
  },
};
</script>
