### 面试题库管理系统

这是一个个人项目，仅供练手使用

### 技术栈

[react](https://reactjs.org) + [react-router](https://reactrouter.com/en/main) + [typescript](https://www.typescriptlang.org/) + [antd](https://ant.design/index-cn) + [axios](https://www.axios-http.cn/) + [ahook](https://ahooks.js.org/zh-CN) + [zustand](https://github.com/pmndrs/zustand)

### 项目规范

1. 目录规范

```js
├─src               #  项目目录
│  ├─assets             #  资源
│  │  ├─css             #  css资源
│  │  └─images          #  图片资源
│  ├─config             #  配置
│  ├─components         #  公共组件
│  ├─layout             #  布局
│  ├─hooks              #  自定义hooks组件
│  ├─routes             #  路由
│  ├─store              #  全局状态管理
│  ├─pages              #  页面
│  │  └─Home              #  首页页面
│  │    └─components      #  Home页面组件文件夹
│  │    ├─api             #  Home页面api文件夹
│  │    ├─store           #  Home页面状态
│  │    ├─index.tsx       #  Home页面
│  │  └─Kind              #  分类页面
│  ├─utils              #  工具
│  └─main.ts            #  入口文件

```

2. 代码规范
   2.1 组件结构

```tsx
import React, { memo, useMemo } from 'react'

interface ITitleProps {
  title: string
}

const Title: React.FC<ITitleProps> = props => {
  const { title } = props

  return <h2>{title}</h2>
}

export default memo(Title)
```

ITitleProps 以 I 为开头代表类型，中间为语义化 Title，后面 Props 为类型，代表是组件参数。

2.2 定义接口
例： 登录接口，定义好参数类型和响应数据类型，参数类型直接定义 params 的类型，响应数据放在范型里面，需要在封装的时候就处理好这个范型。

```ts
import { request } from '@/utils/request'

/** 公共的接口响应范型 */
export interface HttpSuccessResponse<T> {
  code: number
  message: string
  data: T
}

/** 登录接口参数 */
export interface ILoginParams {
  username: string
  password: string
}

/** 登录接口响应 */
export interface ILoginData {
  token: string
}

/* 用户登录接口 */
export const loginApi = (params: ILoginApi) => {
  return request.post<ILoginData>('/xxx', params)
}
```

2.3 事件
以 on 开头代表事件，这个只是规范.

```ts
const onChange = () => {}
```

3. api 接口管理统一

文件夹路径

```ts
├─pages                 #  页面
│  ├─Login              #  登录页面
│  │  └─api             #  api文件夹
│  │    └─index.ts      #  api函数封装
│  │    ├─types.ts      #  api的参数和响应类型
```

定义类型

```ts
// api/types.ts

/** 登录接口参数 */
export interface ILoginParams {
  username: string
  password: string
}

/** 登录接口响应 */
export interface ILoginData {
  token: string
}
```

定义请求接口

```ts
import { request } from '@/utils/request'
import { ILoginParams, ILoginData } from './types'

/* 用户登录接口 */
export const loginApi = (params: ILoginParams) => {
  return request.post<ILoginData>('/distribute/school/login', params)
}
```

使用请求接口

```ts
/** 登录 */
const onLogin = async () => {
  const res = await loginApi(params)
  if (res.code === 0) {
    // 处理登录正常逻辑
  } else {
    message.error(res.message) // 错误提示也可以在封装时统一添加
  }
}
```

4. 关于 hook
   > [ahook](https://ahooks.js.org/zh-CN) 提供了一系列高质量 hook,如果需要封装 hook 先到 ahook 文档看下是否有满足功能的 hook。
   >
   > 使用 ahook 提供的 hook 代替 react 原本的 hook
   >
   > 比如 useState => useSafeState ,useEffect 的生命周期用法 => useMount,useUnmount
