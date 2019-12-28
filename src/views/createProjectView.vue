<template>
  <v-container grid-list-xs class="pa-0" fluid>
    <v-alert type="info" class="text-center mb-0" prominent text :value="true"	transition="fade-transition" style="border-radius:0;">
      Fill all the Fields, then click on <span class="font-weight-bold">SEND</span> button to forward your project proposal for review.
    </v-alert>
    <v-alert type="warning" class="text-center" prominent text :value="false"	transition="fade-transition" style="border-radius:0;">
      Project Propsal rejected. Click the <span class="font-weight-bold">Edit</span> button to view the reason and make changes to your project proposal.
    </v-alert>
    <v-row justify="center">
      <v-col cols="12" sm="12" md="5" lg="5" xl="4" class="pa-0 ma-0">
        <sendProposalForApproval/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import sendProposalForApproval from "../components/sendProposalForApproval";

export default {
  data() {
    return {
    };
  },
  components: {
    sendProposalForApproval
  }
};
</script>
<style scoped>
</style>
