import { Link } from 'react-router-dom';
import './App.css';const Nav = props => {
    return <ul id='nav'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/workspace'>Workspace</Link></li>
        <li><Link to='/tasks'>Tasks</Link></li>
    </ul>
}export default Nav;