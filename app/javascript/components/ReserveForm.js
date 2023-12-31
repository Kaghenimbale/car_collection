import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getCars, getCar } from '../redux/Cars/carsSlice';
import { createReservation } from '../redux/Reservations/reservationsSlice';
import './style/reserveForm.css';

const ReserveForm = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('current_user_id');
  const { carId } = useParams();

  const initialFormState = {
    date: '',
    city: '',
    user_id: userId,
    car_id: carId || '',
  };

  const { car, cars } = useSelector((store) => store.cars);

  useEffect(() => {
    if (carId) {
      dispatch(getCar(carId));
    } else {
      dispatch(getCars());
    }
  }, [dispatch, carId]);

  const [reserveData, setReserveData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserveData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setReserveData(initialFormState);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const shouldCreate = window.confirm('Are you sure you want to create this reservation?');
    if (shouldCreate) {
      await dispatch(createReservation({ reservation: reserveData }));
      window.alert('Reservation created succesfully!');
      resetForm();
    }
  };

  const cities = [
    'New York City',
    'Los Angeles',
    'Chicago',
    'Houston',
    'San Francisco',
    'Miami',
    'Washington, D.C.',
    'Boston',
    'Atlanta',
    'Dallas',
  ];

  const dateLimits = () => {
    const today = new Date();
    const oneWeekAfter = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const year = oneWeekAfter.getFullYear();
    let month = oneWeekAfter.getMonth() + 1;
    let day = oneWeekAfter.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="reserveContainer f c">
      <div className="reserveFormHeader f c">
        {carId
          ? (
            <h2>
              BOOK A
              {' '}
              {car.name}
              {' '}
              TEST-RIDE
            </h2>
          ) : (
            <h2>
              BOOK A FERRARI TEST-RIDE
            </h2>
          )}
        <p>
          Driving a Ferrari is the dream of many: we offer you the fantastic opportunity
          to make your dream come true! You can choose any of these wonderful cars.
          The test drive is on the track and on road routes designed to ensure a pleasant
          and safe driving.
        </p>
      </div>
      <form className="reserveForm f r" onSubmit={handleSubmit}>
        {!carId
          && (
          <div className="reserveInputContainer f">
            <label htmlFor="car_id">
              Car:
            </label>
            <select
              id="car_id"
              name="car_id"
              className="reserveInput"
              value={reserveData.car_id}
              onChange={handleChange}
              required
            >
              <option value="">Select a car</option>
              {cars.map((car) => (
                <option key={`reservecar${car.id}`} value={car.id}>
                  {car.name}
                </option>
              ))}
            </select>
          </div>
          )}
        <div className="reserveInputContainer f">
          <label htmlFor="city">
            City:
          </label>
          <select
            id="city"
            name="city"
            className="reserveInput"
            value={reserveData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="reserveInputContainer f">
          <label htmlFor="date">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="reserveInput"
            value={reserveData.date}
            min={dateLimits()}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submitReserve f" type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default ReserveForm;
