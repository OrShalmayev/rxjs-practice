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
import { exampleOfFilterOrderImportance } from './examaple-with-importance-of-filter-order';
import { finalizeExample } from './finalize';
import { behaviorSubjectExamples } from './behaviorSubject';
import { combineLatestExample } from './combineLatest';

// concatAllExample();
// combineAllExample();
// expandExample();
// catchErrorExample();
// exampleOfFilterOrderImportance();
// finalizeExample();
// behaviorSubjectExamples();
combineLatestExample();
