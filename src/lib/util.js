//工具类库，首字母大写，表明定义在全局变量中

//根据指定键获取相应 cookie
function GetCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  }
  return null;
}

//设置页面标题，适用于微信浏览器，微信web调试工具不会做出响应，微信浏览器正常
function SetTitle(t) {
  document.title = t;
  var i = document.createElement('iframe');
  // i.src = '/favicon.ico';
  i.style.display = 'none';
  i.onload = function () {
    setTimeout(function () {
      i.remove();
    }, 0)
  }
  document.body.appendChild(i);
}

//按字母分组排序
// 使用方式：
// let zhongwei = ["的地方","fdfd","阿斯蒂芬","贝多芬","爱的发的","吃顿饭","a地方","白癜风",]
// let groups = PyGroupSort(function(next, store) {
//   zhongwei.forEach((i) => {
//     if (next(i)) store(i)
//   })
// });
// console.log(groups);
function PyGroupSort(clip) {
  var en = "abcdefghjklmnopqrstwxyz".split('');
  var zh = "阿八嚓哒妸发旮哈夹咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
  var groups = {}
  en.forEach(function (e, i) {
    clip(function (text) {
      var zhCompare1 = text.localeCompare(zh[i]) == -1;
      var zhCompare2 = zh[i - 1] && (!zh[i - 1] || zh[i - 1].localeCompare(text) <= 0);
      var enCompare1 = text.localeCompare(en[i]) == -1;
      var enCompare2 = en[i - 1] && (!en[i - 1] || en[i - 1].localeCompare(text) <= 0);
      return (zhCompare1 && zhCompare2) || (enCompare1 && enCompare2);
    }, function (val) {
      var key = en[i - 1] || "a";
      if (val && groups[key]) {
        groups[key].push(val)
      } else {
        groups[key] = [val]
      }
    });
  })
  return groups;
}

// function Debounce(action, idle){
//   var last;
//   return function(){
//     var ctx = this, args = arguments
//     clearTimeout(last)
//     last = setTimeout(function(){
//       action.apply(ctx, args)
//     }, idle)
//   }
// }

function DateFmt(date, fmt, fc) { //fc 进行加减操作，类似 M+1
  if (!date) return "";
  if (!fmt) fmt = "yyyy-MM-dd";
  if (toString.call(date) != "[object Date]") {
    if (toString.call(date) == "[object String]") {
      var arr = date.split(/[- :]/),
        date = new Date(arr[0] || "", (arr[1] - 1) || "", arr[2] || "", arr[3] || "", arr[4] || "", arr[5] || "");
      if (date == "Invalid Date") {
        return date;
      }
    } else {
      return date;
    }
  }
  //进行日期计算
  if (fc) {
    var dateNums = ["y", "M", "d", "h", "m", "s"];
    var dateGets = ["getFullYear", "getMonth", "getDate", "getHours", "getMinutes", "getSeconds"];
    var dateSets = ["setFullYear", "setMonth", "setDate", "setHours", "setMinutes", "setSeconds"];
    dateNums.forEach(function (v, i) {
      var tfc = fc.match(new RegExp(v + "[-+]+[0-9]*"))
      if (!tfc) return;
      tfc = tfc[0];
      var n = tfc.slice(tfc.indexOf(v) + 1, tfc.length);
      if (Number(n)) {
        date[dateSets[i]](date[dateGets[i]]() + Number(n));
      }
    })
  }
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "S": date.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function NumFmt(value, semi, spl) {
  if (typeof value != "number" || isNaN(Number(value))) {
    return value;
  }
  if (!spl && spl !== "") {
    spl = ","
  }
  var n = semi >= 0 && semi <= 20 ? semi : 0;
  var s = parseInt(value, 10) + '';
  if (n > 0) {
    s = parseFloat((value + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
  }
  var l = s.split('.')[0].split('').reverse();
  var r = n > 0 ? '.' + s.split('.')[1] : '';
  var t = '';
  for (var i = 0; i < l.length; i++) {
    if (i == 2 && l[3] == '-') { t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? '' : ''); continue; }
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? spl : '');
  }
  return t.split('').reverse().join('') + r;
}

function HtmlEncode(str) {
  return str.replace(/<\s*script\s*>?|javascript\:|alert/g, "@#$%!*&");
}

function Params(obj) {
  var params = [], escape = encodeURIComponent;
  params.add = function (key, value) {
    if (isFunction(value)) {
      value = value();
    }
    if (value === null) {
      value = '';
    }
    this.push(escape(key) + '=' + escape(value));
  };
  serialize(params, obj);
  return params.join('&').replace(/%20/g, '+');
};
function serialize(params, obj, scope) {
  var array = isArray(obj), plain = isPlainObject(obj), hash;
  each(obj, function (value, key) {
    hash = isObject(value) || isArray(value);
    if (scope) {
      key = scope + '[' + (plain || hash ? key : '') + ']';
    }
    if (!scope && array) {
      params.add(value.name, value.value);
    } else if (hash) {
      serialize(params, value, key);
    } else {
      params.add(key, value);
    }
  });
}
var isArray = Array.isArray;
Params.isArray = Array.isArray;
function isFunction(val) {
  return typeof val === 'function';
}
Params.isFunction = isFunction;

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
Params.isObject = isObject;

function isPlainObject(obj) {
  return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}
Params.isPlainObject = isPlainObject;

function isBlob(obj) {
  return typeof Blob !== 'undefined' && obj instanceof Blob;
}
Params.isBlob = isBlob;

function isFormData(obj) {
  return typeof FormData !== 'undefined' && obj instanceof FormData;
}
Params.isFormData = isFormData;

function each(obj, iterator) {
  var i, key;
  if (isArray(obj)) {
    for (i = 0; i < obj.length; i++) {
      iterator.call(obj[i], obj[i], i);
    }
  } else if (isObject(obj)) {
    for (key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        iterator.call(obj[key], obj[key], key);
      }
    }
  }
  return obj;
}

// 判断是否是微信浏览器
function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

function checkOS() {
  var ua = (navigator.userAgent || navigator.vendor || window.opera);
  if (ua != null) {
    var uaName = ua.toLowerCase();
    if (/android/i.test(uaName) || /ip(hone|od|ad)/i.test(uaName)
      || /symbian/i.test(uaName) || /windows (ce|phone)/i.test(uaName) || /mobile/i.test(uaName)) {
      return true;
    }
  }
  return true;
}

//汉字转拼音
function toPinyin(val) {
  var value = val;
  var chars = value.split(''),
    length = chars.length
  if (length) {
    for (var i = 0; i < length; i++) {
      var char = chars[i]
      chars[i] = handle(char)
    }
    value = chars.join('');
    return value;
  }
  function handle(char) {
    var charPoint = char.charCodeAt(0)
    for (var p in chinesePointCode) {
      if (chinesePointCode[p].indexOf(charPoint) > -1) {
        char = p + ' '
      }
    }
    return char.toUpperCase();
  }
  el.textContent = value
}