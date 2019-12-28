<template>
  <div>
    <v-layout row justify-center>
      <v-overlay :value="proposal_submition" z-index="99999">
        <v-progress-circular width="15" size="120" indeterminate color="orange"></v-progress-circular>
      </v-overlay>
      <v-dialog max-width="500" v-model="proposal_submition_status" persistent>
        <v-card v-show="proposal_submition_response == true">
          <v-card-title
            :class="{'headline red--text': (proposal_submition_status_code == (404 || 400)), 'headline green--text': (proposal_submition_status_code == 201)}"
            v-text="proposal_submition_status_code == 201 ? 'PROPOSAL {poposal_action} SUCCESSFUL' : 'PROPOSAL {proposal_action} FAIL'"
          ></v-card-title>
          <v-card-text v-if="proposal_submition_status_code == (404 || 400)">
            <p class="text-center red--text">
              <v-icon color="red" size="100" class="mx-auto">mdi-cancel</v-icon>
              <v-alert
                color="error"
                text
                :value="proposal_submition_status_message != null"
                transition="fade-transition"
              >{{proposal_submition_status_message}}</v-alert>
              <br />Click Retry Again
            </p>
          </v-card-text>
          <v-card-text v-if="proposal_submition_status_code == 201">
            <p class="text-center green--text">
              <v-icon color="green" size="100" class="mx-auto">mdi-checkbox-marked-circle-outline</v-icon>
              <br />Click Continue
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" text @click="proposal_submition_status = false">Cancel</v-btn>
            <v-btn
              v-if="proposal_submition_status_code == (404 || 400)"
              color="error"
              text
              @click="proposal_submition_status = false,form_submition = true,login_user()"
            >Yes, Retry</v-btn>
            <v-btn
              v-if="proposal_submition_status_code == 201"
              color="success"
              text
              @click="proposal_submition_status = false"
              to="project"
            >Yes, Continue</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-show="proposal_action_confirm == true">
          <v-card-title
            :class="{'headline red--text': (proposal_action == 'reject'), 'headline info--text': (proposal_action == 'accept')}"
            v-text="proposal_action == 'accept' ? 'ACCEPT PROPOSAL ?' : 'REJECT PROPOSAL ?'"
          ></v-card-title>
          <v-card-text v-if="proposal_action == 'reject'">
            <p class="red--text">
              <v-alert color="error" text transition="fade-transition">
                Are you Really Sure you Wan to Reject:
                <br />Proposal: %proposal_title%
                <br />By: %full_name%
                <br />If Yes Enter Reasons and click Reject
              </v-alert>
              <v-col cols="12" sm="12" class="mb-2 pa-0">
                <v-textarea
                  label="Reason(s) for Rejection"
                  v-model="new_proposal_rejection_reason"
                  :counter="500"
                  rows="2"
                  no-resize
                  required
                  outlined
                ></v-textarea>
              </v-col>
            </p>
          </v-card-text>
          <v-card-text v-if="proposal_action == 'accept'">
            <p class="green--text">
              <v-alert color="info" text transition="fade-transition">
                Are you Really Sure you Want to Accept:
                <br />Proposal: %proposal_title%
                <br />By: %full_name%
                <br />
              </v-alert>
              <v-list dense class="pa-0">
                <template v-for="n in 3">
                  <v-divider v-if="n + 1 <= 6" :key="n" class="pa-0 ma-0"></v-divider>
                  <v-list-item :key="`item_key_${n}`" :id="$uuid.v4()">
                    <v-list-item-avatar color="info" size="25">
                      <span class="white--text">{{n}}</span>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        class="text-wrap info--text"
                      >Possible Duplicate Title {{n}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="proposal_action == 'reject'"
              color="success"
              text
              @click="proposal_action = 'accept'"
            >Accept</v-btn>
            <v-btn
              v-if="proposal_action == 'accept'"
              color="error"
              text
              @click="proposal_action = 'reject'"
            >Reject</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="secondary"
              text
              @click="proposal_action = undefined,proposal_action_confirm = false, proposal_submition_status =false"
            >Cancel</v-btn>
            <v-btn
              v-if="proposal_action == 'reject'"
              color="error"
              text
              @click="rejectPost()"
            >Yes, Reject</v-btn>
            <v-btn
              v-if="proposal_action == 'accept'"
              color="success"
              text
              @click="approvePost()"
            >Yes, Approve</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-card class="elevation-0">
      <v-card-text class="pa-0" style="border-radius:0;">
        <template>
          <v-expansion-panels accordion style="border-radius:0;">
            <v-expansion-panel class="elevation-1" v-for="(item,i) in proposals" :key="i">
              <v-expansion-panel-header class="orange--text">{{item.by}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-divider></v-divider>
                <v-list dense class="pa-0" id>
                  <v-list-item class>
                    <v-list-item-content>
                      <v-list-item-title class="text-wrap">FULL NAME</v-list-item-title>
                      <v-list-item-subtitle class="text-wrap grey--text" v-text="item.full_name"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class>
                    <v-list-item-content>
                      <v-list-item-title class="text-wrap">TOPIC</v-list-item-title>
                      <v-list-item-subtitle class="text-wrap grey--text" v-text="item.topic"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class>
                    <v-list-item-content>
                      <v-list-item-title class="text-wrap">AIM OF PROJECT</v-list-item-title>
                      <v-list-item-subtitle
                        class="text-wrap grey--text"
                        v-text="item.aim_of_project"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class>
                    <v-list-item-content>
                      <v-list-item-title class="text-wrap">BACKGROUND OF STUDY</v-list-item-title>
                      <v-list-item-subtitle
                        class="text-wrap grey--text"
                        v-text="item.background_of_study"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class>
                    <v-list-item-content>
                      <v-list-item-title class="text-wrap">METHODOLOGY</v-list-item-title>
                      <v-list-item-subtitle class="text-wrap grey--text" v-text="item.methodology"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class>
                    <v-list-item-content>
                      <v-list-item-title class="text-wrap">SPECIAL OBJECTIVES</v-list-item-title>
                      <v-list-item-subtitle
                        class="text-wrap grey--text"
                        v-text="item.special_objectives"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class>
                    <v-list-item-content>
                      <v-list-item-title class="text-wrap">STATEMENT OF PROBELM</v-list-item-title>
                      <v-list-item-subtitle
                        class="text-wrap grey--text"
                        v-text="item.statement_of_problems"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class>
                    <v-list-item-content>
                      <v-list-item-title class="text-wrap">TOOLS</v-list-item-title>
                      <v-list-item-subtitle class="text-wrap grey--text" v-text="item.tools"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn
                    color="error"
                    @click.native="proposal_action = 'reject', proposal_action_confirm = true, proposal_submition_status = true"
                    text
                  >Reject</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green"
                    @click.native="proposal_action = 'accept', proposal_action_confirm = true, proposal_submition_status = true"
                    text
                  >APPROVE</v-btn>
                </v-card-actions>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { functions } from "firebase";
const fb = require("../firebaseConfig");

export default {
  data() {
    return {
      proposals: [],
      new_proposal_rejection_reason: "",
      posilible_duplicate_proposal: [],
      proposal_submition: false,
      proposal_action: undefined,
      proposal_action_confirm: false,
      proposal_submition_response: false,
      proposal_submition_status: false,
      proposal_submition_status_code: undefined,
      proposal_submition_status_message: ""
    };
  },
  props: {},
  computed: {
    ...mapState(["currentUser", "studentProfile", "studentProjectData"])
  },
  created() {
    this.loadProposals();
  },
  methods: {
    loadProposals() {
      console.log({ initial_proposals: this.proposals });
      fb.projectData
        .where("proposal_approved", "==", false)
        .where("proposal_rejected", "==", false)
        .get()
        .then(querSnapshot => {
          querSnapshot.forEach(doc => {
            this.proposals.push(doc.data());
          });
        });
      console.log({ updated_proposals: this.proposals });
    }
  }
};
</script>
<style scoped>
</style>
