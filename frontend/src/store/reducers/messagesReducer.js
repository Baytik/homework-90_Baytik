const initialState = {
  messages: [],
  loggedInUsers: []
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'LATEST_MESSAGES':
          return {...state, messages: action.messages};
      case 'NEW_MESSAGES':
          return {...state, messages: [...state.messages, action.message]};
      case 'LOGGED_IN_USERS':
          return {...state, loggedInUsers: action.users};
      default:
          return state;
  }
};

export default messagesReducer;