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

//history.go(1);
var designMode = false;

// abre a janela de seleção de cores
function colorWindow(objColor) {
   wnd = window.open("color.html" + (objColor?"?"+objColor:""),"colorwnd","scrollbars=no,width=600,height=180,left=0,top=0')");
   return wnd;
}

// elimina caracteres indesejados
function changeChars(text, slash) {
   text = chkID(text, slash);
   var oldChars  = "ÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÄËÏÖÜÃÕÇÑáéíóúàèìòùâêîôûäëïöüãõçñ.,*@$%^&()+=-~`!?<>'[]{};\""; 
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

   
// document.write(parametro);
function dw(param) { document.write(param);}
// insere n espaços
function space(n) {
   for(var i=0;i<n;i++) dw("&nbsp;")
}

// função para selecionar item "key" de "combo"
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
  if (pagina.indexOf('en_us')==0) {
    alert('English help not implemented. Try pt_BR help.');
    return;
  }
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
function wiSQL(msg, db) {
   if (!db) return;
   if (!db.options) return;
   if ((db.selectedIndex==-1) || (db.options[db.selectedIndex].value=="")) {
      if (!msg) msg = "Nenhum banco de dados selecionado."
      alert(msg)
      return
   }
   var h = screen.height-56; 
   var w = screen.width-10; 
   var ac = "WizSql?type=new";
   ac += "&dbID="+db.options[db.selectedIndex].value;
   var wnd = window.open(ac,"SqlWizard","scrollbars=yes,width="+w+",height="+h+",left=0,top=0,resizable");
   top.sqlWizardWindow = wnd;
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

function $(id) {
  return document.getElementById(id);
}

function verticalGrow(lastObj, destObj, div) {
  var grow = $("buttons").offsetTop - (lastObj.offsetTop + lastObj.offsetHeight);
  if (div) grow = grow / div;
  destObj.style.height = destObj.offsetHeight + grow + "px";
}

function grow(lastObj, destObj, div, width) {
  verticalGrow(lastObj, destObj, div);
  if (!width) width = 98;
  destObj.style.width = width + "%";
}

function setWidth(inputs) {
   if (!document.getElementsByTagName) return;
   for (var i=0; i<inputs.length; i++) {
      obj = inputs[i];
      w = obj.getAttribute('altWidth');
      if (w) {
         if ((navigator.appName=="Netscape") && w.indexOf('%') != -1) {
           w = parseInt(w, 10)
           w = obj.parentNode.offsetWidth * w / 100
         }
         if(obj.tagName != "SELECT") {
           tmp = obj.value;
           obj.value = "";
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

// função para selecionar item "key" de "combo"
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

// função para selecionar item com valor "key" do grupo de RADIO "radio"
function radioSelect(radio,key) {
   for (var i = 0; i < radio.length; i++) {
      radio[i].checked=(radio[i].value == key);
   }
}
// função falsa para páginas geradas pelo WIGenerator
function selectField() { }

// tratamento padrão de erros
function myFunc(a,b,c) {
   alert("Error: "+a+" \r\n(Page: "+b+"  -   Line: "+c+")"); 
   return true;
}
window.onerror= myFunc;

// chama a tela de edição de texto. Param field = campo textarea do formulário
var fieldEdit;
function textEdit(field) {
  w = screen.width-210;
	h = screen.height-67;
  te = window.open("textedit.html","WIzardTxtEdit" , "scrollbars=no,width="+w+",height="+h+",left=0,top=0,resizable=yes");
  self.fieldEdit = field;
  top.textEditWindow = te;
}   

// chama a tela de edição de componentes do WIzard. Param field = tipo a ser mostrado
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

function browserType() {
	var ua = navigator.userAgent;
	if(ua.indexOf('Chrome') > -1) {
		return "Chrome";
	} else if(ua.indexOf('Safari') > -1) {
		return "Safari";
	} else if(ua.indexOf('Firefox') > -1) {
		return "Firefox";
	} else if(ua.indexOf('IE') > -1) {
		return "IE";
	} else {
		return "";
	}	
}


