export default function InputTodo($target, onSubmit) {
  this.render = () => {
    $target.innerHTML = `
            <form>
                <input type="text" placeholder="Enter a todo" />
                <button>Submit</button>
            </form>
        `;
  };

  $target.addEventListener("submit", (e) => {
    e.preventDefault();
    const $form = e.target;
    const $input = $form.querySelector("input");
    const $todo = $input.value;

    onSubmit($todo);
    $input.value = "";
  });

  this.render();
}
