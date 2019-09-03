<html>
<head>
<%@ page import="java.io.*,java.util.*,java.text.*"%><%
String label = "JSP Thread Monitor";
String name = Thread.currentThread().getName();
if (!name.endsWith(label)) {
  Thread.currentThread().setName(name + " ^ " + label);
}
Thread[] list = new Thread[1000];
ThreadGroup g = Thread.currentThread().getThreadGroup();
while (g.getParent() != null) {
  g = g.getParent();
}
int max = g.enumerate(list);
SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
String title = max + " - " + sdf.format(new Date());
FileWriter w = null;
%>
<title><%= title %> - Threads</title>
<% if(max<200){ %>
  <META HTTP-EQUIV="refresh" CONTENT="30">
<% } else {
 String path = application.getRealPath("/WEB-INF/logs");
 SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMMdd_HHmmss_SSS");
 w = new FileWriter(path + "/threads_" + sdf2.format(new Date())+ ".log");
 w.write("<![CDATA[");
}
%>
</head>
<body>
<%
out.println("<xmp>");
out.println(max + " Threads\n");
for (int i=0;i<max;i++) {
   out.println((i+1)+ " - " + list[i].getName());
   if (w != null) {
      w.write((i+1)+ " - " + list[i].getName() + "<br>\n");
   }
}
out.println("</xmp>");
if (w != null) {
  w.write("]]>");
  w.close();
}
%>
</body>
</html>
