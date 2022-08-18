export function useState(initialState) {
  this.state = initialState;
  this.listeners = [];

  this.listen = (fn) => {
    this.listeners.push(fn);
  };

  this.call = () => {
    this.listeners.forEach((fn) => {
      fn && fn();
    });
  };

  this.setState = (newState) => {
    this.state = newState;

    this.call();
  };
  this.getState = () => this.state;
}
