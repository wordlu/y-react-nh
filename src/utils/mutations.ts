export function setState(state, params, { mutations, getState }) {
  return params;
}

export function setData(state, params, { mutations, getState }) {
  const { key, value } = params;
  mutations.setState(getState().setIn(key, value));
}

export function setState1(params, handle) {
  handle.updateModel(params);
}