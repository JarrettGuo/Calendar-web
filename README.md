```markdown
# Calendar Frontend

## 项目概述

这是一个使用 React 开发的日历管理应用程序的前端部分。项目使用了 Redux 进行状态管理，Tailwind CSS 和 Shadcn 进行样式处理，并且通过 React Router 进行路由管理。

## 技术栈

- **React**: 用于构建用户界面
- **Redux**: 用于状态管理
- **Tailwind CSS**: 用于快速构建响应式和现代化的用户界面
- **Shadcn**: 用于 UI 组件库的集成
- **ahooks**: 用于简化和增强 React Hooks 的使用
- **React Router DOM**: 用于路由管理

## 环境设置

1. 确保已安装 Node.js 和 npm（或 yarn）。
2. 克隆此仓库到本地：
   ```bash
   git clone https://github.com/yourusername/calendar-frontend.git
   ```
3. 进入项目目录：
   ```bash
   cd calendar-frontend
   ```
4. 安装依赖包：
   ```bash
   npm install
   ```
5. 启动开发服务器：
   ```bash
   npm run dev
   ```

6. 打开浏览器并访问 `http://localhost:3000` 查看应用。

## 使用的库

- **@fullcalendar/react**: 用于集成 FullCalendar 组件
- **@fullcalendar/daygrid**: 用于日历的月视图
- **@fullcalendar/timegrid**: 用于日历的周、日视图
- **@fullcalendar/interaction**: 用于拖拽和选择事件
- **@fullcalendar/list**: 用于事件的列表视图
- **axios**: 用于发起 HTTP 请求
- **react-redux**: 与 Redux 集成
- **redux-thunk**: Redux 的中间件，用于处理异步操作

## 代码结构

- `src/`: 项目源码
  - `components/`: 项目组件
  - `pages/`: 页面组件
  - `store/`: Redux store 及相关文件
  - `services/`: 与后端交互的服务层
  - `styles/`: Tailwind CSS 和其他样式文件

```
