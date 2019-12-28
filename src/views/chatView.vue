<template>
  <v-container fluid grid-list-xs class="pa-0 ma-0">
    <v-row no-gutters justify="center" style="height: calc(100vh - 104px);">
      <v-col cols="12" sm="12" md="5" lg="5" xl="4" class="pa-0 ma-0">
        <v-toolbar dark dense flat class="mb-0 pb-0 orange">
          <v-btn icon :to="{name: 'chatListView'}">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>{{ chat_id }}</v-toolbar-title>
        </v-toolbar>
        <chatViewer
          class="white overflow-y-auto"
          style="height: calc(100vh - 208px);"
          v-bind:messages_array="message_json"
        />
        <v-toolbar dark height="56" fixed app class="align-self-end">
          <v-text-field
            v-model="sender_msg"
            hide-details
            append-icon="mdi-send"
            @click:append="send_msg"
            single-line
            class="orange"
            rounded
          ></v-text-field>
        </v-toolbar>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import chatViewer from '../components/chatViewer';

export default {
  components: {
    chatViewer,
  },
  data() {
    return {
      sender_msg: '',
      message_json: [
        {
          sender: 'cpu', content: 'My Name is Spak', time: Date.now(), read: true, delivered: true,
        },
        {
          sender: 'me', content: 'Ok Spak, Nice to meet you', time: Date.now(), read: true, delivered: true,
        },
        {
          sender: 'me', content: 'My Name is Patrick Joel', time: Date.now(), read: true, delivered: true,
        },
        {
          sender: 'cpu', content: 'Do You Love Programming?', time: Date.now(), read: true, delivered: true,
        },
      ],
    };
  },
  props: {
    chat_id: {
      type: String,
    },
  },
  methods: {
    send_msg() {
      const new_msg_time = Date.now();
      const new_msg = {
        sender: 'me',
        content: this.sender_msg,
        time: new_msg_time,
        read: true,
        delivered: true
      };
      this.message_json.push(new_msg);
      this.sender_msg = '';
    },
  },
};
</script>
<style scoped>
</style>
