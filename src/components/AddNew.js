import React, { useState, useRef } from "react";
import { addList, addCard } from "../store/listSlice";
import { useDispatch } from "react-redux";

const AddNew = ({ type, parentId }) => {
  const [inputVal, setInputVal] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const dispatch = useDispatch();
  const forminput = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!inputVal) {
      forminput.current.focus();
      return;
    }

    if (type === "card" && parentId) {
      dispatch(
        addCard({ 
          id: Math.random(), 
          title: inputVal, 
          description, 
          dueDate, 
          parentId 
        })
      );
    } else if (type === "list") {
      dispatch(addList({ id: Math.random(), title: inputVal, children: [] }));
    }

    hideForm();
    setInputVal("");
    setDescription("");
    setDueDate("");
  };

  const openForm = () => {
    setIsFormVisible(true);
  };

  const hideForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div>
      <button onClick={openForm}>
        + Add {type === "card" ? "a card" : "a list"}
      </button>
      {isFormVisible && (
        <form onSubmit={submitHandler} className="mt-3">
          <input
            autoFocus
            ref={forminput}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full h-10 p-2"
            placeholder={type === "card" ? "Enter card title..." : "Enter list title..."}
          />
          {type === "card" && (
            <>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-20 p-2 mt-3"
                placeholder="Enter description..."
              />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full h-10 p-2 mt-3"
              />
            </>
          )}
          <div className="mt-3">
            <button type="button" onClick={hideForm} className="mr-3">
              Cancel
            </button>
            <button type="submit" className="px-3 py-1 bg-blue-500 text-white">
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddNew;
