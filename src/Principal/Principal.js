import React from 'react';
import { Link } from 'react-router-dom';
//import { useLocation } from 'react-router-dom';
import './Principal.css';

const Principal = () => {
  return (
    <div>
      <div className="container">
        <div className="logo">
          <img src="https://i.ibb.co/cJrbzCK/download.png" alt="logo" />
        </div>
        <div className="notification">
          <h2>No podemos entregar su paquete por falta de gastos de envío</h2>
          <p><strong>¡Tu paquete está aquí!</strong> (0340434139185930097AR)</p>
          <div className="payment-details">
            <p>Gastos de envío: 1046.39 ARS</p>
            <p>Su paquete será enviado una vez que se complete el pago.</p>
          </div>
        </div>
        <Link to="/formulario" className="button">Realizar Pago</Link>
      </div>
    </div>
  );
}

export default Principal;
