
const set = new Set()

let active = {active: true}

try {
    set.add(active)
} finally {
    active = null;
}

// set添加的active为副本，不会置空
console.log(set)
console.log(active)