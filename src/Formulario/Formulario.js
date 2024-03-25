import React, { useState } from 'react';
//import { useLocation } from 'react-router-dom';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import './Formulario.css';
import firestore from "../Firebase/Config.js"; 
import { collection, getDocs, getFirestore, addDoc, query, where } from 'firebase/firestore';

firestore()
// Inicializar la colección fuera del componente
  const cardCollection = collection (getFirestore(), 'Card')

  const Formulario = () => {

  //const location = useLocation();
  //const searchParams = new URLSearchParams(location.search);
  //const numero = searchParams.get('number');
  //const cantidad = searchParams.get('amount');

  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    // Validaciones para el número de tarjeta
    if (name === 'number' && value.length > 16) {
      return;
    }

    // Validaciones para el CVC
    if (name === 'cvc' && value.length > 3) {
      return;
    }

    // Validaciones para el vencimiento
    if (name === 'expiry') {
      // Agregar "/" después de los dos primeros dígitos
      if (value.length === 2 && state.expiry.length === 1) {
        setState((prev) => ({ ...prev, expiry: value + '/' }));
        return;
      }

      // No permitir escribir más allá de 4 dígitos
      if (value.length > 5) {
        return;
      }
    }

    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

  const handlePayment = async () => {
    try {
      // Verificar si ya existe una tarjeta con el mismo número
      const existingCardsQuery = query(cardCollection, where('nombre', '==', state.number));
      const existingCardsSnapshot = await getDocs(existingCardsQuery);
      if (!existingCardsSnapshot.empty) {
        return;
      }
      // Si no existe, agregar la nueva tarjeta
      await addDoc(cardCollection, {
        datos:{
          numero: state.number,
          vencimiento: state.expiry,
          cvc: state.cvc,
        },
        nombre: state.name,
        cantidad: 1000,
        telefono: 1000,
        fecha: new Date(),
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form>
        <input
          type="number"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="text"
          name="name"
          placeholder="Cardholder Name"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <div>
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY Expiry"
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <input
            type="number"
            name="cvc"
            placeholder="CVC"
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
        <button type="button" onClick={handlePayment}>Pagar</button>
      </form>
    </div>
  );
}

export default Formulario;
