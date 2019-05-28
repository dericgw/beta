workflow "Deploy to Firebase" {
  on = "push"
  resolves = ["Deploy"]
}

action "Install" {
  uses = "nuxt/actions-yarn@master"
  args = "install"
}

action "Build" {
  needs = "Install"
  uses = "nuxt/actions-yarn@master"
  args = "build"
}

action "Deploy" {
  needs = "Build"
  uses = "w9jds/firebase-action@master"
  secrets = ["FIREBASE_TOKEN"]
  args = "deploy --only hosting"
  env = {
    REACT_APP_FIREBASE_API_KEY = "AIzaSyAIDX8oREJNqYOTEmRLEWpLRrtu313HU4c"
    REACT_APP_FIREBASE_AUTH_DOMAIN = "the-beta-project.firebaseapp.com"
    REACT_APP_FIREBASE_DATABASE_URL = "https://the-beta-project.firebaseio.com"
    REACT_APP_FIREBASE_PROJECT_ID = "the-beta-project"
    PROJECT_ID = "the-beta-project"
    REACT_APP_FIREBASE_STORAGE_BUCKET = "the-beta-project.appspot.com"
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "1006232009625"
    REACT_APP_FIREBASE_APP_ID = "1:1006232009625:web:ccf6340b7fae9cf9"
  }
}
