import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './components/Menu/Menu'; // giá trị trả về từ combineReducers

const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2, // Xem thêm tại mục "Quá trình merge".
 blacklist: ['navigation']

};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);