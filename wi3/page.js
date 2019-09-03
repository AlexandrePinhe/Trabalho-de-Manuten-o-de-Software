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

var designMode;

// tratamento padrão de erros
function myFunc(a,b,c) {
   alert("Error: "+a+" \r\n(Page: "+b+"  -   Line: "+c+")"); 
   return true;
}
window.onerror= myFunc;

function formataNumero(num,dec){
  num=String(num);
  if (num=="NaN") return num;
  if(dec==undefined) dec=2;
  sinal=(num<0)?"-":"";
  num=num.replace(/,/g,".");
  num= String(Math.abs(num));
  if (num=="NaN") return num;
  var nm=Math.round(num*Math.pow(10,dec));
  inte = String(parseInt(num,10)); 
  if (inte.length>16) return "";
  l=Math.ceil(inte.length/3);
  c="___"; for (i=1; i<l; i++) c+=".___";
  p=String(num).lastIndexOf("."); dc=String(num).substr(p+1);
  d=",";  if (dec==0) d=""; 
  if ((p!=-1)||(dec>0)) {for (i=0; i<dec; i++) d+="_";}
  var snm = String(nm);
  if (inte == 0) snm = "00"+nm;
  return sinal+FormatarInv(snm,c+d);
}

// remove formataçao de numeros, deixando apenas um ponto decimal
// exemplo: limpaNumero("1.234,56") -> retorna 1234.56
function limpaNumero(c){
  c=c.replace(/,/g,".");
  p=c.lastIndexOf(".");
   if (p == -1) p = c.length;
  c=c.substr(0,p).replace(/\./g,"")+c.substr(p);
  return c;
}

function FormatarInv(Str, Fmt) {
// O mesmo que o anterior, iniciando pelo final do molde.
  var Sai = "";
  var j = Str.length-1;
  for (var i=Fmt.length-1; i>=0; i--)
    if (Fmt.substring(i,i+1)=="_") {
       Sai = Str.substring(j,j+1) + Sai;
       j = j - 1;
       if (j<0) break;
    } else {
      Sai = Fmt.substring(i, i+1) + Sai;
    }
  return Sai;
}

var wiObj = null;
function msgErr(obj,msg) {
   if (msg!="") alert (msg);
   wiObj = obj;
   setTimeout("selObj()",10);
}

function selObj () {
   if (!wiObj) return;
   wiObj.value = "";
   wiObj.focus(); 
   wiObj = null;
}

function mTr(s,s1,s2) {
   var p;
   var sai="";
   for (var j=0; j<s.length; j++) {
    p=s1.indexOf(s.substring(j,j+1));
    sai=sai + (p<0 ? s.substring(j, j+1) : s2.substring(p, p+1));
   }
   return sai;
}

function Limpar(valor, validos) {
// retira caracteres invalidos da string
  var result = "";
  var aux;
  for (var i=0; i < valor.length; i++) {
    val = valor.substring(i, i+1);
    aux = validos.indexOf(val);
      if (aux>=0) {
        result += val;
      }
  }
  return result;
}

function cData(data,mask) {
/* retorna -1 se data nao tiver 6 ou 8 digitos numericos
   retorna -2 se mes for invalido
   retorna -3 se dia for invalido
   retorna -4 se ano for invalido
   retorna a data (ddmmaaaa) se ok
*/
  if(data.indexOf('/') != -1) {
    var sp = data.split('/');
    if (sp[0].length != 2) return -3;
    if (sp[1].length != 2) return -2;
    if (sp[2].length != 2 && sp[2].length != 4) return -4;
  }
  data = Limpar(data,"0123456789");
  if ((data.length != 8) &&(data.length != 6)) { return -1; }
  // transforma os valores em inteiros
  var dia = parseInt(data.substring(0,2),10);
  var mes = parseInt(data.substring(2,4),10);
  var ano = parseInt(data.substring(4),10);
  // corrige ano (no caso de ter apenas 2 digitos)
  if (ano < 100) { 
    if (ano < 50) { ano += 2000; }
    else { ano += 1900; }
  }
  var numdias=0;
  //verifica o mes
  if (mes > 12) { return -2; }
  // verifica o numero de dias do mes
  if((mes == 1) || (mes == 3) || (mes == 5) || (mes == 7) || (mes == 8) || (mes == 10) || (mes == 12)) {
      numdias = 31;
  }
  if( (mes == 4) || (mes == 6) || (mes == 9)  || (mes == 11)) {
      numdias = 30;
  }
  if (mes == 2) {
    if (bissexto(ano)) { numdias = 29; }
    else {numdias = 28; }
  }
  //verifica o numero de dias
  if (dia > numdias) { return -3; }
  sdia = ((dia<10) ? "0" : "") + dia;
  smes = ((mes<10) ? "0" : "") + mes;
  sano4 = ano+""; 
  sano2= (ano+"").substring(2,4);
  d = /dd/; 
  m = /MM/; 
  y2 = /yy/; 
  y4= /yyyy/;
  ret=mask.replace(d, sdia).replace(m,smes).replace(y4,sano4).replace(y2,sano2);
  return ret;
}

