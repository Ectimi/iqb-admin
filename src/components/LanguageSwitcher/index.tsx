import { TranslationOutlined } from '@ant-design/icons'
import { Dropdown, theme } from 'antd'
import { useTranslation } from 'react-i18next'
const { useToken } = theme
const languages = ['zh 中文简体', 'en English']

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const { token } = useToken()

  return (
    <Dropdown
      menu={{
        items: languages.map(name => ({
          key: name,
          label: (
            <div
              style={{
                color: i18n.language === name.split(' ')[0] ? token.colorPrimaryText : '#000'
              }}
              onClick={() => i18n.changeLanguage(name.split(' ')[0])}
            >
              {name}
            </div>
          )
        }))
      }}
    >
      <TranslationOutlined rev={null} />
    </Dropdown>
  )
}
