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

var DESkeys = new Array(0);

function setKeyDES(key) {
  if (key==null) key="";
  var hexkey="";
  for (var i=0;i<key.length;i++) {
    var num = key.charCodeAt(i);
    hexkey=hexkey+num.toString(16);
  }
  if (hexkey.length>16) hexkey = hexkey.substring(0,16);
  else while (hexkey.length<16) hexkey=hexkey+"00";
  DESkeys = keyGeneration(hexkey);
}

function encodeDES(text) {
  if ((text==null)||(DESkeys.length==0)) text="";
  var resp="";
  while (text.length>0) {
    var seg = text.substring(0,8);
    while (seg.length<8) seg=seg+' ';
    text = text.substring(8,text.length);
    var hex="";
    for ( var i=0;i<seg.length;i++) {
      var num = seg.charCodeAt(i);
      var hexnum = num.toString(16);
      if (hexnum.length<2) hexnum="0"+hexnum;
      hex=hex+hexnum;
    }
    resp = resp+encodeProtected(hex);
  }
  return resp;
}

function decodeDES(text) {
  if ((text==null)||(DESkeys.length==0)) text="";
  var range="0123456789abcdef";
  var hex="";
  while (text.length>0) {
    var seg = text.substring(0,16).toLowerCase();
    while (seg.length<16) seg=seg+"0"; 
    text = text.substring(16,text.length);
    var tested="";
    for ( var i=0;i<seg.length;i++) {
      if (range.indexOf(seg.charAt(i))>-1) tested=tested+seg.charAt(i);
      else tested=tested+"0";
    }
    hex = hex+decodeProtected(tested);
  }
  var resp="";
  for ( var i=0;i<hex.length;i=i+2) {
    var hexnum = hex.charAt(i)+""+hex.charAt(i+1);
    var num = parseInt(hexnum,16);
    resp=resp+String.fromCharCode(num);
  }
  return resp;
}

function encodeProtected(hex16) {
  var bin = hexToBinary(hex16);
  var IP = dataPermute(bin,1,true);
  var Lvector = new Array(17);
  Lvector[0] = IP.substring(0,32);
  var Rvector = new Array(17);
  Rvector[0] = IP.substring(32,64);
  for (var i=1;i<=16;i++) {
    Lvector[i] = Rvector[i-1];
    var func = dataFunction(Lvector,Rvector,i,true);
    var add="";
    for (var a=0;a<32;a++) {
      var n1 = Lvector[i-1].charAt(a);
      var n2 = func.charAt(a);
      if (n1==n2) add=add+"0";
      else add=add+"1";
    }
    Rvector[i] = add;
  }
  var encbin = dataPermute(Rvector[16]+Lvector[16],3,true);
  return binToHex(encbin);
}

function decodeProtected(hex16) {
  var binario = hexToBinary(hex16);
  var encbin = dataPermute(binario,3,false);
  var Lvector = new Array(17);
  Lvector[16] = encbin.substring(32,64);
  var Rvector = new Array(17);
  Rvector[16] = encbin.substring(0,32);
  for (var i=15;i>=0;i--) {
    Rvector[i]=Lvector[i+1];
    var func = dataFunction(Lvector,Rvector,i,false);
    var add="";
    for (var a=0;a<32;a++) {
      var n1 = Rvector[i+1].charAt(a);
      var n2 = func.charAt(a);
      if (n1==n2) add=add+"0";
      else add=add+"1";
    }
    Lvector[i] = add;
  }
  var join = Lvector[0]+Rvector[0];
  var source = dataPermute(join,1,false);
  return binToHex(source);
}

function hexToBinary(hex) {
  var resp = "";
  for (var i=0;i<hex.length;i++) {
    var let = hex.charAt(i);
    var num = parseInt(let+"",16);
    var letbin = num.toString(2);
    while (letbin.length<4) letbin="0"+letbin;
    resp=resp+letbin;
  }
  return resp;
}

function binToHex(bin) {
  var resp = "";
  for (var i=1;i<=16;i++) {
    var seg = bin.substring((i*4)-4,(i*4));
    var code = parseInt(seg,2);
    resp=resp+code.toString(16);
  }
  return resp;
}

function keyGeneration(hexkey) {
  if (hexkey==null) hexkey="";
  var keybinary = hexToBinary(hexkey);
  var keypermute = keyPermute(keybinary,1);
  return keyCreateSubKeys(keypermute);
}

function keyCreateSubKeys(permute) {
   var C = permute.substring(0,28);
   var D = permute.substring(28,56);
   Cvector = new Array(17);
   Cvector[0] = C;
   var Dvector = new Array(17);
   Dvector[0] = D;
   for (var i=1;i<=16;i++) {
      var qnt=2;
      if ((i==1)||(i==2)||(i==9)||(i==16)) qnt=1;
      Cvector[i] = keyLeftShift(Cvector[i-1],qnt);
      Dvector[i] = keyLeftShift(Dvector[i-1],qnt);
   }
   var Kvector = new Array(16);
   for (var i=0;i<16;i++) {
     var cn = Cvector[i+1];
     var dn = Dvector[i+1];
     Kvector[i] = keyPermute(cn+dn,2);
   }
   return Kvector;
}

