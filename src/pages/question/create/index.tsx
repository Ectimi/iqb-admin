import { Form, Input, Select } from 'antd'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css'

import './index.less'

const mdParser = new MarkdownIt(/* Markdown-it options */)

export enum EQuestionType {
  choice,
  multipleChoice,
  fillInBlank,
  answer
}

function handleEditorChange({ html, text }: any) {
  console.log('handleEditorChange', html, text)
}

export default function QuestionCreate() {
  return (
    <div className='router-page'>
      <div className='create-form'>
        <Form initialValues={{ type: EQuestionType.choice }} layout='vertical'>
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
            <MdEditor
              style={{ height: '500px' }}
              renderHTML={text => mdParser.render(text)}
              onChange={handleEditorChange}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
