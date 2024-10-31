import { makeAutoObservable } from "mobx";

type AsideStoreType = {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
};

class AsideStore implements AsideStoreType {
  isOpen: boolean;
  constructor() {
    this.isOpen = false;
    makeAutoObservable(this);
  }

  setIsOpen = (bool: boolean) => {
    this.isOpen = bool;
  };
}

export default AsideStore;
