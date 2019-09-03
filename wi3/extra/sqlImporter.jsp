<%@page import="br.com.itx.builder.extra.*"%>
<html>
<head>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="must-revalidate, no-store"/>
<meta http-equiv="expires" content="0">
<title>SQL Importer</title>
</head>
<body style="font-family:Arial">
<h3>SQL Importer - <%=SqlManager.getProjectName(session)%></h3> 
<form action="sqlImporter.jsp" method="post">
Diretório:<br>
<input type="text" name="folder" size="60" 
  value="<%=SqlManager.getFolder(request)%>">
<input type="submit" value="Executar">
</form>
<pre>
<%
SqlManager.doImport(application, pageContext);
%>
</pre>
</body>
</html>