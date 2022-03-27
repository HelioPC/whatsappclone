import api from '../../api';
import './styles.css';

export default function Login ({ onReceive }) {

    const handleLogin = async () => {
        let result = await api.fbPopup();
        if(result) {
            onReceive(result.user);
        }else {
            alert('Erro.')
        }
    }

    return(
        <div className='login'>
            <button onClick={handleLogin}>Logar com Facebook</button>
        </div>
    )
}
