import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './../context/ThemeProvider';


export const useTheme = () => useContext(ThemeContext);



export const useDebounce = (value, delay) => {

  const [debValue, setDebValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebValue(value)
    }, delay);

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debValue;
}

export const useFilter = (items, filterProp) => {

  const [enteredSearchValue, setEnteredSearchValue] = useState('');
  const activeSearchValue = useDebounce(enteredSearchValue, 300);

  const availableItems = activeSearchValue
    ? items.filter((item) => 
        RegExp(activeSearchValue, 'i').test(item[filterProp]))
    : items;

  return {
    enteredSearchValue,
    setEnteredSearchValue,
    availableItems
  }
}

export const useSort = (items, sortProp) => {

  const [sortMode, setSortMode] = useState('up');

  const sortedItems = !sortMode
    ? items
    : items.slice().sort((a, b) => {
      if (sortMode === 'up' && a[sortProp] > b[sortProp]) {
        return 1
      } else if (sortMode === 'up') {
        return -1
      } else if (sortMode === 'down' && a[sortProp] > b[sortProp]) {
        return -1
      } else {
        return 1
      }
    })

  return {
    sortMode,
    setSortMode,
    sortedItems
  }
}