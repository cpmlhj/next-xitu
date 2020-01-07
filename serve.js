import axios from 'axios'
import request from './request'

/** 
 * @class SystemService
 */
class SystemService {
      /**
       * 获取左侧栏数据
       * @param {string} JueJinCategory 分类 
       * @param {string} JueJInOrder 整理 
       * @param {number} offset 偏移数量 
       * @returns
       * @memberof SystemService
       */
      async getJueJinData(data) {
            const { JueJinCategory, JueJInOrder, offset } = data
            const res = await request.post('gold', {
                  category: JueJinCategory,
                  order: JueJInOrder,
                  offset,
                  limit: 30
            })
            return res.data
      }
      /**
      * 获取右侧栏数据
      * @param {string} GitHubCategory 分类 
      * @param {string} GitHubPeriod 周期 
      * @param {string} GitHubLang 语言类别 
      * @param {number} offset 偏移数量 
      * @returns
      * @memberof SystemService
      */
      async getGitHubData(data) {
            const { GitHubCategory, GitHubPeriod, GitHubLang, offset } = data
            const res = await request.post('github', {
                  category: GitHubCategory,
                  period: GitHubPeriod,
                  lang: GitHubLang,
                  offset,
                  limit: 30
            })
            return res.data
      }
}
export default new SystemService()