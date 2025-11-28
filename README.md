# Smart AgroGuide - Advanced AI-Powered Farming Assistant

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Version](https://img.shields.io/badge/Version-2.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Overview

Smart AgroGuide is an **advanced AI-powered farming assistant** that provides intelligent recommendations for crop management, fertilizer optimization, disease detection, and yield prediction. The system combines machine learning, real-time weather data, and agricultural expertise to maximize crop productivity and farm profitability.

## 🌟 Key Features

### 🤖 AI & Machine Learning
- **Advanced Recommendation Engine** - OpenAI-powered crop recommendations based on real conditions
- **Crop Yield Prediction** - ML models predict harvest yield with confidence scores
- **Disease Risk Assessment** - Identifies disease risks and suggests preventive measures
- **Water Requirement Prediction** - Calculates optimal irrigation schedules
- **Fertilizer Optimization** - Recommends NPK ratios based on soil analysis

### 📊 Analytics & Insights
- **Comprehensive Dashboard** - Real-time farm analytics with interactive charts
- **Monthly Reports** - Detailed profit/loss, ROI, and performance metrics
- **Activity Tracking** - Log all farm activities (planting, watering, fertilizing, etc.)
- **Crop Performance Analysis** - Compare yields across seasons and crops
- **Cost Analysis** - Track expenses and calculate profitability

### 🌡️ Weather Integration
- **Real-time Weather Data** - Fetch current conditions via OpenWeatherMap API
- **Weather Forecast** - 5-day forecast with hourly granularity
- **Weather Impact Analysis** - Assess weather effects on specific crops
- **Weather Alerts** - Warnings for extreme conditions (frost, heat, heavy rain)
- **Crop-Specific Recommendations** - Adjust care based on weather patterns

### 🦠 Crop Health Monitoring
- **Disease Detection** - Image recognition for plant diseases (prepare for integration)
- **Health Symptoms Analysis** - AI analyzes reported symptoms
- **Treatment Recommendations** - Both chemical and organic alternatives
- **Prevention Strategies** - Preventive measures for identified diseases
- **Urgency Alerts** - Prioritize issues by severity

### 🌱 Soil Management
- **Soil Analysis** - Comprehensive soil health scoring (pH, NPK, organic matter)
- **Quality Assessment** - Rates soil from poor to excellent
- **Deficiency Detection** - Identifies missing nutrients
- **Amendment Recommendations** - Suggests fertilizers and amendments
- **Testing Reminders** - Tracks when next soil test is due

### 🔐 Advanced Security
- **JWT Token-Based Auth** - Secure API access with access & refresh tokens
- **Token Expiration** - 15-minute access tokens, 7-day refresh tokens
- **Rate Limiting** - Protection against abuse (100 requests per 15 minutes)
- **Password Hashing** - bcrypt encryption for all passwords
- **Role-Based Access Control** - Extensible permission system

### ⚡ Real-Time Features
- **WebSocket Support** - Real-time notifications and chat
- **Redis Caching** - Fast data retrieval and session management
- **Real-Time Chat** - AI-powered chatbot for farming queries
- **Live Alerts** - Immediate notifications for critical events

## 🚀 Installation

### Prerequisites
- Node.js 16+ 
- MongoDB (Local or Atlas)
- Redis (optional, for caching)
- OpenAI API Key
- OpenWeatherMap API Key

### Setup Steps

1. **Clone and Install**
```bash
cd smart-agroguide
npm install
```

2. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. **Environment Variables**
```
MONGO_URI=mongodb://localhost:27017/smart-agroguide
JWT_SECRET=your_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_here
OPENAI_API_KEY=sk-your-key
WEATHER_API_KEY=your_openweathermap_key
PORT=5000
```

4. **Start Server**
```bash
npm start
```

Server runs on `http://localhost:5000`

## 📚 API Endpoints

### Authentication
```
POST   /farmers/register          - Register new farmer
POST   /farmers/login             - Login farmer
PATCH  /farmers/:id               - Update profile
DELETE /farmers/:id               - Delete account
```

### Core Features
```
GET    /plants                    - Get all plants
POST   /weather/current/:location - Get current weather
GET    /weather/forecast/:location - Get 5-day forecast
POST   /recommendations           - Get fertilizer recommendations
POST   /chatbot                   - Chat with AI assistant
```

### Advanced Features
```
POST   /api/predictions/yield                    - Predict crop yield
POST   /api/predictions/disease-risk             - Assess disease risk
POST   /api/predictions/water-requirement        - Calculate water needs
POST   /api/predictions/fertilizer-optimization  - Optimize fertilizer
POST   /api/soil-analysis                        - Analyze soil
GET    /api/soil-analysis/latest                 - Get latest soil data
POST   /api/analytics/activity                   - Log farm activity
GET    /api/analytics/dashboard                  - Get analytics
POST   /api/ai/recommendation                    - AI recommendation
POST   /api/ai/health-analysis                   - Analyze crop health
```

## 💻 Usage Examples

### Predict Crop Yield
```bash
curl -X POST http://localhost:5000/api/predictions/yield \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "cropName": "rice",
    "location": "Punjab",
    "historicalYields": [1000, 1100, 1150],
    "soilQuality": "good",
    "weatherPattern": "favorable"
  }'
```

### Assess Disease Risk
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

### Get Weather Forecast
```bash
curl -X GET http://localhost:5000/weather/forecast/New%20Delhi \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🏗️ System Architecture

```
┌─────────────────┐
│   Frontend      │
│   (Dashboard)   │
└────────┬────────┘
         │
┌────────▼────────────────────────────────┐
│     Express.js API Server (Port 5000)   │
├─────────────────────────────────────────┤
│ ├─ Routes (6+ endpoints)                │
│ ├─ Middleware (Auth, Validation)        │
│ ├─ Services (AI, Predictions)           │
│ └─ Models (7+ MongoDB schemas)          │
├─────────────────────────────────────────┤
└────────┬──────┬──────────┬──────────────┘
         │      │          │
    ┌────▼──┐ ┌─▼────┐ ┌──▼────────────┐
    │ Mongo │ │Redis │ │OpenAI/Weather │
    │  DB   │ │Cache │ │  External API │
    └───────┘ └──────┘ └───────────────┘
```

## 🔧 Configuration

### Enable/Disable Features
Edit `.env`:
```
ENABLE_AI_RECOMMENDATIONS=true
ENABLE_WEATHER_API=true
ENABLE_DISEASE_DETECTION=true
ENABLE_EMAIL_NOTIFICATIONS=false
ENABLE_REAL_TIME_CHAT=true
```

### Customize Crops
```
PRIMARY_CROPS=rice,wheat,cotton,tomato,potato
GROWING_SEASONS=kharif,rabi,summer
```

## 📊 Database Schema

### Collections
- **Farmers** - User accounts and profiles
- **Plants** - Crop data with ideal conditions
- **Weather** - Historical and forecast data
- **Recommendations** - Generated recommendations
- **SoilAnalysis** - Soil health data
- **CropYieldPrediction** - Yield predictions
- **DiseaseDetection** - Disease records
- **FarmActivity** - Activity logs
- **Analytics** - Monthly reports
- **ChatLog** - Chat history

## 🧠 ML Algorithms

### Yield Prediction
- Linear regression on historical yields
- Adjusted by soil quality (60% weight) and weather (40% weight)
- Confidence scores based on data variance

### Disease Risk Assessment
- Multi-factor risk scoring
- Temperature & humidity analysis
- Seasonal disease pattern matching
- Soil quality impact

### Water Requirement Calculation
- Crop-specific base requirements
- Temperature, humidity, and growth stage adjustments
- Soil type water retention factors

### Fertilizer Optimization
- NPK deficiency calculation
- pH-based amendments
- Micronutrient recommendations

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Check `MONGO_URI` in `.env`
- Ensure MongoDB is running: `mongod`

**OpenAI API Error**
- Verify `OPENAI_API_KEY` is valid
- Check API quota and billing

**Weather Data Not Loading**
- Verify `WEATHER_API_KEY`
- Check internet connection
- Location name must be valid

**Token Expired Error**
- Use refresh token to get new access token
- Token expiration: 15 minutes for access, 7 days for refresh

## 📈 Performance Optimization

- **Caching** - Redis for frequently accessed data
- **Database Indexing** - Indexed queries for faster retrieval
- **Rate Limiting** - Prevent API abuse
- **Lazy Loading** - Load data on demand
- **Compression** - GZIP compression enabled

## 🔮 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Advanced image recognition for disease detection
- [ ] IoT sensor integration
- [ ] Blockchain for supply chain tracking
- [ ] Multi-language support
- [ ] Offline capabilities
- [ ] Advanced statistical models
- [ ] Integration with govt. agriculture databases

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Support

For issues, suggestions, or contributions:
- GitHub Issues: [Create an issue]
- Email: support@smartagroguide.com
- Documentation: [Visit Wiki]

## 👨‍💼 Team

Built with ❤️ for farmers worldwide.

---

**Last Updated**: November 28, 2025  
**Version**: 2.0.0 (Advanced Edition)
