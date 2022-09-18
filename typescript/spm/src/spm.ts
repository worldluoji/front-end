import { GetQueryString } from './utils'
import dataBase from './database'

class Spm {
    constructor(public app: string, public prefix = 'data-spm') {
        document.body.setAttribute(`${this.prefix}a`, this.app)
    }

    install() {
        document.addEventListener('click', (e) => this.clickEventOPeration(e))
        
        document.addEventListener('popState', (e) => this.pvEventOPeration(e))
        document.addEventListener('DOMContentLoaded', (e) => this.pvEventOPeration(e))
    }

    clickEventOPeration(e: Event) {
        let target:HTMLElement|null = e.target as HTMLElement
        let s:string|null = ''
        const levels = ['d', 'c', 'b', 'a']
        let i = 0
        while (target != null &&  i < levels.length && target.hasAttribute(this.prefix + levels[i])) {
            s = `${target.getAttribute(this.prefix + levels[i])}.${s}`
            if (s == null) {
                // TODO 记录错误上报
                return
            }
            i++
            target = target.parentElement
        }
        // 到这里，s就是要上报的spm，由于点击要上报用户的操作路径，还要把url里的spm（上一个页面过来的spm）拿到
        const preSpm = GetQueryString('spm') || ''
        // 上报
        this.report(this.getUserId(), preSpm, s, 'click')
    }

    pvEventOPeration(e: Event) {
        this.report(this.getUserId(), '', s, 'pv')
    }

    report(userid: string, preSpm: string, spm: string, type: string) {
        console.log(Date.now(), userid, preSpm, spm, '已上报') 
        dataBase.add(userid, preSpm, spm, Date.now().toLocaleString(), type)
    }

    // 根据实际项目写该方法
    getUserId():string {
        return 'luojitest001'
    }
}