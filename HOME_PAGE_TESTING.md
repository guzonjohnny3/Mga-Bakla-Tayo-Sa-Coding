# 🧪 Testing the New Home Page System

## Quick Test Guide

### Test 1: View as Anonymous User
1. **Open Browser**: `http://localhost:5000`
2. **Expected**: See home page with all plant categories
3. **Verify**:
   - Navigation shows "Login" + "Register" buttons ✓
   - Three categories visible: Fruits, Vegetables, Grains ✓
   - Each category has 3 plants ✓

### Test 2: Expand Q&A Items (History & Benefits)
1. **Click on**: "What is the history of Mango?"
2. **Expected**: Full history text appears below question ✓
3. **Repeat**: Click on "What are the benefits of Mango?"
4. **Expected**: Full benefits text appears ✓
5. **Verify**: Chevron icon rotates when expanded ✓

### Test 3: Try to Access "How to Plant"
1. **Click on**: "How to plant Mango?" OR "More Info" button
2. **Expected**: Modal pops up with:
   - Title: "🥭 Mango - How to Plant"
   - Planting guide preview text
   - Message: "Please login or register..."
   - Button: "Login to Continue" ✓

### Test 4: Login Flow
1. **Click**: "Login to Continue" button in modal
2. **Expected**: Redirected to `/login.html?return=/home.html` ✓
3. **Enter Credentials**: 
   ```
   Email: guzonjohnny3@gmail.com
   Password: mars@123
   ```
4. **Expected**: "Login successful!" message ✓
5. **Expected**: Redirected back to `/home.html` ✓
6. **Verify**: Navigation now shows "Welcome, [Name]!" + "Logout" ✓

### Test 5: Access Full Planting Guide (Logged In)
1. **Now Logged In**: Should see welcome message in nav ✓
2. **Click**: "More Info" button on any plant card
3. **Expected**: Modal opens with:
   - Full planting guide text
   - "Go to Dashboard" button (instead of "Login to Continue")
4. **Click**: "Go to Dashboard"
5. **Expected**: Redirected to `/farmer-dashboard.html` ✓

### Test 6: Logout
1. **Click**: "Logout" button in navigation
2. **Expected**: Session cleared ✓
3. **Expected**: Redirected to `/home.html` as anonymous user ✓
4. **Verify**: Navigation shows "Login" + "Register" again ✓

### Test 7: Registration Flow
1. **Go to**: `http://localhost:5000`
2. **Click**: "Register" button
3. **Expected**: Redirected to `/register.html?return=/home.html` ✓
4. **Fill Form**: Create a new test account
   - Email: testfarmer@example.com
   - Password: test@123
   - Farm Type: Vegetables
   - Location: Cabadbaran City
5. **Submit**: Registration form
6. **Expected**: "Registration successful!" message ✓
7. **Expected**: Redirected to `/login.html?return=/home.html` ✓
8. **Auto-Login**: System logs you in
9. **Expected**: Redirected back to `/home.html` as logged-in user ✓

### Test 8: Responsive Design
1. **Desktop**: Browser window > 768px
   - **Expected**: 3-column grid for plants ✓
2. **Tablet**: Browser window 480-768px
   - **Expected**: 2-column grid ✓
3. **Mobile**: Browser window < 480px
   - **Expected**: 1-column grid ✓
   - Navigation items stack properly ✓
   - Modal readable on small screen ✓

### Test 9: Modal Interactions
1. **Click Modal Background** (outside content box)
2. **Expected**: Modal closes ✓
3. **Click Close Button** (X in top-right)
4. **Expected**: Modal closes ✓
5. **Press ESC Key** (if implemented)
6. **Expected**: Modal closes ✓

### Test 10: Navigation Menu
1. **Verify All Links**: HOME, PLANT CATEGORY, ABOUT, SERVICES, CONTACT
2. **Click Each**: Verify current page behavior (HOME should show active state)
3. **Expected**: HOME has emerald underline (active state) ✓

