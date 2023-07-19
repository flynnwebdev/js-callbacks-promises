function adder(a, b) {
  return a + b
}

function adderPromise(x, y) {
  return new Promise((resolve, reject) => {
    if (typeof x === 'number' && typeof y === 'number') {
      const answer = adder(x, y)
      setTimeout(() => resolve(answer), 2000)
    } else {
      reject('x and y must be numbers')
    }
  })
}

const results = []

const resolved = value => {
  results.push(value)
  console.log(results)
}

const rejected = err => console.error(err)

adderPromise(10, 20)
  .then(value => {
    results.push(value)
    return adderPromise(100, 50)
  })
  .then(resolved)
  .catch(rejected)


