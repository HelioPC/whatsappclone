import { useEffect, useState } from 'react'
import './chatlistitem.css'

export default function ChatListItem ({onClick, active, data}) {
    const [time, setTime] = useState('');

    useEffect(() => {
        if(data.lastMessageDate > 0) {
            let d = new Date(data.lastMessageDate.seconds * 1000);
            let hours = d.getHours();
            let minutes = d.getMinutes();
            hours = hours < 10 ? '0'+hours : hours;
            minutes = minutes < 10 ? '0'+minutes : minutes;
            setTime(`${hours}:${minutes}`);
        }
    }, [data]);

    return(
        <div
            className={`chatlistitem ${active ? 'active' : ''}`}
            onClick={onClick}
        >
            <img className="chatlistitem-avatar" src={data.image} alt='3456' />
            
            <div className="chatlistitem-lines">
                <div className="chatlistitem-line">
                    <div className="chatlistitem-name">{data.title}</div>
                    <div className="chatlistitem-date">{time}</div>
                </div>
                
                <div className="chatlistitem-line">
                    <div className="chatlistitem-lastmsg">
                        <p>{data.lastMessage}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}