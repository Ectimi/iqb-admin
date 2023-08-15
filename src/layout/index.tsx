import { NavLink } from 'react-router-dom'
import { useSafeState } from 'ahooks'
import { theme, Menu, type MenuProps, Typography, Space, Dropdown, Avatar } from 'antd'
import { FileTextOutlined, UserOutlined, TranslationOutlined } from '@ant-design/icons'
import './index.less'
import { PropsWithChildren } from 'react'

const { useToken } = theme
const { Title } = Typography

type MenuItem = Required<MenuProps>['items'][number]

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem =>
  ({
    key,
    icon,
    children,
    label,
    type
  } as MenuItem)

const items: MenuProps['items'] = [
  getItem('题目管理', 'question', <FileTextOutlined rev={null} />, [
    getItem(<NavLink to='/question'>题目列表</NavLink>, 'q1', null),
    getItem(<NavLink to='/question/create'>创建题目</NavLink>, 'q2', null),
    getItem(<NavLink to='/question/manager'>题目管理</NavLink>, 'q3', null)
  ]),
  getItem('用户/权限管理', 'user', <UserOutlined rev={null} />, [
    getItem(<NavLink to='/user'>用户列表</NavLink>, 'u1', null),
    getItem(<NavLink to='/user/manager'>用户管理</NavLink>, 'u2', null),
    getItem(<NavLink to='/user/permission'>权限管理</NavLink>, 'u3', null)
  ])
]

const accountDropdownItems: MenuProps['items'] = [
  {
    key: '1',
    label: <div>个人设置</div>
  },
  {
    type: 'divider'
  },
  {
    key: '2',
    label: <div>退出登录</div>
  }
]

const languages = ['cn 中文简体', 'en English']

export default function AppLayout(props: PropsWithChildren<any>) {
  const { token } = useToken()

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e)
  }
  const [language, setLanguage] = useSafeState(languages[0])

  return (
    <div className='layout-box'>
      <div className='header'>
        <Title className='header__title'>IQB Admin</Title>
        <Space size={'large'}>
          <Dropdown menu={{ items: accountDropdownItems }}>
            <div>
              <Avatar icon={<UserOutlined rev={null} />} />
              <span>username</span>
            </div>
          </Dropdown>
          <Dropdown
            menu={{
              items: languages.map(name => ({
                key: name,
                label: (
                  <div
                    style={{
                      color: language === name ? token.colorPrimaryText : '#000'
                    }}
                    onClick={() => setLanguage(name)}
                  >
                    {name}
                  </div>
                )
              }))
            }}
          >
            <TranslationOutlined rev={null} />
          </Dropdown>
        </Space>
      </div>
      <section className='section'>
        <Menu
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['q1']}
          defaultOpenKeys={['question', 'user']}
          mode='inline'
          items={items}
        />
        <div className='content'>{props.children}</div>
      </section>
    </div>
  )
}
