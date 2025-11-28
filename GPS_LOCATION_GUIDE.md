# 📍 GPS Location Detection - Troubleshooting Guide

## ⚠️ Why You Got Wrong Location (Pansud, Sultan Kudarat)

The geolocation feature is working correctly, but your **device/browser location settings** might be pointing to the wrong area. Here's why:

### Possible Causes:
1. **Browser location permission** - Set to allow but cached an old location
2. **Device GPS** - Not calibrated or has poor signal indoors
3. **IP-based location** - Browser might be using IP address instead of GPS
4. **System time/timezone** - Can affect location accuracy

---

## ✅ How to Fix It

### **Step 1: Check Browser Location Permissions**

#### Chrome/Edge:
1. Click **🔒 Lock icon** in address bar
2. Go to **"Site settings"** or **Manage permissions**
3. Find **"Location"** permission
4. Set to **"Allow"** (not "Block" or "Ask")
5. Click **"Clear"** to reset cached location
6. Refresh the page

#### Firefox:
1. Go to **Settings → Privacy & Security**
2. Scroll to **Permissions → Location**
3. Click **"Settings"** next to Location
4. Make sure domain is set to **"Allow"**
5. Clear browser cache

### **Step 2: Enable GPS/Location on Device**

#### Windows:
```
Settings → Privacy & Security → Location
→ Turn ON "Location"
→ Allow desktop app location access
```

#### Android Phone:
```
Settings → Location → Turn ON
→ Set to "High accuracy" mode (uses GPS + WiFi)
```

#### iPhone:
```
Settings → Privacy → Location Services
→ Turn ON
→ Find browser app → Set to "While Using"
```

### **Step 3: Improve GPS Accuracy**

- **Move outdoors** with clear sky view
- **Wait 30-60 seconds** for GPS to lock (first time takes longer)
- **Avoid being near walls or metal** (blocks signals)
- **Enable "High Accuracy" location mode** on phone

---

## 🧪 Test Your Location

### Option 1: Check Browser's Detected Location
Open browser console and run:
```javascript
navigator.geolocation.getCurrentPosition(pos => {
  console.log('📍 Latitude:', pos.coords.latitude);
  console.log('📍 Longitude:', pos.coords.longitude);
  console.log('📍 Accuracy:', pos.coords.accuracy + 'm');
});
```

**Expected for Cabadbaran City:**
- Latitude: ~8.55 (should be around 8.5528)
- Longitude: ~125.42 (should be around 125.4258)
- Accuracy: < 100m (if outdoors with GPS)

### Option 2: Manual Entry
If auto-detect keeps giving wrong location, just **type it manually**:
- **City:** Cabadbaran
- **Province:** Agusan Del Norte
- Or any other farm location you're registering from

---

## 🛠️ Advanced: Reset Browser Location

### Clear Location Cache:
1. **Chrome**: Settings → Privacy & Security → Clear browsing data → "Cookies and other site data"
2. **Firefox**: Preferences → Privacy → Clear History
3. **Edge**: Settings → Clear browsing data

### Reset Site Permissions:
1. Address bar → **🔒** → **Manage**
2. Find your domain
3. Click **"Remove"** or **"Reset"**
4. Refresh and try again

---

## 📊 What Gets Stored

When you click "Auto-Detect":

| Field | Example | Purpose |
|-------|---------|---------|
| **Farm Location** | Cabadbaran, Agusan Del Norte | Display name |
| **Latitude** | 8.5528 | Exact position (North-South) |
| **Longitude** | 125.4258 | Exact position (East-West) |
| **Accuracy** | 45m | How accurate the GPS is |

---

## ✅ Better Alternative: Specify Cabadbaran Directly

If auto-detect is giving wrong location, just **type manually**:

1. Click in Farm Location field
2. **Type:** `Cabadbaran, Agusan Del Norte`
3. Or click "Auto-Detect" and then **manually correct** if needed

**Known Good Coordinates for Cabadbaran:**
- Latitude: **8.5528**
- Longitude: **125.4258**
- (City Center, Agusan Del Norte, Philippines)

---

## 🔍 Improved Detection in Latest Version

The updated geolocation function now:

✅ **Uses High Accuracy Mode** - Requests GPS instead of just WiFi
✅ **Shows Accuracy Info** - Tells you how accurate (±Xm)
✅ **Better Error Messages** - Explains what went wrong
✅ **Timeout Handling** - Won't hang forever
✅ **Console Logging** - See details in DevTools

**New Features:**
- If accuracy is > 1000m, it warns you: "Lower accuracy, try moving outdoors"
- Shows GPS coordinates if city name can't be found
- Better error handling for network issues

---

## 🚀 Testing Steps

### Test 1: Indoor Location
1. Open register page
2. Click "Auto-Detect" **indoors**
3. **Expected:** May show wrong location or low accuracy
4. **Action:** Move outdoors and try again

### Test 2: Outdoor Location  
1. Go **outside with clear sky view**
2. Enable **"High Accuracy"** on phone
3. **Wait 60 seconds** for GPS lock
4. Click "Auto-Detect"
5. **Expected:** Correct location ✅

### Test 3: Manual Fallback
1. Type in location manually: `Cabadbaran City, Agusan Del Norte`
2. Proceed with registration
3. **Works fine!** ✅

---

## 📞 If Still Having Issues

### Check These First:
- [ ] Browser permission for Location is "Allow"
- [ ] Device GPS is turned ON
- [ ] You're outdoors with clear sky
- [ ] Waited 60+ seconds for GPS to lock
- [ ] Browser/system time is correct
- [ ] No VPN is enabled (sometimes blocks location)

### Try These:
1. **Clear browser cache & cookies**
2. **Restart browser**
3. **Restart device**
4. **Use different browser** (Chrome, Firefox, Edge, etc.)
5. **Just type location manually** instead

---

**Summary**: Auto-detect gets your real GPS location, but if it shows wrong area, either:
- Move outdoors for better GPS signal, OR
- Type your location manually (recommended for now)

Both methods work! 🌾
