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
  secrets = ["FIREBASE_TOKEN", "REACT_APP_FIREBASE_API_KEY", "REACT_APP_FIREBASE_AUTH_DOMAIN", "REACT_APP_FIREBASE_DATABASE_URL", "REACT_APP_FIREBASE_PROJECT_ID", "REACT_APP_FIREBASE_MESSAGING_SENDER_ID", "REACT_APP_FIREBASE_STORAGE_BUCKET", "REACT_APP_FIREBASE_APP_ID"]
}

action "Deploy" {
  needs = "Build"
  uses = "w9jds/firebase-action@master"
  secrets = ["FIREBASE_TOKEN"]
  args = "deploy"
  env = {
    PROJECT_ID = "the-beta-project"
  }
}
