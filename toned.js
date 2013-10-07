/* toned.js */
// A mini-library I use for some short, useful functions
// Pass in true to give all the functions to window

function TonedJS(give_window) {
  var toned = {
    /* Object Shenanigans */
    
    // Blindly hand all members of the donor variable to the recipient
    // Ex: give(toned, window);
    giveSup: function(donor, recipient) {
      for(var i in this)
        recipient[i] = this[i];
    },
    // Like giveSup(erior), but it doesn't give override pre-existing members
    giveSub: function(donor, recipient) {
      for(var i in this)
        if(!recipient[i])
          recipient[i] = this[i];
    },
    
    // Proliferates all members of settings to the element 'intelligently'
    proliferate: function(elem, settings) {
      var proliferate = this.proliferate, setting, i;
      for(i in settings)
        if(typeof(setting = settings[i]) == "object") {
          if(!elem[i]) elem[i] = {};
          proliferate(elem[i], setting);
        } else elem[i] = setting;
      return elem;
    },
    
    // Blindly grabs the first key or value of the object, depending on grabkey
    getFirst: function(obj, grabkey) {
      for(var i in obj) return grabkey ? i : obj[i];
    },
    
    // Follows a path inside an object recursively
    // Path is ["path", "to", "target"], where num is how far along the path it is
    // Num must be given at start, for performance reasons
    followPath: function(obj, path, num) {
      if(path[num] != null && obj[path[num]] != null)
        return followPath(obj[path[num]], path, ++num);
      return obj;
    },
    
    
    /* HTML Element Manipulations */
    
    // Creates an element, and uses proliferate on all the other arguments
    // * createElement()    // (just returns a new div)
    // * createElement("div", {width: "350px", style: {class: "Toned"}});
    createElement: function(type) {
      var elem = document.createElement(type || "div"),
          i = arguments.length,
          proliferate = this.proliferate;
      while(--i > 0) // because negative
        proliferate(elem, arguments[i]);
      return elem;
    },
    
    // Simple expressions to add/remove classes
    classAdd: function(me, strin) { me.className += " " + strin; },
    classRemove: function(me, strout) { me.className = me.className.replace(new RegExp(" " + strout, "gm"), ""); },
    
    // Position changing
    elementSetPosition: function(me, left, top) {
      if(left == undefined) left = me.left;
      if(top == undefined) top = me.top;
      proliferate(me, {
        left: left,
        top: top,
        style: {
          marginLeft: left + "px",
          marginTop: top + "px"
        }
      });
    },
    elementShiftLeft: function(me, left) {
      if(!me.left) me.left = Number(me.style.marginLeft.replace("px", ""));
      me.style.marginLeft = round(me.left += left) + "px";
    },
    elementShiftTop: function(me, top) {
      if(!me.top) me.top = Number(me.style.marginLeft.replace("px", ""));
      me.style.marginTop = round(me.top += top) + "px";
    },
    
    // Clears all timer events from setTimeout and setInterval
    clearAllTimeouts: function() {
      var id = setTimeout(function() {});
      while(id--) clearTimeout(id);
    },
    
    // String manipulations
    stringOf: function(me, n) {
      return (n == 0) ? '' : new Array(1 + (n || 1)).join(me);
    },
    // Checks if a haystack contains a needle
    stringHas: function(haystack, needle) {
      return haystack.indexOf(needle) != -1;
    },
    // Case insensitive version of stringHas
    stringHasI: function(haystack, needle) {
      return haystack.toLowerCase().indexOf(needle.toLowerCase()) != -1;
    },
    
    // Array manipulations
    arrayOf: function(me, n) {
      n = n || 1;
      var arr = new Array(n);
      while(n--) arr[n] = me;
      return arr;
    },
    
    // Number manipulations
    makeDigit: function(num, size) {
      return this.stringOf('0', max(0, size - String(num).length)) + num;
    },
    roundDigit: function(n, d) { return d ? ~~(0.5 + (n / d)) * d : n; },
    // It's often faster to store references to common Math functions
    round: function(n) { return ~~(0.5 + n); },
    sign: function(n) { return n ? n < 0 ? -1 : 1 : 0; },
    max: Math.max,
    min: Math.min,
    abs: Math.abs,
    floor: Math.floor,
    pow: Math.pow,
    ceil: Math.ceil,
    random: Math.random,
    
    // Timing
    now: Date.now
  };
  
  if(give_window) toned.giveSub(toned, window);
  
  return toned;
}
