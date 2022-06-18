let topLeagues = (state = [], action) => {
  let { type, payload } = action;

  switch (type) {
    case 'TOP_PUBLIC_LEAGUES_FETCH':
      return payload;
    case 'SIGN_OUT':
      return [];
    default:
      return state;
  }
};

export default topLeagues;
