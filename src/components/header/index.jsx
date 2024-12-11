import BurguerMenu from "../BurguerMenu";
import Title from '../title/index.jsx'
import '../header/index.scss'
function Header({nombre}){
    return(
        <div className = "header">
            <BurguerMenu/>
            <Title nombre = {nombre}/>
        </div>
    )
}
export default Header;