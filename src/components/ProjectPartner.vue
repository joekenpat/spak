<template>
  <div>
    <v-layout row justify-center>
          <v-dialog max-width="500" v-model="dialog">
            <v-card>
              <v-card-title class="headline red--text">REMOVE PARTNER</v-card-title>
              <v-card-text>Do you really want to remove:<br>
              Name: %partner.id.name%<br>
              Reg No: %partner.id.reg_no%<br>
              as your partner ?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" text @click.native="dialog = false">Cancel</v-btn>
                <v-btn color="error" text @click.native="dialog = false">Remove</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
    <v-card outlined class="elevation-1 mb-2" style="border-radius:0;">
      <v-card-text class="pa-0">
        <v-list dense class="pa-0" >
          <template v-for="n in 4">
            <v-divider v-if="n + 1 <= 5" :key="n" class="pa-0 ma-0"></v-divider>
            <v-list-item
              :key="`item_key_${n}`"
              :id="$uuid.v4()"
            >
              <v-list-item-avatar color="orange" size="40">
                <v-icon dark>mdi-account</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>17E/000{{n}}/CS</v-list-item-title>
                <v-list-item-subtitle>User Full Name {{n}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon color="red" @click.native.stop="dialog = true">
                  <v-icon>mdi-account-off</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-action class="ml-0">
                <v-btn icon color="blue" :to="{name: 'chatView', params: {chat_id: $uuid.v4()}}">
                  <v-icon>mdi-facebook-messenger</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>

export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
  },
};
</script>

<style scoped>

</style>
