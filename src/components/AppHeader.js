import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export default function AppHeader() {
  return (
    <header>
      <div className="app-header">
        <div className="app-icon">
          <FontAwesomeIcon icon={faCar} />
        </div>

        <h1>Parking garage manager</h1>
      </div>
    </header>
  );
}
