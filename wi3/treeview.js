/*
 * WebIntegrator - Ferramenta de produtividade Java
 * Copyright (c) 2001-2008 Itx Tecnologia da Informação Ltda.
 *
 * Este programa é software livre; você pode redistribuí-lo e/ou modificá-lo 
 * sob os termos da GNU GENERAL PUBLIC LICENSE (GPL) conforme publicada pela 
 * Free Software Foundation; versão 2 da Licença.
 * Este programa é distribuído na expectativa de que seja útil, porém, SEM 
 * NENHUMA GARANTIA; nem mesmo a garantia implícita de COMERCIABILIDADE OU 
 * ADEQUAÇÃO A UMA FINALIDADE ESPECÍFICA.
 * 
 * Consulte a GNU GPL para mais detalhes.
 * Você deve ter recebido uma cópia da GNU GPL junto com este programa; se não, 
 * veja em http://www.gnu.org/licenses/ 
 */

function myError(msg, url, line) { return true; } // error 'handler'
//window.onerror = myError; 
loaded = false; xImgs = new Array(10);

/* This is TreeView, Copyright (c) Simon Harston <jSh@jSh.de>
 * It may be used as freeware, but please give credit. Please
 * also tell me an URL where I can look at what you made with
 * it. Get the documentation at <http://www.jsh.de/treeview/>
 */

/* ############################################################ *
 * Note: You won't need to change anything below here, I think. */

var divs = false;
if (document.getElementsByTagName)
   divs = document.getElementsByTagName("DIV"); 
 
function TVversion() { /* print version info */
 return "TreeView v.3.3 BETA (2001-04-01) [http://www.jSh.de/treeview/]"; }

/* read params, split key and viewKey etc. */
function initTreeView () { if (self.TVinitd) return;
 if (self.checkFrames && (""+window.innerWidth != "0")) { // not printing
  tmpTopName = top.name; cutPos = UniqueID.length;
  if (tmpTopName.length > cutPos)
   tmpTopName = tmpTopName.substring(0, cutPos);
  if ((tmpTopName == UniqueID && top.frames.length == 0)
   || (tmpTopName != UniqueID)) // check we're feeling at home ...
   if (confirm(navExplain)) { if (window.stop) window.stop();
    if (document.images) top.location.replace(FrameSet);
    else top.location.href = FrameSet; }}
 isOpera = (myIndexOf(navigator.userAgent, "Opera") > -1);
 if ((navigator.appName == "Netscape")
  && (navigator.appVersion.charAt(0) == "2")) // Doesn't know
  CurrPageFG = "#339933\"><B><CurrPage=\"YES"; // TD with BGCOLOR
 isDHTML = (document.getElementById || document.layers || divs);
 if ((navigator.appName == "Netscape") // Mac display refresh
  && (navigator.appVersion.charAt(0) == "4") // bug workaround
  && (myIndexOf(navigator.userAgent, "Macintosh") > -1)) isDHTML = false;
 if (document.layers && document.preamble)
  TVtop = document.preamble.clip.bottom;
 else if  (divs && divs["preamble"])
  TVtop = divs["preamble"].offsetHeight; 
 else if (document.getElementById && document.getElementById('preamble'))
  TVtop = document.getElementById('preamble').offsetHeight; 
 else TVtop = 0;
 if (!self.waitText) waitText = "Rendering tree, please wait...";
 currPosY = TVtop; TVentries = new Array(); TVkeys = new Array();
 TVcount = 0; showKey = printBuffer = ""; splitPrm(); TVinitd = true; }

/* split input to prm and viewKey */
function splitPrm() { input = ""; if (top.key) input = ""+ top.key;
 if ((input == "") || (myIndexOf(input, "<object") > -1)) input = InitialKey;
 pos = myIndexOf(input, "+"); if (pos < 0) viewKey = "";
 else { viewKey = input.substring(pos+1); input = input.substring(0, pos); }
 // removida para evitar que abra o decimo elemento (3.1.17)
 //if (input == "") input = ".+."; 
 prm = input; dontVKey = false;
 }

