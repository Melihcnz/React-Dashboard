import React from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaShoppingCart, FaUsers, FaMoneyBillWave, FaShoePrints } from 'react-icons/fa';
import { MdInventory } from 'react-icons/md';

function Sidebar() {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="h-full p-4 menu w-80 bg-base-200 text-base-content">
        <li className="mb-2">
          <Link to="/products" className="flex items-center">
            <FaBox className="mr-2" />
            Products
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/urunler" className="flex items-center">
            <MdInventory className="mr-2" />
            Ürün Stok
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/sales" className="flex items-center">
            <FaShoppingCart className="mr-2" />
            Satışlar
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/users" className="flex items-center">
            <FaUsers className="mr-2" />
            Kullanıcılar
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/expenses" className="flex items-center">
            <FaMoneyBillWave className="mr-2" />
            Giderler
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/shoes" className="flex items-center">
            <FaShoePrints className="mr-2" />
            Ayakkabılar
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar; 