function bissexto(strano) {
/* retorna true se o ano for bissexto */
  var ano = parseInt(strano+"",10);
  if ((ano%4)!= 0) { return false; }
  if (((ano%100) == 0) &&((ano%400)!=0)) { return false; }
  return true;
}


function CNPJdv(CNPJ) {
  CNPJ = Limpar(CNPJ,"0123456789");
  if (CNPJ.length != 12) { return ""; }
  var checar = CNPJ.substring(12);
  CNPJ = CNPJ.substring(0,12);
  var soma = 0;
  for (var i=0; i<4; i++) { 
    soma = soma + CNPJ.substring(i,i+1)*(5-i);
  }
  for (var i=4; i<12; i++) { 
    soma = soma + CNPJ.substring(i,i+1)*(13-i);
  }
  var cnpjdv = 11 - (soma % 11);
  if ( cnpjdv >= 10 ) { 
    cnpjdv = 0;
  }
  soma = 0;
  for (var i = 0; i<5; i++) { 
    soma = soma + CNPJ.substring(i,i+1)*(6-i);
  }
  for (var i = 5; i<12; i++) { 
    soma = soma + CNPJ.substring(i,i+1)*(14-i);
  }
  soma = soma + cnpjdv * 2;
  var cnpjdv2 = 11 - (soma%11);
  if ( cnpjdv2 >= 10 ) { 
    cnpjdv2 = 0;
  }
  cnpjdv += "" + cnpjdv2;
  return cnpjdv;
}     


function CPFdv(CPF) {
  CPF = Limpar(CPF,"0123456789");
  if (CPF.length != 9) { return ""; }
  var soma = 0;
  var checar = CPF.substring(9);
  CPF = CPF.substring(0,9);
  for (var i=0; i<9; i++) { 
    soma = soma + CPF.substring(i,i+1)*(10-i);
  }
  var cpfdv = 11 - (soma % 11);
  if ( cpfdv >= 10 ) { 
    cpfdv = 0;
  }
  soma = 0;
  for (var i=0; i<9; i++) {
    soma = soma + CPF.substring(i,i+1)*(11-i);
  }
  soma = soma + cpfdv * 2;
  var cpfdv2 = 11 - (soma%11);
  if ( cpfdv2 >= 10 ) { 
    cpfdv2 = 0;
  }
  cpfdv += ""+cpfdv2;
  return cpfdv;
}

function piece(str,delim,ind) {
   var aux = str.split(delim);
   if (ind <= aux.length) {
     return aux[ind-1];
   }
}   


// ----- Funções para validação de campos
//@list=chkNum(this)
function chkNum(obj, msg) {
   if (designMode) return;
   if (!obj || obj.value=="") return;
   var ini = obj.value.charAt(0)+obj.value.charAt(obj.value.length-1);
   if (ini=="||") return;
   var n = formataNumero(obj.value);
   if (n=="NaN") {
      if (!msg || msg=="") msg = obj.value + " não é um número válido";
      return msgErr (obj, msg);
   } else {
   	 min = obj.getAttribute('MINVALUE');
   	 if (min) {
   	   if (parseFloat(obj.value) < parseFloat(min)) {
   	   	  return msgErr(obj, obj.value 
   	   	     + " é menor que o valor mínimo permitido: " + min);
   	   }
   	 }
   	 max = obj.getAttribute('MAXVALUE');
   	 if (max) {
   	   if (parseFloat(obj.value) > parseFloat(max)) {
   	   	  return msgErr(obj, obj.value 
   	   	     + " é maior que o valor máximo permitido: " + max);
   	   }
   	 }
     obj.value = n;
   }
}