/* set visibility if isDHTML */
function DHTMLTreeView(currKey) { // must return true ...
 if (!isDHTML) return false; // ... only if display handled.
// TVentries[count](status{0=final,1=redraw}, text, key, link, TreePfx,
//  prefix, code, isCurrVisible, currTop); TVkeys[key](showSubs);
 TVkeys[currKey] = newVis = (!TVkeys[currKey]);
 if (self.singleBranch) for (var i = 1; i <= TVcount; i++)
  if (TVkeys[TVentries[i][2]] && (myIndexOf(currKey, TVentries[i][2]) != 0))
   TVkeys[TVentries[i][2]] = TVentries[i][0] = false;
 currPosY = TVtop; TVelemTop = TVelemBtm = 0;
 for (var j = 1; j < viewKey.length; j++) if (!dontVKey) {
  var viewSub = viewKey.substring(0, j);
  for (var i = 1; i <= TVcount; i++) if (!TVkeys[viewSub])
   TVentries[i][0] &= (TVentries[i][2] != viewSub);
  TVkeys[viewSub] = true; }
 if (TVkeys[currKey] != newVis) dontVKey = true;
 TVkeys[currKey] = newVis;
 for (var i = 1; i <= TVcount; i++) {
  var tmpKey = TVentries[i][2]; var isVisible = true;
  for (var j = 1; j < tmpKey.length; j++)
   isVisible &= TVkeys[tmpKey.substring(0, j)];
  if (self.viewMatchCnt && tmpKey != "*") isVisible
   &= (tmpKey.substring(0, viewMatchCnt)
   == viewKey.substring(0, viewMatchCnt));
  if (isVisible) {
   TVentries[i][0] &= ((tmpKey != currKey) && (tmpKey != viewKey));
   if (TVentries[i][8] != currPosY) { TVentries[i][8] = currPosY;
    if (document.layers) document.layers["TV"+i].top = currPosY;
    else if (divs) divs["TV"+i].style.top = currPosY;
    else if (document.getElementById) document.getElementById("TV"+i).style.top = currPosY; }
   if (tmpKey == showKey) TVelemTop = TVelemBtm = currPosY;
   if ((tmpKey.substring(0, showKey.length) == showKey)
    && (currPosY > TVelemBtm)) TVelemBtm = currPosY;
   currPosY += EntryHeight;
   if (!TVentries[i][0]) { treePfx = TVentries[i][4];
    prm = (TVkeys[tmpKey] ? tmpKey : tmpKey.substring(0, tmpKey.length-1));
    var retVal = wrtIdx(TVentries[i][1], tmpKey,
     TVentries[i][3], TVentries[i][5], TVentries[i][6]);
    if (document.getElementById) document.getElementById("TV"+i).innerHTML = retVal;
    else if (divs) 
     divs["TV"+i].innerHTML = retVal; 
    else
     with (document.layers["TV"+i].document) { clear(); write(retVal); close(); }
    TVentries[i][0] = (tmpKey != viewKey); }}
  if (TVentries[i][7] != isVisible) { TVentries[i][7] = isVisible;
   if (document.layers)
    document.layers["TV"+i].visibility = (isVisible ? "show" : "hide");
   else if (divs) divs["TV"+i].style.display = (isVisible ? "block" : "none");
   else if (document.getElementById) document.getElementById("TV"+i).style.display = (isVisible ? "block" : "none");
 }} // scroll new entry into view
 if (TVelemTop > 0) { TVelemBtm += EntryHeight;
  if (document.layers || (divs && !document.getElementById)) { var ScreenTop = window.pageYOffset;
   var ScreenBtm = ScreenTop + window.innerHeight; }
  else { var ScreenTop = document.body.scrollTop;
   var ScreenBtm = ScreenTop + document.body.clientHeight; }
  if ((TVelemBtm > ScreenBtm) || (TVelemTop < ScreenTop)) {
   var scrollTo = ScreenTop + TVelemBtm - ScreenBtm;
   if (TVelemTop < scrollTo) scrollTo = TVelemTop;
   window.scrollTo(0, scrollTo); }
 } return true; }

/* expands an image */
function img (image, hint) { return "<IMG SRC=\""
 + ImgRoot +"ix_"+ image +".gif\" ALT=\""+ hint +"\" BORDER=\"0\""
 +" WIDTH=\""+ ImgWidth +"\" HEIGHT=\""+ ImgHeight +"\">"; }

