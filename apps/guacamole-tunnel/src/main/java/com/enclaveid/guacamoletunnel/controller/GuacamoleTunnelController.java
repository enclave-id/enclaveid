package com.enclaveid.guacamoletunnel.controller;

import org.apache.guacamole.GuacamoleException;
import org.apache.guacamole.net.GuacamoleSocket;
import org.apache.guacamole.net.GuacamoleTunnel;
import org.apache.guacamole.net.InetGuacamoleSocket;
import org.apache.guacamole.net.SimpleGuacamoleTunnel;
import org.apache.guacamole.protocol.ConfiguredGuacamoleSocket;
import org.apache.guacamole.protocol.GuacamoleConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/tunnel")
@CrossOrigin(origins = "http://localhost:4200", methods = { RequestMethod.GET,
    RequestMethod.POST }, allowedHeaders = "*", allowCredentials = "true")
public class GuacamoleTunnelController {

  @Value("${guacd.host:localhost}")
  private String guacdHost;

  @Value("${guacd.port:4822}")
  private int guacdPort;

  @RequestMapping(method = { RequestMethod.GET, RequestMethod.POST })
  public GuacamoleTunnel connect(HttpServletRequest request) throws GuacamoleException {

    String password = request.getHeader("password");
    String connectionId = request.getHeader("connectionId");

    if (password == null) {
      throw new GuacamoleException("Password not provided.");
    }

    // VNC connection information
    GuacamoleConfiguration config = new GuacamoleConfiguration();
    config.setConnectionID(connectionId);

    config.setParameter("hostname", "localhost");
    config.setParameter("port", "5901");
    config.setParameter("password", password);

    // Connect to guacd, proxying a connection to the VNC server above
    GuacamoleSocket socket = new ConfiguredGuacamoleSocket(
        new InetGuacamoleSocket(guacdHost, guacdPort),
        config);

    // Create tunnel from now-configured socket
    return new SimpleGuacamoleTunnel(socket);
  }
}
