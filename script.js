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

const jokePromises = []
for (let i = 0; i < 5; i++) {
  jokePromises.push(fetchJoke())
}

Promise.all(jokePromises)
  // .then(jokeResponses => Promise.all(jokeResponses.map(jr => jr.json())))
  .then(jokes => console.log(jokes))
  .catch(err => console.error(err))

// const cb = joke => {
//   jokes.push(joke)
//   return getJoke()
// }

// getJoke()
//   .then(cb)
//   .then(cb)
//   .then(cb)
//   .then(cb)
//   .then(joke => {
//     jokes.push(joke)
//     console.log(jokes)
//   })

console.log('Waiting ...')