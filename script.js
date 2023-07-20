// function getJoke() {
//   return new Promise((resolve, reject) => {
//     try {
//       req = new XMLHttpRequest()
//       req.addEventListener('load', event => resolve(event.target.response.joke))
//       req.open('GET', 'https://icanhazdadjoke.com/')
//       req.setRequestHeader('Accept', 'application/json')
//       req.responseType = 'json'
//       req.send()
//     }
//     catch (e) {
//       reject(e)
//     }
//   })
// }

function fetchJoke() {
  return new Promise((resolve, reject) => {
    try {
      fetch('https://icanhazdadjoke.com/', {
        headers: { 'Accept': 'application/json' }
      })
        .then(res => res.json())
        .then(data => resolve(data.joke))
    }
    catch (err) {
      reject(err)
    }
  })
}

function get5Jokes() {
  const jokePromises = []
  for (let i = 0; i < 5; i++) {
    jokePromises.push(fetchJoke())
  }

  Promise.all(jokePromises)
    .then(jokes => document.querySelector('ul').innerHTML += jokes.map(joke => `<li>${joke}</li>`).join(''))
    .catch(err => console.error(err))
}

document.querySelector('button').addEventListener('click', get5Jokes)
