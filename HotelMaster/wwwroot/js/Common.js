
    const SECRET = "myAppKey123";  // small salt
    const STORAGE_KEY = "v";     // short key (less obvious)

    // ✅ Encode
    function encode(id) {
        return btoa(id + "|" + SECRET);
    }

    // ✅ Decode
    function decode(value) {
        try {
        let decoded = atob(value);
    return decoded.split("|")[0];
        } catch {
            return null;
        }
    }

    // ✅ Store ONLY ONE ID (overwrite)
    function saveId(id) {

        let data = {
        v: encode(id),
   // exp: Date.now() + (30 * 60 * 1000) // 30 min expiry
        };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    // ✅ Get ID safely
    function getId() {
        let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    let data = JSON.parse(raw);

        // ✅ Check expiry
     //   if (Date.now() > data.exp) {
        localStorage.removeItem(STORAGE_KEY);
    return null;
       // }

    return decode(data.v);
    }

    // ✅ Clear
    function clearId() {
        localStorage.removeItem(STORAGE_KEY);
    }
