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

async function fetchJoke() {
    try {
      const res = await fetch('https://icanhazdadjoke.com/', {
        headers: { 'Accept': 'application/json' }
      })
      const data = await res.json()
      return data.joke
    }
    catch (err) {
      throw err
    }
}

function loadJokes(jokes=[]) {
  const allJokes = JSON.parse(localStorage.jokes ? localStorage.jokes : '[]').concat(jokes)
  localStorage.jokes = JSON.stringify(allJokes)
  document.querySelector('ul').innerHTML = allJokes.map(joke => `<li>${joke}</li>`).join('')
}

function get5Jokes() {
  const jokePromises = []
  for (let i = 0; i < 5; i++) {
    jokePromises.push(fetchJoke())
  }

  Promise.all(jokePromises)
    .then(loadJokes)
    .catch(err => console.error(err))
}

document.querySelector('button').addEventListener('click', get5Jokes)

loadJokes()

// async function asyncGetJoke() {
//   // fetchJoke()
//   //   .then(spam => console.log(spam))
//   return await fetchJoke()
// }

// asyncGetJoke().then(x => console.log(x))

console.log('End of main')
