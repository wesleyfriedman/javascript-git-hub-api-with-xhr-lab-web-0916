// $(function() {
//   $('#form').on('submit', function(event) {
//     event.preventDefault()
//     let username = $('#username').val()
//     getRepositories(username)
//     displayRepositories(event)
//   })
// })
// const rootURL = 'https://api.github.com/'

function getRepositories(event) {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  let username = document.getElementById("username").value
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

// function displayRepositories(event) {
//     var repos = JSON.parse(this.responseText)
//     console.log(repos)
//       const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)"> Get Commits </a><a href="#" data-repo="' + r.name +'" onclick="getBranches(this)"> Get Branches </a></li>').join('')}</ul>`
// }

function displayRepositories(event) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  // const repoList = `<ul>repos.map(r => '<li>' ${r.name}  )`
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)"> Get Commits </a><a href="#" data-repo="' + r.name +'" onclick="getBranches(this)"> Get Branches </a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getBranches(el){
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/branches')
  req.send()
}

function displayBranches(){

}

function displayCommits(){
  const commits = JSON.parse(this.responseText)
  commits.map(commit => console.log(commit.committer))
  debugger
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.committer.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getCommits(el){
  const name = el.getAttribute('data-repo')
  let username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/` + name + '/commits')
  req.send()
}
// const req = new XMLHttpRequest()
// req.addEventListener("load", displayRepositories)
// req.open("GET", 'https://api.github.com/users/octocat/repos')
// req.send()
