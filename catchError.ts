import {
  take,
  map,
  combineAll,
  tap,
  expand,
  delay,
  switchMap,
  catchError,
  finalize,
} from 'rxjs/operators';
import {
  EMPTY,
  interval,
  MonoTypeOperatorFunction,
  of,
  Subject,
  throwError,
} from 'rxjs';
import { debug } from './utils';

export function catchErrorExample() {
  of('')
    .pipe(
      switchMap(() => throwError('er!')),
      tap(() => {
        console.log('tap');
      }),
      catchError((err) => {
        console.log(err);
        return EMPTY.pipe(debug('EMPTY'));
      }),
      finalize(() => console.log('finalize'))
    )
    .subscribe();
}
//catch error inside effect pipe behavior
const effect$ = new Subject();

effect$
  .pipe(
    switchMap((value) => {
      if (value > 3) {
        return throwError('test').pipe(
          catchError(() => {
            return of('catched error');
          })
        );
      }
      return of(value);
    }),
    debug('testing effect')
  )
  .subscribe();

effect$.next(1);
effect$.next(2);
effect$.next(4);
effect$.next(1);

//catch error outside effect pipe behavior
const effect2$ = new Subject();

effect2$
  .pipe(
    switchMap((value) => {
      if (value > 3) {
        return throwError('test');
      }
      return of(value);
    }),
    debug('testing effect'),
    catchError(() => {
      return of('catched error');
    })
  )
  .subscribe();

effect2$.next(1);
effect2$.next(2);
effect2$.next(4);
effect2$.next(1);
