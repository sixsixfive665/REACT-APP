
//reducer函数
function reducer(state = 0, action) {
  switch (action.type) {
    case 'add':
      state = state + 1;
      return state;
    case 'sub':
      state = state - 1;
      return state;
    default:
      return state;
  }
}
export default reducer;