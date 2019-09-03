<% response.setStatus(HttpServletResponse.SC_OK); %>
<html>
<head>
   <meta http-equiv="pragma" content="no-cache">
   <META HTTP-EQUIV="cache-control" CONTENT="must-revalidate, no-store"/>
   <meta http-equiv="expires" content="0">
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
   <LINK REL=StyleSheet HREF="builder.css" TYPE="text/css">
</head>
<body>
<div class='texto' style='width:95%; color:red; font-size:12pt; text-align:justify'>
  <b><%
   String msg = (String) request.getAttribute("javax.servlet.error.message");
   msg = br.com.itx.util.StringA.change(msg,"\r","");
   out.println(br.com.itx.util.StringA.change(msg,"\n","<br>"));
  %></b>
</div>
</body></html>
