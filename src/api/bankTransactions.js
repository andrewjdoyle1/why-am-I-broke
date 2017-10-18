import { apiCaller } from './index'
import toUrl from '../helpers/toUrl'

export const uploadBankTransactions = bankTransactions => {
  let formData = new FormData()
  formData.append('bankTransactions', bankTransactions)
  return apiCaller({
    method: 'put',
    url: toUrl('/api/bank-transactions/uploadBankTransactions'),
    data: formData,
    headers: { 'Content-Type': bankTransactions.type }
  })
}
