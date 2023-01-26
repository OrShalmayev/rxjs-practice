// link: https://netbasal.com/whos-afraid-of-observables-bde0dc4f48cc
interface Observer {
  next: Function;
  error: Function;
  complete: Function;
}

export function afraidFromObs() {
  interface Observer {
  next?: Function;
  error?: Function;
  complete?: Function;
}

class Observable {

  constructor(private subscriptionFn: Function) {
    this.subscriptionFn = subscriptionFn;
  }

  subscribe(observer: Observer) {
    return this.subscriptionFn(observer);
  }

  map(projectionFunction) {
    return new Observable(observer => {
      return this.subscribe({
        next(val) { observer.next(projectionFunction(val)) },
        error(e) { observer.error(e) },
        complete() { observer.complete() }
      });
    });
  }

  filter(predicate: (value) => boolean) {
    return new Observable(observer => {
      return this.subscribe({
        next(val) {
          if (predicate(val)) {
            observer.next(val);
          }
        },
        error(e) { observer.error(e) },
        complete() { observer.complete() }
      });
    });
  }

  mergeMap(func: (value) => Observable) {
    return new Observable(observer => {
      return this.subscribe({
        next(outerValue) {
          func(outerValue).subscribe({
            next(innerValue) {
              observer.next(innerValue);
            }
          });
        },
        error(e) { observer.error(e) },
        complete() { observer.complete() }
      });
    });
  }

}


const of = (...values) => {
  return new Observable(observer => {
    values.forEach(v => observer.next(v));
  });
}


const interval = (milliseconds = 0) => {
  return new Observable(observer => {
    let count = 0;

    const id = setInterval(() => {
      observer.next(count++);
    }, milliseconds);

    return {
      unsubscribe() {
        clearInterval(id);
      }
    }
  });
}

// const subscription = interval(1000).map(v => `${v}s`).filter(v => v === '1s').subscribe({
//   next(v) {
//     console.log(v);
//   }
// });

const subscription = interval(1000).mergeMap(v => of(v)).subscribe({
  next(v) {
    console.log(v);
  }
});

setTimeout(() => {
  subscription.unsubscribe();
}, 3000)
}
