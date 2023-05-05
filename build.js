const fs = require('fs')
const path = require('path');
const child_process = require("child_process")

// update dofmoji.json file for website
const dofmojiFiles = fs.readdirSync("./src/assets/dofmojis")
const dofmojis = []
for(const dofmojiFile of dofmojiFiles) {
    dofmojis.push({
        name: path.parse(dofmojiFile).name,
        url: "src/assets/dofmojis/" + dofmojiFile
    })
}

fs.writeFileSync("./src/assets/dofmojis-build/dofmojis.json", JSON.stringify(dofmojis, null, 4))

// update zip file
child_process.execSync("zip -r ./src/assets/dofmojis-build/dofmojis.zip ./src/assets/dofmojis")