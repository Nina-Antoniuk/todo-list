import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { labels } from '../constants';
import { Todo } from '../types/todo';
import { getInitialDedline } from '../utils/getInitialDedline';

const dedline = getInitialDedline();

const activeTodos: Todo[] = [
  {
    id: uuidv4(),
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea dicta culpa dolorem qui consequatur laboriosam dolor officia? Tempore quam eum iste aut. Commodi at aperiam quas magni eum. Voluptates quod, magni quasi vel ipsum doloribus. Suscipit eius vel optio eveniet ratione excepturi ipsam voluptate sit modi, dolorem debitis odit officiis?',
    timeStamp: Date.now(),
    label: labels.current,
    dedline: dedline.split('-').reverse().join('.'),
  },
];

export const activeTodosSlice = createSlice({
  name: 'active',
  initialState: activeTodos,
  reducers: {
    addActiveItem: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    editActiveItem: (state, action: PayloadAction<Todo>) => {
      return state.map(el => {
        if (el.id === action.payload.id) {
          return action.payload;
        }
        return el;
      });
    },
    deleteActiveItem: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter(el => el.id !== action.payload.id);
    },
  },
});

export const { addActiveItem, editActiveItem, deleteActiveItem } = activeTodosSlice.actions;

export default activeTodosSlice.reducer;
