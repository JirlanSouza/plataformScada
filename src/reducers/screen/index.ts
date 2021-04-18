import ObjectReducer from '../object';

interface ScreenState {
  objects: typeof ObjectReducer[]
}

function ScreenReducer (state: ScreenState, action: {}) {
  return state;
}

export default ScreenReducer;