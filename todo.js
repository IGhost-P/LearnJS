export default function Todo($target, $initialState) {
  this.state = $initialState;

  this.render = (state) => {
    const { userName, todo } = state.getState();
    $target.innerHTML = `
            <div>
                <h1>${userName}</h1>
                <h2>${todo}</h2>
            </div>
        `;
  };

  this.render(this.state);
}
