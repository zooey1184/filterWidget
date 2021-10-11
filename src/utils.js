export const changeListToMap = (list) => {
  const _map = {};
  list?.length &&
    list.forEach((item) => {
      if (item?.value) {
        _map[item.value] = item;
      }
    });
  return _map;
};

// 键值集合转 list集合
export const changeKeys2List = (_map, keys) => {
  const _list = [];
  keys.forEach((item) => {
    item && _list.push(_map[item]);
  });
  return _list;
};

export const changeMap2List = (_map) => {
  const _list = [];
  for (let i in _map) {
    _list.push(_map[i]);
  }
  return _list;
};

// 键值对
export const KEY = "key";
export const VALUE = "value";
