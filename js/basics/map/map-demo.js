/** leetcode 2722
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
 var join = function(arr1, arr2) {
    let i = 0;
    let j = 0;
    let map = new Map();
  
    while (j < arr2.length) {
        map.set(arr2[j].id, arr2[j]);
        j++;
    }

    while (i < arr1.length) {
        const id = arr1[i].id;
        if (!map.has(id)) {
            map.set(id, arr1[i]);
        } else {
            map.set(id, Object.assign(arr1[i], map.get(id)));
        }
        i++;
    }

    return [...map.values()].sort((a, b) => a.id - b.id)
};