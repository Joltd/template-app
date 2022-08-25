const fs = require('fs')
const package_json = require('./package.json')

let version = package_json.version + '.' + (process.env.BUILD_NUMBER || 'SNAPSHOT')
console.log(version)

let environmentPath = 'src/environments/environment.prod.ts'

fs.readFile(environmentPath, 'utf-8', function (err, data) {
  if (err) {
    console.log(err)
    return
  }

  let from = indexOf(data, 'version')
  from = indexOf(data, '\'', from)
  let to = indexOf(data,'\'', from + 1)

  let forReplace = data.substring(from + 1, to)
  let result = data.replace(forReplace, version)

  fs.writeFile(environmentPath, result, function (err) {
    console.log(err)
  })
})

function indexOf(target, searchString, position = 0) {
  let result = target.indexOf(searchString, position)
  if (result < 0) {
    throw `Unable to find "${target}"`
  }
  return result
}
