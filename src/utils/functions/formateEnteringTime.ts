//функция которая добовляет 0 в начало если была введена 1 цифра (для сортировки списка наших задача по времени)
export function formatEnteringTime(time: string) {
    const [hours, minutes] = time.split(':')
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
}