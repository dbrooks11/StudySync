export function formatTime(time){

        if (!time) return ''

        const [hour, minute] = time.split(':')
        const newTime = new Date()
        newTime.setHours(parseInt(hour), parseInt(minute))

        return newTime.toLocaleTimeString([], {
            hour: 'numeric',
            minute:'2-digit',
            hour12: true
        })
}