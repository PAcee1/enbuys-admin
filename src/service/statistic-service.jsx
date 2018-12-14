/*
 * @Author: Pace 
 * @Date: 2018-12-08 12:18:21 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-08 12:19:15
 */
import EBUtil from 'util/eb.jsx'
const _eb = new EBUtil();

class Statistic{
    //首页数据统计
    getHomeCount(loginInfo){
       return _eb.request({
            url : '/manage/statistic/base_count.do',
        });
    }
   
}

export default Statistic;