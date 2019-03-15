import request from './request'
import { platform } from './index'

const baseUrlApi = platform === 'h5' ? '/api' : 'https://api.ithome.com'
const baseUrlDyn = platform === 'h5' ? '/dyn' : 'https://dyn.ithome.com'
const baseUrlQuan = platform === 'h5' ? '/apiquan' : 'https://apiquan.ithome.com'

const api = {
  
}

export default api