/* expands a tree-code */
function tree (code) { var ret = "";
 if (myIndexOf(code, "null") > -1) return "";
 for (var i = 0; i < code.length; i++) { var c = code.charAt(i);
  if (c == '.') ret += img("space",""); if (c == '/') ret += img("line","");
  if (c >= '0' && c <= '9') ret += img(xImgs[c],""); if (!self.compactTree) {
   if (c == 'l') ret += img("list",""); if (c == 'L') ret += img("end", "");
   if (c == '+') ret += img("listp",ClosedBookHint);
   if (c == '*') ret += img("endp", ClosedBookHint);
   if (c == '-') ret += img("listm",OpenBookHint);
   if (c == '_') ret += img("endm", OpenBookHint); }
  if (c == 'r') ret += img("open", TreeRootHint);
  if (c == 'R') ret += img("link", TreeRootHint);
  if (c == '#') ret += img("leaf", NormalPageHint);
  if (c == 'x') ret += img("link", LinkedPageHint);
  if (c == 'b') ret += img("book", ClosedBookHint);
  if (c == 'o') ret += img("open", OpenBookHint);
 } return ret; }

/* removes quotes and HTML-Tags in status-text. */
function unquote (text) {
 var pos = myIndexOf(text, "\"");
 while (pos > -1) { text = text.substring(0, pos) +"``"+
  text.substring(pos+1); pos = myIndexOf(text, "\""); }
 var pos = myIndexOf(text, "'");
 while (pos > -1) { text = text.substring(0, pos) +"`"+
  text.substring(pos+1); pos = myIndexOf(text, "'"); }
 var pos = myIndexOf(text, "<"); var pos2 = myIndexOf(text, ">");
 while ((pos > -1) && (pos2 > -1) && (pos < pos2)) {
  text = text.substring(0, pos) + text.substring(pos2+1);
  pos = myIndexOf(text, "<"); pos2 = myIndexOf(text, ">");
 } return text; }

/* expands a link */
function lnk (xHref, onOver, misc, xText) { return "<A H"+"REF=\""
 + xHref +"\" ONMOUSEOVER=\"window.status='"+ onOver +"'; return true\" "
 +"ONMOUSEOUT=\"window.status=''; return true\""+ misc +">"+ xText +"<\/A>"; }

/* writes tree code, marks active doc, adds link and text */
function wrtEntry (tree, key, link, text, asIs) {
 var split = myIndexOf(text, "´"); // split text and status
 if (split < 0) { var statusText = unquote(text); var tipText = ""; }
 else { var statusText = unquote(text.substring(split+1));
  var tipText = " TITLE=\""+ statusText +"\"";
  text = text.substring(0, split); }
  if (! asIs) { // deixa o texto original (usado em initTree)
    var pos = myIndexOf(text, " "); // make text non-breaking
    while (pos > -1) { text = text.substring(0, pos) +"&#160;"+
      text.substring(pos+1); pos = myIndexOf(text, " "); }
  }
 var isCurr = (viewKey == key); if (link)
  link = (link.charAt(0) == "~" ? link.substring(1) : DocRoot + link);
 if (link && !(isCurr && (isOpera || !LinkCurrPage))) text = lnk(link,
  statusText, (isCurr ? " STYLE=\"color:"+ CurrPageFG +";\"" : "") + tipText,
  (isCurr ? "<FONT COLOR=\""+ CurrPageFG +"\">"+ text +"<\/FONT>" : text));
 tableBeg = "<TABLE BORDER=\"0\" CELLSPACING=\"0\" CELLPADDING=\"0\"><TR>";
 return tableBeg +"<TD><FONT SIZE=\"1\">&#160;<\/TD><TD NOWRAP><NOBR>"+ tree
 +"<\/NOBR><\/TD><TD><FONT SIZE=\"1\">&#160;<\/TD><TD NOWRAP>"+ tableBeg
 + (!isCurr ? "<TD NOWRAP><NOBR><FONT FACE=\""+ FontFace +"\" SIZE=\"-1\">"
 : "<TD BGCOLOR=\""+ CurrPageBG +"\" NOWRAP><NOBR><FONT FACE=\""+ FontFace
 +"\" SIZE=\"-1\" COLOR=\""+ CurrPageFG +"\">") +"&#160;"+ text
 +"&#160;<\/FONT><\/NOBR><\/TD><\/TR><\/TABLE><\/TD><\/TR><\/TABLE>"; }

