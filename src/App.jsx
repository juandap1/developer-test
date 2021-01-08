import React, { useState } from 'react';
import './index.css';
import {connect} from 'react-redux';
import {addItem, deleteItem} from './redux/actions';

const ItemContainer = ({ wishList, onClick }) => {
  return (
    <div className="list">
      {/* return an array with every wish list item */}
      {wishList.map((item) => (
        <div className="item" key={item} onClick={() => onClick(item)}>
          {item}
        </div>
      ))}
    </div>
  );
};

const App = ({ wishList, addItem, deleteItem }) => {
  const [userInput, setUserInput] = useState("");

  const onInuptChange = (e) => {
    setUserInput(e.target.value);
  };

  const add = () => {
    if (userInput.length && !wishList.includes(userInput)) addItem(userInput);
    setUserInput("");
  };

  const submit = () => {
    if (wishList.length) {
      alert("Wish list submitted to Santa!");
      wishList.forEach((item) => deleteItem(item));
      setUserInput("");
    }
  };

    return (
      <div className="wishlistModal">
        <h3>MY WISHLIST</h3>
        <div className="wishlist">
          <ItemContainer onClick={deleteItem} wishList={wishList} />
        </div>
        <input
          type="text"
          id="wishInp"
          onChange={(e) => onInuptChange(e)}
          value={userInput}
        />
        <br/>
        <button id="addBtn" onClick={add}>Add</button>
        <br/>
        <button id="submitBtn" onClick={submit}>Submit</button>
      </div>
    );
};

const mapStateToProps = (state) => {
  return {
    wishList: state.wishList,
  };
};

export default connect(mapStateToProps, { addItem, deleteItem })(App);
