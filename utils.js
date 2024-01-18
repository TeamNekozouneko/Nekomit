function getCurrentTime(radix) {
    const date = new Date()
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()
    return `${h}時${m}分${s}秒`
}

module.exports = {
    getCurrentTime
}