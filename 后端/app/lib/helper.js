// 成功返回的消息
const success = (msg, errorCode) => {
    throw new global.errs.Success(msg, errorCode)
}

module.exports = {
    success
}