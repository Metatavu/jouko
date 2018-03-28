package fi.metatavu.jouko.api.device;

import static org.junit.Assert.assertArrayEquals;

import java.io.ByteArrayOutputStream;
import java.util.Arrays;
import java.util.Collection;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameter;
import org.junit.runners.Parameterized.Parameters;

@RunWith(Parameterized.class)
public class ByteEscaperTest {

  @Parameters
  public static Collection<?> parameters() {
    return Arrays.asList(new Object[][] {
      {new byte[] {0x00}, new byte[] {0x03, 0x00}},
      {new byte[] {0x01}, new byte[] {0x03, 0x01}},
      {new byte[] {0x02}, new byte[] {0x03, 0x02}},
      {new byte[] {0x03}, new byte[] {0x03, 0x03}},
      {new byte[] {0x03, 0x03}, new byte[] {0x03, 0x03, 0x03, 0x03}},
      {new byte[] {0x04}, new byte[] {0x04}},
      {new byte[] {}, new byte[] {}},
      {new byte[] {0x01, 0x03}, new byte[] {0x03, 0x01, 0x03, 0x03}},
    });
  }
  
  @Parameter(0)
  public byte[] input;

  @Parameter(1)
  public byte[] expected;
  
  @Test
  public void testByteEscaper() {
    ByteArrayOutputStream stream = new ByteArrayOutputStream();
    for (byte b : new ByteEscaper(input)) {
      stream.write(b);
    }
    byte[] actual = stream.toByteArray();
    
    assertArrayEquals(expected, actual);
  }
}
