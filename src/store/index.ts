import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  auth: authReducer
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistRootReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistRootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export let persistor = persistStore(store)

export default store;
