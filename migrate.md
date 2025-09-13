# 迁移指南

## 从旧架构到新架构的迁移步骤

### 1. 备份现有项目
```bash
# 创建备份
cp -r . ../xiaodouli-backup
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 验证功能
访问 http://localhost:3000 并检查：
- [ ] 首页加载正常
- [ ] 导航菜单工作正常
- [ ] 所有页面可以访问
- [ ] 插件页面数据加载
- [ ] 响应式布局正常

### 5. 构建生产版本
```bash
npm run build
```

### 6. 预览生产版本
```bash
npm run preview
```

### 7. 部署到 Cloudflare Pages
```bash
npm run deploy
```

## 新旧架构对比

| 功能 | 旧架构 | 新架构 |
|------|--------|--------|
| 技术栈 | HTML + CDN CSS/JS | React + TypeScript + Vite |
| 构建工具 | 无 | Vite |
| 组件化 | 无，代码重复 | 高度组件化 |
| 类型安全 | 无 | TypeScript |
| 开发体验 | 手动刷新 | 热重载 |
| 路由 | 多页面 | SPA 路由 |
| 维护性 | 低 | 高 |
| 扩展性 | 差 | 优秀 |

## 兼容性说明

### 保持不变的部分
- 所有页面内容和布局
- 资源文件（图标、图片等）
- API 端点和数据格式
- URL 路径结构

### 改进的部分
- 更快的页面切换（SPA）
- 更好的开发体验
- 组件复用，减少重复代码
- TypeScript 类型检查
- 现代化构建优化

## 故障排除

### 常见问题

1. **依赖安装失败**
   ```bash
   # 清除缓存重试
   npm cache clean --force
   npm install
   ```

2. **开发服务器启动失败**
   ```bash
   # 检查端口占用
   netstat -ano | findstr :3000
   # 或使用其他端口
   npm run dev -- --port 3001
   ```

3. **构建失败**
   ```bash
   # 检查 TypeScript 错误
   npx tsc --noEmit
   ```

4. **部署失败**
   ```bash
   # 检查 wrangler 配置
   npx wrangler pages project list
   ```

### 性能检查

1. **构建大小检查**
   ```bash
   npm run build
   # 检查 dist 目录大小
   ```

2. **依赖分析**
   ```bash
   npx vite-bundle-analyzer
   ```

## 回退方案

如果新架构出现问题，可以快速回退：

1. **停用新版本**
   - 在 Cloudflare Pages 中切换到之前的部署

2. **使用备份**
   ```bash
   # 恢复备份的旧架构
   cp -r ../xiaodouli-backup/* .
   ```

3. **重新部署旧版本**
   ```bash
   # 使用旧的 wrangler 配置部署
   wrangler pages deploy . --project-name xiaodouliwebsite
   ```
