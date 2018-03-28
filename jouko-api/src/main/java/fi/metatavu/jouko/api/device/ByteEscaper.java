package fi.metatavu.jouko.api.device;

import java.util.Iterator;

public class ByteEscaper implements Iterable<Byte> {
  private static class ByteEscaperIterator implements Iterator<Byte> {
    private int i = 0;
    private byte[] input;
    private Byte escaped;
  
    public ByteEscaperIterator(byte[] input) {
      this.input = input;
    }
  
    @Override
    public boolean hasNext() {
      return escaped != null || i < input.length;
    }
  
    @Override
    public Byte next() {
      // escape 0x00 - 0x03 by prefixing them with 0x03
      if (escaped != null) {
        byte result = escaped;
        escaped = null;
        return result;
      }
  
      byte next = input[i];
      i++;
      if (next < (byte)0x04) {
        escaped = next;
        return (byte)0x03;
      } else {
        return next;
      }
    }
  }

  private byte[] input;

  public ByteEscaper(byte[] input) {
    this.input = input;
  }
  
  public Iterator<Byte> iterator() {
    return new ByteEscaper.ByteEscaperIterator(input);
  }
}