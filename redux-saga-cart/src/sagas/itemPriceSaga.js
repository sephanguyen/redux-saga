import { all, call, fork, put, take } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
  SET_CART_ITEMS,
  SET_CURRENT_USER,
  SET_ITEM_DETAILS,
  setItemPrice
} from '../actions';

export function* fetchItemPrice(id, currency) {
  const reponse = yield fetch(`http://localhost:8081/prices/${currency}/${id}`);
  const json = yield reponse.json();
  const price = json[0].price;
  yield put(setItemPrice(id, price));
}

export function* itemPriceSaga() {
  const [{ user }, { items }] = yield all([
    take(SET_CURRENT_USER),
    take(SET_CART_ITEMS)
  ]);

  yield items.map(item => call(fetchItemPrice, item.id, user.country));
}
