package fi.metatavu.jouko.api.device.Laiteviestit;

public class ViestiLaitteelta {

    public static ViestiLaitteelta parseFrom(byte[] bytes) {
        return new ViestiLaitteelta();
    }

    public boolean hasMittaukset() {
        return false;
    }

    public Mittaukset getMittaukset() {
        return null;
    }
}
