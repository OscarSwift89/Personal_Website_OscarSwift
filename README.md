# 个人网站项目

这是一个使用 HTML、CSS 和 JavaScript 构建的现代化个人网站。网站采用响应式设计，具有优雅的动画效果和用户友好的界面。

## 功能特点

- 🎨 现代化UI设计
  - 紫色和粉色渐变主题
  - 响应式布局
  - 卡片式设计
  - 优雅的动画效果

- 📱 响应式设计
  - 适配各种屏幕尺寸
  - 移动端友好的导航菜单
  - 流畅的页面切换效果

- ✨ 交互效果
  - 平滑滚动
  - 渐入动画
  - 悬停效果
  - 进度条动画

## 页面结构

- `index.html` - 主页
  - 个人简介
  - 欢迎信息

- `education.html` - 教育经历
  - 时间线展示
  - 教育背景详情

- `skills.html` - 技术栈
  - 技能卡片
  - 进度条展示
  - 技能熟练度

- `hobbies.html` - 个人爱好
  - 爱好卡片展示
  - 图标展示
  - 描述信息

- `contact.html` - 联系方式
  - 联系信息卡片
  - 联系表单
  - 社交媒体链接

## 技术栈

- HTML5
- CSS3
  - Flexbox
  - Grid
  - CSS Variables
  - CSS Animations
- JavaScript
  - ES6+
  - Intersection Observer API
- Font Awesome 图标库

## 文件结构

```
personal-website/
├── index.html          # 主页
├── education.html      # 教育经历页面
├── skills.html         # 技术栈页面
├── hobbies.html        # 爱好页面
├── contact.html        # 联系页面
├── styles/
│   └── main.css        # 主样式文件
├── js/
│   └── main.js         # 主JavaScript文件
└── README.md           # 项目说明文档
```

## 使用说明

1. 克隆项目到本地
```bash
git clone [项目地址]
```

2. 打开项目
- 直接双击 `index.html` 文件在浏览器中打开
- 或使用本地服务器运行项目

3. 自定义内容
- 修改 HTML 文件中的个人信息
- 在 CSS 文件中调整样式和颜色
- 在 JavaScript 文件中添加新的交互效果

## 自定义主题

可以通过修改 `styles/main.css` 文件中的 CSS 变量来更改网站主题：

```css
:root {
    --primary-color: #9c27b0;    /* 主色调（紫色） */
    --secondary-color: #e91e63;  /* 次要色调（粉色） */
    --text-color: #333;         /* 文字颜色 */
    --light-bg: #fce4ec;        /* 背景色 */
}
```

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证

MIT License