/* performs a reload-index-instruction with the new key */
function index (newKey, currKey, doneMouse) { window.status = waitText;
 if (document.getElementById && document.getElementById('waitMsg') && !doneMouse) {
  document.getElementById('waitMsg').style.top = document.body.scrollTop + 5;
  document.getElementById('waitMsg').style.display = "block";
  window.setTimeout("index('"+newKey+"','"+currKey+"','true');", 50);
  return; } 
 if (!self.currKey) showKey = ""; else showKey = currKey;
 if ((!self.currKey && (""+ currKey == "undefined")) || !isDHTML) {
  var pos = myIndexOf(newKey, "+");
  if (pos < 0) newHash = newKey +"+"+ viewKey; // missing viewKey
  else { if (pos > 0) newHash = newKey; // new prm & viewKey
   else { // keep prm, new viewKey
    var KeyAdd = newKey.substring(1); showKey = KeyAdd;
    if (myIndexOf(":"+prm+":", ":"+KeyAdd+":") > -1) newHash = prm + newKey;
    else // newKey needs to be added to prm
     newHash = ((prm == ".+.") ? "" : prm +":") + KeyAdd + newKey;
  }} top.key = newHash; splitPrm(); currKey = ""; TVkeys[viewKey] = true; }
//  alert(DHTMLTreeView(currKey))
 if (!DHTMLTreeView(currKey)) { // need to redisplay
  if (isOpera) location.reload(); else
   if (document.images) location.replace(location.href);
   else location.href = location.href;
 } else if (document.getElementById && document.getElementById('waitMsg')) {
  document.getElementById('waitMsg').style.display = "none"; } window.status = ""; }

/* compute the new prm for a book */
function makePrm (currPrm, add, sub) {
 if (myIndexOf(currPrm, " ") > -1) currPrm = ".+."; // catch NS2-bug
 if (add != "") // put in a key
  var newPrm = ((currPrm == ".+.") ? "" : currPrm +":") + add;
 if (sub != "") { // take out a key _and_it's_children_
  var newPrm = ":"+currPrm+":"; var cutPos = myIndexOf(newPrm, ":"+sub);
  while(cutPos > -1) { newPrm = newPrm.substring(0, cutPos) +
   newPrm.substring(myIndexOf(newPrm, ":", cutPos+1));
   cutPos = myIndexOf(newPrm, ":"+sub); } if (newPrm == ":") newPrm = ":*:";
  newPrm = newPrm.substring(1, newPrm.length-1);
 } if (myIndexOf(newPrm, " ") > -1) newPrm = currPrm;
 return newPrm; }

/* expands a reload-index-instruction with new prm */
function rld (currKey, newPrm, treecode, hint) {
 return lnk("#\" ONCLICK=\"index('"+ newPrm +"+"+ viewKey +"', '"
 + currKey +"');return false\" TARGET=\"_self", hint, "", treecode); }

/* generate the HTML tables */
function wrtIdx (text, key, link, prefix, code, asIs) { var idxRet = "";
 var pos = myIndexOf(key, " "); if (pos > -1) key = key.substring(0, pos);
 var subKey = (key.length > 1 ? key.substring(0, key.length-1) : "");
 currIsVisible = (myIndexOf(":"+prm+":", ":"+subKey) > -1);
 if (self.viewMatchCnt && subKey != "") currIsVisible
  &= (subKey.substring(0, viewMatchCnt)
  == viewKey.substring(0, viewMatchCnt));
 if (currIsVisible || isDHTML) { var codePos = myIndexOf(code, "|");
  if (codePos > -1) { var prefixPos = myIndexOf(prefix, "|"); // isBook
   if (myIndexOf(":"+prm+":", ":"+key) < 0) // isCollapsed
    idxRet = tree(treePfx + (prefixPos < 0 ? prefix :
    prefix.substring(prefixPos+1))) + rld(key, makePrm(prm, key, ""),
    tree(code.substring(codePos+1)), ClosedBookStatus);
   else idxRet = tree(treePfx + (prefixPos < 0 ? prefix :
    prefix.substring(0, prefixPos))) + rld(key, makePrm(prm, "", key),
    tree(code.substring(0, codePos)), OpenBookStatus);
  } else idxRet = tree(treePfx + prefix + code); // isLeaf
  return wrtEntry(idxRet, key, link, text, asIs);
 } else return ""; }

