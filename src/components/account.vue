<template>
  <div>
    <v-card class="elevation-3" style="border-radius:0;">
      <v-card-text class="pa-0">
        <v-form>
          <v-container grid-list-xs>
            <v-row no-gutters>
              <v-col cols="12" sm="12" class="mb-2">
                <image-input v-model="avatar" class="d-flex justify-center">
                  <div slot="activator">
                    <v-avatar
                      size="160px"
                      v-ripple
                      v-if="!avatar"
                      class="elevation-2 orange mb-3"
                      tile
                    >
                      <img
                        v-if="update_student_data.avatar_url != (''|| null)"
                        :src="update_student_data.avatar_url"
                        alt="avatar"
                      />
                      <v-icon color="white" v-else size="100">mdi-camera-image</v-icon>
                    </v-avatar>
                    <v-avatar size="160" tile v-ripple v-else class="mb-3">
                      <img :src="avatar.imageURL" alt="avatar" />
                    </v-avatar>
                  </div>
                </image-input>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                :disabled="form_status == 'VIEW'" :outlined="form_status == 'EDIT'"
                  v-model.trim="update_student_data.first_name"
                  name="student_first_name"
                  label="First Name"
                  type="text"

                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                :disabled="form_status == 'VIEW'" :outlined="form_status == 'EDIT'"
                  v-model.trim="update_student_data.last_name"
                  name="student_last_name"
                  label="Last Name"
                  type="text"

                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                :disabled="form_status == 'VIEW'" :outlined="form_status == 'EDIT'"
                  v-model.trim="update_student_data.middle_name"
                  name="student_middle_name"
                  label="Middle Name"
                  type="text"

                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                :disabled="form_status == 'VIEW'" :outlined="form_status == 'EDIT'"
                  v-model.trim="update_student_data.mobile"
                  name="student_mobile"
                  label="Mobile"
                  type="text"

                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                :disabled="form_status == 'VIEW'" :outlined="form_status == 'EDIT'"
                  v-model.trim="update_student_data.gender"
                  :items="gender_items"
                  name="student_gender"
                  label="Gender"

                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                :disabled="form_status == 'VIEW'" :outlined="form_status == 'EDIT'"
                  v-model.trim="update_student_data.admission_year"
                  :items="programme_year"
                  name="student_year"
                  label="Year"

                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                :disabled="form_status == 'VIEW'" :outlined="form_status == 'EDIT'"
                  v-model.trim="update_student_data.programme"
                  :items="programme_items"
                  name="student_programme"
                  label="Programme"

                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" class="pa-0 mb-2">
                <v-select
                :disabled="form_status == 'VIEW'" :outlined="form_status == 'EDIT'"
                  :items="level_items"
                  name="student_level"
                  label="Level"

                  v-model="update_student_data.level"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                :disabled="form_status == 'VIEW'" :outlined="form_status == 'EDIT'"
                  v-model.trim="update_student_data.reg_no"
                  name="student_reg_no"
                  label="Reg No"
                  type="text"

                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="form_status === 'EDIT'" text color="dark-grey" @click="form_status = 'VIEW'">
          <v-icon right dark>mdi-chevron-left</v-icon>Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="form_status === 'VIEW'"
          color="orange"
          text
          class="white--text"
          @click="form_status = 'EDIT'"
        >
          <v-icon right dark>mdi-brush</v-icon>Edit
        </v-btn>
        <v-btn
          v-if="form_status === 'EDIT'"
          color="green"
          text
          :loading="loading"
          @click.native="loader = 'loading'"
          :disabled="loading"
          class="white--text"
        >
          Update
          <v-icon right dark>mdi-check-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import ImageInput from './ImageInput';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      avatar: null,
      modal: false,
      loader: null,
      loading: false,
      programme_items: ['Morning', 'Evening', 'Weekend'],
      gender_items: ['Male', 'Female'],
      level_items: ['ND1', 'ND2', 'HND1', 'HND2'],
      programme_year: this.range(2010, 2019),
      form_status: 'VIEW',
      update_student_data: {

      },
    };
  },
  components: {
    ImageInput,
  },
  created(){
    this.load_data();
  },
  methods: {
    range(start, end) {
      const length = end - start + 1;
      return Array.from({ length }, (_, i) => start + i).reverse();
    },
    launchFilePicker() {
      this.$refs.file.click();
    },
    load_data() {
    },
  },
  computed: {
    ...mapState(['currentUser', 'studentProfile', 'studentProjectData']),
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => ((this[l] = false), (this.form_status = 'VIEW')), 3000);
      this.loader = null;
    },
  },
};
</script>
