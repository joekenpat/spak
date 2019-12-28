<template>
  <div>
    <v-layout row justify-center>
      <v-overlay :value="form_submition" z-index="99999">
        <v-progress-circular width="15" size="120" indeterminate color="orange"></v-progress-circular>
      </v-overlay>
      <v-dialog max-width="500" v-model="send_proposal_status" persistent>
        <v-card>
          <v-card-title
            :class="{'headline red--text': (send_proposal_status_code == (404 || 400)), 'headline green--text': (send_proposal_status_code == 201)}"
            v-text="send_proposal_status_code == 201 ? 'SEND PROPOSAL SUCCESSFUL' : 'SEND PROPOSAL FAIL'"
          ></v-card-title>
          <v-card-text v-if="send_proposal_status_code == (404 || 400)">
            <p class="text-center red--text">
              <v-icon color="red" size="100" class="mx-auto">mdi-cancel</v-icon>
              <br />Click Retry to register again
            </p>
          </v-card-text>
          <v-card-text v-if="send_proposal_status_code == 201">
            <p class="text-center green--text">
              <v-icon color="green" size="100" class="mx-auto">mdi-checkbox-marked-circle-outline</v-icon>
              <br />Click continue, to proceed
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" text @click="send_proposal_status = false">Cancel</v-btn>
            <v-btn
              v-if="send_proposal_status_code == (404 || 400)"
              color="error"
              text
              @click="send_proposal_status = false,form_submition = true"
            >Yes, Retry</v-btn>
            <v-btn
              v-if="send_proposal_status_code == 201"
              color="success"
              text
              @click="send_proposal_status = false"
              to="project"
            >Yes, Continue</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-card outlined class="my-2 elevation-1">
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-stepper v-model="el" class="elevation-0">
          <v-stepper-header class="elevation-0">
            <v-stepper-step :complete="el > 1" color="orange" step="1">STEP 1</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="el > 2" color="orange" step="2">STEP 2</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="el > 3" color="orange" step="3">STEP 3</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1" class="py-1">
              <v-container grid-list-xs>
                <v-row>
                  <v-col cols="12" sm="12" class="mb-2 pa-0">
                    <v-textarea
                      label="Topic"
                      v-model="proposal.topic"
                      :counter="250"
                      auto-grow
                      rows="3"
                      required
                      outlined color="orange"
                      no-resize
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12" class="mb-2 pa-0">
                    <v-textarea
                      label="Background of study"
                      v-model="proposal.background_of_study"
                      :counter="500"
                      rows="4"
                      required
                      outlined color="orange"
                      no-resize
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12" class="mb-2 pa-0">
                    <v-textarea
                      label="Statement of problem"
                      v-model="proposal.statement_of_problems"
                      :counter="500"
                      rows="5"
                      required
                      outlined color="orange"
                      no-resize
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-stepper-content>
            <v-stepper-content step="2" class="py-1">
              <v-container grid-list-xs>
                <v-row>
                  <v-col cols="12" sm="12" class="mb-2 pa-0">
                    <v-textarea
                      label="Aim of Project"
                      v-model="proposal.aim_of_project"
                      :counter="500"
                      rows="4"
                      required
                      outlined color="orange"
                      no-resize
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12" class="mb-2 pa-0">
                    <v-textarea
                      label="Special Objectives"
                      v-model="proposal.special_objectives"
                      :counter="500"
                      rows="4"
                      required
                      outlined color="orange"
                      no-resize
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12" class="mb-2 pa-0">
                    <v-textarea
                      label="Methodolgy"
                      v-model="proposal.methodology"
                      :counter="500"
                      rows="4"
                      required
                      outlined color="orange"
                      no-resize
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-stepper-content>
            <v-stepper-content step="3" class="py-1">
              <v-container grid-list-xs>
                <v-row>
                  <v-col cols="12" sm="12" class="mb-2 pa-0">
                    <v-textarea
                      label="Tools to be used"
                      v-model="proposal.tools"
                      :counter="500"
                      rows="2"
                      no-resize
                      required
                      outlined color="orange"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12" class="mb-2 pa-0">
                    <v-checkbox
                      label="Send this Proposal for Approval?"
                      v-model="checkbox"
                      required
                      outlined color="orange"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn v-if="el > 1" text color="dark-grey" @click="stepBack()">
          <v-icon right dark>mdi-chevron-left</v-icon>Prev
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="el < 3" text color="green" class="white--text" @click="stepForward()">
          Next
          <v-icon right dark>mdi-chevron-right</v-icon>
        </v-btn>
        <v-btn v-if="el > 2" color="orange" @click.native="send_proposal()" text>
          Send
          <v-icon right dark>mdi-check-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      valid: true,
      el: 1,
      loader: null,
      loading: false,
      proposal: {
        full_name: '',
        topic: '',
        background_of_study: '',
        statement_of_problems: '',
        aim_of_project: '',
        special_objectives: '',
        methodology: '',
        tools: '',
        chapter_rejected: false,
        chapter_approved: false,
        proposal_rejected: false,
        proposal_approved: false,
        project_chapters: [
          {approved: false,file_url: "", rejected: false, submited: false,}
        ],
        project_participant: [
          {
            accepted: true,
            role: 'Leader',
            uid: "",
          },
        ],
        chapter_rejection_reason: '',
        proposal_rejection_reason: '',
      },
      checkbox: false,
      form_submition: false,
      send_proposal_status: false,
      send_proposal_status_code: null,
      send_proposal_status_message: null,
    };
  },
  computed: {
    ...mapState(['currentUser', 'studentProfile', 'studentProjectData']),
  },
  methods: {
    send_proposal() {

    },
    clear() {
      this.$refs.form.reset();
    },
    stepBack(n) {
      this.el--;
    },
    stepForward(n) {
      this.el++;
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
    },
  },
};
</script>
<style scoped>
</style>
