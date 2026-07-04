
## @theme 变量池（preview-base.html prototype 专用）

视觉设计官在 prototype 阶段应使用以下语义化变量，而非硬编码 HEX。
伯喈翻译时自动映射为 SCSS 变量。

| 变量名 | 用途 | 示例值（暖纸学术） |
|--------|------|-------------------|
| `--color-paper` | 页面底色 | #ede3cf |
| `--color-ink` | 正文墨色 | #2b2b2b |
| `--color-accent` | 强调色/金色点缀 | #c9a96e |
| `--color-muted` | 次要文字 | #8b8680 |
| `--color-border` | 分隔线 | #d9d0c0 |
| `--color-surface` | 卡片/区块底色 | #f5efe0 |
| `--color-hover` | hover 高亮 | #e8ddc8 |
| `--font-body` | 正文字体 | "Noto Serif SC", serif |
| `--font-heading` | 标题字体 | "Noto Serif SC", serif |
| `--font-ui` | 界面字体 | "Inter", sans-serif |
| `--font-code` | 代码字体 | "JetBrains Mono", monospace |

### 使用方式（prototype 中）

```css
@theme {
  --color-paper: #ede3cf;
  --color-ink: #2b2b2b;
  --font-body: "Noto Serif SC", serif;
}
.page {
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-body);
}
```

### 伯喈翻译规则

- `var(--color-paper)` → SCSS 中对应 `$color-paper` 或直接写 HEX `#ede3cf`
- `var(--font-body)` → SCSS 中对应 `$font-body` 或直接写字体栈
- 翻译时不保留 `@theme` 块——它只存在于 prototype

---
# 16 锚点 → Quartz Component 映射表

> 本文档将 16 个设计锚点映射到对应的 Quartz Component、CSS 选择器和注入方式，供设计智能体定位和定制。

| # | 锚点 | Quartz Component | CSS 选择器 | 注入方式 | 状态 |
|---|------|-----------------|-----------|---------|:---:|
| 1 | site-title | `Component.PageTitle()` | `.page-title` | Quartz 内置 | ✅ |
| 2 | site-subtitle | 自定义（`index.md` frontmatter） | `.site-subtitle` | Markdown → HTML | ⚠️ |
| 3 | search | `Component.Search()` | `.search-container` | Quartz 内置 | ✅ |
| 4 | theme-toggle | `Component.Darkmode()` | `.darkmode-toggle` | Quartz 内置 | ✅ |
| 5 | explorer | `Component.Explorer()` | `.explorer` | Quartz 内置 | ✅ |
| 6 | folder-count | `Explorer.tsx` 注入 | `.folder-count` | JS 注入 | ⚠️ |
| 7 | article-title | `Component.ArticleTitle()` | `.article-title` | Quartz 内置 | ✅ |
| 8 | content-meta | `Component.ContentMeta()` | `.content-meta` | Quartz 内置 | ✅ |
| 9 | breadcrumb | `Component.Breadcrumbs()` | `.breadcrumb-container` | Quartz 内置 | ✅ |
| 10 | article-body | 默认渲染 | `article` | Quartz 内置 | ✅ |
| 11 | tags | `Component.TagList()` | `.tags` | Quartz 内置 | ✅ |
| 12 | graph | `Component.Graph()` | `.graph` | Quartz 内置 | ✅ |
| 13 | backlinks | `Component.Backlinks()` | `.backlinks` | Quartz 内置 | ✅ |
| 14 | toc | `Component.TableOfContents()` | `.toc` | Quartz 内置 | ✅ |
| 15 | copyright | `Component.Footer()` | `footer` | Quartz 内置 | ✅ |
| 16 | build-info | `Component.Footer()` | `.footer-copyright` | Quartz 内置 | ✅ |

## 状态说明

- **✅ 内置**：Quartz 原生组件，通过 `quartz.config.ts` 的 `layout` 配置控制显示/隐藏和排序。
- **⚠️ 需手动**：Quartz 不原生支持，需要手动注入 HTML/CSS/JS 或通过自定义组件实现。

## 重要注释

- `data-zone` 属性仅存在于 `preview-base.html` 中，用于设计智能体定位锚点区域。线上构建后的站点不包含该属性。
- 所有 ✅ 组件的样式覆盖应在 `custom.scss` 中通过对应 CSS 选择器完成，不应修改 Quartz 核心组件源码。

*生成的 CSS Patch 必须通过 custom.scss 注入，不得直接修改 Quartz 内置 .scss 文件。*