function keyLeftShift(binary, qnt) {
  var p1 = binary.substring(0,qnt);
  var p2 = binary.substring(qnt,binary.length);
  return p2+p1;
}

function dataFunction(Lvector, Rvector, n, encode) {
  if (!encode) n=n+1;
  var E = dataExpandKey(Rvector[n-1]);
  var K = DESkeys[n-1];
  var resp = "";
  for (var i=0;i<48;i++) {
    var c1 = E.charAt(i);
    var c2 = K.charAt(i);
    if (c1==c2) resp=resp+"0";
    else resp=resp+"1";
  }
  var resp2 = "";
  for (var i=1;i<=8;i++) {
    var seg = resp.substring((6*i)-6,(6*i));
    resp2=resp2+receiveS(seg,i);
  }
  return dataPermute(resp2,2,true);
}

function keyPermute(keybin, num) {
  var matrix="";
  if (num==1) {
        matrix = "57,49,41,33,25,17,9,"+"1,58,50,42,34,26,18,"+
        "10,2,59,51,43,35,27,"+"19,11,3,60,52,44,36,"+"63,55,47,39,31,23,15,"+
        "7,62,54,46,38,30,22,"+"14,6,61,53,45,37,29,"+"21,13,5,28,20,12,4";
  } else if (num==2) {
        matrix = "14,17,11,24,1,5,"+"3,28,15,6,21,10,"+
        "23,19,12,4,26,8,"+"16,7,27,20,13,2,"+"41,52,31,37,47,55,"+
        "30,40,51,45,33,48,"+"44,49,39,56,34,53,"+"46,42,50,36,29,32";
  }
  var resp="";
  var count = strCount(matrix,',')+1;
  for (var i=1;i<=count;i++) {
    var pos = parseInt(strPiece(matrix,",",i));
    resp=resp+keybin.charAt(pos-1);
  }
  return resp;
}

function dataPermute(keybin, num, encode) {
  var matrix="";
  if (num==1) {
    // IP
    matrix = "58,50,42,34,26,18,10,2,"+"60,52,44,36,28,20,12,4,"+
    "62,54,46,38,30,22,14,6,"+"64,56,48,40,32,24,16,8,"+"57,49,41,33,25,17,9,1,"+
    "59,51,43,35,27,19,11,3,"+"61,53,45,37,29,21,13,5,"+"63,55,47,39,31,23,15,7";
  } else if (num==2) {
    // P
    matrix = "16,7,20,21,"+"29,12,28,17,"+"1,15,23,26,"+
      "5,18,31,10,"+"2,8,24,14,"+"32,27,3,9,"+"19,13,30,6,"+"22,11,4,25";
  } else if (num==3) {
    // IP-1
    matrix = "40,8,48,16,56,24,64,32,"+"39,7,47,15,55,23,63,31,"+
      "38,6,46,14,54,22,62,30,"+"37,5,45,13,53,21,61,29,"+"36,4,44,12,52,20,60,28,"+
      "35,3,43,11,51,19,59,27,"+"34,2,42,10,50,18,58,26,"+"33,1,41,9,49,17,57,25";
  }
  var resp="";
  if (encode) {
    var count = strCount(matrix,',')+1;
    for (var i=1;i<=count;i++) {
      var pos = parseInt(strPiece(matrix,",",i));
      resp=resp+keybin.charAt(pos-1);
    }
  } else {
    var vetor = new Array(64);
    if (num==2) vetor = new Array(32);
    var count = strCount(matrix,',')+1;
    for (var i=1;i<=count;i++) {
      var pos = parseInt(strPiece(matrix,",",i));
      vetor[pos-1]=keybin.charAt(i-1);
    }
    for (var i=0;i<vetor.length;i++) resp=resp+vetor[i];
  }
  return resp;
}

function dataExpandKey(keyvector) {
  var matrix = "32,1-5,4,5-9,8,9-13,12,13-17,"+
     "16,17-21,20,21-25,24,25-29,28,29-32,1";
  var resp="";
  var count = strCount(matrix,',')+1;
  for (var i=1;i<=count;i++) {
    var code = strPiece(matrix,",",i);
    if (code.indexOf("-")==-1) {
      var pos = parseInt(code);
      resp=resp+keyvector.charAt(pos-1);
    } else {
      var pos1 = parseInt(strPiece(code,"-",1));
      var pos2 = parseInt(strPiece(code,"-",2));
      resp=resp+keyvector.substring(pos1-1,pos2);
    }
  }
  return resp;
}

