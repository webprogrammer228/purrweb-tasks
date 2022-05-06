export const endEditColumn = (e?: React.SyntheticEvent) => {
  e?.currentTarget.previousElementSibling?.classList.remove("active");
  e?.currentTarget.classList.remove("active");
};

export let selectedItem: HTMLElement;
export let nextElem: HTMLInputElement;
export const editElem = (h3: HTMLElement) => {
  if (selectedItem) {
    selectedItem.parentElement?.classList.remove("active");
    selectedItem.classList.remove("active");
    nextElem.classList.remove("active");
  }
  selectedItem = h3;
  nextElem = h3 as HTMLInputElement;

  let focusedInput = nextElem.nextElementSibling as HTMLInputElement;

  selectedItem.classList.add("active");
  nextElem.parentElement?.classList.add("active");

  focusedInput.focus();
};
