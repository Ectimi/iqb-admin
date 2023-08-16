import request from '@/lib/request'

interface QuestionListParams {
  pageNo?: number
  pageSize?: number
}

export function GetQuestionList(params: QuestionListParams = {}) {
  return request.get('/question/admin', { params })
}
