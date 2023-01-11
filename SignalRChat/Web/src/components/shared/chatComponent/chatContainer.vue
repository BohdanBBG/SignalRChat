<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <v-text-field
          v-model="inputMessage"
          label="First User"
          :rules="InputRules"
          hide-details="auto"
        ></v-text-field>
      </v-col>
      <v-col class="mb-4">
        <v-btn elevation="2" color="primary" rounded small v-on:click="Send"
          >Send</v-btn
        >
      </v-col>
      <!-- <v-col class="mb-4">
        <v-text-field
          label="Second User"
          :rules="InputRules"
          hide-details="auto"
        ></v-text-field>
      </v-col>
      <v-col class="mb-4">
        <v-btn elevation="2" color="primary" rounded small :click="Send()"
          >Send</v-btn
        >
      </v-col> -->
    </v-row>

    <v-row class="text-center">
      <v-col class="mb-4">
        <!-- <v-textarea
          v-model="chatTexts"
          readonly
          label="Three rows"
          auto-grow
          outlined
          rows="1"
          shaped
        /> -->
        <v-textarea
          v-for="(chat, index) in chatTexts"
          :key="index"
          :value="chat.message"
          readonly
          :label="chat.sender"
          auto-grow
          outlined
          rows="1"
          shaped
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { CLIENT_EVENTS, SENDER, SERVER_EVENTS } from "@/core/services/types";

class Message {
  constructor(init?: Partial<Message>) {
    Object.assign(this, init);
  }

  sender!: SENDER;
  message!: string;
}

@Component
export default class ChatContainer extends Vue {
  @Prop() private msg!: string;

  public chatTexts: Message[] = [];

  public inputMessage = "";

  public get InputRules() {
    return [
      (value: string) => !!value || "Required.",
      (value: string) => (value && value.length >= 3) || "Min 3 characters",
    ];
  }

  // This is called from the server through SignalR
  Send() {
    //@ts-ignore
    this.$chatHub.chatHubInstance.Invoke(CLIENT_EVENTS.SEND, this.inputMessage);
    this.chatTexts.push(
      new Message({
        sender: SENDER.CLIENT,
        message: this.inputMessage,
      })
    );

    console.log(
      `Send ${CLIENT_EVENTS.SEND}`,
      this.inputMessage,
      this.chatTexts
    );
  }

  onServerSend(text: string) {
    this.chatTexts.push(
      new Message({
        sender: SENDER.SERVER,
        message: text,
      })
    );

    console.log(
      `send-event ${SERVER_EVENTS.SEND}`,
      this.inputMessage,
      this.chatTexts
    );
  }

  created() {
    this.$chatHub.events.$on(SERVER_EVENTS.SEND, this.onServerSend);
  }
}
</script>
