package fi.metatavu.jouko.api.files;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import javax.transaction.Transactional;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;

import fi.metatavu.jouko.api.device.DeviceCommunicator;
import fi.metatavu.jouko.api.device.Laiteviestit.Katkot.Katko;

/**
 * Servlet that handles file upload requests
 * 
 * @author Ville Koivukangas
 */
@RequestScoped
@MultipartConfig
@Transactional
@WebServlet (urlPatterns = "/fileUpload")
public class FileUploadServlet extends HttpServlet {
  
  private static final String FILE_REF = "fileRef";

  private static final long serialVersionUID = 4209609403222008762L;
  
  @Inject
  private DeviceCommunicator deviceCommunicator;
  
  @Inject
  private Logger logger;
 
  @Override
  @Transactional
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    try {
      Part file = req.getPart("file");
      String version = req.getParameter("version");
      String name = req.getParameter("filename");
      
      if (file == null) {
        resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return;
      }
      
      InputStream inputStream = file.getInputStream();
      System.out.println(inputStream.available());
      
      byte[] buffer = new byte[128];
      List<FilePart> fileParts = new ArrayList<FilePart>();
      
      int len;
      while ((len = inputStream.read(buffer)) != -1) {
          String partString = new String(buffer, "UTF-8");
          
          FilePart filePart = new FilePart();
          filePart.setFilePart(Base64.encodeBase64String(partString.getBytes()));
          filePart.setSize(len);
          
          fileParts.add(filePart);
      }
      
      deviceCommunicator.notifyUpdate(name, Integer.parseInt(version), fileParts);
      resp.setStatus(204);
      resp.getWriter().println("Success");
    } catch (IOException | ServletException e) {
      logger.error("Upload failed on internal server error", e);
      resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }
  }
  
}