/* adds the initial TreeView entries */
function idx (text, key, link, prefix, code, opts, asIs) {
 if (!key) key = "*"; if (!text) text = "";
 if (link) link += "\" TARGET=\""+ xTarget(opts); TVcount++;
 var retVal = wrtIdx(text, key, link, prefix, code, asIs);
 if (document.layers) retVal = "<LAYER ID=\"TV"+ TVcount
 +"\" TOP=\""+ currPosY +"\" LEFT=\"0\" VISIBILITY=\""
 + (currIsVisible ? "show" : "hide") +"\">"+ retVal +"<\/LAYER>";
 if (document.getElementById || divs) retVal = "<DIV ID=\"TV"+ TVcount +"\""
 +" STYLE=\"position:absolute; top:"+ currPosY +"px; left:0px; display:"
 + (currIsVisible ? "block" : "none") +";\">"+ retVal +"<\/DIV>";
 if (isDHTML) { TVkeys[key] = false; TVentries[TVcount] = new Array
  ((viewKey != key), text, key, link, treePfx, prefix, code, currIsVisible,
  currPosY); TVkeys[key.substring(0, key.length-1)] = currIsVisible; }
 wrt(retVal); if (currIsVisible) currPosY += EntryHeight; }

/* a 'clean' version of indexOf */
function myIndexOf(text, srch, start) {
 if (!start) start = 0; var pos = (""+ text).indexOf(srch, start);
 return (""+ pos != "" ? pos : -1); }

/* write to prnBuffer */
function wrt (text) { printBuffer += text +"\n"; }

/* writes the printBuffer */
function flush () { document.writeln(printBuffer); printBuffer = ""; }

/* test for option */
function is (opts, keyword) { return (myIndexOf(""+ opts, keyword) > -1); }

/* get custom target */
function xTarget (opts) { 
  var href = "_self";
  if((typeof baseHref)!="undefined") href = baseHref;
  if (opts && is(opts, "target")) {
  opts += ","; startPos = myIndexOf(opts, "target=") + 7;
  return opts.substring(startPos, myIndexOf(opts, ",", startPos)); }
 else return href; }

/* get custom image */
function xImg (opts) { return (opts ? opts.substring
 (myIndexOf(opts, "img") + 3, myIndexOf(opts, "img") + 4) : ""); }

/* functions for building the tree with */
function initTree (text, key, link, opts) { 
  initTreeView(); treePfx = "";
  idx(text, key, link, (is(opts, "cntd.") ? "/" : (is(opts, "img")
 ? xImg(opts) : (is(opts, "link") ? "R":"r") ) ), "", opts, true); 
}

function sub_Book (text, key, link, opts) {
 if (is(opts, "cntd.")) idx(text, key, link, "/|.", "|", opts);
 else { idx(text, key, link, "", (is(opts, "img") ? (is(opts, "last")
 ? "_"+xImg(opts)+"|*"+xImg(opts):"-"+xImg(opts)+"|+"+xImg(opts))
 : (is(opts, "last") ? "_o|*b":"-o|+b") ), opts );
 treePfx += (is(opts, "last") ? ".":"/"); }}

function lastBook (text, key, link, opts) {
 sub_Book(text, key, link, "last,"+ opts); }

function end_Book () { treePfx = treePfx.substring(0, treePfx.length-1); }

function sub_Page (text, key, link, opts) {
 idx(text, key, link, "", (is(opts, "cntd.") ? (is(opts, "last")
 ? "..":"/.") : (is(opts, "last") ? "L":"l") + (is(opts, "img")
 ? xImg(opts) : (is(opts, "link") ? "x":"#") ) ), opts); }

function lastPage (text, key, link, opts) {
 sub_Page(text, key, link, "last,"+ opts); }

function end_Tree () { idx(); if (document.layers) wrt("<LAYER ID=\"bottom\""
 +" TOP=\""+ (TVtop + EntryHeight * (TVcount-1)) +"\">&#160;<\/LAYER>");
 wrt("<INFO TEXT=\""+ TVversion() +"\">"); flush(); treePfx = ""; }

/* close all subtrees */
function closeAll() { if (isDHTML) {
 for (var i = 1; i <= TVcount; i++) if (TVkeys[TVentries[i][2]]) {
  TVkeys[TVentries[i][2]] = TVentries[i][0] = false; } index();
 if (document.layers) { ScreenTop = window.pageYOffset; scrollMax = 50
  + document.layers["TV"+TVcount].pageY - window.innerHeight;
 } else { ScreenTop = document.body.scrollTop; scrollMax = 50
  + document.getElementById("TV"+TVcount).offsetTop - document.body.clientHeight;
 } if (ScreenTop > scrollMax) window.scrollTo(0, scrollMax); }}

/* open all subtrees */
function openAll() { if (isDHTML) { for (var i = 1; i <= TVcount; i++)
 if ((myIndexOf(TVentries[i][6], "|") > -1) && (!TVkeys[TVentries[i][2]])) {
  TVkeys[TVentries[i][2]] = true; TVentries[i][0] = false; } index(); }}