import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import '../styles/Breadcrumb.scss';

function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          {index > 0 && <ChevronRight size={14} className="separator" />}
          {item.path ? (
            <Link to={item.path} className="breadcrumb-link">
              {item.label}
            </Link>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumb;

