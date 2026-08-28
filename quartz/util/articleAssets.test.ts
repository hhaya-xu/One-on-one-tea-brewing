import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import test from "node:test"
import { FullSlug, transformLink } from "./path"

const articleName = "茶山风水行-研学布朗2018"
const articlePath = path.join("content", "资料", "公众号文章", `${articleName}.md`)
const attachmentDirectory = path.join("content", "attachments", articleName)
const articleSlug = `资料/公众号文章/${articleName}` as FullSlug
const repositoryBasePath = "/One-on-one-tea-brewing"
const expectedAssetPath = `${repositoryBasePath}/attachments/${articleName}/`
const documentUrl = `https://hhaya-xu.github.io${repositoryBasePath}/资料/公众号文章/${articleName}`

const markdown = fs.readFileSync(articlePath, "utf8")
const imageTargets = [...markdown.matchAll(/!\[[^\]]*\]\(([^)]+\.jpg)\)/g)].map((match) => match[1])
const attachmentPaths = Array.from({ length: 36 }, (_, index) =>
  path.join(attachmentDirectory, `${String(index + 1).padStart(3, "0")}.jpg`),
)
const attachmentSlugs = attachmentPaths.map((attachmentPath) =>
  attachmentPath.replace(/^content[\\/]/, "").replaceAll("\\", "/"),
) as FullSlug[]

test("the site article uses 36 normalized vault-root image targets", () => {
  assert.equal(imageTargets.length, 36)
  assert.equal(imageTargets.filter((target) => target.startsWith("../../attachments/")).length, 0)
  assert.equal(imageTargets.filter((target) => target.startsWith("attachments/")).length, 36)
})

test("Quartz transforms every article image target inside the GitHub Pages repository base", () => {
  const resolvedUrls = imageTargets.map((target) => {
    const transformed = transformLink(articleSlug, target, {
      strategy: "shortest",
      allSlugs: attachmentSlugs,
    })
    return new URL(transformed, documentUrl)
  })
  const basePathSafeCount = resolvedUrls.filter((url) =>
    decodeURIComponent(url.pathname).startsWith(expectedAssetPath),
  ).length

  assert.equal(basePathSafeCount, 36)
})

test("the site copy contains the complete JPEG attachment set", () => {
  for (const attachmentPath of attachmentPaths) {
    assert.equal(fs.existsSync(attachmentPath), true, `missing ${attachmentPath}`)
    const signature = fs.readFileSync(attachmentPath).subarray(0, 3)
    assert.deepEqual(signature, Buffer.from([0xff, 0xd8, 0xff]), `${attachmentPath} is not JPEG`)
  }
})
