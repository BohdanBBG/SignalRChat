import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { IAuthStore, AUTH_GETTERS } from './types';

const getters: GetterTree<IAuthStore, RootStateInterface> = {
    
  [AUTH_GETTERS.IS_LOGGEDIN](state: IAuthStore) {
    return state.loggedIn;
  },
 
};

export default getters;
