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

import { IRelationships, defaultValue } from 'app/shared/model/relationships.model';

export const ACTION_TYPES = {
  FETCH_RELATIONSHIPS_LIST: 'relationships/FETCH_RELATIONSHIPS_LIST',
  FETCH_RELATIONSHIPS: 'relationships/FETCH_RELATIONSHIPS',
  CREATE_RELATIONSHIPS: 'relationships/CREATE_RELATIONSHIPS',
  UPDATE_RELATIONSHIPS: 'relationships/UPDATE_RELATIONSHIPS',
  DELETE_RELATIONSHIPS: 'relationships/DELETE_RELATIONSHIPS',
  RESET: 'relationships/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRelationships>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type RelationshipsState = Readonly<typeof initialState>;

// Reducer

export default (state: RelationshipsState = initialState, action): RelationshipsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RELATIONSHIPS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RELATIONSHIPS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RELATIONSHIPS):
    case REQUEST(ACTION_TYPES.UPDATE_RELATIONSHIPS):
    case REQUEST(ACTION_TYPES.DELETE_RELATIONSHIPS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RELATIONSHIPS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RELATIONSHIPS):
    case FAILURE(ACTION_TYPES.CREATE_RELATIONSHIPS):
    case FAILURE(ACTION_TYPES.UPDATE_RELATIONSHIPS):
    case FAILURE(ACTION_TYPES.DELETE_RELATIONSHIPS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RELATIONSHIPS_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_RELATIONSHIPS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RELATIONSHIPS):
    case SUCCESS(ACTION_TYPES.UPDATE_RELATIONSHIPS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RELATIONSHIPS):
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

const apiUrl = 'api/relationships';

// Actions

export const getEntities: ICrudGetAllAction<IRelationships> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RELATIONSHIPS_LIST,
    payload: axios.get<IRelationships>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IRelationships> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RELATIONSHIPS,
    payload: axios.get<IRelationships>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRelationships> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RELATIONSHIPS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IRelationships> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RELATIONSHIPS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRelationships> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RELATIONSHIPS,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
