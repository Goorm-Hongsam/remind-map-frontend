import { atom } from 'recoil';

const groupsState = atom({
  key: 'groupsState',
  default: [],
});
const groupState = atom({
  key: 'groupState',
  default: {},
});
const seletGroupIndexState = atom({
  key: 'seletGroupsIndexState',
  default: 0,
});
export const seletGroupIdState = atom({
  key: 'seletGroupIdState',
  default: 0,
});
export const groupMarkersState = atom({
  key: 'groupMarkersState',
  default: [],
});
export const groupRoutesState = atom({
  key: 'groupRoutesState',
  default: [],
});

export { groupState, groupsState, seletGroupIndexState };
