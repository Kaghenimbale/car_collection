import React, { useState } from 'react';
// import { Routes, Route } from 'react-router';
// import { FiMenu } from 'react-icons/fi';
// import Main from './Main';
// import Navbar from './Navbar/Navbar';
// import AddItem from './AddItem';
// import Reservation from './Reservation';
// import Details from './Details';
// import DeleteItem from './DeleteItem';
import Registration from './auth/registration';

const App = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <Registration />
      {/* <Navbar open={open} setOpen={setOpen} />
        <div className="component">
          <button type="button" className="menu btn" onClick={handleClick}>
            <FiMenu />
          </button>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="ADD ITEM" element={<AddItem />} />
            <Route path="MY RESERVATION" element={<Reservation />} />
            <Route path="DETAILS" element={<Details />} />
            <Route path="DELETE ITEM" element={<DeleteItem />} />
          </Routes>
        </div> */}
    </>
  );
};

export default App;
