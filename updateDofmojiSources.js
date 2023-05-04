const fs = require('fs')
const path = require('path');

const dofmojiFiles = fs.readdirSync("./dofmojis")
const dofmojis = []
for(const dofmojiFile of dofmojiFiles) {
    dofmojis.push({
        name: path.parse(dofmojiFile).name,
        url: "/dofmojis/" + dofmojiFile
    })
}

fs.writeFileSync("dofmojis.json", JSON.stringify(dofmojis, null, 4))