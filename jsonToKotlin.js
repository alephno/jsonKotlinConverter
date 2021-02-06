const { generateOutput } = require('./parseJson.js')
const fs = require('fs')

const inDir = './in'
const outDir = './out'

fs.promises.readdir(inDir)
  .then((files) => {
    if (files.length === 0) process.exit(0)
    else {
      files.map(file =>
        fs.promises.readFile(`${inDir}/${file}`, 'utf8')
          .then(content => generateOutput(file, content))
          .then(output => fs.writeFileSync(`${outDir}/${file}`, output, 'utf8')))
    }
  })
