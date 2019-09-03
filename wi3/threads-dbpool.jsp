<html>
<head>
<%@ page import="java.io.*,java.util.*,java.text.*,br.com.itx.util.*,br.com.itx.database.*"%><%
SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
String date = sdf.format(new Date());
String URI = request.getRequestURI();
String projId = br.com.itx.util.StringA.piece(URI, "/", 2);
%>
<title><%= date %> - Database Pool Threads</title>
<META HTTP-EQUIV="refresh" CONTENT="30">
</head>
<body>
<%
SimpleDateFormat sdf2 = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
String strLastTime = "none";
if (DatabaseThread.lastCycleTime != null) {
	strLastTime = sdf2.format(DatabaseThread.lastCycleTime);
}
String comp = "<strong>" + projId + "</strong> (5 minutes) - Last time: " + strLastTime;
out.println("Database Pool Threads em " + comp + "<br>\n");
String fullTitle = "";
String[] keyList = DatabaseManager.showThreadPoolKeys();
for (int i=0;i<keyList.length;i++) {
	String key = keyList[i];
	String titleKey = StringA.piece(key,"-",1,2);
	out.println("<br><strong>" + titleKey + "</strong>\n");
	DatabaseThreadNode[] connectionList = DatabaseManager.showConnections(key);
	out.println("<xmp>");
	if (!fullTitle.equals("")) fullTitle += "|";
	fullTitle += connectionList.length;
	for (int c=0;c<connectionList.length;c++) {
		DatabaseThreadNode node = connectionList[c];
		DatabaseConnection dbcon = node.getDatabaseConnection();
		String timeout = dbcon.getConnectionTimeout() + " min";
		String maxCon = dbcon.getMaxConnections() + " max";
		String detail = "(" + timeout + " - " + maxCon + ")";
		Date dt = new Date(node.getMaxTime());
		String maxTime =  sdf.format(dt) + "  " + detail;
		out.println((c+1)+ " - " + node.isInUse() + " - " + maxTime);
	}
	out.println("</xmp>");
}
fullTitle += "-" + date;
%>
<script>document.title='<%= fullTitle %>';</script>
</body>
</html>
