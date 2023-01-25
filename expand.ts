import { of, EMPTY } from 'rxjs';
import { expand, delay } from 'rxjs/operators';
import { debug } from './utils';

export function expandExample() {
  /**
   * Expand
   */
  of(1)
    .pipe(
      expand((x) => {
        console.log(x);
        return x > 10
          ? EMPTY
          : of(2 * x).pipe(delay(1000), debug('inner expand'));
      }),
      debug('expand')
    )
    .subscribe(console.log);
}
