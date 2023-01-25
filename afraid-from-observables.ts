// link: https://netbasal.com/whos-afraid-of-observables-bde0dc4f48cc
interface Observer {
  next: Function;
  error: Function;
  complete: Function;
}

export function afraidFromObs() {
  class Observable {
    constructor(private subscriptionFn: Function) {
      this.subscriptionFn = subscriptionFn;
    }

    /**
     * The subscribe() method takes an observer and calls the subscription function with it. Note that each call to subscribe() invokes the subscription function again.
     */
    subscribe(observer: Observer) {
      return this.subscriptionFn(observer);
    }

    map(projectionFunction) {
      return new Observable((observer) => {
        return this.subscribe({
          next(val) {
            observer.next(projectionFunction(val));
          },
          error(e) {
            observer.error(e);
          },
          complete() {
            observer.complete();
          },
        });
      });
    } //map
  } //Observable

  const interval = (milliseconds = 0) => {
    return new Observable((observer: Observer) => {
      let count = 0;

      const id = setInterval(() => {
        observer.next(count++);
      }, milliseconds);

      return {
        unsubscribe() {
          observer.complete();
          clearInterval(id);
        },
      };
    });
  };
  const source$ = interval(1000);
  const observer: Observer = {
    next(val) {
      console.log(val);
    },
    error(e) {
      console.error(e);
    },
    complete() {
      console.info('Complete!');
    },
  };

  const subscriptions: any[] = [];
  /**
   * When we subscribe to the interval observable we are invoking the subscription function, that executes the native JS setInterval() function and notifies the observer each time it’s invoked.
   */
  // subscriptions.push(source$.subscribe(observer));

  /**
   * When the source emits a new value, the value first gets to the map() subscription function. Then, after applying the projection function on the value, the map() observable emits the value to the final subscription.
   */
  subscriptions.push(source$.map((x) => x * 2).subscribe(observer));
  setTimeout(() => {
    subscriptions.forEach((subscription) => subscription.unsubscribe());
  }, 5000);
}
