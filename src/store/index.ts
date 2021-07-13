import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import code from "./code.slice"
import theme from "./theme.slice"
import test from "./test.slice"
import rerunner from "./rerunner.slice"

export const store = configureStore({
  reducer: {
    code,
    theme,
    test,
    rerunner
  }
})

export type AppDispatch = typeof store.dispatch;

// 通过 ReturnType 来获取函数的返回值类型
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
