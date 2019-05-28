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
  uses = "w9jds/firebase-action@7d6b2b058813e1224cdd4db255b2f163ae4084d3"
  secrets = ["FIREBASE_TOKEN"]
  args = "deploy --only hosting:prod"
}
