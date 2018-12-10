import React from 'react';
import co from 'co';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as effects from 'redux-saga/effects';
import { delay, eventChannel, channel } from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(a => a, {}, compose(applyMiddleware(sagaMiddleware)));

window.store = store;
window.co = co;
window.run = generatorFn => sagaMiddleware.run(generatorFn);
window.effects = effects;
window.dispatch = action => store.dispatch(action);
window.delay = delay;
window.eventChannel = eventChannel;
window.actionChannel = effects.actionChannel;
window.channel = channel;

console.log(
  '%c Redux Saga Sandbox',
  'color: #333; font-weight: bold; font-size: 24px'
);

//Take
effects.take('MY_ACTION');
let mySaga = function*() {
  console.info('Saga begins!');
  const state = yield effects.take('SET_STATE');
  console.info('Get state....', state);
};

window.run(mySaga);
// window.dispatch({ type: 'SET_STATE', value: 42 });
let putSaga = function*() {
  yield effects.put({ type: 'SET_STATE', value: 35 });
};
run(putSaga);

let fn = () => {
  console.log('Called the function');
};

let saga = function*() {
  yield fn();
};

run(saga);

saga = function*() {
  yield effects.call(fn);
};
run(saga);

//fork
// function* fn_fork() {
//   while (true) {
//     console.log('FN!');
//     yield delay(10000);
//   }
// }

// saga = function*() {
//   while (true) {
//     yield effects.fork(fn_fork);
//     console.log('saga!');
//     yield delay(500);
//   }
// };

// run(saga);

// let process = function*() {
//   while (true) {
//     console.log('Process loop.');
//     yield delay(1000);
//   }
// };

// saga = function*() {
//   yield effects.takeEvery('START_PROCESS', process);
//   console.log('Saga got to the end');
// };
// run(saga);
// window.dispatch({ type: 'START_PROCESS', value: 42 });

//cancel redux saga

// process = function*() {
//   try {
//     while (true) {
//       console.log('Process loop.');
//       yield delay(500);
//     }
//   } finally {
//     console.log('Cancelled?', effects.cancelled());
//   }
// };

process = function*() {
  try {
    while (true) {
      console.log('Process loop.');
      yield delay(500);
    }
  } finally {
    const cancelled = yield effects.cancelled();
    console.log('Cancelled?', cancelled);
  }
};
saga = function*() {
  let forked = yield effects.fork(process);
  yield delay(5000);
  yield effects.cancel(forked);
  console.log('Done');
};

run(saga);
