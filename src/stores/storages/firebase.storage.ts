import { StateStorage, createJSONStorage } from 'zustand/middleware';

const firebaseUrl = 'https://zustand-storage-69b8c-default-rtdb.europe-west1.firebasedatabase.app/zustand'

const storageApi : StateStorage = {
  getItem: async function ( name: string ): Promise<string | null> {
    
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then(res => res.json())
      console.log(data)
      return JSON.stringify(data)
    }catch (error){
      console.log('Message error:', error)
      throw error
    } 
  },
  setItem: async function ( name: string, value: string ): Promise<void>  {
    const data = await fetch(`${firebaseUrl}/${name}.json`, {
      method: 'PUT',
      body: value
    }).then(res => res.json()) 
    console.log(data)
  },
  removeItem: function ( name: string ): void | Promise<void> {
    console.log('removeItem', name)
  }
}
export const firebaseStorage = createJSONStorage(()=> storageApi)