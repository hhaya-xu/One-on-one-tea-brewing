import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// 极简初始布局：仅渲染内容，无侧栏、无图谱、无搜索
// 组件在 oqc Steps 1-3 按需添加

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
