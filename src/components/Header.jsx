import { Link } from 'react-router-dom';
import '../components/Employee.css';

function Header() {
  return (
    <header className="app-header">
      <Link className="header-content" to='/' style={{ color: 'white' }}>
        Ứng dụng quản lý nhân sự
      </Link>
    </header>
  )
}

export default Header