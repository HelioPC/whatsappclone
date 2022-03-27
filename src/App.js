import { useEffect, useState } from 'react';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';

import Login from './pages/Login';

import './App.css';
import NewChat from './components/NewChat';
import api from './api';


const App = () => {
	const [chatlist, setChatlist] = useState([]);
	const [activeChat, setActiveChat] = useState({});
	const [user, setUser] = useState(null);
	const [showNewChat, setShowNewChat] = useState(false);

	useEffect(() => {
		if(user !== null) {
			let unsub = api.onChatList(user.id, setChatlist);

			return unsub;
		}
	}, [user]);

	const handleOpen = () => {
		setShowNewChat(true);
	}

	const handleLogin = async (u) => {
		let newUser = {
			id: u.uid,
			name: u.displayName,
			avatar: u.photoURL
		};

		await api.addUser(newUser);

		setUser(newUser);
	}

	if(user === null) {
		return(<Login onReceive={handleLogin} />)
	}

	return (
		<div className="app">
			<aside className='sidebar'>
				<NewChat
					user={user}
					chatList={chatlist}
					show={showNewChat}
					setShow={setShowNewChat}
				/>
				<header>
					<img
						className='header-avatar'
						src={user.avatar}
						alt='avatar'
					/>

					<div className='header-buttons'>
						<div className='header-btn'>
							<DonutLargeIcon />
						</div>

						<div className='header-btn' onClick={handleOpen}>
							<ChatIcon />
						</div>

						<div className='header-btn'>
							<MoreVertIcon />
						</div>
					</div>
				</header>

				<div className='search'>
					<div className='search-input'>
						<SearchIcon fontSize='small' htmlColor='#919191'/>
						<input type='search' placeholder='Procurar ou começar uma nova conversa' />
					</div>
				</div>

				<div className='chatlist'>
					{
						chatlist.map((item, key) => (
							<ChatListItem
								key={key}
								data={item}
								onClick={() =>setActiveChat(chatlist[key])}
								active={activeChat.chatId  === chatlist[key].chatId}
							/>
						))
					}
				</div>
			</aside>

			<div className='content-area'>
				{activeChat.chatId !== undefined &&
					<ChatWindow
						user={user}
						data={activeChat}
					/>
				}
				{activeChat.chatId === undefined &&
					<ChatIntro />
				}
			</div>
		</div>
	);
}

export default App;
