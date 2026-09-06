import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import type { QuartzComponentProps } from "../types"
import ArticleTitle from "./ArticleTitle"
import ContentMeta from "./ContentMeta"
import TagList from "./TagList"

const props = (slug: string) =>
  ({
    fileData: {
      slug,
      frontmatter: { title: "示例标题", tags: ["茶"] },
    },
    cfg: { locale: "zh-CN" },
  }) as unknown as QuartzComponentProps

test("homepage suppresses the generic title, date, and tags only", () => {
  assert.equal(ArticleTitle()(props("index")), null)
  assert.equal(ContentMeta()(props("index")), null)
  assert.equal(TagList()(props("index")), null)

  assert.notEqual(ArticleTitle()(props("茶谱/示例")), null)
  assert.notEqual(ContentMeta()(props("茶谱/示例")), null)
  assert.notEqual(TagList()(props("茶谱/示例")), null)
})

test("homepage markdown uses 知识库导览 as its sole body H1", () => {
  const markdown = readFileSync(new URL("../../../content/index.md", import.meta.url), "utf8")
  const headings = markdown.match(/^# .+$/gmu) ?? []
  assert.deepEqual(headings, ["# 知识库导览"])
})
