import { App } from "./app";

export const React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === "function") {
      return tag(props, ...children);
    }
    const el = { tag, props, children };
    // console.log("EL: ", el);
    return el;
  },
};

const appState = [];
let appStateCursor = 0;

export const useState = (initialState) => {
  const stateCursor = appStateCursor;
  appState[stateCursor] = appState[appStateCursor] || initialState;
  console.log(
    `useState is initialized at cursor ${stateCursor} with value:`,
    appState
  );
  const setState = (newState) => {
    console.log(
      `setState is called at cursor ${stateCursor} with newState value:`,
      newState
    );
    appState[stateCursor] = newState;
    reRender();
  };
  appStateCursor++;
  console.log(`stateDump`, appState);
  return [appState[stateCursor], setState];
};

export const render = (el, container) => {
  // 0. Check the type of el if string, then we need to handle it like text node
  let domEl;

  if (typeof el == "string") {
    domEl = document.createTextNode(el);
    container.appendChild(domEl);
    return;
  }
  // 1. First create the document node corresponding el
  domEl = document.createElement(el.tag);
  // 2. Set the Props on domEl
  let elProps = el.props ? Object.keys(el.props) : null;
  if (elProps && elProps.length > 0) {
    elProps.forEach((prop) => (domEl[prop] = el.props[prop]));
  }
  // 3. Handle Creating the Children
  if (el.children && el.children.length > 0) {
    // When child is rendered, the container will be the domEl we created here.
    el.children.forEach((node) => render(node, domEl));
  }
  // 4. append the DOM node to the container.
  container.appendChild(domEl);
};

export const reRender = () => {
  console.log("Re-Rendering");
  const rootNode = document.getElementById("myapp");
  rootNode.innerHTML = "";
  appStateCursor = 0;

  render(<App />, document.getElementById("myapp"));
};
