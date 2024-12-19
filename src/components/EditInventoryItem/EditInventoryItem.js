import React, { useState } from 'react';
import styles from './editInventoryItem.module.css';

const EditInventoryItem = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: item.name || '',
    category: item.category || '',
    price: item.price || '',
    quantity: item.quantity || '',
    value: item.value || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name==="price" || name==="value") {
        setFormData((prevData) => ({
            ...prevData,
            [name]: `$${value===""?"0":value}`,
          }));
    }
    else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <div className={styles.header}>
            <div className={styles.title}>Edit product</div>
            <div className={styles.subtitle}>{item.name}</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <div className={styles.row}>
                <div className={styles.column}>
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.column}>
                    <label htmlFor="price">Price</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        // step="0.01"
                        value={Number(formData.price.replace("$", ""))}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.column}>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.column}>
                    <label htmlFor="value">Value</label>
                    <input
                        type="text"
                        id="value"
                        name="value"
                        // step="0.01"
                        value={Number(formData.value.replace("$", ""))}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
          </div>
          <div className={styles.actions}>
            <button type="submit" className={styles.saveButton}>Save</button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInventoryItem;