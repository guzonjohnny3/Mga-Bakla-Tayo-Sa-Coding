# Smart AgroGuide - API Documentation

## Base URL
```
http://localhost:5000
```

## Authentication

### Token Header Format
```
Authorization: Bearer <access_token>
```

### Refresh Tokens
- **Access Token TTL**: 15 minutes
- **Refresh Token TTL**: 7 days
- Endpoint: `POST /farmers/refresh`

---

## 📋 Farmer Management

### Register Farmer
```
POST /farmers/register

Body:
{
  "name": "John Farmer",
  "email": "john@farm.com",
  "password": "SecurePassword123",
  "location": "Punjab, India",
  "farmSize": 10.5,
  "crops": ["rice", "wheat"]
}

Response (201):
{
  "success": true,
  "message": "Farmer registered successfully",
  "farmerId": "507f1f77bcf86cd799439011"
}
```

### Login Farmer
```
POST /farmers/login

Body:
{
  "name": "John Farmer",
  "password": "SecurePassword123"
}

Response (200):
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "farmer": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Farmer",
    "location": "Punjab, India",
    "farmSize": 10.5
  }
}
```

### Refresh Access Token
```
POST /farmers/refresh

Body:
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response (200):
{
  "success": true,
  "accessToken": "new_access_token",
  "refreshToken": "new_refresh_token"
}
```

### Get Farmer Profile
```
GET /farmers/:id

Response (200):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Farmer",
    "location": "Punjab, India",
    "farmSize": 10.5,
    "crops": ["rice", "wheat"],
    "email": "john@farm.com",
    "registeredAt": "2025-11-28T10:00:00Z",
    "lastLogin": "2025-11-28T10:30:00Z"
  }
}
```

### Update Farmer Profile
```
PATCH /farmers/:id

Headers:
Authorization: Bearer <access_token>

Body:
{
  "farmSize": 15,
  "crops": ["rice", "wheat", "cotton"]
}

Response (200):
{
  "success": true,
  "message": "Profile updated",
  "data": { ... }
}
```

---

## 🌱 Crop Management

### Get All Plants
```
GET /plants

Headers:
Authorization: Bearer <access_token>

Response (200):
{
  "success": true,
  "data": [
    {
      "_id": "507f...",
      "name": "Rice",
      "season": ["kharif", "rabi"],
      "ideal_temperature": { "min": 20, "max": 30 },
      "ideal_soil_ph": { "min": 6, "max": 7.5 },
      "fertilizer_recommendations": [...]
    }
  ]
}
```

---

## 🌡️ Weather Integration

### Get Current Weather
```
GET /weather/current/:location

Headers:
Authorization: Bearer <access_token>

URL Parameters:
- location: "New Delhi" (URL encoded)

Response (200):
{
  "success": true,
  "data": {
    "location": "New Delhi",
    "country": "IN",
    "temperature": 28,
    "humidity": 65,
    "pressure": 1013,
    "feelsLike": 32,
    "tempMin": 25,
    "tempMax": 32,
    "weather": "Partly Cloudy",
    "description": "Partly cloudy sky",
    "windSpeed": 12,
    "cloudiness": 40,
    "sunrise": "2025-11-28T06:45:00Z",
    "sunset": "2025-11-28T17:30:00Z",
    "rainfall": 0
  }
}
```

### Get Weather Forecast (5 Days)
```
GET /weather/forecast/:location

Headers:
Authorization: Bearer <access_token>

Response (200):
{
  "success": true,
  "location": "New Delhi",
  "country": "IN",
  "forecast": {
    "2025-11-28": [
      { "date": "2025-11-28T09:00:00Z", "temperature": 28, ... },
      { "date": "2025-11-28T12:00:00Z", "temperature": 32, ... }
    ],
    "2025-11-29": [ ... ]
  },
  "alerts": [
    "🌧️ Heavy rainfall expected - Check drainage"
  ]
}
```

### Weather Impact Analysis
```
POST /weather/impact-analysis

Headers:
Authorization: Bearer <access_token>

Body:
{
  "temperature": 32,
  "humidity": 45,
  "rainfall": 20,
  "cropType": "rice"
}

Response (200):
{
  "success": true,
  "analysis": {
    "cropType": "rice",
    "temperature": {
      "value": 32,
      "optimal": { "min": 20, "max": 30 },
      "impact": "Too hot - Heat stress"
    },
    "humidity": {
      "value": 45,
      "optimal": { "min": 60, "max": 80 },
      "impact": "Too dry - Increase irrigation"
    },
    "rainfall": { ... },
    "riskFactors": [
      "High pest pressure",
      "Stress conditions"
    ],
    "recommendations": [
      "Increase irrigation frequency",
      "Monitor rice closely for stress"
    ]
  }
}
```

---

## 📊 Predictions & Analytics

### Predict Crop Yield
```
POST /api/predictions/yield

Headers:
Authorization: Bearer <access_token>

Body:
{
  "cropName": "rice",
  "location": "Punjab",
  "historicalYields": [1000, 1100, 1150],
  "soilQuality": "good",
  "weatherPattern": "favorable"
}

Response (201):
{
  "success": true,
  "data": {
    "_id": "507f...",
    "cropName": "rice",
    "predictedYield": 1245,
    "confidence": "87%",
    "factors": { ... },
    "predictionDate": "2025-11-28T10:00:00Z"
  },
  "prediction": 1245,
  "confidence": "87%"
}
```

