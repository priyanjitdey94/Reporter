const CRYPTOPHRASE = 'jirareporter',
  AUTHCOOKIEKEY = 'ajr',
  DEFAULT_SESSION_TIMEOUT = 24 * 60 * 60 * 1000,
  cleanse = json => {
    let keys = Object.keys(json),
      cleanKey,
      cleanJson = {};

    keys.forEach(key => {
      cleanKey = key.toLowerCase();
      cleanKey = cleanKey.replace(' ', '');

      cleanJson[cleanKey] = json[key];
    });

    return cleanJson;
  },
  getCookie = (cookieKey) => {
    var name = cookieKey + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
  writeCookie = (cookieKey, name, pass, timeout = DEFAULT_SESSION_TIMEOUT) => {
    let date,
      expires = '';

    if (timeout) {
      date = new Date();
      date.setTime(date.getTime() + timeout);
      expires = '; expires=' + date.toGMTString();
    }
    document.cookie = cookieKey + '=' + JSON.stringify({name: name, pass: pass}) + expires + '; path=/';
  };

export {
  cleanse,
  getCookie,
  writeCookie,
  CRYPTOPHRASE,
  AUTHCOOKIEKEY
};