function receiveS(digits, s) {
  var matrix = matrixS(s);
  var istr = digits.charAt(0)+""+digits.charAt(5);
  var ia = parseInt(istr,2);
  var jstr = digits.substring(1,5);
  var j = parseInt(jstr,2);
  var code = strPiece(matrix[ia],",",j+1);
  var icode = parseInt(code);
  var hex = icode.toString(16);
  return hexToBinary(hex.charAt(0)+"");
}

function matrixS(num) {
  var matrix = new Array(4);
  if (num==1) {
    matrix[0]="14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7";
    matrix[1]="0,15,7,4,14,2,13,1,10,6,12,11,9,5,3,8";
    matrix[2]="4,1,14,8,13,6,2,11,15,12,9,7,3,10,5,0";
    matrix[3]="15,12,8,2,4,9,1,7,5,11,3,14,10,0,6,13";
    return matrix;
  } else if (num==2)  {
    matrix[0]="15,1,8,14,6,11,3,4,9,7,2,13,12,0,5,10";
    matrix[1]="3,13,4,7,15,2,8,14,12,0,1,10,6,9,11,5";
    matrix[2]="0,14,7,11,10,4,13,1,5,8,12,6,9,3,2,15";
    matrix[3]="13,8,10,1,3,15,4,2,11,6,7,12,0,5,14,9";
    return matrix;
  } else if (num==3) {
    matrix[0]="10,0,9,14,6,3,15,5,1,13,12,7,11,4,2,8";
    matrix[1]="13,7,0,9,3,4,6,10,2,8,5,14,12,11,15,1";
    matrix[2]="13,6,4,9,8,15,3,0,11,1,2,12,5,10,14,7";
    matrix[3]="1,10,13,0,6,9,8,7,4,15,14,3,11,5,2,12";
    return matrix;
  } else if (num==4) {
    matrix[0]="7,13,14,3,0,6,9,10,1,2,8,5,11,12,4,15";
    matrix[1]="13,8,11,5,6,15,0,3,4,7,2,12,1,10,14,9";
    matrix[2]="10,6,9,0,12,11,7,13,15,1,3,14,5,2,8,4";
    matrix[3]="3,15,0,6,10,1,13,8,9,4,5,11,12,7,2,14";
    return  matrix;
  } else if (num==5) {
    matrix[0]="2,12,4,1,7,10,11,6,8,5,3,15,13,0,14,9";
    matrix[1]="14,11,2,12,4,7,13,1,5,0,15,10,3,9,8,6";
    matrix[2]="4,2,1,11,10,13,7,8,15,9,12,5,6,3,0,14";
    matrix[3]="11,8,12,7,1,14,2,13,6,15,0,9,10,4,5,3";
    return matrix;
  } else if (num==6) {
    matrix[0]="12,1,10,15,9,2,6,8,0,13,3,4,14,7,5,11";
    matrix[1]="10,15,4,2,7,12,9,5,6,1,13,14,0,11,3,8";
    matrix[2]="9,14,15,5,2,8,12,3,7,0,4,10,1,13,11,6";
    matrix[3]="4,3,2,12,9,5,15,10,11,14,1,7,6,0,8,13";
    return matrix;
  } else if (num==7) {
    matrix[0]="4,11,2,14,15,0,8,13,3,12,9,7,5,10,6,1";
    matrix[1]="13,0,11,7,4,9,1,10,14,3,5,12,2,15,8,6";
    matrix[2]="1,4,11,13,12,3,7,14,10,15,6,8,0,5,9,2";
    matrix[3]="6,11,13,8,1,4,10,7,9,5,0,15,14,2,3,12";
    return matrix;
  } else if (num==8) {
    matrix[0]="13,2,8,4,6,15,11,1,10,9,3,14,5,0,12,7";
    matrix[1]="1,15,13,8,10,3,7,4,12,5,6,11,0,14,9,2";
    matrix[2]="7,11,4,1,9,12,14,2,0,6,10,13,15,3,5,8";
    matrix[3]="2,1,14,7,4,10,8,13,15,12,9,0,3,5,6,11";
    return matrix;
  }
  return null;
}

/*
  Funçoes auxiliares 
*/

function strCount(text, let) {
  var total=0;
  for (var i=0;i<text.length;i++) {
    if (text.charAt(i)==let) total=total+1;
  }
  return total;
}

function strPiece(text, let, piece) {  
  var p1=0;
  var p2=text.length;
  var count=1;
  var pos=0;
  while ((count<=piece)&&(pos<text.length)) {
    if (text.charAt(pos)==let) {
      if (count==piece) { p2=pos; }
      else { p1=pos+1; }
      count=count+1;
    }
    pos = pos+1;
  }
  if (count<piece) return "";
  return text.substring(p1,p2);
}