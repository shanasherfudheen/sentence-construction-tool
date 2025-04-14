export default function Timer({time}) {
    return (
        <div className="timer">{`0:${time < 10 ? `0${time}` : time}`}</div>
    )
}