import { defineConfig } from 'vitepress'
import { SearchPlugin } from 'vitepress-plugin-search'
import Segment from 'segment'

const base = '/webLibraries/'

const segment = new Segment()
segment.useDefault()

const options = {
  buttonLabel: '搜索',
  placeholder: '搜索文档',
  encode: function (str) {
    return segment.doSegment(str, {simple: true});
  },
  tokenize: "forward",
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base,
  title: "webLibraries",
  description: "记录开发中使用的库",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '库', link: '/libraries' },
      { text: '鸿蒙', link: '/harmony' },
      { text: '中文网', link: '/webZh' }
    ],

    sidebar: [
      { text: '库', link: '/libraries' },
      { text: '鸿蒙', link: '/harmony' },
      { text: '中文网', link: '/webZh' }
    ],

    i18nRouting: false,
    returnToTopLabel: '返回顶部',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fxss5201/webLibraries' },
    ],

    editLink: {
      pattern: 'https://github.com/fxss5201/webLibraries/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    lastUpdated: {
      text: '最新更新时间',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    footer: {
      message: 'Released under the <a href="https://github.com/fxss5201/webLibraries/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2024-present <a href="https://github.com/fxss5201">fxss5201</a>',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            }
          }
        }
      },
    }
  },
  markdown: {
    lineNumbers: true
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh'
    }
  },
  sitemap: {
    hostname: 'https://www.fxss.work',
    transformItems: (items) => {
      return items.map(item => {
        return {
          ...item,
          url: base + item.url
        }
      })
    }
  },
  vite: { plugins: [SearchPlugin(options)] }
})