---

## Known Test Accounts

```
Account 1 (Pre-created):
Email: guzonjohnny3@gmail.com
Password: mars@123
Farm Type: Rice
Location: Cabadbaran City
Status: Active

Account 2 (Create new during Test 7):
Email: testfarmer@example.com
Password: test@123
Farm Type: Vegetables
Location: Cabadbaran City
Status: New
```

---

## Expected Behavior Summary

| Action | Anonymous | Logged In | Expected |
|--------|-----------|-----------|----------|
| View home | ✓ | ✓ | See all plants |
| Expand History/Benefits | ✓ | ✓ | See answers |
| Click "More Info" | ✓ | ✓ | See modal |
| Modal button text | Shows "Login" | Shows "Dashboard" | Context-aware |
| Navigation | "Login/Register" | "Welcome/Logout" | Auth-state based |
| Access full guide | ✗ | ✓ | Login required |

---

## Troubleshooting

### Problem: Page shows blank
**Solution**: 
1. Check server is running: `http://localhost:5000/api/farmers`
2. Check browser console for errors (F12)
3. Clear browser cache (Ctrl+Shift+Delete)

### Problem: Login redirects to wrong page
**Solution**:
1. Check URL has `?return=/home.html` parameter
2. Verify localStorage has correct tokens
3. Check server logs for auth errors

### Problem: Q&A not expanding
**Solution**:
1. Check browser console for JavaScript errors
2. Verify home.html file was loaded correctly
3. Try refreshing page

### Problem: Modal not appearing
**Solution**:
1. Check z-index: 2000 is set correctly
2. Verify browser supports CSS modal display
3. Try clicking "More Info" instead of Q&A

### Problem: "Cannot find user" on login
**Solution**:
1. Verify account exists in database
2. Check credentials are exactly correct
3. Try creating a new test account

---

## Performance Testing

### Load Time Check:
1. Open DevTools (F12) → Network tab
2. Refresh page
3. **Expected**: 
   - home.html loads in <500ms
   - Total page load <2s
   - No 404 errors
   - No failed CORS requests

### Interaction Responsiveness:
1. **Click Q&A**: Should expand instantly <50ms
2. **Click Modal**: Should show instantly <100ms
3. **Login Form Submit**: <500ms response time
4. **Modal Close**: Instant (<20ms)

---

## Success Criteria

✅ **ALL TESTS PASS** when:
1. Home page displays with all 9 plants (3 per category)
2. Q&A system works (expand/collapse with answers)
3. Anonymous users see "Login to Continue"
4. Logged-in users see "Go to Dashboard"
5. Login/Register flows work with return URLs
6. Logout clears session properly
7. Modal opens/closes smoothly
8. Navigation responsive on mobile
9. All redirects work correctly
10. No console errors

---

## Test Execution Notes

**Start Time**: ___________
**Tester**: ___________
**Browser**: Chrome/Firefox/Safari
**OS**: Windows/Mac/Linux

**Test Results**:
- Test 1 (Anonymous View): [ ] PASS [ ] FAIL
- Test 2 (Q&A Expand): [ ] PASS [ ] FAIL
- Test 3 (Modal): [ ] PASS [ ] FAIL
- Test 4 (Login): [ ] PASS [ ] FAIL
- Test 5 (Full Guide): [ ] PASS [ ] FAIL
- Test 6 (Logout): [ ] PASS [ ] FAIL
- Test 7 (Register): [ ] PASS [ ] FAIL
- Test 8 (Responsive): [ ] PASS [ ] FAIL
- Test 9 (Modal Actions): [ ] PASS [ ] FAIL
- Test 10 (Navigation): [ ] PASS [ ] FAIL

**Overall Status**: [ ] ALL PASS [ ] SOME FAIL [ ] ALL FAIL

**Notes**:
_________________________________
_________________________________

**End Time**: ___________
