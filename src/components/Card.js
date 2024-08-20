import React, { useState } from 'react';
import { deleteChildList, updateCard } from "../store/listSlice";
import { useDispatch } from "react-redux";
import CardEditForm from "./CardEditForm";
import CardDetailsDialog from "./CardDetailsDialog";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ cardInfo, index }) => {
  const dispatch = useDispatch();
  const [editingCard, setEditingCard] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const removeChild = () => {
    dispatch(deleteChildList(cardInfo));
  };

  const startEditingCard = () => {
    setEditingCard(true);
  };

  const stopEditingCard = () => {
    setEditingCard(false);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleUpdateCard = (title, description, dueDate) => {
    dispatch(updateCard({ ...cardInfo, title, description, dueDate }));
    stopEditingCard();
  };

  return (
    <Draggable draggableId={cardInfo.id.toString()} index={index}>
      {(provided) => (
        <div
          className='bg-white p-2 mt-2 shadow-md rounded-md cursor-pointer'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {editingCard ? (
            <CardEditForm
              cardInfo={cardInfo}
              onSave={handleUpdateCard}
              onCancel={stopEditingCard}
            />
          ) : (
            <div className="flex flex-row items-center">
              <div className="flex-1 gap-1" onClick={openDialog}>
                <p>{cardInfo.title}</p>
                <p className="text-gray-500">Due: {cardInfo.dueDate}</p>
              </div>
              <div className="flex flex-row items-center gap-3">
                <button
                  title="Edit Card"
                  onClick={startEditingCard}
                  className="text-back p-2 bg-gray-300 rounded-full font-bold ml-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M15.49 7.3h-1.16v6.35H1.67V3.28H8V2H1.67A1.21 1.21 0 0 0 .5 3.28v10.37a1.21 1.21 0 0 0 1.17 1.25h12.66a1.21 1.21 0 0 0 1.17-1.25z"></path><path fill="currentColor" d="M10.56 2.87L6.22 7.22l-.44.44l-.08.08l-1.52 3.16a1.08 1.08 0 0 0 1.45 1.45l3.14-1.53l.53-.53l.43-.43l4.34-4.36l.45-.44l.25-.25a2.18 2.18 0 0 0 0-3.08a2.17 2.17 0 0 0-1.53-.63a2.2 2.2 0 0 0-1.54.63l-.7.69l-.45.44zM5.51 11l1.18-2.43l1.25 1.26zm2-3.36l3.9-3.91l1.3 1.31L8.85 9zm5.68-5.31a.9.9 0 0 1 .65.27a.93.93 0 0 1 0 1.31l-.25.24l-1.3-1.3l.25-.25a.88.88 0 0 1 .69-.25z"></path></svg>
                </button>
                <button
                  title="Delete Card"
                  className="text-back p-2 bg-gray-300 rounded-full  font-bold"
                  onClick={removeChild}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512"><path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16M53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>
                </button>
              </div>
            </div>
          )}
          {isDialogOpen && <CardDetailsDialog cardInfo={cardInfo} onClose={closeDialog} />}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
