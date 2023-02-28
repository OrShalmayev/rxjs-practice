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
import { finalizeExample } from './finalize';
import { behaviorSubjectExamples } from './behaviorSubject';

export function combineLatestExample() {
    const obs1 = interval(5000).pipe(
        map((i) => {
            console.log(i);
            if (i >= 2) {
                throw new Error('error');
            }
            return i;
        }),
        debug('obs1')
    );
    const obs2 = of('ob2');

    combineLatest([obs1, obs2])
        .pipe(
            catchError((err, caught$) => {
                console.log(err);
                return caught$;
            }),
            finalize(() => {
                console.log('finalize');
            }),
            debug('combineLatestExample')
        )
        .subscribe(console.log);
}
