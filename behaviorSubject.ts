import { BehaviorSubject } from 'rxjs';
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
export function behaviorSubjectExamples() {
    const bs$ = new BehaviorSubject([1, 2, 3]);
    bs$.subscribe(console.log);
    bs$.value.unshift();
}
