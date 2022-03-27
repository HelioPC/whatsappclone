import { useEffect, useState } from 'react';

import './messageitem.css';

export default function MessageItem ({ data, user }) {
    const [time, setTime] = useState('');

    useEffect(() => {
        if(data.date > 0) {
            let d = new Date(data.date.seconds * 1000);
            let hours = d.getHours();
            let minutes = d.getMinutes();
            hours = hours < 10 ? '0'+hours : hours;
            minutes = minutes < 10 ? '0'+minutes : minutes;
            setTime(`${hours}:${minutes}`);
        }
    }, [data]);
    
    return(
        <div 
            className='message-line'
            style={{
                justifyContent: user.id === data.author ? 'flex-end' : '',
            }}
        >
            <div className='message-item' style={{backgroundColor: user.id === data.author ? '#DCF8C6' : '',}}>
                <div className='message-text'>{data.body}</div>
                <div className='message-date'>{time}</div>
            </div>
        </div>
    )
}
