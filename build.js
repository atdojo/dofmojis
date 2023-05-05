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
// change directory to assets so zip wont all multiple paths
process.chdir("src/assets")
child_process.execSync("zip -r dofmojis-build/dofmojis.zip dofmojis")