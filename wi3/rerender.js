/*
 * WebIntegrator - Ferramenta de produtividade Java
 * Copyright (c) 2001-2008 Itx Tecnologia da Informa��o Ltda.
 *
 * Este programa � software livre; voc� pode redistribu�-lo e/ou modific�-lo 
 * sob os termos da GNU GENERAL PUBLIC LICENSE (GPL) conforme publicada pela 
 * Free Software Foundation; vers�o 2 da Licen�a.
 * Este programa � distribu�do na expectativa de que seja �til, por�m, SEM 
 * NENHUMA GARANTIA; nem mesmo a garantia impl�cita de COMERCIABILIDADE OU 
 * ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
 * 
 * Consulte a GNU GPL para mais detalhes.
 * Voc� deve ter recebido uma c�pia da GNU GPL junto com este programa; se n�o, 
 * veja em http://www.gnu.org/licenses/ 
 */

// Variaveis com referencias a objetos
var linkRerender;
var formRerender;
// Variaveis com valores anteriores
var hrefRerender;
var targetRerender;
var prevRerender;
var actionRerender;
var tmpRerender;

function rerenderLink(link, rerender, action, doPos, msg) {
  if (msg != null) {
    if (!confirm(msg)) return false;
  }  
  rerenderIndicator(document, 'block');
  linkRerender = link;
  hrefRerender = link.href;
  targetRerender = link.target;
  if (link.href.indexOf('?') == -1) {
    link.href += '?';
  } else {
    link.href += '&';
  }
  link.href += 'tmp.rerender=' + rerender;
  if (doPos) {
    link.href += '&wi.page.prev=' + pageRerender;
  }		  
  if (action != null) {
    link.href += '&tmp.action=' + action;
  }
  link.target = "rerender_iframe";
  setTimeout("restoreRerenderForm()", 1000);
}

function rerenderSubmit(form, rerender, action, doPos, msg) {
  if (msg != null) {
    if (!confirm(msg)) return false;
  }  
  rerenderIndicator(document, 'block');
  formRerender = form;
  targetRerender = form.target;
  if (doPos == false && prevRerender == null) {
    prevRerender = form['wi.page.prev'].value;
    form['wi.page.prev'].value = "";
  }		  
  if (action != null && actionRerender == null) {
    actionRerender = action;
    form['tmp.action'].value = action;
  }
  tmpRerender = document.createElement("input");
  tmpRerender.setAttribute("type", "hidden");
  tmpRerender.setAttribute("name", "tmp.rerender");
  tmpRerender.setAttribute("value", rerender);
  formRerender.appendChild(tmpRerender);
  formRerender.target = "rerender_iframe";
  formRerender.submit();
  setTimeout("restoreRerenderForm()", 500);
}

function restoreRerenderForm() {
  try {
    // Fica num try para evitar erro quando o link 
    // tambem eh re-renderizado. 
    linkRerender.target = targetRerender;
    linkRerender.href = hrefRerender;
  } catch (err) { }
  try {
    // Fica num try para evitar erro quando o formulario 
    // tambem eh re-renderizado.
    // No FORM � obrigat�rio que o target venha primeiro.
    formRerender.target = targetRerender;
    formRerender.removeChild(tmpRerender);
    if (prevRerender != null) {
      formRerender['wi.page.prev'].value = prevRerender;
    }
    if (actionRerender != null) {
      formRerender['tmp.action'].value = "";
    }
  } catch (err) { }
  linkRerender = null;
  formRerender = null;
  hrefRerender = null;
  targetRerender = null;
  prevRerender = null;
  actionRerender = null;
}

function rerenderResponse() {
  var rerenders = areasRerender.split(",");
  for (i = 0; i < rerenders.length; i++) {
    rerenderArea(rerenders[i].trim());
  }
  rerenderIndicator(parent.document, 'none');
  try {
    parent.rerenderOnComplete();
  } catch (err) { }
}

function rerenderArea(rerender) {
  var component = document.getElementById(rerender);
  if (component) {
    var content = component.innerHTML;
    parent.document.getElementById(rerender).innerHTML = content;
  }	
}

function rerenderIndicator(doc, type) {
  var indicator = doc.getElementById('rerenderIndicator');
  if (indicator) {
    indicator.style.display = type;
  }
}

String.prototype.trim = function() {
  return this.replace(/^\s*/, "").replace(/\s*$/, "");
}