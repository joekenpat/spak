<template>
  <v-container grid-list-xs class="pa-0 ma-0" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="12" md="5" lg="5" xl="4" class="pa-0 ma-0">
        <chatListViewer />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import chatListViewer from '../components/chatListViewer';

export default {
  components: {
    chatListViewer,
  },
};
</script>
<style scoped>
</style>