//@list=fmtNum(this)
function fmtNum(obj) {
   if (designMode) return;
   if (!obj || obj.value=="") return;
   obj.value = limpaNumero(obj.value);
}

//@list=chkCep(this)
function chkCep(obj,msg) {
   if (!msg || msg=="") msg = "Não é um número válido";
   if (designMode) return;
   if (!obj) return;
   var val=mTr (obj.value, ",.-/", "");
   if (obj.value=="") return;
   msg = msg +  " Deve conter 8 números";
   if (val.length!=8) return msgErr(obj,msg);
   if (Limpar(val, "0123456789") != val) return msgErr(obj,msg);
   obj.value = FormatarInv(val, "_____-___");
}

//@list=chkData(this,"dd/MM/yyyy")
function chkData(obj, mask, msg) {
   if (designMode) return;
   if (!obj || obj.value=="") return;
   if (!mask || mask== "") mask = "dd/MM/yyyy"; 
   var st = cData(obj.value, mask);
   if (!msg) msg = "";
   if (st == -1) return msgErr(obj, msg + " Deve conter 6 ou 8 números");
   if (st == -2) return msgErr(obj, msg + " Mês inválido");
   if (st == -3) return msgErr(obj, msg + " Dia inválido");
   if (st == -4) return msgErr(obj, msg + " Ano inválido");
   obj.value =  st;
}

//@list=chkCNPJ(this)
function chkCNPJ(obj, msg) {
   if (!msg) msg = "";
   if (designMode) return;
   if (!obj || obj.value=="") return;
   var CNPJ = obj.value;
  CNPJ = Limpar(CNPJ,"0123456789");
  if (CNPJ.length != 14) { return msgErr(obj, msg + " Deve conter 14 números"); }
  if (CNPJdv(CNPJ.substring(0,12)) == CNPJ.substring(12)) {
    return fmtCNPJ(obj);
  }
  else {
    msgErr(obj, msg + " CNPJ incorreto");
  }
}     

//@list=fmtCNPJ(this)
function fmtCNPJ(obj) {
   if (!obj || obj.value=="") return;
  var CNPJ = obj.value;
  CNPJ = Limpar(CNPJ,"0123456789");
  if (CNPJ.length != 14) { return ""; }
  var parte1 = CNPJ.substring(0,2);
  var parte2 = CNPJ.substring(2,5);
  var parte3 = CNPJ.substring(5,8);
  var parte4 = CNPJ.substring(8,12);
  var parte5 = CNPJ.substring(12,14);
  obj.value = parte1 + "." + parte2 + "." + parte3 + "/" + parte4 + "-" + parte5;
}

//@list=chkCPF(this)
function chkCPF(obj, msg) {
   if (!msg) msg = "";
   if (designMode) return;
   if (!obj || obj.value=="") return;
   var CPF = obj.value;
  CPF = Limpar(CPF,"0123456789");
  if (CPF.length != 11) { return msgErr(obj, msg + " Deve conter 11 números"); }
  if (CPFdv(CPF.substring(0,9)) == CPF.substring(9)) {
    return fmtCPF(obj);
  }
  else {
    msgErr(obj, msg + " CPF incorreto");
  }
}

//@list=fmtCPF(this)
function fmtCPF(obj) {
   if (!obj || obj.value=="") return;
   var CPF = obj.value;
  CPF = Limpar(CPF,"0123456789");
  if (CPF.length != 11) { return ""; }
  var parte1 = CPF.substring(0,3);
  var parte2 = CPF.substring(3,6);
  var parte3 = CPF.substring(6,9);
  var parte4 = CPF.substring(9,11);
  obj.value = parte1 + "." + parte2 + "." + parte3 + "-" + parte4;
}

