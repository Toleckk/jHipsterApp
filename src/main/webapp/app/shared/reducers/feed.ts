import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import {AuthenticationState} from "app/shared/reducers/authentication";

export const ACTION_TYPES = {
  FEED: 'feed/FEED'
};

const initialState = {
  loading: false,
  posts: []
};

export type FeedState = Readonly<typeof initialState>;

// Reducer

export default (state: AuthenticationState = initialState, action): AuthenticationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FEED):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.FEED):
      return {
        ...state,
        loading: false,
        posts: action.payload.data
      };
    default:
      return state;
  }
}

export const getFeed = () => dispatch => dispatch({
  type: ACTION_TYPES.FEED,
  payload: axious.get('api/feed');
});
