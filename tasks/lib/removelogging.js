exports.init = function(grunt) {
  "use strict";

  var _ = grunt.util._;

  return function(src, opts) {
    var counter = 0;
    var rConsole;

    // Use console as the default namespace
    if(!("namespace" in opts)) {
      opts.namespace = "console";
    }

    // Default methods
    if(!("methods" in opts) || !_.isArray(opts.methods)) {
      opts.methods = "log info warn error assert count clear group groupEnd groupCollapsed trace debug dir dirxml profile profileEnd time timeEnd timeStamp table exception".split(" ");
    }


    rConsole = new RegExp(opts.namespace + "\\.(?:" + opts.methods.join("|") + ")" + "\\(.*\\)(?:;)?((?:\\s+)?\/\\*(?:\\s+)?RemoveLogging:skip(?:\\s+)?\\*\/)?", "gi");
  

    src = src.replace(rConsole, function(value, skip) {
    /*If skip is not an empty string or undefined the reemovelogging:skip have been matched and we will ignore it*/
    if(typeof skip !== "undefined" && skip !== "") {return value;}
    counter++;      
    return opts.replaceWith || "";
    });

    return {
        src: src,
        count: counter
    };
  };
};
