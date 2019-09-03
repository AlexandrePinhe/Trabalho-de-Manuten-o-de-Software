<%@page import="br.com.itx.builder.extra.*"%>
<html>
<head>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="must-revalidate, no-store"/>
<meta http-equiv="expires" content="0">
<title>SQL Counter</title>
</head>
<body style="font-family:Arial">
<h3>SQL Counter - <%=SqlCounter.getProjectName(session)%></h3> 
<%
SqlCounter.execute(application, pageContext);
%>
</body>
</html>