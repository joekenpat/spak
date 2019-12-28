<template>
  <div>
    <v-card class="elevation-3">
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-stepper v-model="el" class="elevation-0">
          <v-toolbar dark flat class="mb-0 pb-0 red accent-1">
            <v-toolbar-title>
              <v-icon class="pa-1 white--text">mdi-file-outline</v-icon>RESEND PROPOSAL
            </v-toolbar-title>
          </v-toolbar>
          <v-stepper-header class="red accent-1">
            <v-stepper-step :complete="el > 1" editable step="1">STEP 1</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="el > 2" editable step="2">STEP 2</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="el > 3" editable step="3">STEP 3</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1" class="py-1 px-2">
              <v-container grid-list-xs>
                <v-row>
                  <v-col cols="12" sm="12" class="mb-2 pa-0">
                    <v-textarea
                      label="Topic"
                      v-model="new_topic"
                      :counter="250"
                      auto-grow
                      rows="3"
                      required
                      outlined
                      no-resize
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12" class="mb-2 pa-0">
                    <v-textarea
                      label="Background of study"
                      v-model="new_topic_desc"
                      :rules="desc_rules"
                      :counter="500"
                      rows="4"
                      required
                      outlined
                      no-resize
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12" class="mb-2 pa-0">
                    <v-textarea
                      label="Statement of problem"
                      v-model="new_topic_desc"
                      :rules="desc_rules"
                      :counter="500"
                      rows="5"
                      required
                      outlined
                      no-resize
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-stepper-content>
            <v-stepper-content step="2" class="py-1 px-2">
              <v-container grid-list-xs>
                <v-row>
                  <v-col cols="12" sm="12" class="mb-2 pa-0">
                    <v-textarea
                      label="Aim of Project"
                      v-model="new_topic_desc"
                      :rules="desc_rules"
                      :counter="500"
                      rows="4"
                      required
                      outlined
                      no-resize
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12" class="mb-2 pa-0">
                    <v-textarea
                      label="Special Objectives"
                      v-model="new_topic_desc"
                      :rules="desc_rules"
                      :counter="500"
                      rows="4"
                      required
                      outlined
                      no-resize
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12" class="mb-2 pa-0">
                    <v-textarea
                      label="Methodolgy"
                      v-model="new_topic_desc"
                      :rules="desc_rules"
                      :counter="500"
                      rows="4"
                      required
                      outlined
                      no-resize
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-stepper-content>
            <v-stepper-content step="3" class="py-1 px-2">
              <v-container grid-list-xs>
                <v-row>
                  <v-col cols="12" sm="12" class="mb-2 pa-0">
                    <v-textarea
                      label="Tools to be used"
                      v-model="proposal_tools"
                      :counter="500"
                      rows="2"
                      no-resize
                      required
                      outlined
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12" class="mb-2 pa-0">
                    <v-checkbox
                      label="Send this Proposal for Approval?"
                      v-model="checkbox"
                      :rules="[v => !!v || 'You must agree to continue!']"
                      required
                      outlined
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
        <v-btn v-if="el > 1" color="dark-grey" @click="stepBack()">
          <v-icon right dark>mdi-chevron-left</v-icon>Prev
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="el < 3" color="green" class="white--text" @click="stepForward()">
          Next
          <v-icon right dark>mdi-chevron-right</v-icon>
        </v-btn>
        <v-btn
          v-if="el > 2"
          color="green"
          :loading="loading"
          @click.native="loader = 'loading'"
          :disabled="loading"
          class="white--text"
        >
          Send
          <v-icon right dark>mdi-check-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      valid: true,
      el: 1,
      loader: null,
      loading: false,
      proposal_tools: [],
      topic_rules: [
        v => !!v || 'Topic is required',
        v => (v && v.length <= 250) || 'Topic must be less than 250 characters',
        v => (v && v.length >= 10) || 'Topic must be greater than 10 characters',
      ],
      new_topic_desc: '',
      desc_rules: [
        v => !!v || 'Description is required',
        v => (v && v.length <= 500)
          || 'Description must be less than 500 characters',
        v => (v && v.length >= 10)
          || 'Description must be greater than 10 characters',
      ],
      checkbox: false,
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post('/api/submit', {
          name: this.name,
          email: this.email,
          select: this.select,
          checkbox: this.checkbox,
        });
      }
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
