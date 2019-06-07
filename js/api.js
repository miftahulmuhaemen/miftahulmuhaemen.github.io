

var base_url = "https://api.football-data.org/v2/";

function openDB(){
  return idb.open("UEFA_DB", 1, function (upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("matches") && !upgradeDb.objectStoreNames.contains("teams")){
      upgradeDb.createObjectStore("matches", { keyPath: 'id' })
      upgradeDb.createObjectStore("teams", { keyPath: 'id' })
    }
  })
}
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}
function json(response) {
  return response.json();
}
function error(error) {
  console.log("Error : " + error);
}
function activate() {
  var elems = document.querySelectorAll('.collapsible');
  M.Collapsible.init(elems);

  var elems = document.querySelectorAll('.fixed-action-btn');
  M.FloatingActionButton.init(elems);
}

/* Matches Databases Interaction */

function matchesSave(matchId, homeId, homeName, homeScore, awayId, awayName, awayScore) {
  openDB()
    .then(function (db) {
      var tx = db.transaction('matches', 'readwrite');
      var store = tx.objectStore('matches');
      var item = {
        id : matchId,
        idHome: homeId,
        nameHome: homeName,
        scoreHome: homeScore,
        idAway: awayId,
        nameAway: awayName,
        scoreAway: awayScore
      };
      store.add(item);
      return tx.complete;
    }).then(function () {
      M.toast({ html: 'Match berhasil disimpan.' })
    }).catch(function () {
      M.toast({ html: 'Match gagal disimpan.' })
    })
}

function matchesRead() {
  openDB()
    .then(function (db) {
      var tx = db.transaction('matches');
      var store = tx.objectStore('matches');
      return store.getAll();
    }).then(function (items) {
      var articlesHTML = "";
      items.forEach(matches => {
        articlesHTML += `          
        <tr>
        <td>${matches.nameHome} <a href="./detail-team.html?id=${matches.idHome}"><i class="material-icons" >search</i></a> </td>
        <td>${matches.scoreHome} </td>
        <td>:</td>
        <td>${matches.scoreAway}</td>
        <td>${matches.nameAway} <a href="./detail-team.html?id=${matches.idAway}"><i class="material-icons" >search</i></a> </td>
        <td><a class="waves-effect waves-light  red darken-1 btn" onclick="matchesDelete(${matches.id})"><i class="material-icons left">backspace</i>Delete</a></td>
        </tr>
                `;
      })
      document.getElementById("body-table").innerHTML = articlesHTML;
    })
}

function matchesDelete(id) {
  openDB()
    .then(function (db) {
      var tx = db.transaction('matches', 'readwrite');
      var store = tx.objectStore('matches');
      store.delete(id);
      return tx.complete;
    }).then(function () {
      M.toast({ html: 'Buku berhasil dihapus.' })
      matchesRead()
    }).catch(function () {
      M.toast({ html: 'Buku gagal dihapus.' })
    })
}

/* Team Databases Transaction */

function teamSave(teamId, mName, mFounded, mVenue, mEmail, mWebsite, mCrestUrl) {
    openDB()
    .then(function (db) {
      var tx = db.transaction('teams', 'readwrite');
      var store = tx.objectStore('teams');
      var item = {
        id : teamId,
        name: mName,
        founded: mFounded,
        venue: mVenue,
        email: mEmail,
        website: mWebsite,
        crestUrl: mCrestUrl
      };
      store.add(item);
      return tx.complete;
    }).then(function () {
      M.toast({ html: 'Buku berhasil disimpan.' })
    }).catch(error)
}

function teamsRead() {
  openDB()
    .then(function (db) {
      var tx = db.transaction('teams');
      var store = tx.objectStore('teams');
      return store.getAll();
    }).then(function (items) {
      var articlesHTML = "";
      items.forEach(team => {
        articlesHTML += `          
        <li>
        <div class="collapsible-header">${team.name}</div>
        <div class="collapsible-body"><span>
                <img src="${team.crestUrl}">
                <div class="row">
                        <div class="col s6">
                                <blockquote>
                                        <h6>Founded on ${team.founded}</h6>
                                        <h6>Venue on ${team.venue}</h6>
                                </blockquote>
                        </div>
                        <div class="col s6">
                                <blockquote>
                                        <h6>${team.email}</h6>
                                        <h6>${team.website}</h6>
                                </blockquote>
                        </div>
                </div>
        </span></div>
        </li>
                `;
      })
      document.getElementById("team").innerHTML = articlesHTML;
    })
    .then(activate)
    .catch(error);
}

