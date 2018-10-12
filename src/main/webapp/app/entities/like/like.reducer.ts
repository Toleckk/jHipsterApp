import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILike, defaultValue } from 'app/shared/model/like.model';

export const ACTION_TYPES = {
  FETCH_LIKE_LIST: 'like/FETCH_LIKE_LIST',
  FETCH_LIKE: 'like/FETCH_LIKE',
  CREATE_LIKE: 'like/CREATE_LIKE',
  UPDATE_LIKE: 'like/UPDATE_LIKE',
  DELETE_LIKE: 'like/DELETE_LIKE',
  RESET: 'like/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILike>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type LikeState = Readonly<typeof initialState>;

// Reducer

export default (state: LikeState = initialState, action): LikeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LIKE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LIKE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LIKE):
    case REQUEST(ACTION_TYPES.UPDATE_LIKE):
    case REQUEST(ACTION_TYPES.DELETE_LIKE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LIKE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LIKE):
    case FAILURE(ACTION_TYPES.CREATE_LIKE):
    case FAILURE(ACTION_TYPES.UPDATE_LIKE):
    case FAILURE(ACTION_TYPES.DELETE_LIKE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIKE_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIKE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LIKE):
    case SUCCESS(ACTION_TYPES.UPDATE_LIKE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LIKE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/likes';

// Actions

export const getEntities: ICrudGetAllAction<ILike> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_LIKE_LIST,
    payload: axios.get<ILike>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ILike> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LIKE,
    payload: axios.get<ILike>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILike> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LIKE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<ILike> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LIKE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILike> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LIKE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
