import { Form, Input, Select, Card, Button, Space } from 'antd'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css'

import './index.less'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const mdParser = new MarkdownIt(/* Markdown-it options */)

export enum EQuestionType {
  choice,
  multipleChoice,
  fillInBlank,
  answer
}

function handleDetailChange({ html, text }: any) {
  console.log('handleDetailChange', html, text)
}

export default function QuestionCreate() {
  const initialValues = {
    type: EQuestionType.choice,
    options: ['', '']
  }
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  return (
    <div className='router-page'>
      <Card>
        <div className='create-form'>
          <Form
            name='createForm'
            initialValues={initialValues}
            layout='vertical'
            onFinish={onFinish}
            form={form}
          >
            <Form.Item name='type' label='题目类型'>
              <Select>
                <Select.Option value={EQuestionType.choice}>单选题</Select.Option>
                <Select.Option value={EQuestionType.multipleChoice}>多选题</Select.Option>
                <Select.Option value={EQuestionType.fillInBlank}>填空题</Select.Option>
                <Select.Option value={EQuestionType.answer}>简答题</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name='description'
              label='题目描述'
              rules={[{ required: true, message: '请输入题目描述！' }]}
            >
              <Input placeholder='请输入题目描述' autoComplete='off' size='large' />
            </Form.Item>
            <Form.Item label='题目详情'>
              <MdEditor renderHTML={text => mdParser.render(text)} onChange={handleDetailChange} />
            </Form.Item>
            <Form.Item noStyle shouldUpdate={(prev, cur) => prev.type !== cur.type}>
              {({ getFieldValue }) =>
                getFieldValue('type') === EQuestionType.choice ||
                getFieldValue('type') === EQuestionType.multipleChoice ? (
                  <Form.Item label='答案选项（至少需要提供两个选项）'>
                    <Form.List name='options'>
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map((field, index) => (
                            <Space key={field.key} className='option-row'>
                              <Form.Item
                                label={'选项' + (index + 1)}
                                name={field.name}
                                required
                                rules={[{ required: true, message: '请输入答案选项！' }]}
                              >
                                <Input
                                  placeholder='请输入答案选项'
                                  autoComplete='off'
                                  size='large'
                                />
                              </Form.Item>

                              {index > 1 ? (
                                <MinusCircleOutlined
                                  rev={null}
                                  onClick={() => remove(field.name)}
                                />
                              ) : null}
                            </Space>
                          ))}

                          <Form.Item>
                            <Button onClick={() => add()} block icon={<PlusOutlined rev={null} />}>
                              添加答案选项
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                确定创建
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  )
}
