<template>
  <div>
    <v-card outlined class="elevation-1 my-1">
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-stepper v-model="el" vertical class="elevation-0">
          <v-toolbar light flat class="mb-0 pb-0 ">
            <v-toolbar-title class="orange--text">
              <v-icon class="pa-1 orange--text">mdi-file-outline</v-icon>
              {{ el< 6 ? `Send Chapter ${el}`: `Send Full Project`}}
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pb-1 mb-0">
            <v-alert type="info" text border="left" :value="true" class="mb-0">
              <b>NOTE:</b> Only
              <b>.pdf</b>
              files allowed.
            </v-alert>
          </v-card-text>
          <template v-for="n in 6">
            <v-stepper-step :key="`${n}-step`" :complete="el > n" :step="n">STEP {{n}}</v-stepper-step>
            <v-stepper-content :key="`${n}-content`" :step="n">
              <v-card-text class="py-0 mb-0 px-0">
                <v-alert color="error" text border="left" :value="supervisorReview != null" class="mb-0">
                  <b>REVIEW:</b> {{ supervisorReview }}.
                </v-alert>
              </v-card-text>
              <v-card-text class="py-0 mb-0">
                <v-alert type="success" text border="left" :value="false" class="mb-0">
                  <b>SENT:</b> %Waiting Supervisor's Response%.
                </v-alert>
              </v-card-text>
              <v-file-input
                :v-model="`chapter.${n}.file`"
                :label="el< 6 ? `Send Chapter ${el}`: `Send Full Project`"
                counter
                :rules="rules"
                accept=".pdf"
                prepend-icon="mdi-file-word-outline"
                outlined
                class="mt-2"
                :show-size="2000"
              ></v-file-input>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn
                  color="green"
                  text
                  :loading="loading"
                  @click.native="loader = 'loading'"
                  :disabled="loading"
                  class="white--text"
                > -->
                <v-btn
                  color="green"
                  text
                  @click.native="stepForward()"
                  :disabled="loading"
                  class="white--text"
                >
                  Send
                  <v-icon right dark>mdi-check-circle</v-icon>
                </v-btn>
              </v-card-actions>
            </v-stepper-content>
          </template>
        </v-stepper>
      </v-form>
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
      chapter: {
        1: { file: null },
        2: { file: null },
        3: { file: null },
        4: { file: null },
        5: { file: null },
        6: { file: null },
      },
      rules: [v => !v || value.size > 5000 || 'File should not Exceed 5MB'],
      checkbox: false,
    };
  },
  props: {
    supervisorReview: {
      type: [String, Object],
      default: null,
    },
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
    stepBack() {
      this.el--;
    },
    stepForward() {
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
