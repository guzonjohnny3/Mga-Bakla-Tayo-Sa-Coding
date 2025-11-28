# 🌾 Smart AgroGuide - Quick Troubleshooting

## GPS Location Detection Wrong? 

### 🔧 Quick Fix (5 steps):

1. **Allow location permission**
   - Address bar 🔒 → Allow location access

2. **Go outdoors**
   - GPS works better with clear sky view

3. **Enable "High Accuracy" mode**
   - Phone settings → Location → High accuracy

4. **Wait 60 seconds** for GPS to lock

5. **Try again** - Click "Auto-Detect" button

---

### ✅ If Still Wrong, Type Manually:
- Type: `Cabadbaran, Agusan Del Norte`
- Or your actual farm location
- No need to use Auto-Detect!

---

## 📍 Correct Coordinates for Cabadbaran:
- **Latitude:** 8.5528
- **Longitude:** 125.4258
- **Province:** Agusan Del Norte, Philippines

---

## 🧪 Test if GPS Works:

Open browser DevTools (F12) and paste:
```javascript
navigator.geolocation.getCurrentPosition(pos => {
  console.log('Your Location:', pos.coords.latitude, pos.coords.longitude);
  console.log('Accuracy:', pos.coords.accuracy + 'm');
});
```

**Expected:** Shows coordinates ±100m accuracy

---

## 🎯 Registration Works Either Way:
- ✅ Auto-Detect GPS → Auto-fills location
- ✅ Manual entry → Type city name directly
- Both methods save to database

---

**Issue?** Most likely:
- Browser doesn't have location permission
- Indoors (GPS weak)
- Device GPS not enabled
- VPN enabled (sometimes blocks)

**Solution?** Just type location manually! ✨
