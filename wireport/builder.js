/*
 * WebIntegrator - Ferramenta de produtividade Java
 * Copyright (c) 2001-2008 Itx Tecnologia da InformaÁ„o Ltda.
 *
 * Este programa È software livre; vocÍ pode redistribuÌ-lo e/ou modific·-lo 
 * sob os termos da GNU GENERAL PUBLIC LICENSE (GPL) conforme publicada pela 
 * Free Software Foundation; vers„o 2 da LicenÁa.
 * Este programa È distribuÌdo na expectativa de que seja ˙til, porÈm, SEM 
 * NENHUMA GARANTIA; nem mesmo a garantia implÌcita de COMERCIABILIDADE OU 
 * ADEQUA«√O A UMA FINALIDADE ESPECÕFICA.
 * 
 * Consulte a GNU GPL para mais detalhes.
 * VocÍ deve ter recebido uma cÛpia da GNU GPL junto com este programa; se n„o, 
 * veja em http://www.gnu.org/licenses/ 
 */

//history.go(1);
var designMode = false;

// abre a janela de seleÁ„o de cores
function colorWindow(objColor) {
   wnd = window.open("color.html" + (objColor?"?"+objColor:""),"colorwnd","scrollbars=no,width=600,height=180,left=0,top=0')");
   return wnd;
}

