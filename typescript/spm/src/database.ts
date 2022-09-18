// 模拟一个数据库存取数据, 实际可以是某个关系型数据库，或者存redis，redis再同步到关系型数据库
interface SpmData {
    userid:string, 
    preSpm:string, 
    spm: string, 
    reportTime: string
}

class DataBase {
    map: Map<string, SpmData[]>
    clickLogs: SpmData[]
    exposeLogs: SpmData[]
    pvLogs: SpmData[]
    constructor() {
        this.map = new Map<string, SpmData[]>()
        this.clickLogs = []
        this.exposeLogs = []
        this.pvLogs = []
        this.map.set('click', this.clickLogs) 
        this.map.set('pv', this.pvLogs) 
        this.map.set('expose', this.exposeLogs) 
    }

    add(userid:string, preSpm:string, spm: string, reportTime: string, type: string) {
        const table = this.map.get(type)
        if (table != null) {
            table.push({
                'userid': userid,
                'preSpm': preSpm,
                'spm': spm,
                'reportTime': reportTime
            })
        }
    }
}

const dataBase = new DataBase()
export default dataBase