import EmojiPicker from 'emoji-picker-react';

import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';

import './chatwindow.css';
import { useEffect, useRef, useState } from 'react';
import MessageItem from '../MessageItem';

import api from '../../api';

export default function ChatWindow ({ user, data }) {
    const body = useRef();

    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }

    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState('');
    const [listening, setListening] = useState(false);
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([])

    useEffect(() => {
        setList([]);
        let unsub = api.onChatContent(data.chatId, setList, setUsers);
        return unsub;
    }, [data])

    useEffect(()=>{
        if(body.current.scrollHeight > body.current.offsetHeight){
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
    }, [list]);

    const handleEmoji = (e, emojiObject) => {
        setText(text + emojiObject.emoji);
    }

    const handleOpenEmoji = () => {
        setEmojiOpen(true);
    }

    const handleCloseEmoji = () => {
        setEmojiOpen(false);
    }

    const handleSendClick = () => {
        if(text !== '') {
            api.sendMessage(data, user.id, 'text', text, users);
            setText('');
            setEmojiOpen(false);
        }
    }

    const handleMicClick = () => {
        if(recognition !== null) {
            recognition.onstart = () => {setListening(true)}

            recognition.onend = () => {setListening(false)}

            recognition.onresult = (e) => {setText( e.results[0][0].transcript )}

            recognition.start();
        }
    }

    const handleInputKeyUp = (e) => {
        if(e.keyCode === 13) handleSendClick();
    }
    
    return(
        <div className="chatwindow">
            <div className="chatwindow-header">
                <div className="chatwindow-headerinfo">
                    <img className="chatwindow-avatar" src={data.image} alt="avatar" />
                    <div className="chatwindow-name">{data.title}</div>
                </div>

                <div className="chatwindow-headerbuttons">
                    <div className="chatwindow-btn">
                        <SearchIcon />
                    </div>

                    <div className="chatwindow-btn">
                        <AttachFileIcon />
                    </div>

                    <div className="chatwindow-btn">
                        <MoreVertIcon />
                    </div>
                </div>
            </div>
            
            <div ref={body} className="chatwindow-body">
                {list.map((item, key)=>(
                    <MessageItem
                        key={key}
                        data={item}
                        user={user}
                    />
                ))}
            </div>

            <div className="chatwindow-emojiarea" style={{height: emojiOpen ? '200px' : '0px'}}>
                <EmojiPicker 
                    disableSearchBar
                    disableSkinTonePicker
                    onEmojiClick={handleEmoji}
                />
            </div>
            
            <div className="chatwindow-footer">
                <div className="chatwindow-pre">
                    <div className="chatwindow-btn" onClick={handleCloseEmoji} style={{display: emojiOpen ? 'flex' : 'none'}}>
                        <CloseIcon />
                    </div>

                    <div className="chatwindow-btn" onClick={handleOpenEmoji}>
                        <InsertEmoticonIcon style={{color: emojiOpen ? '#009688' : '#919191'}} />
                    </div>
                </div>

                <div className="chatwindow-inputarea">
                    <input
                        type="text"
                        className="chatwindow-input"
                        value={text}
                        placeholder="Escreva uma mensagem"
                        onChange={(e) => setText(e.target.value)}
                        onKeyUp={handleInputKeyUp}
                    />
                </div>

                <div className="chatwindow-pos">
                    {text === '' &&
                        <div className="chatwindow-btn" onClick={handleMicClick}>
                            <MicIcon style={{color: listening ? '#126ECE' : ''}} />
                        </div>
                    }

                    {text !== '' &&
                        <div className="chatwindow-btn">
                            <SendIcon />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