// elimina caracteres indesejados
function changeChars(text, slash) {
   text = chkID(text, slash);
   var oldChars  = "¡…Õ”⁄¿»Ã“Ÿ¬ Œ‘€ƒÀœ÷‹√’«—·ÈÌÛ˙‡ËÏÚ˘‚ÍÓÙ˚‰ÎÔˆ¸„ıÁÒ.,*@$%^&()+=-~`!?<>'[]{};\""; 
   var newChars  = "AEIOUAEIOUAEIOUAEIUOAOCNaeiouaeiouaeiouaeiouaocn###########################"; 
   var ret  = ""; 
   for(var i=0; i<text.length; i++) { 
      var j = oldChars.indexOf(text.substr(i,1));
      if (j == -1) continue;
      text = text.replace(oldChars.charAt(j), newChars.charAt(j)); 
   } 
   return text.replace(/#/g, '');
}

//verifica a validade de um identificador
function chkID(id,slash) {
   id = id.replace(/ /g,"_").replace(/\*/g,"").replace(/\?/g,"")
   id = id.replace(/\|/g,"").replace(/</,"").replace(/>/,"").replace(/:/,"");
   if (slash) id = id.replace(/\//g,"").replace(/\\/g,"");
   return id
}

function openWIPrototyping() {
  var h = screen.height-90;
  var w = screen.width-10; 
  window.open('Menu?type=wiPrototypingStart','wiPrototypingMain','status=1,scrollbars=auto,width='+w+',height='+h+',left=0,top=0,resizable')
}
   
// document.write(parametro);
function dw(param) { document.write(param);}
// insere n espaÁos
function space(n) {
   for(var i=0;i<n;i++) dw("&nbsp;")
}

// funÁ„o para selecionar item "key" de "combo"
function keyCombo(combo,key) {
   key=(key=="")?-1:key;
   combo.selectedIndex=-1;
   for (var i = 0; i < combo.options.length; i++) {
      combo.options[i].selected=(combo.options[i].value == key);
   }
}

// piece
function piece(str,delim,ind) {
   var aux = str.split(delim);
   if (ind <= aux.length) {
     return aux[ind-1];
   }
}   

// copia combo 'origem' em 'destino'
function copiaCombo(origem,destino) {
   var sel=destino.value;
   destino.length=0;
   for (var i=0;i<origem.length;i++){
      var op = new Option(origem.options[i].text);
      op.value = origem.options[i].value;
      destino.options[destino.length] = op;
   }
   keyCombo(destino,sel);
}

function showHelp(pagina) {
  wndURL = 'help/' + pagina;
  wndOptions = 'locationbar=no,menubar=no,width=640,height=480,scrollbars=yes,top=10,left=10,resizable=yes';
  wndName = 'wihelp';
  wnd = window.open(wndURL, wndName, wndOptions);
  wnd.focus();
  top.wiHelpWindow = wnd;
}
// limpa os campos de um formulario
function limpaForm(frm){
   with (frm){
    for (var i=0;i<length;i++)
      if(elements[i].type=="checkbox")
         elements[i].checked=false;
        else if(elements[i].type=="select-one")
         elements[i].selectedIndex=-1;
        else if(elements[i].type!="submit" && elements[i].type!="button" && elements[i].type!="")
         elements[i].value="";
   }
}
// chama o Wizard para SQL
function wiSQL(db, evt) {
   evt.cancelBubble = true;
   if (!db) return;
   var h = screen.height-56; 
   var w = screen.width-10; 
   var ac = "WizSql?type=new";
   ac += "&dbID="+db;
   sqlWizard = window.open(ac,"SqlWizard","scrollbars=yes,width="+w+",height="+h+",left=0,top=0,resizable");
}

function chkSpace(txt) {
   txt.value = trim(txt.value).replace(/ /g,"_");
}
function trim(txt) {
   while((txt.charAt(0)==" ")||(txt.charAt(txt.length-1)==" "))
      txt = txt.replace(/^ /,"").replace(/ $/,"");
   return txt;
}

//funcoes para alterar a largura dos elementos
var objs = new Array();
var vals = new Array();
function setFull() {
   if (!document.getElementsByTagName) return;
   inputs = document.getElementsByTagName("INPUT");
   setWidth(inputs);
   inputs = document.getElementsByTagName("TEXTAREA");
   setWidth(inputs);
   inputs = document.getElementsByTagName("SELECT");
   setWidth(inputs);
   setTimeout("setNow()",1);
}

function setWidth(inputs) {
   if (!document.getElementsByTagName) return;
   for (var i=0; i<inputs.length; i++) {
      obj = inputs[i];
      w = obj.getAttribute('altWidth');
      if (w) {
         if (false && (navigator.appName=="Netscape") && w.indexOf('%') != -1) {
           obj.style.width = 10;
           w = parseInt(w, 10)
	   w = obj.parentNode.offsetWidth * w / 100
         }
         if(obj.tagName != "SELECT") {
           tmp = obj.value;
           obj.value="";
         }
         obj.style.width = w;
         if(!objs) objs = new Array();
         if(!vals) vals = new Array();
         if(obj.tagName != "SELECT") {
           objs[objs.length] = obj;
           vals[vals.length] = tmp;
         }
       }
   }
}
function setNow(obj,value) {
   for (var i=0; i<objs.length; i++) {
      objs[i].value = vals[i]
   }
}

// funÁ„o para selecionar item "key" de "combo"
function comboSelectOld(combo,key) {
   key=(key=="")?-1:key;
   combo.selectedIndex=-1;
   for (var i = 0; i < combo.options.length; i++) {
      combo.options[i].selected=(combo.options[i].value == key);
   }
}

function comboSelect(combo,key) {
   key=(key=='')?-1:key;
   combo.selectedIndex=-1;
   for (var i = 0; i < combo.options.length; i++) {
     if (combo.multiple) combo.options[i].selected=((','+key+',').indexOf(','+combo.options[i].value+',') != -1);
     else combo.options[i].selected=(combo.options[i].value == key);
   }
}

// funÁ„o para selecionar item com valor "key" do grupo de RADIO "radio"
function radioSelect(radio,key) {
   for (var i = 0; i < radio.length; i++) {
      radio[i].checked=(radio[i].value == key);
   }
}
// funÁ„o falsa para p·ginas geradas pelo WIGenerator
function selectField() { }

// tratamento padr„o de erros
function myFunc(a,b,c) {
   alert("Error: "+a+" \r\n(Page: "+b+"  -   Line: "+c+")"); 
   return true;
}
window.onerror= myFunc;

// chama a tela de ediÁ„o de texto. Param field = campo textarea do formul·rio
var fieldEdit;
function textEdit(field) {
  w = screen.width-210;
	h = screen.height-67;
  te = window.open("textedit.html","WIzardTxtEdit" , "scrollbars=no,width="+w+",height="+h+",left=0,top=0,resizable=yes");
  self.fieldEdit = field;
  top.textEditWindow = te;
}   

// chama a tela de ediÁ„o de componentes do WIzard. Param field = tipo a ser mostrado
function typeSelect(fld) {
   var w = screen.width * 0.9;
   fld = fld.replace("#",escape("#"));
   fld = "Generator?action=fieldsDef&fieldType="+fld;
   te = window.open(fld, "WIzardUsrFields" , "scrollbars=no,width="+w+",height=540,left=0,top=0,resizable=yes");
   top.fieldsDefWindow = te;
}   

// -------------------------------------------------
// inicio das funcoes para mover elementos de combo

// captura e trata a tecla pressionada (subir, descer)
// colocar no select: onkeydown = 'keyDown(event, this)'
// o terceiro parametro indica se pode deletar um item da combo
function keyDown(evt, sel, canDelete) {
  evt = evt ? evt : event;
  var code = evt.which ? evt.which : evt.keyCode;
  if (code == 38 || code == 40) {  // 38 = UP  40 = DOWN
    mover(sel, code-39)    
  }
}


function mover(cb,ir) {
	si=cb.selectedIndex;
	if ((si+ir<0)||(si+ir==cb.length)||(si==-1)) return;
   mudou=true
	op=cb.options[si];
	newop = new Option(op.text);
	newop.value = op.value;
	vop=cb.options[si+ir];
	vopt = new Option(vop.text);
	vopt.value = vop.value;
	if (document.layers) {
		cb.options[si]=vop;
		cb.options[si+ir]=newop;
	} else {
		cb.options[si+ir]=newop;
		cb.options[si]=vop;
	}
  if (ir == -1)
  	cb.selectedIndex=si+ir+1;
  else 
  	cb.selectedIndex=si+ir-1;
}
// final das funcoes para ordenar itens de uma combo
//----------------------------------

// --- funcoes para cookies
function getCookie(NameOfCookie){
  if (document.cookie.length > 0) { 
    begin = document.cookie.indexOf(NameOfCookie+"="); 
    if (begin != -1) { 
      begin += NameOfCookie.length+1; 
      end = document.cookie.indexOf(";", begin);
      if (end == -1) end = document.cookie.length;
      return unescape(document.cookie.substring(begin, end)); 
    } 
  }
  return null; 
}

function setCookie(NameOfCookie, value, expiredays) {
  if (!expiredays) expiredays = 365;
  var ExpireDate = new Date ();
  ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));
  document.cookie = NameOfCookie + "=" + escape(value) +((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());
}

function delCookie (NameOfCookie) {
  if (getCookie(NameOfCookie)) {
    document.cookie = NameOfCookie + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}
// ------ final das funcoes de cookies

function isNS() {
   return navigator.appName=="Netscape";
}

// verifica se algum campo obrigatÛrio de um form deixou de ser preenchido
// exemplo de INPUT: (deve conter a express„o requerid="true")
//   <input type="text" required="true" name="texto2">
// parametro: frm = form a ser submetido
//          :  msg = mensagem de erro
// usar em OnSubmit do form.
function chkRequired(frm, msg){
   if (!msg || msg=="") msg="Campo obrigatÛrio n„o preenchido";
   for (var i=0; i<frm.elements.length; i++) {   
      if (frm.elements[i].getAttribute("required")=="true") {
         var ok = false;
         if (frm.elements[i].type.toLowerCase()=="radio") {
            for (var j=0; j<frm[frm.elements[i].name].length; j++) {
               if (frm[frm.elements[i].name][j].checked) {
                  ok = true; break
               }
            }
         } else ok = !(frm.elements[i].value=="") 
         if (!ok) {
           label = frm.elements[i].getAttribute("label");
           if (label) msg += ": " + label;
           alert(msg);
           frm.elements[i].focus();
           return false;
      }
      }
  }
   return true;
}

function newField(){
  frm=document.forms[0]; 
  frm["do"].value="newField"; 
  frm.submit();
}

function newGroup(){
  frm=document.forms[0]; 
  frm["do"].value="newGroup"; 
  frm.submit();
  setTimeout('self.close()',100);
}

function fieldWizard(evt) {
  evt.cancelBubble = true;
  var msg = "Os campos atualmente definidos ser„o apagados. Novos campos ser„o gerados conforme a query.\nConfirma?";
  frm=document.forms[0]; 
  if (frm["rpt.reportFields"].length > 1 && !confirm(msg)) return;
  frm["do"].value="fieldWizard";
  frm.target = "_self";
  frm.submit();
}

function openPop(type, key, h){
  if (!h) h = 300;
  w = document.body.offsetWidth;
  l = screen.width - w - 50
//  l = (typeof screenLeft == 'undefined')? screenX-w-12 :screenLeft-w-12
  reportPop = window.open("ReportProperties?popType="+type+"&key="+key,'wiReportPopup','top=30,left='+l+',width='+w+',height='+h+',resizable')
  reportPop.resizeTo(w,h);
}

function openProperties(key) {
  window.location.href = 'ReportProperties?element=' + key
}

function showReport() {
  var h = screen.height-64;var w = screen.width-10;
  var opt = 'scrollbars=no,width='+w+',height='+h+',left=0,top=0,resizable';
  var wn = window.open('about:blank','ShowWIReport', opt);
  
  frm = document.forms[0];
  frm.target='ShowWIReport'
  frm['do'].value = 'showReport';
  frm.action = 'WIReport';
//  frm.method = 'get';
  setTimeout('restoreForm()',2000);
}

function restoreForm() {
  frm = document.forms[0];
  frm.submit();
//  frm.method = 'post';
  frm['do'].value = 'save';
  frm.action = 'ReportProperties';
  frm.target = 'fraResponse';
}


function mostraCor(ele){
  ele.onchange();
}

function showArea(key, isSelected) {
  if (top.frames[0] && top.frames[0].showArea) {
    top.frames[0].showArea(key, isSelected);
    top.frames[0].dd.elements.cursor.key = key;
  }
  if (isSelected) setCursorOff();
}
function setCursorOff() {
  if(top.frames[0] && top.frames[0].setCursorOff) top.frames[0].setCursorOff();
}
function undo(){
  document.forms[0]['do'].value='undo';
  document.forms[0].submit();
  setTimeout("document.forms[0]['do'].value='save'", 200);
}

function zoom(){
  var zoom = document.forms[0].zoom.value;
  zoom = parseFloat(zoom);
  if (isNaN(zoom)) zoom = 1;
  parent.frames['WIReportViewer'].location.search = '?element='+ document.forms[0].element.value+'&zoom=' + zoom;
  document.forms[0].zoom.value = zoom;
  dx = null;
}

function chkKey(evt) {
  evt = evt ? evt : event;
  var code = evt.which ? evt.which : evt.keyCode;
  if (code == 13) {
    var obj = evt['target'] ? evt['target'] : evt['srcElement'];
    if (obj.tagName != 'TEXTAREA') {
      document.forms[0].submit();
    }
  }
}
function showProps(name, refresh) {
  var id = "divProp_" + name;
  var div = document.getElementById(id);
  if (div.style.display == 'none') {
    var divs = document.getElementsByTagName("DIV");
    for (var i=0; i<divs.length; i++) {
    	if (divs[i].id.indexOf("divProp_") == 0) {
			var name = divs[i].id.substring(8);
			if(! isFixed(name)) divs[i].style.display = "none"
    	}
    }
    div.style.display = "block"
    if (refresh) setFull();
  } else {
    div.style.display = "none"
  }
}

function pinSection(name, refresh){
  var img = document.getElementById("img_" + name);
  if (img.src.indexOf("pinoff") != -1) {
    img.src = "images/pinon.gif";
    setCookie("divProp_" + name, "true");
//    setTimeout('setFull()', 100);
  } else { 
    img.src = "images/pinoff.gif";
    delCookie("divProp_" + name);
  }
  showProps(name, refresh);
}

function isFixed(name){
  var img = document.getElementById("img_" + name);
  return (img.src.indexOf("pinoff") == -1)
}

function appendOption(select, text, value){
  if (!value) value = text;
  sel = document.forms[0][select]
  sel.options[sel.length] = new Option(text,value);
  sel.options[sel.length-1].selected = true;
}

function openBorderConfig() {
  var frm = document.forms[0];
  var url = "ReportProperties?do=setBorders&element=";
  url += frm['element'].value;
  url += "&elementsList=";
  url += frm['rpt.elementsList'].value;
  window.open(url,'_blank','top=0,left=0,width=500,height=200,resizable');
}