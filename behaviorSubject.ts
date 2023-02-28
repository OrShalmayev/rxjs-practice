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
  // !WARNING behavior subject value is modified in mutation
  const bs$ = new BehaviorSubject([1, 2, 3]);
  bs$.subscribe(console.log);
  bs$.value.shift();
  console.log(bs$.value);
}
