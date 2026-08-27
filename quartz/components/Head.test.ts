import assert from "node:assert/strict"
import test from "node:test"
import * as HeadModule from "./Head"

test("project-hosted root resources resolve through the page base directory", () => {
  assert.ok(
    "resolveOqcResourcePath" in HeadModule,
    "Head must export the project-base resource resolver",
  )

  const resolveResourcePath = HeadModule.resolveOqcResourcePath as (
    baseDir: string,
    resourcePath: string,
  ) => string

  assert.equal(resolveResourcePath(".", "/static/katex.min.css"), "./static/katex.min.css")
  assert.equal(
    resolveResourcePath("..", "/static/katex-copy-tex.min.js"),
    "../static/katex-copy-tex.min.js",
  )
  assert.equal(
    resolveResourcePath(".", "https://cdn.example.com/a.css"),
    "https://cdn.example.com/a.css",
  )
})
