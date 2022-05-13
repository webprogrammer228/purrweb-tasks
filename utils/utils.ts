export let selectedItem: HTMLElement;
export const editElem = (elem: HTMLElement) => {
  if (selectedItem) {
    selectedItem.classList.remove("active");
  }
  selectedItem = elem;
  selectedItem.classList.add("active");
};
