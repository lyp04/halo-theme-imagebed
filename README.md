# 简约图墙 · imagebed

一款用于 [Halo](https://halo.run) 的**通用极简评测主题**。封面图墙首页、克制留白、单一可调强调色；自带「评分卡」与可自定义标签的「信息条」，顶部导航可在后台自由增删。适合游戏 / 音乐 / 影视等各类测评与随记。

- 首页：封面图墙（grid gallery），前端**搜索 + 排序（最新 / 评分）+ 分页**，纯前端、无需后端改动
- 文章页：副标题、信息条、阅读进度条、`+ / − / =` 分区标题标记、极简评分卡
- 单一强调色，后台一键改色；中文字体走 MiSans CDN
- 顶部导航、首页文案、社媒、页脚文字全部后台可配；所有可选项**留空即不显示**

> 适配 Halo 2.0.0 及以上版本。

## 预览

> 安装到自己的 Halo 后即可预览。建议放一张首页图墙截图到此处（`docs/screenshot.png`）。

## 安装

**方式一（推荐）：** 在 [Releases](https://github.com/lyp04/halo-theme-imagebed/releases) 下载 `imagebed.zip`，进入 Halo 后台 → **外观 → 主题 → 安装** → 上传该 zip → 启用。

**方式二（开发）：** 克隆本仓库，将整个目录放到 Halo 数据目录的 `themes/` 下：

```bash
git clone https://github.com/lyp04/halo-theme-imagebed.git
# 复制到 Halo 的 ~/.halo2/themes/ （Docker 部署则映射到对应卷）
```

启动时建议关闭模板缓存以便热加载：`-e SPRING_THYMELEAF_CACHE=false`，改 html/css/js 后刷新即生效。

## 主题设置（外观 → 主题 → 设置 → 基础设置）

| 设置项 | 说明 |
|--------|------|
| 强调色 | 十六进制颜色，作用于分类标签、链接、评分等细节 |
| 顶部导航 | 可增删的列表，每项填「名称 + 链接」；链接可填站内路径（`/`、`/archives`）或完整网址。全部删空则回退默认「首页 / 归档 / 关于」 |
| 首页·英文小字 | 首页标题上方的一行英文小字，留空不显示 |
| 首页·一句话简介 | 首页标题下方的简介，留空不显示 |
| 首页每页篇数 | 图墙每页显示多少篇，默认 12 |
| 「测评」板块包含的分类 | 首页只显示这些分类的文章（逗号分隔）；其余分类归到 `/thoughts` 页 |
| 社媒链接 | 小红书 / Bilibili / YouTube / Instagram / X / Threads / 邮箱，留空不显示 |
| 页脚文字 | 页脚左侧文字；留空则显示站点标题 |

## 文章专属字段（文章设置里）

副标题、信息条（4 组通用「标签 + 内容」键值，填了才显示）、评分卡（等级 / 备注 / 标签文字，**等级留空则不显示评分卡**）。

## 正文写作小技巧

二级标题（H2）开头打一个符号即可得到带色块的分区条：`+ ` 优点（绿）、`- ` 缺点（红）、`= ` 总评。其余按正常 Markdown / 富文本书写即可，正文中的图片、视频、引用都会自动套用样式。

## 开发

```
.
├── theme.yaml              主题清单
├── settings.yaml           基础设置（强调色 / 导航 / 文案 / 社媒 …）
├── annotation-setting.yaml 文章专属字段
└── templates/
    ├── layout.html         公共片段：导航 / 页脚 / 列表行
    ├── index.html          首页图墙
    ├── post.html           文章页
    ├── page.html           单页面（含 /thoughts 图墙）
    ├── archives/category/tag …  归档与分类标签
    └── assets/             css / js
```

修改 `theme.yaml`、`settings.yaml`、`annotation-setting.yaml` 后，需在「外观 → 主题」里**重载**；只改 html/css/js 则刷新即可。

## 许可

[MIT](./LICENSE) © lyp04