//@list=chkEmail(this)
function chkEmail(obj, msg) {
   if (designMode) return;
   if (obj.value=="") return;
   if (!msg) msg = "";
   var dlm=", ",s="";
   var array = obj.value.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
   if (array)
      for (var i=0; i<array.length; i++) {
         if (i!=0) s+=dlm;
         s+=array[i];
      }
   if (s=="") return msgErr(obj, msg + " Formato inválido do e-mail");
   return "";
}

//@list=chkTime(this)
function chkTime(obj, msg) {
 if (designMode) return;
 var val=obj.value;
 if (val=="") return;
 if (!msg) msg = "";
 val = mTr (val, "h.,", ":::");
 if (Limpar(val, ":0123456789") != val) return msgErr(obj, msg + " Digite somente números");
 if (val.indexOf(":")<0) val = val.substring(0,2) + ":" + val.substring(2,4);
 var H = eval (piece(val, ":", 1) + " + 0");
 var M = eval (piece(val, ":", 2) + " + 0");

 if (H>23) return msgErr(obj,msg+" Hora inválida");
 if (M>59) return msgErr(obj,msg+" Minuto inválido");
 H = "" + H;
 M = "" + M;
 if (H.length==1) H="0" + H;
 if (M.length==0) M="00";
 if (M.length==1) M="0" + M;
 obj.value = FormatarInv("" + H + M, "__:__");
}

// função para substituir o window.open e window.location que não aceita segurança ativa
//@list
function wiOpen(url, target, props) {
   if (target) {
      if (target.toLowerCase()=="_blank") {
         target = Date.parse(new Date())+new Date().getMilliseconds();
      }
   } else target = "_self";
   var frm = document.createElement("FORM");
   frm.action = url;
   frm.target = target;
   frm.method = "post";
   document.body.appendChild(frm);
   var wnd;
   if (target!="")  {
      wnd = window.open('',target,props);
   }
   frm.submit();
   document.body.removeChild(frm);
   return wnd;
}

// verifica se algum campo obrigatório de um form deixou de ser preenchido
// exemplo de INPUT: (deve conter a expressão requerid="true")
//   <input type="text" required="true" name="texto2">
// parametro: frm = form a ser submetido
//          :  msg = mensagem de erro
// usar em OnSubmit do form.
//@list=chkRequired(this)
function chkRequired(frm, msg){
	if (!frm) frm = document.forms[0];
	if (!msg || msg=="") msg="Campo obrigatório não preenchido";
	for (var i=0; i<frm.elements.length; i++) {   
		if (frm.elements[i].getAttribute("required")=="true") {
			var ok = false;
			if (frm.elements[i].type.toLowerCase()=="radio") {
				for (var j=0; j<frm[frm.elements[i].name].length; j++) {
					if (frm[frm.elements[i].name][j].checked) {
						ok = true; break;
					}
				}
			} else ok = !(frm.elements[i].value==""); 
			if (!ok) {
				alert(msg);
				frm.elements[i].focus();
				if (frm['tmp.action']) {
					frm['tmp.action'].value='';
				}
				return false;
			}
		}
	}
	return true;
}

//@list=chkInt(this)
function chkInt(obj, msg) {
  if (designMode) return;
  if (!obj || obj.value=="") return;
  var ini = obj.value.charAt(0)+obj.value.charAt(obj.value.length-1)
  if (ini=="||") return;
  if (!isNumeric(obj.value)) {
     if (!msg || msg=="") msg = "Não é um número válido.";
     return msgErr (obj, msg);
  }
}

function isNumeric(sText) {
  var validChars = "0123456789.";
  var isNumber = true;
  var char;
  for (var i = 0; i < sText.length && isNumber == true; i++) { 
    char = sText.charAt(i); 
    if (validChars.indexOf(char) == -1) isNumber = false;
  }
  return isNumber;
}

function wzdSave(frm){
	if (!frm) frm = document.forms[0];
	frm['tmp.action'].value='save'; 
	if (chkRequired(frm)) {
		frm.submit();
	}
}	

function wzdRemove(frm) {
	if (!frm) frm = document.forms[0];
	if (confirm('Confirma a exclusão?')) {
		frm['tmp.action'].value='remove';
		frm.submit();
	}
}