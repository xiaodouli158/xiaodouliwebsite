# 小斗笠直播工具官网

基于 React + TypeScript + Vite 的现代化Web应用，部署在 Cloudflare Workers。

## 🚀 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式方案**: TailwindCSS
- **路由管理**: React Router v7
- **部署平台**: Cloudflare Pages

## 📦 快速开始

### 安装依赖
```bash
npm install
```

### 开发环境
```bash
npm run dev
```
访问 http://localhost:3000

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 🌐 部署

### Cloudflare Pages 部署

#### 方法1: 通过 Wrangler CLI
```bash
# 构建项目
npm run build

# 部署到 Cloudflare Pages
npm run deploy

# 部署到开发环境
npm run deploy-staging
```

#### 方法2: 通过 Git 集成
1. 将代码推送到 Git 仓库
2. 在 Cloudflare Dashboard 中连接仓库
3. 设置构建配置：
   - 构建命令: `npm run build`
   - 输出目录: `dist`
   - Node.js 版本: `18`

### 构建配置

项目构建配置在 `wrangler.toml` 中定义：

```toml
[build]
command = "npm run build"
cwd = "."
watch_dir = "src"

[build.environment_variables]
NODE_VERSION = "18"
```

## 📁 项目结构

```
src/
├── components/          # 可重用组件
│   ├── Layout.tsx      # 布局组件
│   ├── Navbar.tsx      # 导航栏
│   └── Footer.tsx      # 页脚
├── pages/              # 页面组件
│   ├── HomePage.tsx    # 首页
│   ├── DownloadsPage.tsx # 下载页面
│   ├── PluginsPage.tsx   # 插件页面
│   ├── TutorialsPage.tsx # 教程页面
│   ├── DevicesPage.tsx   # 设备推荐
│   ├── DebugPage.tsx     # 技术支持
│   └── ContactPage.tsx   # 联系我们
├── hooks/              # 自定义 Hooks
│   └── useAppData.ts   # 数据获取 Hook
├── App.tsx             # 应用入口
├── main.tsx           # React 入口
└── style.css          # 全局样式

public/
└── icons/            # 图标资源
    ├── icon-*.ico    # 各种尺寸的图标
    └── icon-config.json
```

## 🔧 功能特性

### 响应式设计
- 移动端优先的响应式布局
- 支持各种屏幕尺寸

### 路由管理
- 基于 React Router 的单页应用
- 支持浏览器历史记录

### 组件化架构
- 高度可重用的组件
- TypeScript 类型安全

### 数据管理
- 支持从 API 动态获取数据
- 本地模拟数据作为后备

### 性能优化
- Vite 快速构建
- 代码分包和懒加载
- 资源优化

## 🔄 迁移说明

从原有的传统 HTML 架构迁移到 React 架构：

### 已完成的迁移
1. ✅ 设置现代化构建环境（Vite + React + TypeScript）
2. ✅ 创建可重用组件（Layout, Navbar, Footer）
3. ✅ 将HTML页面迁移为React组件
4. ✅ 配置React Router路由系统
5. ✅ 优化资源和图标配置
6. ✅ 更新部署配置和构建脚本

### 保留的功能
- 原有的设计和样式
- 所有页面内容
- 资源和图标
- API 数据获取逻辑

### 新增的功能
- 组件化开发
- TypeScript 类型安全
- 热重载开发体验
- 现代化构建工具链

## 📞 技术支持

如需技术支持，请访问：
- 网站: https://xiaodouliwebsite.pages.dev
- 邮箱: support@xiaodouli.com
- QQ群: 123456789

## 📄 许可证

© 2025 小斗笠直播工具. 保留所有权利.
