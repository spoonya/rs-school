import { Link } from 'react-router-dom';

import { AppRoutes } from '../../services';

export function Header() {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to={AppRoutes.HOME}>Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
