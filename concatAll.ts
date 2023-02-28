import { concat, interval, of } from 'rxjs';
import { map, take, concatAll } from 'rxjs/operators';
import { debug } from './utils';

export function concatAllExample() {
    const outer = of(1000, 5000);
    const combined = outer.pipe(
        map((val) => {
            return interval(val).pipe(take(2));
        }),
        concatAll(),
        debug('concatAllExample')
    );
    combined.subscribe(console.log);
    //After 1 second
    //After 2 seconds
    //After 7 seconds
    //After 12 seconds
}
