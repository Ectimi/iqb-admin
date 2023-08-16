import { GetQuestionList } from '@/service/question'
import { useAsyncEffect } from 'ahooks'

export default function QuestionList() {
  useAsyncEffect(async () => {
    const res = await GetQuestionList()
    console.log('questiion list', res)
  })
  return <div>list</div>
}
