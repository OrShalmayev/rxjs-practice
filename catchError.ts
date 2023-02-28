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
