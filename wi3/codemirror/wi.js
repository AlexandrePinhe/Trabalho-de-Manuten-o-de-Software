
var cmEditor;

function htmlCodeMirror(id, focus) {
	cmEditor = CodeMirror.fromTextArea(id, {
		parserfile : [ 
				"parsexml.js", 
				"parsecss.js",
				"tokenizejavascript.js", 
				"parsejavascript.js",
				"parsehtmlmixed.js" ],
		stylesheet : [ 
				"codemirror/css/xmlcolors.css",
				"codemirror/css/jscolors.css",
				"codemirror/css/csscolors.css" ],
		path : "codemirror/js/",
		initCallback : callbackCodeMirror(this, focus),
		width : widthCodeMirror(id),
		passDelay : 500,
		lineNumbers : true,
		textWrapping : false
	});
	return cmEditor;
}

function sqlCodeMirror(id, focus) {
	cmEditor = CodeMirror.fromTextArea(id, {
	    parserfile: "parsesql.js",
	    stylesheet: "codemirror/css/sqlcolors.css",
		path : "codemirror/js/",
		initCallback : callbackCodeMirror(this, focus),
		width : widthCodeMirror(id),
		passDelay : 500,
		lineNumbers : true,
		textWrapping : false,
		tabMode : "shift"
	});
	return cmEditor;
}

// Apenas para uso interno
function callbackCodeMirror(editor, focus) {
	if (focus) setTimeout('focusCodeMirror()',500);
}

// Apenas para uso interno
function focusCodeMirror() {
	if (readyCodeMirror()) {
		cmEditor.focus();
	} else {
		setTimeout('focusCodeMirror()',500);
	}	
}

// Apenas para uso interno
function widthCodeMirror(id) {
	var bt = browserType();
	var width = "100%";
	if (bt != "IE") width = "";
	return width;
}

function readyCodeMirror(editor) {
	if (!editor) editor = cmEditor;
	if (editor) {
		return editor.editor;
	} else {
		return false;
	}	
}

function clearCodeMirror(id, editor) {
	if (!editor) editor = cmEditor;
	if (editor) {
		editor.setCode($(id).value);
	}	
}

