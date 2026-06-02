import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// 极简初始布局：仅渲染正文，组件在 oqc Steps 1-3 按需恢复
// 恢复时取消下方注释即可：
//   left: [Component.PageTitle(), Component.Search(), Component.Darkmode(), Component.DesktopOnly(Component.Explorer())],
//   right: [Component.Graph(), Component.DesktopOnly(Component.TableOfContents()), Component.Backlinks()],
//   beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta(), Component.TagList()],

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: [],
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [],
  left: [],
  right: [],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [],
  left: [],
  right: [],
}
