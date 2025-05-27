import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { userDetails } from './reducer/user.js';
import { coinDetails } from './reducer/coin.js';
import { layoutsDetails } from './reducer/layouts.js';
import { imageReducer } from './reducer/images.js';

import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'; 

const persistConfig = {
  key: 'root',
  storage: storageSession, 
  whitelist: ['layouts', 'user', 'coin', 'images'],
};


const rootReducer = combineReducers({
  user: userDetails,
  coin: coinDetails,
  layouts: layoutsDetails,
  images:imageReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

const persistor = persistStore(store);

export { store, persistor };
