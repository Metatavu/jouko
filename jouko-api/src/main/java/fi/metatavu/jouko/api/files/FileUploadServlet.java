package fi.metatavu.jouko.api.files;

import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

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
      String path = "/tmp";
      Part filePart = req.getPart("file");
      String version = req.getParameter("version");
      String name = req.getParameter("filename");
      String communicationChannel = req.getParameter("channel");
      int amountOfBytes = 128;
      
      if (communicationChannel != null) {
        if (communicationChannel.toLowerCase().equals("lora")) {
          amountOfBytes = 18;
        }
      }
      
      OutputStream out = null;
      InputStream filecontent = null;
      final PrintWriter writer = resp.getWriter();

      try {
          out = new FileOutputStream(new File(path + File.separator
                  + name));
          filecontent = filePart.getInputStream();

          int read = 0;
          final byte[] bytes = new byte[1024];

          while ((read = filecontent.read(bytes)) != -1) {
              out.write(bytes, 0, read);
          }
          writer.println("New file " + name + " created at " + path);
      } catch (FileNotFoundException fne) {
          writer.println("You either did not specify a file to upload or are "
                  + "trying to upload a file to a protected or nonexistent "
                  + "location.");
          writer.println("<br/> ERROR: " + fne.getMessage());
      } finally {
          if (out != null) {
              out.close();
          }
          if (filecontent != null) {
              filecontent.close();
          }
          if (writer != null) {
              writer.close();
          }
      }
      
      File file = new File(path  + "/" + name);
      StringBuilder fileContents = new StringBuilder((int)file.length());        

      try (Scanner scanner = new Scanner(file)) {
          while(scanner.hasNextLine()) {
              fileContents.append(scanner.nextLine() + System.lineSeparator());
          }
      }
      
      String fileString = fileContents.toString();
      byte[] bytes = fileString.getBytes("UTF-8");
      ByteArrayInputStream in = new ByteArrayInputStream(bytes);
      
      int length = bytes.length;
      int start = 0;
      
      List<FilePart> fileParts = new ArrayList<FilePart>();
      
      while (length > 0) {
        String partString = null;
        int minus = 0;
        
        if (length >= amountOfBytes) {
          byte[] tmpArray = Arrays.copyOfRange(bytes, start, start + amountOfBytes);
          partString = new String(tmpArray, "UTF-8");
          start = start + amountOfBytes;
          minus = amountOfBytes;
        } else {
          byte[] tmpArray = Arrays.copyOfRange(bytes, start, start + length);
          partString = new String(tmpArray, "UTF-8");
          start = start + length;
          minus = length;
        }
        
        FilePart stringfilePart = new FilePart();
        byte[] utf8Bytes = partString.getBytes("UTF-8");
        stringfilePart.setFilePart(Base64.encodeBase64String(utf8Bytes));
        stringfilePart.setSize(length);
        
        fileParts.add(stringfilePart);
        length = length - minus;
      }
      
      deviceCommunicator.notifyUpdate(name, Integer.parseInt(version), fileParts, communicationChannel);
      resp.setStatus(204);
      resp.getWriter().println("Success");
    } catch (IOException | ServletException e) {
      logger.error("Upload failed on internal server error", e);
      resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }
  }
  
}