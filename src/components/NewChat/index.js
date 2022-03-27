import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useEffect, useState } from 'react';
import api from '../../api';

import './newchat.css';

export default function NewChat ({ user, chatList, show, setShow }) {
    const [list, setList] = useState([]);

    useEffect(() => {
        const getList = async () => {
            if(user !== null) {
                let results = await api.getContactList(user.id);
                setList(results);
            }
        }
        getList();
    }, [user]);

    const addNewChat = async (user2) => {
        await api.addNewChat(user, user2);

        handleClose();
    }

    const handleClose = () => {
        setShow(false);
    }

    return(
        <div className='newchat' style={{left: show ? '0' : '-415px'}}>
            <div className='newchat-head'>
                <div onClick={handleClose} className='newchat-backbutton'>
                    <ArrowBackIcon />
                </div>
                <div className='newchat-headtitle'>Nova Conversa</div>
            </div>
            <div className='newchat-list'>
                {list.map((item, key)=>(
                    <div onClick={() => addNewChat(item)} className='newchat-item' key={key}>
                        <img className='newchat-itemavatar' src={item.avatar} alt='avatar' />
                        <div className='newchat-itemname'>{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}