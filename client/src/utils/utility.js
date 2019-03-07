const cleanse = json => {
    let keys = Object.keys(json),
      cleanKey,
      cleanJson = {};

    keys.forEach(key => {
      cleanKey = key.toLowerCase();
      cleanKey = cleanKey.replace(' ', '');

      cleanJson[cleanKey] = json[key];
    });

    return cleanJson;
  };

export {
  cleanse
};
