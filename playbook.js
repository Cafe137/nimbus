import { Files } from 'cafe-utility'
import assert from 'node:assert'
import { chromium } from 'playwright'

async function main() {
    const apiKey = await Files.readUtf8FileAsync('/home/runner/.local/share/Swarm Desktop/api-key.txt')
    const browser = await chromium.launch({ headless: false })
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto(`http://localhost:3002/dashboard/?v=${apiKey}#`)
    assert((await page.title()) === 'Swarm Desktop')
    await context.close()
    await browser.close()
}

main()
