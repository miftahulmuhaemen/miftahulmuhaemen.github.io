var base_url = "https://api.football-data.org/v2/";
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
function show(data) {
  console.log(data)
}
function detailTeam(id){
  console.log(id)
}

function getClassmentLeague() {
  fetch(base_url + "competitions/CL/matches?status=FINISHED ", {headers : {
    'X-Auth-Token': "106da08a80574095ad2604f2676144e5"
    }})
    .then(status)
    .then(json)
    .then(function(data) {
      var articlesHTML = "";
      data.matches.forEach(matches => {
        articlesHTML += `          
        <tr>
        <td>${matches.homeTeam.name} <a href="./detail-team.html?id=${matches.homeTeam.id}"><i class="material-icons" >search</i></a> </td>
        <td>${matches.score.fullTime.homeTeam} </td>
        <td>:</td>
        <td>${matches.score.fullTime.awayTeam}</td>
        <td>${matches.awayTeam.name} <a href="./detail-team.html?id=${matches.awayTeam.id}"><i class="material-icons" >search</i></a> </td>
        <td><a class="waves-effect waves-light btn" onclick="show('${matches}')"><i class="material-icons left">favorite</i>/</a></td>
        </tr>
                `;
    })
    document.getElementById("body-table").innerHTML = articlesHTML;
  })
    .catch(error);
  }

  function getDetailTeam() {
    var urlParams = new URLSearchParams(window.location.search)
    var idParam = urlParams.get("id")

    fetch(base_url + "teams/" + idParam, { headers : {
      'X-Auth-Token': "106da08a80574095ad2604f2676144e5"
      }})
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data)
    })
    .catch(error)
  }

// function getArticles() {

//   if ('caches' in window) {
//     caches.match(base_url + "articles").then(function(response) {
//       if (response) {
//         response.json().then(function (data) {
//           var articlesHTML = "";
//           data.result.forEach(function(article) {
//             articlesHTML += `
//                   <div class="card">
//                     <a href="./article.html?id=${article.id}">
//                       <div class="card-image waves-effect waves-block waves-light">
//                         <img src="${article.thumbnail}" />
//                       </div>
//                     </a>
//                     <div class="card-content">
//                       <span class="card-title truncate">${article.title}</span>
//                       <p>${article.description}</p>
//                     </div>
//                   </div>
//                 `;
//           });
//           // Sisipkan komponen card ke dalam elemen dengan id #content
//           document.getElementById("articles").innerHTML = articlesHTML;
//         })
//       }
//     })
//   }

//   fetch(base_url + "articles", {
//     headers : {
//       'X-Auth-Token' : '106da08a80574095ad2604f2676144e5'
//     }
//   })
//     .then(status)
//     .then(json)
//     .then(function(data) {
//       // Objek/array JavaScript dari response.json() masuk lewat data.
//       // Menyusun komponen card artikel secara dinamis
//       var articlesHTML = "";
//       data.result.forEach(function(article) {
//         articlesHTML += `
//               <div class="card">
//                 <a href="./article.html?id=${article.id}">
//                   <div class="card-image waves-effect waves-block waves-light">
//                     <img src="${article.thumbnail}" />
//                   </div>
//                 </a>
//                 <div class="card-content">
//                   <span class="card-title truncate">${article.title}</span>
//                   <p>${article.description}</p>
//                 </div>
//               </div>
//             `;
//       });
//       // Sisipkan komponen card ke dalam elemen dengan id #content
//       document.getElementById("articles").innerHTML = articlesHTML;
//     })
//     .catch(error);
// }

// function getArticleById() {
//   // Ambil nilai query parameter (?id=)
//   var urlParams = new URLSearchParams(window.location.search);
//   var idParam = urlParams.get("id");
//   fetch(base_url + "article/" + idParam)
//     .then(status)
//     .then(json)
//     .then(function(data) {
//       // Objek JavaScript dari response.json() masuk lewat variabel data.
//       console.log(data);
//       // Menyusun komponen card artikel secara dinamis
//       var articleHTML = `
//           <div class="card">
//             <div class="card-image waves-effect waves-block waves-light">
//               <img src="${data.result.cover}" />
//             </div>
//             <div class="card-content">
//               <span class="card-title">${data.result.post_title}</span>
//               <p>${data.result.post_content}</p>
//             </div>
//           </div>
//         `;
//       // Sisipkan komponen card ke dalam elemen dengan id #content
//       document.getElementById("body-content").innerHTML = articleHTML;
//     });
// }