### Assess Disease Risk
```
POST /api/predictions/disease-risk

Headers:
Authorization: Bearer <access_token>

Body:
{
  "cropName": "tomato",
  "temperature": 28,
  "humidity": 75,
  "season": "monsoon",
  "soilQuality": "good",
  "recentRainfall": 80
}

Response (200):
{
  "success": true,
  "riskAssessment": {
    "riskScore": 0.65,
    "riskLevel": "medium",
    "commonDiseases": [
      "Early Blight",
      "Leaf Spot"
    ]
  },
  "recommendations": {
    "preventiveMeasures": [
      "Monitor crop regularly for early symptoms",
      "Maintain proper plant spacing for air circulation",
      "Apply fungicide as preventive measure"
    ],
    "spraySchedule": "Bi-weekly"
  }
}
```

### Calculate Water Requirement
```
POST /api/predictions/water-requirement

Headers:
Authorization: Bearer <access_token>

Body:
{
  "cropType": "rice",
  "temperature": 28,
  "humidity": 70,
  "soilType": "loamy",
  "growthStage": "vegetative"
}

Response (200):
{
  "success": true,
  "data": {
    "waterRequired": 450,
    "frequency": 4,
    "unit": "mm"
  },
  "irrigationSchedule": {
    "frequency": "Every 4 days",
    "amount": "112.5 mm per irrigation",
    "totalRequired": "450 mm for season"
  }
}
```

### Optimize Fertilizer
```
POST /api/predictions/fertilizer-optimization

Headers:
Authorization: Bearer <access_token>

Body:
{
  "soilNitrogen": 100,
  "soilPhosphorus": 12,
  "soilPotassium": 150,
  "cropName": "rice",
  "soilPh": 6.8
}

Response (200):
{
  "success": true,
  "recommendations": {
    "nitrogen": 45,
    "phosphorus": 8,
    "potassium": 0,
    "micronutrients": ["Zinc Sulfate"]
  },
  "application": {
    "nitrogen": "Apply 45 kg/acre",
    "phosphorus": "Apply 8 kg/acre",
    "potassium": "Apply 0 kg/acre",
    "micronutrients": ["Zinc Sulfate"]
  },
  "costEstimate": 850
}
```

---

## 🧪 Soil Analysis

### Add Soil Analysis
```
POST /api/soil-analysis

Headers:
Authorization: Bearer <access_token>

Body:
{
  "location": "Field A",
  "ph": 6.8,
  "nitrogen": 180,
  "phosphorus": 18,
  "potassium": 200,
  "organicMatter": 2.5,
  "moisture": 22,
  "texture": "loamy"
}

Response (201):
{
  "success": true,
  "data": {
    "_id": "507f...",
    "quality": "good",
    "recommendations": [
      "Apply 50 kg/acre nitrogen",
      "Maintain adequate irrigation"
    ],
    "nextTestDate": "2026-02-26T00:00:00Z"
  },
  "analysis": {
    "quality": "good",
    "score": "85%",
    "recommendations": [ ... ]
  }
}
```

### Get Latest Soil Analysis
```
GET /api/soil-analysis/latest

Headers:
Authorization: Bearer <access_token>

Response (200):
{
  "success": true,
  "data": {
    "_id": "507f...",
    "location": "Field A",
    "quality": "good",
    "ph": 6.8,
    "nitrogen": 180,
    "analysisDate": "2025-11-28T10:00:00Z"
  }
}
```

---

## 📈 Farm Analytics

### Log Farm Activity
```
POST /api/analytics/activity

Headers:
Authorization: Bearer <access_token>

Body:
{
  "activityType": "fertilizing",
  "cropName": "rice",
  "quantity": 50,
  "unit": "kg",
  "notes": "Applied nitrogen-rich fertilizer",
  "weather": {
    "temperature": 28,
    "humidity": 65,
    "condition": "Sunny"
  },
  "cost": 500
}

Response (201):
{
  "success": true,
  "data": {
    "_id": "507f...",
    "activityType": "fertilizing",
    "date": "2025-11-28T10:00:00Z",
    "cost": 500
  }
}
```

### Get Analytics Dashboard
```
GET /api/analytics/dashboard

Headers:
Authorization: Bearer <access_token>

Response (200):
{
  "success": true,
  "data": {
    "totalExpense": 5000,
    "totalProduction": 8500,
    "averageActivityCost": 416.67,
    "totalActivities": 12,
    "roi": "70%",
    "fertilizingCount": 3,
    "harvestingCount": 1,
    "lastActivity": "2025-11-28T14:30:00Z"
  }
}
```

---

## 🤖 AI Features

### Get AI Recommendation
```
POST /api/ai/recommendation

Headers:
Authorization: Bearer <access_token>

Body:
{
  "crop": "tomato",
  "location": "New Delhi",
  "temperature": 28,
  "humidity": 70,
  "soilPh": 6.5,
  "season": "rabi",
  "farmSize": 2
}

Response (200):
{
  "success": true,
  "recommendation": "For tomato in New Delhi during rabi season with current weather conditions...",
  "generatedAt": "2025-11-28T10:00:00Z"
}
```

### Analyze Crop Health
```
POST /api/ai/health-analysis

Headers:
Authorization: Bearer <access_token>

Body:
{
  "symptoms": "Yellow spots on leaves, wilting, stunted growth"
}

Response (200):
{
  "success": true,
  "analysis": "Based on the symptoms, this appears to be early blight...",
  "analyzedAt": "2025-11-28T10:00:00Z"
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "message": "Password must be at least 8 characters"
}
```

### 401 Unauthorized
```json
{
  "message": "No token, authorization denied"
}
```

### 404 Not Found
```json
{
  "message": "Farmer not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "status": 500
}
```

---

## 📝 Notes

- All timestamps are in UTC (ISO 8601 format)
- Coordinates should be in decimal format (latitude, longitude)
- All monetary values are in the farmer's local currency
- Rate limit: 100 requests per 15 minutes per IP
- Ensure proper URL encoding for location names

---

**Last Updated**: November 28, 2025  
**API Version**: 2.0.0
