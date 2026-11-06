import { useEffect, useState } from "react";




export function useLocalStorage(key: string, initialValue: string|null) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<string|null>(() => {

    //ssr safty
    if(typeof window === 'undefined') return initialValue

    // Get from local storage by key
    return window.localStorage.getItem(key)|| initialValue;
     

  });

  //Functions
  const setValue = (value: string) => {
    setStoredValue(value);
    window.localStorage.setItem(key, value);
   
  };

  const removeValue = () => {
    setStoredValue(null);
    window.localStorage.removeItem(key);
  };

  //Effects
  useEffect(() => {
   const handleStorageChange = (e: StorageEvent) => {

    if(e.key === key && e.newValue!== null) {
      setStoredValue(e.newValue)
    }
    else if(e.key === key && e.newValue === null) {
      setStoredValue(initialValue)
    }
   }
   window.addEventListener('storage', handleStorageChange)

   return () => window.removeEventListener('storage', handleStorageChange)
   },[key, initialValue]);


   return {storedValue, setValue, removeValue} as const
     
   }

