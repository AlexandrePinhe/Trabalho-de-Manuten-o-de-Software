var tocTab = new Array();var ir=0;
tocTab[ir++] = new Array ("1", "Introdu&ccedil;&atilde;o", "", "", "cicon1.gif", "cicon2.gif");
tocTab[ir++] = new Array ("1.1", "Pref&aacute;cio", "prefacio.html", "", "cicon9.gif", "cicon9.gif");
tocTab[ir++] = new Array ("1.2", "Pr&eacute;-Requisitos", "pre_requisitos.html", "", "cicon9.gif", "cicon9.gif");
tocTab[ir++] = new Array ("1.3", "O que &eacute; o WebIntegrator?", "secondtopic.html", "", "cicon9.gif", "cicon9.gif");
tocTab[ir++] = new Array ("1.4", "Como Funciona o WebIntegrator?", "funcionamento_wi.html", "", "cicon9.gif", "cicon9.gif");
tocTab[ir++] = new Array ("2", "Tutorial", "chapter2.html", "", "cicon1.gif", "cicon2.gif");
tocTab[ir++] = new Array ("2.1", "Acessando o WebIntegrator", "overview.html", "", "cicon9.gif", "cicon9.gif");
tocTab[ir++] = new Array ("2.2", "Criando um Projeto", "criando_projeto.html", "", "cicon9.gif", "cicon9.gif");
tocTab[ir++] = new Array ("2.3", "Defini&ccedil;&otilde;es do Projeto", "definicoes_projeto.html", "", "cicon9.gif", "cicon9.gif");
tocTab[ir++] = new Array ("2.4", "Criando e Dando Permiss&atilde;o a um Usu&aacute;rio", "criando_usuario.html", "", "cicon9.gif", "cicon9.gif");
tocTab[ir++] = new Array ("2.5", "Definindo Combos", "definindo_combos.html", "", "cicon9.gif", "cicon9.gif");
tocTab[ir++] = new Array ("2.6", "Definindo um Grid", "definindo_grid.html", "", "cicon9.gif", "cicon9.gif");
tocTab[ir++] = new Array ("2.7", "Criando uma P&aacute;gina", "criando_pagina.html", "", "cicon9.gif", "cicon9.gif");
tocTab[ir++] = new Array ("2.8", "Usando o WIzard de P&aacute;ginas", "usando_wizard.html", "", "cicon9.gif", "cicon9.gif");
tocTab[ir++] = new Array ("2.9", "Gerando o P&oacute;s-P&aacute;gina", "gerando_pos.html", "", "cicon9.gif", "cicon9.gif");
tocTab[ir++] = new Array ("2.10", "Alterando o Modelo do Grid", "alterando_grid.html", "", "cicon9.gif", "cicon9.gif");
tocTab[ir++] = new Array ("2.11", "Criando uma P&aacute;gina de Login", "pagina_login.html", "", "cicon9.gif", "cicon9.gif");
isContent = true,
isIndex = false,
showNumbers = false,
tocBehaviour = new Array(1,1),
tocScroll=false,
tocLinks = new Array(0,0);
var oldOnError = null;
var isDyn = navigator.userAgent.toLowerCase().indexOf("opera") == -1;
var isIE = navigator.appName.toLowerCase().indexOf("explorer") > -1;
var oldCurrentNumber = "", oldLastVisitNumber = "";
var toDisplay = new Array();
for (ir=0; ir<tocTab.length; ir++) {
toDisplay[ir] = tocTab[ir][0].split(".").length==1;
}
function windowErr() {
isDyn = false;
$hmtoc.location.href = "$wi_tutorial_content.htm";
window.onerror = oldOnError;
}
function reDisplay(currentNumber,tocChange,noLink,e) {
if (isIndex && ($hmtoc.location.href.substring($hmtoc.location.href.lastIndexOf("/")+1,$hmtoc.location.href.length) != "$wi_tutorial_kwindex.html")) { isIndex=false; isContent=true; }
if (currentNumber == "navIndex") { isContent=false; }
if (currentNumber == "navContent") { isIndex=false; isContent=true; }
if (e) {
ctrlKeyDown = (isIE) ? e.ctrlKey : (e.modifiers==2);
if (tocChange && ctrlKeyDown) tocChange = 2;
}
var currentNumArray = currentNumber.split(".");
var currentLevel = currentNumArray.length-1;
var currentIndex = 1;
if (currentNumber == "") currentNumber = top.location.href.substring(top.location.href.lastIndexOf("?")+1,top.location.href.length);
for (i=0; i<tocTab.length; i++) {
if ((tocTab[i][0] == currentNumber) || (tocTab[i][2] == currentNumber && tocTab[i][2] != "")) {
currentIndex = i;
currentNumber = tocTab[i][0];
currentNumArray = currentNumber.split(".");
currentLevel = currentNumArray.length-1;
break;
}
}
if (currentIndex < tocTab.length-1) {
nextLevel = tocTab[currentIndex+1][0].split(".").length-1;
currentIsExpanded = nextLevel > currentLevel && toDisplay[currentIndex+1];
}
else currentIsExpanded = false;
theHref = (noLink) ? "" : tocTab[currentIndex][2];
theTarget = tocTab[currentIndex][3];
for (i=1; i<tocTab.length; i++) {
if (tocChange) {
thisNumber = tocTab[i][0];
thisNumArray = thisNumber.split(".");
thisLevel = thisNumArray.length-1;
isOnPath = true;
if (thisLevel > 0) {
for (j=0; j<thisLevel; j++) {
isOnPath = (j>currentLevel) ? false : isOnPath && (thisNumArray[j] == currentNumArray[j]);
}
}
toDisplay[i] = (tocChange == 1) ? isOnPath : (isOnPath || toDisplay[i]);
if (thisNumber.indexOf(currentNumber+".")==0 && thisLevel > currentLevel) {
if (currentIsExpanded) toDisplay[i] = false;
else toDisplay[i] = (thisLevel == currentLevel+1);
}
}
}
if (!isContent && !isIndex) {
$hmtoc.location.href = "$wi_tutorial_kwindex.html";
isIndex = true;
}
if (isContent) {
if (!isDyn) {
if ($hmtoc.location.href.substring($hmtoc.location.href.lastIndexOf("/")+1,$hmtoc.location.href.length) != "$wi_tutorial_content.htm") $hmtoc.location.href = "$wi_tutorial_content.htm";
}
else {
oldOnError = window.onerror;
window.onerror = windowErr;
$hmtoc.document.clear();
$hmtoc.document.write("<html>\n\r<head></head>\n\r<style type=\"text/css\">\n\r       SPAN.heading1 { font-family: Arial,Helvetica; font-weight: normal; font-size: 10pt; color: #000000; text-decoration: none }\n\r       SPAN.heading2 { font-family: Arial,Helvetica; font-weight: normal; font-size: 9pt; color: #000000; text-decoration: none }\n\r       SPAN.heading3 { font-family: Arial,Helvetica; font-weight: normal; font-size: 8pt; color: #000000; text-decoration: none }\n\r       SPAN.heading4 { font-family: Arial,Helvetica; font-weight: normal; font-size: 8pt; color: #000000; text-decoration: none }\n\r       SPAN.heading5 { font-family: Arial,Helvetica; font-weight: normal; font-size: 8pt; color: #000000; text-decoration: none }\n\r       SPAN.heading6 { font-family: Arial,Helvetica; font-weight: normal; font-size: 8pt; color: #000000; text-decoration: none }\n\r\n\r       SPAN.hilight1 { font-family: Arial,Helvetica; font-weight: normal; font-size: 10pt; color: #FFFFFF; background: #002682; text-decoration: none }\n\r       SPAN.hilight2 { font-family: Arial,Helvetica; font-weight: normal; font-size: 9pt; color: #FFFFFF; background: #002682; text-decoration: none }\n\r       SPAN.hilight3 { font-family: Arial,Helvetica; font-weight: normal; font-size: 8pt; color: #FFFFFF; background: #002682; text-decoration: none }\n\r       SPAN.hilight4 { font-family: Arial,Helvetica; font-weight: normal; font-size: 8pt; color: #FFFFFF; background: #002682; text-decoration: none }\n\r       SPAN.hilight5 { font-family: Arial,Helvetica; font-weight: normal; font-size: 8pt; color: #FFFFFF; background: #002682; text-decoration: none }\n\r       SPAN.hilight6 { font-family: Arial,Helvetica; font-weight: normal; font-size: 8pt; color: #FFFFFF; background: #002682; text-decoration: none }\n\r</style>\n\r<body bgcolor=\"#FFFFFF\">\n\r<font face=\"Arial,Helvetica\" size=\"4\"><b>Tutorial do WebIntegrator 3.1.7</b></font><br>\n\r<font face=\"Arial,Helvetica\" size=\"2\">\n\r<a href=\"javaScript:parent.reDisplay(\'navIndex\',0,0);\">�ndice</a>\n\r</font><br><br><br>\n\r\n\r  <!-- Place holder for the TOC, do not delete the line below -->\n\r  ");
for (i=0; i<tocTab.length; i++) {
if (toDisplay[i]) {
thisNumber = tocTab[i][0];
thisNumArray = thisNumber.split(".");
thisLevel = thisNumArray.length-1;
isCurrent = (i == currentIndex);
if (i < tocTab.length-1) {
nextLevel = tocTab[i+1][0].split(".").length-1;
img = (thisLevel >= nextLevel) ? tocTab[i][4] : ((toDisplay[i+1]) ? tocTab[i][5] : tocTab[i][4]);
}
else img = tocTab[i][4];
thisTextClass = ((thisNumber==currentNumber)?("hilight"):("heading"));
thisNode = ((thisNumber==currentNumber)?("<div id=currentNode></div>"):(""));
$hmtoc.document.write(thisNode);
$hmtoc.document.write("<table border=0 cellspacing=0 cellpadding=2>");
$hmtoc.document.write("<tr><td width=" + ((thisLevel+1) * 20) + " align=right valign=top>");
$hmtoc.document.write("<a href=\"javaScript:history.go(0)\" onMouseDown=\"parent.reDisplay('" + thisNumber + "'," + tocBehaviour[0] + "," + tocLinks[0] + ",event)\">");
$hmtoc.document.write("<img src=\"" + img + "\" border=0></a>");
$hmtoc.document.write("</td><td align=left>");
$hmtoc.document.write("<a href=\"javaScript:history.go(0)\" onMouseDown=\"parent.reDisplay('" + thisNumber + "'," + tocBehaviour[1] + "," + tocLinks[1] + ",event)\">");
$hmtoc.document.write("<span class=\""  + thisTextClass + ((thisLevel>5) ? 6 : thisLevel+1) + "\">");
$hmtoc.document.write( ((showNumbers)?(thisNumber+" "):"") + tocTab[i][1]);
$hmtoc.document.write("</span></a>");
$hmtoc.document.writeln("</td></tr></table>");
window.onerror = oldOnError;
} //isDyn
} //isContent
}
}
if (!noLink) {
oldLastVisitNumber = oldCurrentNumber;
oldCurrentNumber = currentNumber;
}
if (isContent && isDyn) {
$hmtoc.document.write("\n\r\n\r<hr><font face=\"Arial,Helvetica\" size=\"1\">&copy; 2001-2005  ITX - Tecnologia da Informa&ccedil;&atilde;o Ltda.</font>\n\r</body>\n\r</html>\n\r");
$hmtoc.document.close();
if ((tocScroll) && (thisNode)) $hmtoc.document.all["currentNode"].scrollIntoView();
}
if (theHref)
if (theTarget=="top") top.location.href = theHref;
else if (theTarget=="parent") parent.location.href = theHref;
else if (theTarget=="blank") open(theHref,"");
else $hmcontent.location.href = theHref;
}
