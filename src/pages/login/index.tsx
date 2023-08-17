import { Button, Tabs, Form, Input, Checkbox, Space } from 'antd'
import { LockOutlined, UserOutlined, InboxOutlined } from '@ant-design/icons'
import { useSafeState } from 'ahooks'
import useCountDown from '@/hooks/useCountDown'
import { UserLogin, SendCaptcha } from '@/service/login'
import { useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import { useEffect } from 'react'
import storage from '@/lib/storage'
import logo from '@/assets/images/logo.png'
import './index.less'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTranslation } from 'react-i18next'

const enum LoginType {
  password = 'password',
  code = 'code'
}

interface FormData {
  username?: string
  password?: string
  email?: string
  captcha?: string
  remember: boolean
}

const SendCodeButton = (props: { sendCode: () => void; emialValidate: boolean }) => {
  const { t } = useTranslation()
  const { count, isCounting, startCountDown } = useCountDown(3)
  const [disabled, setDisabled] = useSafeState(false)
  const onClick = async () => {
    startCountDown()
    await props.sendCode()
  }
  useEffect(() => {
    setDisabled(props.emialValidate || isCounting)
  }, [props.emialValidate, isCounting, setDisabled])

  return (
    <Button className='form-send' size='large' disabled={disabled} onClick={onClick}>
      {isCounting ? t('重发倒计时', { count }) : t('获取验证码')}
    </Button>
  )
}

export default function Login() {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { isLogin, setToken } = useAuth()
  const [loginType, setLoginType] = useSafeState(LoginType.password)
  const onTabChange = (key: LoginType) => {
    setLoginType(key)
  }
  const onFinish = async (formData: FormData) => {
    const params =
      loginType === LoginType.password
        ? { username: formData.username, password: formData.password }
        : { email: formData.email, captcha: formData.captcha }

    const res = await UserLogin({ type: loginType, ...params }).catch(err => {
      console.log('login err==>', err)
    })
    storage.setItem('refresh_token', res!.data.refreshToken.split(' ')[1])
    setToken(res!.data.accessToken.split(' ')[1])
  }
  const sendCode = async () => {
    const email = form.getFieldValue('email')
    await SendCaptcha(email).catch(err => {
      console.log('send captcha err==>', err)
    })
  }

  useEffect(() => {
    if (isLogin) {
      navigate('/question')
    }
  }, [isLogin, navigate])

  return (
    <div className='router-page login-page'>
      <div className='language'>
        <LanguageSwitcher />
      </div>
      <div className='form'>
        <div className='form-header'>
          <img className='form-logo' src={logo} alt='logo image' />
          <span className='form-title'>IQB Admin</span>
        </div>
        <Form
          className='form-main'
          name='login-form'
          initialValues={{ remember: false }}
          onFinish={onFinish}
          form={form}
        >
          <Tabs
            activeKey={loginType}
            centered
            items={[
              { label: t('账号登录'), key: LoginType.password },
              { label: t('邮箱登录'), key: LoginType.code }
            ]}
            onChange={key => onTabChange(key as LoginType)}
          />
          {loginType === LoginType.password ? (
            <>
              <Form.Item
                name='username'
                rules={[{ required: true, message: t('用户名验证.必须') }]}
              >
                <Input
                  prefix={<UserOutlined rev={null} />}
                  placeholder={t('账号Placeholder')}
                  autoComplete='off'
                  size='large'
                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[{ required: true, message: t('密码验证.必须') }]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined rev={null} />}
                  placeholder={t('密码Placeholder')}
                  size='large'
                />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                name='email'
                rules={[
                  {
                    type: 'email',
                    message: t('邮箱验证.是否有效')
                  },
                  {
                    required: true,
                    message: t('邮箱验证.必须')
                  }
                ]}
              >
                <Input
                  prefix={<InboxOutlined rev={null} />}
                  placeholder={t('邮箱Placeholder')}
                  size='large'
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Space align='start'>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    name='captcha'
                    rules={[{ required: true, message: t('验证码验证.必须') }]}
                  >
                    <Input
                      prefix={<LockOutlined rev={null} />}
                      placeholder={t('验证码Placeholder')}
                      size='large'
                    />
                  </Form.Item>
                  <Form.Item shouldUpdate>
                    {() => (
                      <SendCodeButton
                        sendCode={sendCode}
                        emialValidate={
                          !form.getFieldValue('email') || form.getFieldError('email').length > 0
                        }
                      />
                    )}
                  </Form.Item>
                </Space>
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>{t('记住我')}</Checkbox>
            </Form.Item>

            <a className='form-forget' href=''>
              {t('忘记密码')}
            </a>
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => (
              <Button
                type='primary'
                htmlType='submit'
                className='form-login'
                disabled={
                  loginType === LoginType.password
                    ? !form.getFieldValue('username') ||
                      !form.getFieldValue('password') ||
                      form.getFieldError('username').length > 0 ||
                      form.getFieldError('password').length > 0
                    : !form.getFieldValue('email') ||
                      !form.getFieldValue('captcha') ||
                      form.getFieldError('email').length > 0 ||
                      form.getFieldError('captcha').length > 0
                }
              >
                {t('登录')}
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
