import { React, render } from "./react";
import { App } from "./app";

document.addEventListener("DOMContentLoaded", () => {
  render(<App />, document.getElementById("myapp") as HTMLElement);
});
