<template>
  <div>
    <v-card outlined class="elevation-3">
      <v-card-text class="pa-0" style="border-radius:0;">
        <v-list dense class="pa-0" >
          <template v-for="n in 5">
            <v-divider v-if="n + 1 <= 6" :key="n" class="pa-0 ma-0"></v-divider>
            <v-list-item
              :key="`item_key_${n}`"
              :to="{name: 'chatView', params: {chat_id: $uuid.v4()}}"
              :id="$uuid.v4()"
            >
              <v-list-item-avatar color="orange" size="40">
                <v-icon dark>mdi-account-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Message {{n}}</v-list-item-title>
                <v-list-item-subtitle>Message Text {{n}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon v-if="n % 2 == 0">mdi-check</v-icon>
                <v-icon v-else-if="n % 3 == 0" color="green">mdi-check-all</v-icon>
                <v-icon v-else>mdi-check-all</v-icon>
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
    };
  },
  methods: {
  },
};
</script>

<style scoped>

</style>
