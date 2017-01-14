import catApi from '../api/contactsApi';

export function loadCatsSuccess(cats) {
  return {type: types.LOAD_CATS_SUCCESS, cats};
}

export function loadCats() {  
  return function(dispatch) {
    return catApi.getAllCats().then(cats => {
      dispatch(loadCatsSuccess(cats));
    }).catch(error => {
      throw(error);
    });
  };
}