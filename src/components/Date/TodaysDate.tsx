import * as dateFns from 'date-fns'



export function TodaysDate() {
    const date = new Date()
    const formattedDate = dateFns.format(date, 'dd MMMM, EEEE')
    const clockEl = document.querySelector('.clock') as HTMLElement
    if (clockEl) {
        setInterval(() => clockEl.innerHTML = dateFns.format(new Date, 'HH:mm:ss'))
    }
    return (
        <div className='dateContainer'>
            <div className='todayDate'>Today is: {formattedDate}</div>
            <div className='clock'>
            </div>
        </div>
    )
}