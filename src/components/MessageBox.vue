<template>
  <div>
    <Auth class="box_header" @setUser="setUser" @cleanUser="cleanUser" />
    <div id="chat-container" class="box_main scroll-y msg-scroll" dark>
      <v-container grid-list-md text-xs-left>
        <v-layout row wrap v-for="(msg, index) in messages" :key="index">
          <v-flex xs12 v-if="msg.author.uid == user.uid">
            <div class="outgoing_msg" >
              <div class="sent_msg">
                <p v-html="msg.content"></p>
                <span class="time_date">{{ getTime(msg.createTime) }}</span>
              </div>
            </div>
          </v-flex>
          <v-flex xs11 v-else>
            <div class="incoming_msg">
              <v-avatar size="40" v-if="msg.author.uid !== user.uid">
                <img :src="msg.author.photoURL ? msg.author.photoURL : ''" alt="avatar">
              </v-avatar>
              <div class="received_msg">
                <span class="sender">{{ msg.author.name }}</span>
                <p v-html="msg.content"></p>
                <span class="time_date">{{ getTime(msg.createTime) }}</span>
              </div>
            </div>
          </v-flex>
          <v-flex xs1 v-if="msg.author.uid !== user.uid">
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div class="box_footer" dark>
      <v-flex xs12>
        <v-form @submit.prevent="addMessage">
          <v-text-field v-model.trim="inputMessage" dark box label="Write a message" hide-details append-icon="send"
            @click:append="addMessage">
          </v-text-field>
        </v-form>
      </v-flex>
    </div>
  </div>
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
      isLogin: false,
      user: {},
      messages: [],
      inputMessage: ""
    }
  },
  mounted: function () {
    if (this.isLogin) {
      this.bindMessage()
    } else {
      this.messages = [];
    }
  },
  watch: {
    isLogin () {
      if (this.isLogin) {
        this.bindMessage()
      } else {
        this.messages = [];
      }
    }
  },
  updated () {
    const objDiv = document.getElementById('chat-container')
    objDiv.scrollTop = objDiv.scrollHeight
  },
  methods: {
    setUser (user) {
      this.user = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email
      },
      this.isLogin = true
    },
    cleanUser () {
      this.user = {}
      this.isLogin = false
    },
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
    bindMessage () {
      this.$bind(
        'messages',
        fStore.collection('Message').orderBy('createTime')
      )
    },
    addMessage () {
      if (this.inputMessage === '' || !this.isLogin) return

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
  .box_header {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    /* height: 50px; */
    line-height: 50px;
    background-color: #26c6da;
    text-align: center;
  }

  .box_main {
    z-index: 0;
    position: absolute;
    top: 50px;
    bottom: 55px;
    left: 0;
    right: 0;
    background-color: #26C6DA;
    overflow: auto;
  }

  .box_footer {
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    /* height: 50px; */
    line-height: 50px;
    background-color: #1E9EAE;
    text-align: center;
  }

  .incoming_msg {
    overflow: hidden;
    margin-bottom: 15px;
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
    max-width: 100%;
    display: inline-block;
    text-align: justify;
  }

  .received_msg span {
    display: block;
  }

  .outgoing_msg {
    overflow: hidden;
    margin-bottom: 15px;
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
    max-width: 100%;
    display: inline-block;
    text-align: justify;
  }

  .sent_msg span {
    display: block;
  }

  .sender {
    color: #fff;
    font-size: 13px;
  }

  .time_date {
    color: #1D99A9;
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
