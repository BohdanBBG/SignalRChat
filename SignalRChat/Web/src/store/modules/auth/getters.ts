import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { IAuthStore, AUTH_GETTERS } from './types';

const getters: GetterTree<IAuthStore, RootStateInterface> = {
    
  [AUTH_GETTERS.IS_LOGGED_IN](state: IAuthStore) {

    // console.log(12, localStorage.getItem('auth-token'))
    // return localStorage.getItem('auth-token') !== null;
    
    return state.loggedIn; //TODO
  },
 
};

export default getters;
