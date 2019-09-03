<%
	String datasourceName = "java:comp/env/jdbc/wireport";
	java.sql.Connection conn = null;
	try {
		javax.naming.Context jndiContext = new javax.naming.InitialContext();
		javax.sql.DataSource ds = (javax.sql.DataSource) jndiContext.lookup(datasourceName);
		conn = ds.getConnection();
		conn.setAutoCommit(true);
		java.sql.ResultSet rs = conn.createStatement().executeQuery("select 'OK'");
		rs.next();
		out.println(rs.getString(1));
	} catch (Exception err) {
		err.printStackTrace(new java.io.PrintWriter(out));
	}

%>
