import React from "react";
import List from "./List";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { reorderLists, moveCard } from "../store/listSlice";
import AddNew from "./AddNew";

export default function BodyComponents() {
  const lists = useSelector((store) => store.listSlice.list);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    // If there's no destination (dropped outside), do nothing
    if (!destination) return;

    // If the location hasn't changed, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      dispatch(reorderLists({ startIndex: source.index, endIndex: destination.index }));
    } else {
      dispatch(moveCard({
        sourceListId: source.droppableId,
        destinationListId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
        cardId: draggableId
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {(provided) => (
          <div
            className="flex flex-wrap w-full p-3 bg-light"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {lists.map((list, index) => (
              <List key={list.id} listId={list.id} index={index} />
            ))}
            {provided.placeholder}
            
            <div className="p-3 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
              <div className="p-3 bg-gray-200 rounded-lg">
                <AddNew type="list" />
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
