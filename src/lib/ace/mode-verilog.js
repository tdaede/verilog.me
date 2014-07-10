ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var DocCommentHighlightRules = function() {

    this.$rules = {
        "start" : [ {
            token : "comment.doc.tag",
            regex : "@[\\w\\d_]+" // TODO: fix email addresses
        }, {
            token : "comment.doc.tag",
            regex : "\\bTODO\\b"
        }, {
            defaultToken : "comment.doc"
        }]
    };
};

oop.inherits(DocCommentHighlightRules, TextHighlightRules);

DocCommentHighlightRules.getStartRule = function(start) {
    return {
        token : "comment.doc", // doc comment
        regex : "\\/\\*(?=\\*)",
        next  : start
    };
};

DocCommentHighlightRules.getEndRule = function (start) {
    return {
        token : "comment.doc", // closing comment
        regex : "\\*\\/",
        next  : start
    };
};


exports.DocCommentHighlightRules = DocCommentHighlightRules;

});

ace.define("ace/mode/verilog_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var VerilogHighlightRules = function() {
    var keywords = "always|and|assign|automatic|begin|buf|bufif0|bufif1|case|casex|casez|cell|cmos|config|" +
        "deassign|default|defparam|design|disable|edge|else|end|endcase|endconfig|endfunction|endgenerate|endmodule|" +
        "endprimitive|endspecify|endtable|endtask|event|for|force|forever|fork|function|generate|genvar|highz0|" +
        "highz1|if|ifnone|incdir|include|initial|inout|input|instance|integer|join|large|liblist|library|localparam|" +
        "macromodule|medium|module|nand|negedge|nmos|nor|noshowcancelled|not|notif0|notif1|or|output|parameter|pmos|" +
        "posedge|primitive|pull0|pull1|pulldown|pullup|pulsestyle_onevent|pulsestyle_ondetect|rcmos|real|realtime|" +
        "reg|release|repeat|rnmos|rpmos|rtran|rtranif0|rtranif1|scalared|showcancelled|signed|small|specify|specparam|" +
        "strong0|strong1|supply0|supply1|table|task|time|tran|tranif0|tranif1|tri|tri0|tri1|triand|trior|trireg|" +
        "unsigned|use|vectored|wait|wand|weak0|weak1|while|wire|wor|xnor|xor" +
        "begin|bufif0|bufif1|case|casex|casez|config|else|end|endcase|endconfig|endfunction|" +
        "endgenerate|endmodule|endprimitive|endspecify|endtable|endtask|for|forever|function|generate|if|ifnone|" +
        "macromodule|module|primitive|repeat|specify|table|task|while";

    var types = "wire|supply0|supply1|tri|triand|trior|tri0|tri1|wand|wor|strong0|strong1|pull0|pull1|weak0|weak1|" +
        "highz0|highz1|small|medium|large|signed|vectored|scalared|integer|real|realtime|reg|time";

    var builtinConstants = (
        "true|false|null"
    );

    var builtinFunctions = (
        "count|min|max|avg|sum|rank|now|coalesce|main"
    );

    var keywordMapper = this.createKeywordMapper({
        "support.function": builtinFunctions,
        "keyword": keywords,
        "type": types,
        "constant.language": builtinConstants
    }, "identifier", true);

    this.$rules = {
        "start" : [ {
            token : "comment",          // Single-line comment
            regex : "//.*$"
        },
        DocCommentHighlightRules.getStartRule("doc-start"),
        {
            token : "comment", // multi line comment
            regex : "\\/\\*",
            next : "comment"
        }, {
            token : "string",           // " string
            regex : '".*?"'
        }, {
            token : "string",           // ' string
            regex : "'.*?'"
        }, {
            token : "constant.numeric", // Highlight numbers with digits 0 through 9 and optional type/width prefixes
            regex : /\b(([0-9]+)?'[dDhHoObB])?([0-9]|_)+\b/
        }, {
            token : "constant.numeric", // Allow hex numbers when preceded by 'h or 'H
            regex : /\b(([0-9]+)?'[hH])([0-9A-Fa-f]|_)+\b/
        }, {
            token : "always",
            regex : /always( ?)*@( ?)*(?=\()/
        }, {
            token : "block",
            regex : /module|begin|endmodule|end/
        }, {
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "keyword.operator",
            regex : "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
        }, {
            token : "paren.lparen",
            regex : "[\\(]"
        }, {
            token : "paren.rparen",
            regex : "[\\)]"
        }, {
            token : "text",
            regex : "\\s+"
        } ],
        "comment" : [
            {
                token : "comment", // closing comment
                regex : ".*?\\*\\/",
                next : "start"
            }, {
                token : "comment", // comment spanning whole line
                regex : ".+"
            }
        ]

    };
};

oop.inherits(VerilogHighlightRules, TextHighlightRules);

exports.VerilogHighlightRules = VerilogHighlightRules;
});

ace.define("ace/mode/verilog",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/verilog_highlight_rules","ace/range"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var VerilogHighlightRules = require("./verilog_highlight_rules").VerilogHighlightRules;
var Range = require("../range").Range;

var Mode = function() {
    this.HighlightRules = VerilogHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};

    this.$id = "ace/mode/verilog";
}).call(Mode.prototype);

exports.Mode = Mode;

});
