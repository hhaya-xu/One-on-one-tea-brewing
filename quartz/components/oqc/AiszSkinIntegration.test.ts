import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import test from "node:test"

const siteRoot = path.resolve(import.meta.dirname, "..", "..", "..")
const stylesRoot = path.join(siteRoot, "quartz", "styles")

test("production site installs and activates the aisz-console skin", () => {
  assert.ok(existsSync(path.join(stylesRoot, "oqc-aisz-tokens.scss")))
  assert.ok(existsSync(path.join(stylesRoot, "oqc-aisz-visual.scss")))

  const custom = readFileSync(path.join(stylesRoot, "custom.scss"), "utf8")
  assert.match(custom, /@use "\.\/oqc-aisz-tokens\.scss" as oqcAiszTokens;/u)
  assert.match(custom, /@use "\.\/oqc-aisz-visual\.scss" as oqcAiszVisual;/u)
  assert.match(custom, /@include oqcAiszTokens\.emit;/u)
  assert.match(custom, /@include oqcAiszVisual\.emit;/u)

  const renderPage = readFileSync(
    path.join(siteRoot, "quartz", "components", "renderPage.tsx"),
    "utf8",
  )
  assert.match(renderPage, /data-oqc-skin="aisz-console"/u)
})
