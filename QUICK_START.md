# Quick Start Guide - Smart AgroGuide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js 16+
- MongoDB
- Internet connection (for APIs)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env
# Edit .env with your API keys and database URL
```

### Step 3: Start MongoDB
```bash
mongod
# In a new terminal window
```

### Step 4: Start Server
```bash
npm start
```

Server runs on `http://localhost:5000`

---

## 📱 Access Points

| Feature | URL |
|---------|-----|
| Home | http://localhost:5000 |
| Dashboard | http://localhost:5000/advanced-dashboard.html |
| API Health | http://localhost:5000/health |

---

## 🔑 Getting API Keys

### OpenWeatherMap
1. Visit [https://openweathermap.org/api](https://openweathermap.org/api)
2. Sign up for free account
3. Get your API key
4. Add to `.env`: `WEATHER_API_KEY=your_key`

### OpenAI
1. Visit [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create new API key
3. Add to `.env`: `OPENAI_API_KEY=sk-your-key`

---

## 📚 First API Calls

### Register Farmer (Example 1)
```bash
curl -X POST http://localhost:5000/farmers/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Johhny Guzon",
    "email": "guzonjohnny3@gmail.com",
    "password": "mars@123",
    "location": "Cabadbaran City",
    "farmSize": 5,
    "crops": ["rice", "wheat", "vegetables"]
  }'
```

### Register Farmer (Example 2)
```bash
curl -X POST http://localhost:5000/farmers/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bernadine Cabilogan",
    "email": "bernadinecabilogan@gmail.com",
    "password": "mars@123",
    "location": "Cabadbaran City",
    "farmSize": 5,
    "crops": ["rice", "wheat", "vegetables"]
  }'
```

### Register Farmer (Example 3)
```bash
curl -X POST http://localhost:5000/farmers/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Riki Lloyd Fajardo",
    "email": "rikiloydfajardo@gmail.com",
    "password": "mars@123",
    "location": "Cabadbaran City",
    "farmSize": 5,
    "crops": ["rice", "wheat", "vegetables"]
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/farmers/login \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Johhny Guzon",
    "password": "mars@123"
  }'
```

Save the `accessToken` from response and use for authenticated requests.

### Get Weather
```bash
curl -X GET "http://localhost:5000/weather/current/Cabadbaran City" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🧪 Testing the System

### Test Yield Prediction
```bash
curl -X POST http://localhost:5000/api/predictions/yield \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "cropName": "rice",
    "location": "Cabadbaran City",
    "historicalYields": [1000, 1100, 1150],
    "soilQuality": "good",
    "weatherPattern": "favorable"
  }'
```

### Test Disease Risk
```bash
curl -X POST http://localhost:5000/api/predictions/disease-risk \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "cropName": "tomato",
    "temperature": 28,
    "humidity": 75,
    "season": "monsoon",
    "soilQuality": "good",
    "recentRainfall": 80
  }'
```

---

## 📁 Project Structure

```
smart-agroguide/
├── server.js                    # Main server file
├── package.json                 # Dependencies
├── .env.example                 # Environment template
├── README.md                    # Full documentation
├── API_DOCUMENTATION.md         # API reference
├── QUICK_START.md              # This file
│
├── middleware/
│   ├── auth.js                 # Original auth
│   └── advancedAuth.js         # New JWT + refresh
│
├── models/
│   ├── Farmer.js               # User model
│   ├── Plant.js                # Crop data
│   ├── Weather.js              # Weather data
│   ├── SoilAnalysis.js         # NEW: Soil health
│   ├── CropYieldPrediction.js  # NEW: Yield prediction
│   ├── DiseaseDetection.js     # NEW: Disease data
│   ├── FarmActivity.js         # NEW: Activity log
│   └── Analytics.js            # NEW: Monthly reports
│
├── services/
│   ├── aiService.js            # NEW: OpenAI integration
│   └── predictionEngine.js     # NEW: ML algorithms
│
├── Routes/
│   ├── FarmerRoutes.js         # User management
│   ├── plantRoutes.js          # Crops
│   ├── weatherRoutes.js        # Basic weather
│   ├── advancedWeatherRoutes.js # NEW: Advanced weather
│   ├── recommendationRoutes.js # Recommendations
│   ├── chatbotRoutes.js        # Chat
│   ├── predictionRoutes.js     # NEW: Predictions
│   ├── soilAnalysisRoutes.js   # NEW: Soil analysis
│   ├── analyticsRoutes.js      # NEW: Analytics
│   ├── aiRoutes.js             # NEW: AI features
│   └── advancedFarmerRoutes.js # NEW: Enhanced farmer routes
│
└── public/
    ├── index.html              # Home page
    ├── dashboard.html          # Basic dashboard
    ├── advanced-dashboard.html # NEW: Advanced dashboard
    ├── login.html              # Login page
    ├── register.html           # Registration
    ├── style.css               # Styles
    └── *.js                    # Frontend scripts
```

---

## 🐛 Common Issues

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB
```bash
mongod
```

### API Key Not Working
```
Error: 401 Unauthorized from OpenAI
```
**Solution**: Verify API key in `.env` is correct

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution**: Change port in `.env`
```
PORT=5001
```

### CORS Error from Frontend
**Solution**: Already configured in `server.js`

---

## 🚀 Next Steps

1. **Explore the Dashboard**: Open `advanced-dashboard.html` in browser
2. **Read Full Docs**: Check `README.md` for detailed features
3. **Test APIs**: Use `API_DOCUMENTATION.md` for all endpoints
4. **Setup Database**: Create MongoDB collections as needed
5. **Deploy**: Deploy to Heroku, AWS, DigitalOcean, etc.

---

## 📞 Support

- **Documentation**: See README.md
- **API Reference**: See API_DOCUMENTATION.md
- **Issues**: Check troubleshooting section

---

## 🎉 You're Ready!

Your Smart AgroGuide system is now running with:
✅ AI-powered recommendations  
✅ Crop yield predictions  
✅ Disease risk assessment  
✅ Fertilizer optimization  
✅ Weather integration  
✅ Farm analytics  
✅ Advanced security  

Happy farming! 🌾
