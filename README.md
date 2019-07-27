# vue-firebase-chat
Using `VueJS` and `Firebase` to create a simple chatbox which provides get/leave message function and Google authentication.
More intructions can be refered to https://dotblogs.com.tw/blog/preview/a3a2ed14-ba54-4e95-b7de-d6ef01a717db

## Project setup
Add `.env.local` file include these variables, you can get them from Firebase.
```
VUE_APP_API_KEY=xxx
VUE_APP_AUTH_DOMAIN=xxx.firebaseapp.com
VUE_APP_DATABASE_URL=https://xxx.firebaseio.com
VUE_APP_PROJECT_ID=xxx
VUE_APP_STORAGE_BUCKET=xxx.appspot.com
VUE_APP_MESSAGING_SENDER_ID=xxx
VUE_APP_APP_ID=xxx
```
Then install all modules.
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
