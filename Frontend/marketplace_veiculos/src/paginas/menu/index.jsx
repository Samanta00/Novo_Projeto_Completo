
import { Link } from 'react-router-dom';

export default function Menu() {
  const rotas = [{
    label: 'Início',
    to: '/'
  }, {
    label: 'Carros',
    to: '/carros'
  }, {
    label: 'Dashboard',
    to: '/dashboard'
  }];
  return (
    <nav>
      <ul>
        {rotas.map((rota, index) => (
          <li key={index}>
            <Link to={rota.to}>
              {rota.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}