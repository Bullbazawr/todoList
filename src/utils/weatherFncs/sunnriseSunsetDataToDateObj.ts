

// функция для парсинга даты из строки в объект Date
export const sunnriseSunsetDataToDateObj = (timeString: string): Date => {
    const [todayDate, nowTime] = timeString.split('T').map(String)
    todayDate //чтоб не подчеркивалось
    const [hours, minutes] = nowTime.split(':').map(Number)
    const date = new Date()
    date.setHours(hours, minutes, 0, 0)
    return date
}