package fi.metatavu.jouko.api.device.Laiteviestit;

public class AikasynkLaitteelta {
    public long getLaiteaika() {
        // Return the current time in Epoch seconds
        return System.currentTimeMillis() / 1000;
    }
}
