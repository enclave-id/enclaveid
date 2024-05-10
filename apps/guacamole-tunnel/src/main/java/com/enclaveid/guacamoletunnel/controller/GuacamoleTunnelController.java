package com.enclaveid.guacamoletunnel.controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.apache.guacamole.GuacamoleException;
import org.apache.guacamole.net.GuacamoleSocket;
import org.apache.guacamole.net.GuacamoleTunnel;
import org.apache.guacamole.net.InetGuacamoleSocket;
import org.apache.guacamole.net.SimpleGuacamoleTunnel;
import org.apache.guacamole.protocol.ConfiguredGuacamoleSocket;
import org.apache.guacamole.protocol.GuacamoleConfiguration;
import org.apache.guacamole.servlet.GuacamoleHTTPTunnelServlet;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

// TODO: CORS configuration for production
@RestController
@CrossOrigin(origins = "http://localhost:4200", methods = {
    RequestMethod.GET,
    RequestMethod.POST }, allowedHeaders = "*", allowCredentials = "true", exposedHeaders = "Guacamole-Tunnel-Token")
public class GuacamoleTunnelController extends GuacamoleHTTPTunnelServlet {

  @Value("${guacd.host:enclaveid-guacamole-guacd.default.svc.cluster.local}")
  private String guacdHost;

  @Value("${guacd.port:4822}")
  private int guacdPort;

  @Override
  @RequestMapping(method = { RequestMethod.GET, RequestMethod.POST }, produces = "application/xml")
  public GuacamoleTunnel doConnect(HttpServletRequest request) throws GuacamoleException {

    String connectionId = request.getHeader("connectionId");
    String hostname = request.getHeader("hostname");
    String password = request.getHeader("password");

    if (connectionId == null || hostname == null || password == null) {
      throw new GuacamoleException("Missing required parameters in HTTP request");
    }

    GuacamoleConfiguration config = new GuacamoleConfiguration();
    // config.setConnectionID(connectionId);
    config.setProtocol("rdp");
    config.setParameter("port", "3389");

    config.setParameter("hostname", hostname);
    config.setParameter("username", "abc");
    config.setParameter("password", password);
    config.setParameter("ignore-cert", "true");
    config.setParameter("width", "1920");
    config.setParameter("height", "1080");

    // Connect to guacd, proxying a connection to the RDP server above
    GuacamoleSocket socket = new ConfiguredGuacamoleSocket(
        new InetGuacamoleSocket(guacdHost, guacdPort),
        config);

    // Create tunnel from now-configured socket
    return new SimpleGuacamoleTunnel(socket);
  }

  @Override
  @RequestMapping(path = "tunnel", method = { RequestMethod.POST,
      RequestMethod.GET }, produces = "application/xml")
  protected void handleTunnelRequest(javax.servlet.http.HttpServletRequest request,
      javax.servlet.http.HttpServletResponse response) throws ServletException {
    super.handleTunnelRequest(request, response);
  }

}
