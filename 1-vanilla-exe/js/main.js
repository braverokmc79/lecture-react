import Controller from "./Controller.js";
import Store from "./store.js";
import storage from "./storage.js";
import SearchFormView from "./views/SearchFormView.js";

document.addEventListener("DOMContentLoaded", main);

function main() {
  const store = new Store(storage);

  const views = {
    // TODO
    searchFormView: new SearchFormView(),
  };

  console.log(" main :");
  new Controller(store, views);
}
