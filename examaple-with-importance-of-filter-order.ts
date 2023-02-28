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

export function exampleOfFilterOrderImportance() {
    const currentAccount$ = NEVER.pipe(startWith({ name: 'test' }));
    const allUserAccounts$ = NEVER.pipe(startWith(null));
    const account$ = combineLatest([currentAccount$, allUserAccounts$]).pipe(
        take(1),
        filter(([, allAccounts]) => Boolean(allAccounts) === true),
        map(([currentAccount, allAccounts]) => {
            const accountName: string = allAccounts.find(
                (account) => account.id === currentAccount?.id
            )?.name;

            return {
                ...currentAccount,
                name: accountName,
            };
        }),
        debug('account')
    );

    account$.subscribe();
}
