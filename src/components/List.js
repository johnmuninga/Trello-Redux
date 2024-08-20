import React, { useState } from "react";
import Card from "./Card";
import AddNew from "./AddNew";
import { useSelector } from "react-redux";
import { deleteList, updateList } from "../store/listSlice";
import { useDispatch } from "react-redux";
import ListEditForm from "./ListEditForm";
import { Droppable, Draggable } from "react-beautiful-dnd";

const List = ({ listId, index }) => {
  const listItem = useSelector((store) => store.listSlice.list.find(list => list.id === listId));
  const dispatch = useDispatch();
  const [editingList, setEditingList] = useState(null);

  const deleteListFn = (id) => {
    dispatch(deleteList({ id }));
  };

  const startEditingList = (list) => {
    setEditingList(list);
  };

  const stopEditingList = () => {
    setEditingList(null);
  };

  const handleUpdateList = (id, title) => {
    dispatch(updateList({ id, title }));
    stopEditingList();
  };

  return (
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <div
          className="p-3 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className={`p-3 bg-gray-200 rounded-lg`} {...provided.dragHandleProps}>
            {editingList?.id === listItem.id ? (
              <ListEditForm
                list={listItem}
                onSave={(title) => handleUpdateList(listItem.id, title)}
                onCancel={stopEditingList}
              />
            ) : (
              <div className="flex flex-row justify-between items-center mb-4">
                <p className="text-lg">{listItem.title}</p>
                <div className="flex flex-row gap-3">
                  <button
                    title="Edit List"
                    onClick={() => startEditingList(listItem)}
                    className="text-back p-2 bg-gray-300 rounded-full font-bold ml-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M15.49 7.3h-1.16v6.35H1.67V3.28H8V2H1.67A1.21 1.21 0 0 0 .5 3.28v10.37a1.21 1.21 0 0 0 1.17 1.25h12.66a1.21 1.21 0 0 0 1.17-1.25z"></path><path fill="currentColor" d="M10.56 2.87L6.22 7.22l-.44.44l-.08.08l-1.52 3.16a1.08 1.08 0 0 0 1.45 1.45l3.14-1.53l.53-.53l.43-.43l4.34-4.36l.45-.44l.25-.25a2.18 2.18 0 0 0 0-3.08a2.17 2.17 0 0 0-1.53-.63a2.2 2.2 0 0 0-1.54.63l-.7.69l-.45.44zM5.51 11l1.18-2.43l1.25 1.26zm2-3.36l3.9-3.91l1.3 1.31L8.85 9zm5.68-5.31a.9.9 0 0 1 .65.27a.93.93 0 0 1 0 1.31l-.25.24l-1.3-1.3l.25-.25a.88.88 0 0 1 .69-.25z"></path></svg>
                  </button>
                  <button
                    title="Delete List"
                    onClick={() => deleteListFn(listItem.id)}
                    className="text-orange-600 p-2 bg-gray-300 rounded-full font-bold"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512"><path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16M53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>
                  </button>
                </div>
              </div>
            )}
            <Droppable droppableId={listItem.id} type="card">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {listItem?.children?.length > 0 &&
                    listItem.children.map((card, index) => (
                      <Card key={card.id} cardInfo={card} index={index} />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="mt-3">
              {/* Only show Add Card if the list exists */}
              {listItem && <AddNew type="card" parentId={listItem.id} />}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default List;
