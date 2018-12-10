import { fork, put, take } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import { SET_CART_ITEMS, setItemDetails } from './../actions';

export function* loadItemDetail(item) {
  console.log('Item?', item);
  const { id } = item;
  const reponse = yield fetch(`http://localhost:8081/items/${id}`);
  const data = yield reponse.json();
  const info = data[0];
  yield put(setItemDetails(info));
}

export function* itemDetailSaga() {
  const { items } = yield take(SET_CART_ITEMS);
  yield items.map(item => fork(loadItemDetail, item));
}
