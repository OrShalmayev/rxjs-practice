import { take, map, combineAll, tap, expand, delay } from 'rxjs/operators';
import { EMPTY, interval, MonoTypeOperatorFunction, of } from 'rxjs';
import { afraidFromObs } from './afraid-from-observables';
import { combineAllExample } from './combineAll';
import { expandExample } from './expand';
import { debug } from './utils';
afraidFromObs();
// combineAllExample();
// expandExample();
