import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "listSlice",
  initialState: {
    list: [],  
  },
  reducers: {
    addList: (state, action) => {
      state.list.push(action.payload);
    },
    addCard: (state, action) => {
      const list = state.list.find(item => item.id === action.payload.parentId);
      if (list) {
        list.children.push(action.payload);
      }
    },
    updateList: (state, action) => {
      const list = state.list.find(item => item.id === action.payload.id);
      if (list) {
        list.title = action.payload.title;
      }
    },
    updateCard: (state, action) => {
      const list = state.list.find(item => item.id === action.payload.parentId);
      const card = list.children.find(child => child.id === action.payload.id);
      if (card) {
        card.title = action.payload.title;
        card.description = action.payload.description;
        card.dueDate = action.payload.dueDate;
      }
    },
    deleteList: (state, action) => {
      state.list = state.list.filter(item => item.id !== action.payload.id);
    },
    deleteChildList: (state, action) => {
      const list = state.list.find(item => item.id === action.payload.parentId);
      if (list) {
        list.children = list.children.filter(child => child.id !== action.payload.id);
      }
    },
    reorderLists: (state, action) => {
      const [removed] = state.list.splice(action.payload.startIndex, 1);
      state.list.splice(action.payload.endIndex, 0, removed);
    },
    moveCard: (state, action) => {
      const { sourceListId, destinationListId, sourceIndex, destinationIndex } = action.payload;
      
      const sourceList = state.list.find(list => list.id === sourceListId);
      const destinationList = state.list.find(list => list.id === destinationListId);

      const [movedCard] = sourceList.children.splice(sourceIndex, 1);
      destinationList.children.splice(destinationIndex, 0, movedCard);
    }
  },
});

export const { addList, addCard, updateList, updateCard, deleteList, deleteChildList, reorderLists, moveCard } = listSlice.actions;
export default listSlice.reducer;
