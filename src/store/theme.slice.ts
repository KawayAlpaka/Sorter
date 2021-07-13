import { createSlice } from '@reduxjs/toolkit';
import { useAppDispatch } from 'store';
import { setTheme, Theme } from 'utils/switch-theme';

const ThemeKey = "SorterTheme"

interface State {
  theme:Theme
}

const storeTheme = localStorage.getItem(ThemeKey);

const initialState:State = {
  theme: storeTheme === "dark" ? storeTheme : "light"
}

setTheme(initialState.theme);

const themeSlice = createSlice({
  name:"theme",
  initialState,
  reducers:{
    switchTheme(state,action){
      state.theme = state.theme === "dark" ? "light" : "dark";
      setTheme(state.theme);
      localStorage.setItem(ThemeKey,state.theme);
    }
  }
});

const { switchTheme } = themeSlice.actions;

export default themeSlice.reducer; 

export const useSwitchTheme = ()=>{
  const dispatch = useAppDispatch();
  return ()=>{
    dispatch(switchTheme(""))
  } 
}
