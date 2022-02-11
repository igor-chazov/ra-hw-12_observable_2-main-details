import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FETCH_SERVICES_REQUEST, GET_SERVICE_REQUEST } from '../actions/actionTypes';
import { fetchServicesSuccess, fetchServicesFailure, getServiceSuccess, getServiceFailure } from '../actions/actionCreators';
import links from '../Utility/links';

export const fetchServicesEpic = (action$) =>
  action$.pipe(
    ofType(FETCH_SERVICES_REQUEST),
    mergeMap(() =>
      ajax.getJSON(links.services).pipe(
        map((response) => fetchServicesSuccess(response)),
        catchError((e) => of(fetchServicesFailure(e.message)))
      )
    )
  );

export const getServiceEpic = (action$) =>
  action$.pipe(
    ofType(GET_SERVICE_REQUEST),
    mergeMap((action) =>
      ajax
        .getJSON(`${links.services}/${action.payload.id}`)
        .pipe(
          map((response) => getServiceSuccess(response)),
          catchError((e) => of(getServiceFailure(e.message)))
        )
    )
  );
