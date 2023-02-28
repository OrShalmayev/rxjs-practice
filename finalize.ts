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
    filter,
    startWith,
} from 'rxjs/operators';
import {
    combineLatest,
    EMPTY,
    interval,
    MonoTypeOperatorFunction,
    NEVER,
    Observable,
    of,
    throwError,
} from 'rxjs';
import { afraidFromObs } from './afraid-from-observables';
import { combineAllExample } from './combineAll';
import { expandExample } from './expand';
import { debug } from './utils';
import { concatAllExample } from './concatAll';
import { catchErrorExample } from './catchError';
import { exmpleOfFilterOrderImportance } from './exmaple-with-importance-of-filter-order';
export function finalizeExample() {
    of('test')
        .pipe(
            map(() => {
                throw throwError('failed');
            }),
            tap((res) => {
                console.log('tap', res);
            }),
            catchError((err) => {
                return throwError(err);
            }),
            finalize(() => {
                console.log('finalize');
            })
        )
        .subscribe();
}
