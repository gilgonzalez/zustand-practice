import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface Bears {
  id: number,
  name: string;
}

interface BearState {
  blackBears: number,
  polarBears: number,
  pandaBears: number,
  increaseBlackBears: ( by: number ) => void;
  increasePandaBears: ( by: number ) => void;
  increasePolarBears: ( by: number ) => void;
  doNothing: () => void;
  addBear: () => void;
  clearBears: () => void;
  bears: Bears[];
  computed: {
    totalBears: number;
  };
  getTotalBears: () => number;
}

export const useBearStore = create<BearState>()(
  persist(
    ( set, get ) => ( {
      bears: [ { id: 1, name: "Oso 1" } ],
      blackBears: 15,
      polarBears: 0,
      pandaBears: 0,
      computed: {
        get totalBears() {
          return get().blackBears + get().bears.length + get().polarBears + get().pandaBears;
        }
      },
      increaseBlackBears: ( by: number ) => set( ( state ) => ( { blackBears: state.blackBears + by } ) ),
      increasePolarBears: ( by: number ) => set( ( state ) => ( { polarBears: state.polarBears + by } ) ),
      increasePandaBears: ( by: number ) => set( ( state ) => ( { pandaBears: state.pandaBears + by } ) ),
      doNothing: () => set( ( state ) => ( { bears: [ ...state.bears ] } ) ),
      addBear: () => set( state => ( {
        bears: [ ...state.bears, { id: state.bears.length + 1, name: `Oso ${ state.bears.length + 1 }` } ]
      } ) ),
      clearBears: () => set( { bears: [] } ),
      getTotalBears: () => get().blackBears + get().bears.length + get().polarBears + get().pandaBears
    } ),
    {
      name: 'bears-storage'
    }
  )

);