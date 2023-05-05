# Dofmojis
All dofmojis were created by the [AKL-Discord](https://discord.gg/yCYdghrX), some weren't.</p>

# Adding images
`navigator.clipboard.write` only supports pngs right now which is used to copy images, so only add pngs to the `dofmojis` directory. The name of the file should equal its emoji name. After adding the emoji run
```bash
node build.js
```
to update the files inside `src/assets/dofmojis-build`.

# Download multiple emojis from discord
1. open discord in browser
2. open devtools
3. open emoji tab, find a fitting container selector and replace `container` in the snippet
4. replace `nameShouldInclude` to your use case
```javascript
const container = ".wrapper-3mwv0u"
const nameShouldInclude = "dof"
;(async () => {
    const elements = Array.from(document.querySelector(container).querySelectorAll("li"))
    for(const el of elements) {
        const name = el.querySelector("button").getAttribute("data-name")
        console.log(name)
        if(name.includes(nameShouldInclude)) {
            const href = el.querySelector("img").src.replace(/size=.*\&/, "size=128&")
             console.log(href)
            const link = document.createElement("a")
            const img = await fetch(href)
            const blob = await img.blob()
            const url = URL.createObjectURL(blob)
            link.download = name + ".webp"
            link.href = url
            link.click()
            await new Promise(resolve => setTimeout(resolve, 100))
        }
    }
})()
```

# Converting webp to png
### macos
1. install webp
```bash
brew install webp
```
2. go into folder with all .webp files
3. run
```bash
for f in *.webp; do dwebp $f -o $f:r.png; done
```