export default function uuid() {
    let temUrl = URL.createObjectURL(new Blob())
    let uuid = temUrl.toString() // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
    URL.revokeObjectURL(temUrl)
    // slice类似于Java的substring
    return uuid.slice(uuid.lastIndexOf("/") + 1)
}