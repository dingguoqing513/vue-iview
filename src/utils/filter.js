exports.userLevel = (level) => {
    return level === 0 ? '一切正常' : level === 1 ? '一般警告' : level === 2 ? '严重预警' : '未知错误'
}

exports.userLevelState = (state) => {
    return state >= 0 && state <= 5 ? 'normal' : state > 5 && state <= 10 ? 'ordinary' : state > 10 ? 'danger' : ''
}

exports.userLevelColor = (time) => {
    return time >= 0 && time <= 5 ? 'lightgreen' : time > 5 && time <= 10 ? '#34c5d0' : time > 10 ? 'f94652' : ''
}