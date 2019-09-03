<%@page import="java.io.*, java.util.*, br.com.itx.report.*" %>
<h3>Compilando relatórios:</h3>
<pre>
<%
	String reportPath = pageContext.getServletContext().getRealPath("/WEB-INF/definitions/reports");
	File[] files = new File(reportPath).listFiles();
	if (null != files) {
		List l = new ArrayList();
		for (File f : files) {
			if (f.getName().endsWith(".jrxml")) {
				l.add(f.getAbsolutePath());
			}
		}	
		String[] s = new String[l.size()];
		l.toArray(s);
		ReportFunction.compile(s, (Writer) pageContext.getOut());
	}
%>
</pre>