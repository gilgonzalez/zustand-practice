import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { firebaseStorage } from '../storages/firebase.storage';

interface PersonState {
  firstName : string,
  lastName : string,
}

interface Actions {
  setName : (value:string)=>void;
  setLastName : (value:string)=>void;
}


const personStore : StateCreator<PersonState & Actions,  [["zustand/devtools", unknown]] > = (set) => ({
  firstName: '',
  lastName: '',
  setName: (value: string) => set(({firstName: value}), false, 'setFirstName' ),
  setLastName: (value: string) => set(({lastName: value}), false, 'setLastName'),
  })

export const usePersonStore = create<PersonState & Actions>()(
  //logger(
    devtools(
      persist(
        personStore
      ,
      {
        name: 'person-storage',
        storage : firebaseStorage
        // storage: createJSONStorage(()=> sessionStorage)
        //storage: customSessionStorage
      })
    )
  //)
);