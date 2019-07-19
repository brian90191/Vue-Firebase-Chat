<template>
  <v-card class="mx-auto" color="#26c6da" dark max-width="600">
    <Auth />
    <v-card-text style="padding: 0">
      <v-container id="chat-container" grid-list-md text-xs-left class="scroll-y msg-scroll" style="height: 600px;">
        <v-layout row wrap v-for="(msg, index) in messages" :key="index">
          <v-flex xs1>
            <v-avatar size="40" v-if="msg.author.uid !== user.uid">
              <img :src="msg.author.photoURL ? msg.author.photoURL : ''" alt="avatar">
            </v-avatar>
          </v-flex>
          <v-flex xs10>
            <div class="outgoing_msg" v-if="msg.author.uid === user.uid">
              <div class="sent_msg">
                <span>{{ msg.author.name }}</span>
                <p v-html="msg.content"></p>
                <span class="time_date">{{ getTime(msg.createTime) }}</span>
              </div>
            </div>
            <div class="incoming_msg" v-else>
              <div class="received_msg">
                <span>{{ msg.author.name }}</span>
                <p v-html="msg.content"></p>
                <span class="time_date">{{ getTime(msg.createTime) }}</span>
              </div>
            </div>
          </v-flex>
          <v-flex xs1>
            <v-avatar size="40" v-if="msg.author.uid === user.uid">
              <img :src="msg.author.photoURL ? msg.author.photoURL : ''" alt="avatar">
            </v-avatar>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions style="padding: 0">
      <v-flex xs12>
        <v-form @submit.prevent="addMessage">
          <v-text-field v-model.trim="inputMessage" box label="Write a message" hide-details append-icon="send"
            @click:append="addMessage">
          </v-text-field>
        </v-form>
      </v-flex>
    </v-card-actions>
  </v-card>
</template>

<script>
import Auth from './Auth'
import firebase from 'firebase/app'
import { db } from '../db'

const fStore = db.firestore()

export default {
  components: {
    Auth
  },
  data () {
    return {
      user: {
          uid: '001',
          displayName: 'Brian',
          photoURL: 'https://lh6.googleusercontent.com/-XA3sZvZv414/AAAAAAAAAAI/AAAAAAAAB70/bl31VaxebCc/photo.jpg',
          email: 'test@test.com'
      },
      messages: [],
      inputMessage: ""
    }
  },
  mounted: function () {
    this.$bind(
      'messages',
      fStore.collection('Message').orderBy('createTime')
    )
  },
  updated () {
    const objDiv = document.getElementById('chat-container')
    objDiv.scrollTop = objDiv.scrollHeight
  },
  methods: {
    getTime (firebaseTS) {
      let dateObj = new Date(firebaseTS.seconds * 1000) // date object
      let date = dateObj.toISOString().substring(0, 10)
      let hours = dateObj.getHours()
      let minutes = dateObj.getMinutes()
      let seconds = dateObj.getSeconds()
      let ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      hours = hours > 0 ? hours : 12 // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds
      let strTime = `${date} ${hours}:${minutes}:${seconds} ${ampm}`
      return strTime
    },
    addMessage: function () {
      if (this.inputMessage === '') return

      // Add message to firestore
      fStore.collection('Message')
        .add({
          'author': {
            'uid': this.user.uid,
            'name': this.user.displayName,
            'photoURL': this.user.photoURL,
            'email': this.user.email
          },
          'content': this.inputMessage,
          'createTime': firebase.firestore.Timestamp.fromDate(new Date())
        })
        .then(() => {
          this.inputMessage = ''
        })
    }
  }
}
</script>

<style>
  .incoming_msg {
    overflow: hidden;
    margin: 8px 0 15px;
    word-wrap: break-word;
    vertical-align: top;
  }
  
  .received_msg {
    display: inline-block;
    padding: 0 0 0 10px;
    vertical-align: top;
    width: 80%;
  }

  .received_msg p {
    background: #e4e8fb;
    border-radius: 3px;
    color: #646464;
    font-size: 14px;
    margin: 0;
    padding: 5px 10px;
    width: 100%;
  }

  .outgoing_msg {
    overflow: hidden;
    margin: 8px 0 15px;
    word-wrap: break-word;
    vertical-align: top;
  }

  .sent_msg {
    float: right;
    width: 80%;
    text-align: right;
  }

  .sent_msg p {
    background: #AED581;
    border-radius: 3px;
    font-size: 14px;
    margin: 0;
    color: #fff;
    padding: 5px 10px;
    width: 100%;
  }

  .time_date {
    color: #484848;
    display: block;
    font-size: 10px;
    margin: 3px 0 0;
  }

  .msg-scroll::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
    background-color: #1E9EAE;
  }

  .msg-scroll::-webkit-scrollbar {
    width: 6px;
    background-color: #1E9EAE;
  }

  .msg-scroll::-webkit-scrollbar-thumb {
    background-color: #99f4ff;

  }

</style>
