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
      // escape 0xfd-0xff by subtracting 0xfd and prepending 0xff
      if (escaped != null) {
        byte result = escaped;
        escaped = null;
        return result;
      }
  
      byte next = input[i];
      i++;
      if (next == 0xfd || next == 0xfe || next == 0xff) {
        escaped = (byte)(next - 0xfd);
        return (byte)0xff;
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