import { PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, type MenuProps, Typography, Space, Dropdown, Avatar } from 'antd'
import { FileTextOutlined, UserOutlined } from '@ant-design/icons'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import './index.less'

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

const SideMenu = () => {
  const { t } = useTranslation()
  const items: MenuProps['items'] = [
    getItem(t('questionManager'), 'question', <FileTextOutlined rev={null} />, [
      getItem(<NavLink to='/question'>{t('questionList')}</NavLink>, 'q1', null),
      getItem(<NavLink to='/question/create'>{t('questionCreate')}</NavLink>, 'q2', null),
      getItem(<NavLink to='/question/manager'>{t('questionManager')}</NavLink>, 'q3', null)
    ]),
    getItem(t('userOrPermissionManager'), 'user', <UserOutlined rev={null} />, [
      getItem(<NavLink to='/user'>{t('userList')}</NavLink>, 'u1', null),
      getItem(<NavLink to='/user/manager'>{t('userManager')}</NavLink>, 'u2', null),
      getItem(<NavLink to='/user/permission'>{t('permissionManager')}</NavLink>, 'u3', null)
    ])
  ]
  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={['q1']}
      defaultOpenKeys={['question', 'user']}
      mode='inline'
      items={items}
    />
  )
}

export default function AppLayout(props: PropsWithChildren<any>) {
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
          <LanguageSwitcher />
        </Space>
      </div>
      <section className='section'>
        <SideMenu />
        <div className='content'>{props.children}</div>
      </section>
    </div>
  )
}
