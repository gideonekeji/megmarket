// cardsSlice.ts

import { CardData } from '@/app/types/Restypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardsState {
  cards: CardData[];
}

const initialState: CardsState = {
  cards: [],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    // Action to set cards data
    setCards: (state, action: PayloadAction<CardData[]>) => {
      state.cards = action.payload;
    },
  },
});

export const { setCards } = cardsSlice.actions;

export default cardsSlice.reducer;
