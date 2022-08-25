const fs = require('fs')
const package_json = require('./package.json')

let version = package_json.version + '.' + (process.env.BUILD_NUMBER || 'SNAPSHOT')

let environmentPath = 'src/environments/environment.prod.ts'

fs.readFile(environmentPath, 'utf-8', function (err, data) {
  if (err) {
    console.log(err)
    return
  }

  let result = data.replace('<version>', version)
  fs.writeFile(environmentPath, result, function (err) {
    console.log(err)
  })
})
