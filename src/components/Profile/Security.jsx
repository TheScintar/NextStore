import React from 'react'
import styles from '../../styles/Profile/profile.module.css';

const Security = ({ shippingAddress, setShippingAddress, handleUpdateProfile }) => {
  return (
    <div className={styles.Address}>
        You
      <input
        type="text"
        value={shippingAddress.country}
        onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
        placeholder="Country"
      />
      <input
        type="text"
        value={shippingAddress.city}
        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
        placeholder="City"
      />
      <input
        type="text"
        value={shippingAddress.street}
        onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
        placeholder="Street"
      />
      <input
        type="text"
        value={shippingAddress.apartment}
        onChange={(e) => setShippingAddress({ ...shippingAddress, apartment: e.target.value })}
        placeholder="Apartment"
      />
      <input
        type="text"
        value={shippingAddress.zip}
        onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
        placeholder="Zip code"
      />
      <button onClick={handleUpdateProfile}>Update address</button>
    </div>
  )
}

export default Security
