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

// Encode and Decode Data using DES 

var DESkeys1 = new Array(0);
var DESkeys2 = new Array(0);

function setKeyDES3(key1, key2) {
  setKeyDES(key1);
  DESkeys1 = DESkeys;
  setKeyDES(key2);
  DESkeys2 = DESkeys;
}

function encodeDES3(text) {
  if ((text==null)||(DESkeys1.length==0)) text="";
  DESkeys = DESkeys1;
  var ct1 = encodeDES(text);
  var ct2="";
  DESkeys = DESkeys2;
  for (var i=1;i<=ct1.length/16;i++) {
    var seg = ct1.substring((i*16)-16,(i*16));
    ct2 = ct2+decodeProtected(seg);
  }
  var ctr2 = mixRotate(ct2,true);
  var resp = "";
  DESkeys = DESkeys1;
  for (var i=1;i<=ctr2.length/16;i++) {
    var seg = ctr2.substring((i*16)-16,(i*16));
    resp = resp+encodeProtected(seg);
  }
  return resp;
}

function decodeDES3( text) {
  if ((text==null)||(DESkeys1.length==0)) text="";
  var resto = text.length%2;
  for (var a=1;a<=resto;a++) text=text+"0";
  var ct1 = "";
  DESkeys = DESkeys1;
  for (var i=1;i<=text.length/16;i++) {
    var seg = text.substring((i*16)-16,(i*16));
    ct1 = ct1+decodeProtected(seg);
  }
  var ctr1 = mixRotate(ct1,false);
  var ct2="";
  DESkeys = DESkeys2;
  for (var i=1;i<=ct1.length/16;i++) {
    var seg = ctr1.substring((i*16)-16,(i*16));
    ct2 = ct2 + encodeProtected(seg);
  }
  DESkeys = DESkeys1;
  return decodeDES(ct2);
}

function mixRotate(hexString, encode) {
  var resp="";
  var loop = hexString.length/8;
  if (encode) {
    for (var a=0;a<8;a++) {
      for (var i=0;i<loop;i++) {
        resp=resp+hexString.charAt((i*8)+a);
      }
    }
    return resp;
  } else {
    for (var a=0;a<loop;a++) {
      for (var i=0;i<8;i++) {
        resp=resp+hexString.charAt((i*loop)+a);
      }
    }
    return resp;
  }
}