import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCar } from '../redux/Cars/carsSlice';

const AddItem = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [financeFee, setFinanceFee] = useState(0);
  const [purchaseFee, setPurchaseFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [duration, setDuration] = useState(1);
  const [apr, setApr] = useState(0);
  const [snapshot, setSnapshot] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = new FormData();
    carData.append('car[name]', name);
    carData.append('car[description]', description);
    carData.append('car[finance_fee]', financeFee);
    carData.append('car[purchase_fee]', purchaseFee);
    carData.append('car[total_amount]', totalAmount);
    carData.append('car[duration]', duration);
    carData.append('car[apr]', apr);
    carData.append('car[snapshot]', snapshot);
    await dispatch(addCar(carData));
    window.location.reload();
  };

  return (
    <div className="addItem_container">
      <form onSubmit={handleSubmit} className="form">
        <div className="forms form-add">
          <h3>Add an Item</h3>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              className="input"
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Name"
            />
          </label>
          <label htmlFor="description">
            <input
              type="text"
              name="description"
              className="input"
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Description"
            />
          </label>
          <label htmlFor="finance_fee">
            <input
              type="number"
              name="finance_fee"
              className="input"
              onChange={(e) => setFinanceFee(e.target.value)}
              required
              placeholder="Finance Fee"
            />
          </label>
          <label htmlFor="purchase_fee">
            <input
              type="number"
              name="purchase_fee"
              className="input"
              onChange={(e) => setPurchaseFee(e.target.value)}
              required
              placeholder="Purchase Fee"
            />
          </label>
          <label htmlFor="total_amount">
            <input
              type="number"
              name="total_amount"
              className="input"
              onChange={(e) => setTotalAmount(e.target.value)}
              required
              placeholder="Total Amount"
            />
          </label>

          <label htmlFor="duration">
            <input
              type="number"
              name="duration"
              className="input"
              onChange={(e) => setDuration(e.target.value)}
              required
              placeholder="duration"
            />
          </label>

          <label htmlFor="apr">
            <input
              type="number"
              name="apr"
              className="input"
              onChange={(e) => setApr(e.target.value)}
              placeholder="APR"
            />
          </label>
          <label htmlFor="snapshot">
            <input
              type="file"
              name="snapshot"
              className="input"
              onChange={(e) => setSnapshot(e.target.files[0])}
              placeholder="Snapshot"
            />
            <br />
            (PNG file only)
          </label>
          <button type="submit" className="submit">
            Add New Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
