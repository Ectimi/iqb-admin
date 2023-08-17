import { PropsWithChildren, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, type MenuProps, Typography, Space, Dropdown, Avatar } from 'antd'
import {
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import './index.less'
import storage from '@/lib/storage'

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

const Header = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const onLogout = () => {
    storage.removeItem('access_token')
    storage.removeItem('refresh_token')
    navigate('/login')
  }
  const accountDropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: <div>{t('个人设置')}</div>
    },
    {
      type: 'divider'
    },
    {
      key: '2',
      label: <div onClick={onLogout}>{t('退出登录')}</div>
    }
  ]

  return (
    <div className='header'>
      <Title className='header__title'>IQB Admin</Title>
      <Space size={'large'}>
        <Dropdown menu={{ items: accountDropdownItems }}>
          <div>
            <Avatar icon={<UserOutlined rev={null} />} />
            <span>username</span>
          </div>
        </Dropdown>
        <LanguageSwitcher />
      </Space>
    </div>
  )
}

const SideMenu = () => {
  const { t } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const items: MenuProps['items'] = [
    getItem(t('题目管理'), 'question', <FileTextOutlined rev={null} />, [
      getItem(<NavLink to='/question'>{t('题目列表')}</NavLink>, 'q1', null),
      getItem(<NavLink to='/question/create'>{t('创建题目')}</NavLink>, 'q2', null),
      getItem(<NavLink to='/question/manager'>{t('题目管理')}</NavLink>, 'q3', null)
    ]),
    getItem(t('用户/权限管理'), 'user', <UserOutlined rev={null} />, [
      getItem(<NavLink to='/user'>{t('用户列表')}</NavLink>, 'u1', null),
      getItem(<NavLink to='/user/manager'>{t('用户管理')}</NavLink>, 'u2', null),
      getItem(<NavLink to='/user/permission'>{t('权限管理')}</NavLink>, 'u3', null)
    ])
  ]
  return (
    <div className='side-menu' style={{ width: collapsed ? '48px' : '256px' }}>
      <Menu
        style={{ flex: 1 }}
        defaultSelectedKeys={['q1']}
        defaultOpenKeys={['question', 'user']}
        mode='inline'
        items={items}
        inlineCollapsed={collapsed}
      />
      <Menu
        className='controll-menu'
        inlineCollapsed={collapsed}
        mode='inline'
        selectable={false}
        onClick={toggleCollapsed}
        items={[
          {
            key: 'collapsed',
            label: '',
            icon: (
              <div className='collapsed-btn'>
                {collapsed ? <MenuUnfoldOutlined rev={null} /> : <MenuFoldOutlined rev={null} />}
              </div>
            )
          }
        ]}
      />
    </div>
  )
}

export default function AppLayout(props: PropsWithChildren<any>) {
  return (
    <div className='layout-box'>
      <Header />
      <section className='section'>
        <SideMenu />

        <div className='content'>{props.children}</div>
      </section>
    </div>
  )
}