/* Anything Else */

function getClassmentLeague() {

    if ('caches' in window) {
    caches.match(base_url + "competitions/CL/matches?status=FINISHED")
    .then(function (response) {
      if(response)
        response.json().then(function (data) {
          var articlesHTML = ""
          data.matches.forEach(matches => {
            articlesHTML += `          
            <tr>
            <td>${matches.homeTeam.name} <a href="./detail-team.html?id=${matches.homeTeam.id}"><i class="material-icons" >search</i></a> </td>
            <td>${matches.score.fullTime.homeTeam} </td>
            <td>:</td>
            <td>${matches.score.fullTime.awayTeam}</td>
            <td>${matches.awayTeam.name} <a href="./detail-team.html?id=${matches.awayTeam.id}"><i class="material-icons" >search</i></a> </td>
            <td><a class="waves-effect waves-light btn" onclick="matchesSave(${matches.homeTeam.id},'${matches.homeTeam.name}',${matches.score.fullTime.homeTeam},${matches.awayTeam.id},'${matches.awayTeam.name}',${matches.score.fullTime.awayTeam})"><i class="material-icons left">favorite</i>/</a></td>
            </tr>
                    `
          })
          document.getElementById("body-table").innerHTML = articlesHTML
        })
        .catch(error)
    })
    
  }

  
  fetch(base_url + "competitions/CL/matches?status=FINISHED", {
    headers: {
      'X-Auth-Token': "106da08a80574095ad2604f2676144e5"
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      var articlesHTML = ""
      data.matches.forEach(matches => {
        articlesHTML += `          
        <tr>
        <td>${matches.homeTeam.name} <a href="./detail-team.html?id=${matches.homeTeam.id}"><i class="material-icons" >search</i></a> </td>
        <td>${matches.score.fullTime.homeTeam} </td>
        <td>:</td>
        <td>${matches.score.fullTime.awayTeam}</td>
        <td>${matches.awayTeam.name} <a href="./detail-team.html?id=${matches.awayTeam.id}"><i class="material-icons" >search</i></a> </td>
        <td><a class="waves-effect waves-light btn" onclick="matchesSave(${matches.id},${matches.homeTeam.id},'${matches.homeTeam.name}',${matches.score.fullTime.homeTeam},${matches.awayTeam.id},'${matches.awayTeam.name}',${matches.score.fullTime.awayTeam})"><i class="material-icons left">favorite</i>/</a></td>
        </tr>
                `
      })
      document.getElementById("body-table").innerHTML = articlesHTML
    })
    .catch(error)
}

function getDetailTeam() {
  var urlParams = new URLSearchParams(window.location.search)
  var idParam = urlParams.get("id")

  fetch(base_url + "teams/" + idParam, {
    headers: {
      'X-Auth-Token': "106da08a80574095ad2604f2676144e5"
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      document.getElementById("name").innerHTML = data.name
      document.getElementById("founded").innerHTML += data.founded
      document.getElementById("venue").innerHTML += data.venue
      document.getElementById("email").innerHTML = data.email
      document.getElementById("website").innerHTML = data.website
      document.getElementById("crestUrl").innerHTML = `<img src="${data.crestUrl}">`
      document.getElementById("floating-btn").innerHTML = `
        <a class="btn-floating btn-large red" onclick="teamSave(${data.id},'${data.name}','${data.founded}','${data.venue.replace("'", "`")}','${data.email}','${data.website}','${data.crestUrl}')">
          <i class="large material-icons">favorite</i>
        </a>
      `
      return data.squad
    })
    .then(function (squad) {
      var articlesHTML = ""
      squad.forEach(player => {
        articlesHTML += `
          <div class="col s12 m6">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">${player.name}</span>
                <p>I am from ${player.nationality} and my position is ${player.position}.</p>
              </div>
            </div>
          </div>
        `
      });
      document.getElementById("second-body").innerHTML = articlesHTML
    })
    .then(activate)
    .catch(error)
}
