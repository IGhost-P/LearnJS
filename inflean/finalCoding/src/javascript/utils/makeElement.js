export const makeElement = (tag, attributes, text) => {
  const element = document.createElement(tag);
  if (attributes) {
    Object.keys(attributes).forEach((key) => {
      element.setAttribute(key, attributes[key]);
    });
  }
  if (text) {
    element.textContent = text;
  }
  return element;
};
