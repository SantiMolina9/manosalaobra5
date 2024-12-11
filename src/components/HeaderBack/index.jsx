import { useNavigate } from "react-router-dom";
import '../HeaderBack/index.scss'
function HeaderBack({titulo}){
    const navigate = useNavigate();

    return (
        <div className = "header">
            <button className = "boton-atras" onClick={() => navigate(-1)}>
                ‹
            </button>
            <h1 className ="title">{titulo}</h1>
        </div>
    )
}

export default HeaderBack;