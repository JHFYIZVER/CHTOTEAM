import { makeAutoObservable } from "mobx";

class ModalStore {
  isOpen: boolean = false;

  constructor() {
    this.setIsOpen = this.setIsOpen.bind(this);
    makeAutoObservable(this);
  }

  setIsOpen(isOpen: boolean) {
    this.isOpen = isOpen;
  }
}

export default ModalStore;
