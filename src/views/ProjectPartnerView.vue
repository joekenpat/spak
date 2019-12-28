<template>
  <v-container fluid grid-list-xs class="pa-0 ma-0">
    <v-layout row justify-center>
      <v-dialog max-width="500" v-model="dialog">
        <v-card>
          <v-card-title class="headline green--text">ADD PARTNER</v-card-title>
          <v-card-text>
            Do you really want to ADD:
            <br />Name: %partner.id.name%
            <br />Reg No: %partner.id.reg_no%
            <br />as your partner ?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" text @click.native="dialog = false">Cancel</v-btn>
            <v-btn color="success" text @click.native="dialog = false">ADD</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-row no-gutters justify="center" style="height: calc(100vh - 104px);">
      <v-col cols="12" sm="12" md="5" lg="5" xl="4" class="pa-0 ma-0">
        <v-toolbar
          dark
          dense
          flat
          :class="{'mb-0 pb-0 orange':(search_partner === false),'mb-0 pb-0 green':(search_partner === true),}"
        >
          <v-toolbar-title>PROJECT PARTNER</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="search_partner = !search_partner">
            <v-icon>mdi-account-plus</v-icon>
          </v-btn>
            <template v-if="search_partner == true" class="" v-slot:extension>
              <v-expand-transition>
                <v-col
                  cols="4"
                  sm="4"
                  class="pa-0 mx-auto"
                >
                  <v-text-field
                    append-icon="mdi-account-search"
                    @click:append
                    name="reg_number"
                    autofocus
                    placeholder="###/####/CS"
                    type="text"
                    class="text-center"
                  ></v-text-field>
                </v-col>
              </v-expand-transition>
            </template>
        </v-toolbar>
        <ProjectPartner />
        <v-expand-transition>
          <v-card outlined v-if="search_partner === true" class="elevation-1">
            <v-card-title class="success lighten-2 success--text py-0 font-smaller" style="border-radius:0;">RESULT</v-card-title>
            <v-card-text class="pa-0">
              <v-list dense class="pa-0">
                <template v-for="n in 1">
                  <v-divider v-if="n + 1 <= 2" :key="n" class="pa-0 ma-0"></v-divider>
                  <v-list-item :key="`item_key_${n}`" :id="$uuid.v4()">
                    <v-list-item-avatar color="green lighten-2" size="40">
                      <v-icon dark>mdi-account</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>17E/000{{n}}/CS</v-list-item-title>
                      <v-list-item-subtitle>User Full Name {{n}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon color="green" @click.native.stop="dialog = true">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-expand-transition>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ProjectPartner from '../components/ProjectPartner';

export default {
  components: {
    ProjectPartner,
  },
  data() {
    return {
      search_partner: false,
      dialog: false,
    };
  },
  props: {},
  methods: {},
};
</script>
<style scoped>
</style>
