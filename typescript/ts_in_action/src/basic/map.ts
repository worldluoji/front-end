export function score(dice: number[]): number {
    let ans = 0;
    let m = new Map<number,number>();
    
    for (let d of dice) {
      let c = m.get(d);
      if (c) {
        m.set(d, c + 1);
      } else {
        m.set(d, 1);
      }
    }
    
    for (let e of [1,2,3,4,5,6]) {
      let c = m.get(e);
      while(c) {
        if (c >= 3) {
          if (e === 1) {
             ans += 1000;
          } else {
             ans += e * 100;
          }
          m.set(e, c - 3);
        } else {
          if (e === 1) {
            ans += c * 100;
          } else if (e === 5) {
            ans += c * 50;
          }
          m.set(e, 0);
        }
        c = m.get(e);
      }
    }
    
    return ans;
}

console.log(score([1,1,1,3,4,6,6,6,5]));