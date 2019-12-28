<template>
  <v-container grid-list-xs class="pt-0" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="12" md="5" lg="5" xl="4" class="pa-0 ma-0">
        <sendProjectChapterForReview />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import sendProjectChapterForReview from '../components/sendChapterForReview';

export default {
  components: {
    sendProjectChapterForReview,
  },
};
</script>
<style scoped>
</style>
