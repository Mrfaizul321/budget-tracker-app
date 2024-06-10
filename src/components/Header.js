import React from 'react';

function Header({ balance }) {
  return (
    <header>
      <h1>Budget Tracker</h1>
      <h2>Balance: ${(balance || 0).toFixed(2)}</h2>
    </header>
  );
}

export default Header;
