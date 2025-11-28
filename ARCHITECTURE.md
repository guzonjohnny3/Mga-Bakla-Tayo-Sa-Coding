```
╔════════════════════════════════════════════════════════════════════════════╗
║                  SMART AGROGUIDE - SYSTEM ARCHITECTURE                    ║
║                           Advanced Edition v2.0                            ║
╚════════════════════════════════════════════════════════════════════════════╝


┌─────────────────────────────────────────────────────────────────────────────┐
│                             CLIENT LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────┐  ┌──────────────────────┐                        │
│  │  Home Page           │  │  Advanced Dashboard  │                        │
│  │  (index.html)        │  │  (advanced-dash...)  │                        │
│  │                      │  │  - Real-time stats   │                        │
│  │  - Login/Register    │  │  - Interactive charts│                        │
│  │  - Farm info         │  │  - Predictions       │                        │
│  │  - Quick links       │  │  - Analytics         │                        │
│  └──────────────────────┘  └──────────────────────┘                        │
│                                                                              │
│  All pages use AJAX/Fetch to communicate with API                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓↑
                           HTTP Requests/Responses
                           (JSON over REST)
                                    ↓↑
┌─────────────────────────────────────────────────────────────────────────────┐
│                        API SERVER LAYER (Express.js)                       │
│                            Port: 5000                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                  MIDDLEWARE LAYER                               │       │
│  ├─────────────────────────────────────────────────────────────────┤       │
│  │  • express.json() - Parse JSON bodies                           │       │
│  │  • cors() - Enable cross-origin requests                        │       │
│  │  • Rate Limiter - 100 req/15 min per IP                         │       │
│  │  • verifyAccessToken - JWT validation                           │       │
│  │  • Error Handler - Global error middleware                      │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                    ↓↑                                       │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                   ROUTES LAYER (11 routers)                    │       │
│  ├─────────────────────────────────────────────────────────────────┤       │
│  │                                                                  │       │
│  │  📋 CORE ROUTES:                                               │       │
│  │  ├─ FarmerRoutes (/farmers)                                    │       │
│  │  │  └─ POST register, login, refresh                           │       │
│  │  ├─ plantRoutes (/plants)                                      │       │
│  │  ├─ fertilizerRoutes (/fertilizers)                            │       │
│  │  ├─ weatherRoutes (/weather)                                   │       │
│  │  ├─ recommendationRoutes (/recommendations)                    │       │
│  │  └─ chatbotRoutes (/chatbot)                                   │       │
│  │                                                                  │       │
│  │  🚀 ADVANCED ROUTES (NEW):                                     │       │
│  │  ├─ predictionRoutes (/api/predictions) ← ML Engine            │       │
│  │  ├─ soilAnalysisRoutes (/api/soil-analysis)                    │       │
│  │  ├─ analyticsRoutes (/api/analytics)                           │       │
│  │  ├─ aiRoutes (/api/ai) ← OpenAI Integration                    │       │
│  │  └─ advancedWeatherRoutes (/weather) ← Real-time API          │       │
│  │                                                                  │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                    ↓↑                                       │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                  SERVICES LAYER (NEW)                          │       │
│  ├─────────────────────────────────────────────────────────────────┤       │
│  │                                                                  │       │
│  │  🤖 aiService.js                                               │       │
│  │  ├─ generateAdvancedRecommendation()                           │       │
│  │  └─ analyzeCropHealth()                                        │       │
│  │     ↓ Uses OpenAI API                                          │       │
│  │                                                                  │       │
│  │  📊 predictionEngine.js                                        │       │
│  │  ├─ predictCropYield() - Linear regression                     │       │
│  │  ├─ assessDiseaseRisk() - Multi-factor analysis               │       │
│  │  ├─ predictWaterRequirement() - Algorithm-based               │       │
│  │  └─ optimizeFertilizer() - NPK optimization                   │       │
│  │                                                                  │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                    ↓↑                                       │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │               DATA ACCESS LAYER (Mongoose/MongoDB)             │       │
│  ├─────────────────────────────────────────────────────────────────┤       │
│  │  Each route uses models to interact with database              │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓↑
         Database Queries/Operations (MongoDB Driver)
                                    ↓↑
┌─────────────────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │ MongoDB Collections (11 total)                                  │       │
│  ├─────────────────────────────────────────────────────────────────┤       │
│  │                                                                  │       │
│  │  💼 CORE COLLECTIONS:                                          │       │
│  │  ├─ Farmers - User accounts and profiles                       │       │
│  │  ├─ Plants - Crop data with specifications                     │       │
│  │  ├─ Weather - Historical weather data                          │       │
│  │  ├─ Fertilizers - Fertilizer database                          │       │
│  │  ├─ Recommendations - Generated recommendations               │       │
│  │  └─ ChatLog - Chat history and logs                            │       │
│  │                                                                  │       │
│  │  🚀 ADVANCED COLLECTIONS (NEW):                               │       │
│  │  ├─ SoilAnalysis - Soil health records                         │       │
│  │  ├─ CropYieldPrediction - Yield predictions                    │       │
│  │  ├─ DiseaseDetection - Disease records                         │       │
│  │  ├─ FarmActivity - Activity logs                               │       │
│  │  └─ Analytics - Monthly performance reports                    │       │
│  │                                                                  │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                  EXTERNAL INTEGRATIONS (APIs)                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  🌍 OpenWeatherMap API                                                      │
│  ├─ Endpoint: api.openweathermap.org                                        │
│  ├─ Features: Real-time weather, 5-day forecast                            │
│  └─ Authentication: API_KEY in .env                                         │
│                                                                              │
│  🤖 OpenAI API (GPT-3.5 Turbo)                                              │
│  ├─ Endpoint: api.openai.com                                               │
│  ├─ Features: Advanced recommendations, crop health analysis               │
│  └─ Authentication: OPENAI_API_KEY in .env                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘


AUTHENTICATION FLOW:
═══════════════════════════════════════════════════════════════════════════════

1. User Registration
   ┌─────────────────────────────────────────────────────────┐
   │ POST /farmers/register {name, password, ...}            │
   │ ↓                                                       │
   │ • Hash password with bcrypt (10 rounds)                │
   │ • Save to MongoDB Farmers collection                   │
   │ • Return success + farmerId                            │
   └─────────────────────────────────────────────────────────┘

2. User Login
   ┌─────────────────────────────────────────────────────────┐
   │ POST /farmers/login {name, password}                    │
   │ ↓                                                       │
   │ • Verify password against stored hash                  │
   │ • Generate JWT tokens:                                 │
   │   - accessToken (15 min expiry)                        │
   │   - refreshToken (7 day expiry)                        │
   │ • Return tokens + farmer info                          │
   └─────────────────────────────────────────────────────────┘

3. API Request with Token
   ┌─────────────────────────────────────────────────────────┐
   │ GET /api/predictions/yield                              │
   │ Header: Authorization: Bearer <accessToken>             │
   │ ↓                                                       │
   │ • verifyAccessToken middleware validates JWT           │
   │ • If valid → attach farmer.id to req.farmer            │
   │ • If expired → return 401 with TOKEN_EXPIRED code      │
   └─────────────────────────────────────────────────────────┘

4. Token Refresh
   ┌─────────────────────────────────────────────────────────┐
   │ POST /farmers/refresh {refreshToken}                    │
   │ ↓                                                       │
   │ • Validate refresh token                               │
   │ • Generate new access + refresh tokens                │
   │ • Return new tokens                                    │
   └─────────────────────────────────────────────────────────┘


DATA FLOW EXAMPLE - Yield Prediction:
═══════════════════════════════════════════════════════════════════════════════

1. Frontend Request
   ┌──────────────────────────────────────────────────────────┐
   │ POST /api/predictions/yield                              │
   │ {                                                        │
   │   "cropName": "rice",                                   │
   │   "historicalYields": [1000, 1100, 1150],              │
   │   "soilQuality": "good"                                │
   │ }                                                        │
   └──────────────────────────────────────────────────────────┘
                            ↓
2. API Route Handler
   ┌──────────────────────────────────────────────────────────┐
   │ • Extract parameters from request                         │
   │ • Validate input data                                    │
   │ • Convert quality to numeric score                       │
   └──────────────────────────────────────────────────────────┘
                            ↓
3. ML Prediction Engine
   ┌──────────────────────────────────────────────────────────┐
   │ PredictionEngine.predictCropYield()                      │
   │ • Calculate linear regression on historical data         │
   │ • Compute slope and intercept                            │
   │ • Adjust for soil (60%) and weather (40%)              │
   │ • Calculate confidence from variance                     │
   └──────────────────────────────────────────────────────────┘
                            ↓
4. Save to Database
   ┌──────────────────────────────────────────────────────────┐
   │ new CropYieldPrediction({                                │
   │   farmerId: req.farmer.id,                              │
   │   cropName: "rice",                                     │
   │   predictedYield: 1245,                                 │
   │   confidence: 0.87,                                     │
   │   ...                                                    │
   │ }).save()                                               │
   └──────────────────────────────────────────────────────────┘
                            ↓
5. Return Response
   ┌──────────────────────────────────────────────────────────┐
   │ {                                                        │
   │   "success": true,                                      │
   │   "prediction": 1245,                                   │
   │   "confidence": "87%",                                  │
   │   "data": { ...full record... }                         │
   │ }                                                        │
   └──────────────────────────────────────────────────────────┘
                            ↓
6. Frontend Displays Result
   ┌──────────────────────────────────────────────────────────┐
   │ Update dashboard with:                                   │
   │ • Predicted yield value                                 │
   │ • Confidence percentage                                 │
   │ • Historical trend comparison                           │
   │ • Recommendations based on prediction                   │
   └──────────────────────────────────────────────────────────┘


RATE LIMITING & SECURITY:
═══════════════════════════════════════════════════════════════════════════════

┌─ Rate Limiter Middleware ─────────────────────────────────┐
│ • Limit: 100 requests per 15 minutes                      │
│ • Per IP Address                                           │
│ • Returns 429 if exceeded                                 │
│ • Automatically resets after window                       │
└─────────────────────────────────────────────────────────────┘

┌─ Token Security ──────────────────────────────────────────┐
│ • JWT_SECRET: 32+ character string                        │
│ • JWT_REFRESH_SECRET: Different 32+ character string      │
│ • Tokens signed with HMAC SHA256                          │
│ • Type validation: "access" vs "refresh"                  │
└─────────────────────────────────────────────────────────────┘

┌─ Password Security ───────────────────────────────────────┐
│ • bcrypt with 10 rounds                                   │
│ • Never stored in plaintext                               │
│ • Compared using bcrypt.compare()                         │
└─────────────────────────────────────────────────────────────┘


DEPLOYMENT ARCHITECTURE:
═══════════════════════════════════════════════════════════════════════════════

┌──────────────────────────────────────────────────────────────┐
│                      User's Browser                          │
└──────────────────────────────────────────────────────────────┘
                            ↓↑ HTTPS
┌──────────────────────────────────────────────────────────────┐
│                    CDN / Load Balancer                       │
│              (Optional - for production)                    │
└──────────────────────────────────────────────────────────────┘
                            ↓↑
┌──────────────────────────────────────────────────────────────┐
│              Smart AgroGuide API Server                     │
│          (Node.js + Express, Port 5000)                    │
│        Can run multiple instances for scaling              │
└──────────────────────────────────────────────────────────────┘
              ↓↑                    ↓↑
       Database                  Cache          External APIs
        Connection             (Redis)         (Weather, OpenAI)
              ↓                   ↓                    ↓
    ┌─────────────────────────────┴───────────────────────┐
    │                                                      │
┌───▼──────┐  ┌──────────┐  ┌──────────────┐  ┌────────┐
│ MongoDB  │  │  Redis   │  │OpenWeatherMap│  │OpenAI  │
└──────────┘  └──────────┘  └──────────────┘  └────────┘


SCALABILITY FEATURES:
═══════════════════════════════════════════════════════════════════════════════

✅ Horizontal Scaling
   • Stateless API design
   • Can run multiple server instances
   • Load balancer distributes requests

✅ Database Optimization
   • MongoDB indexing ready
   • Query optimization
   • Connection pooling

✅ Caching Layer
   • Redis support built-in
   • Session caching
   • API response caching

✅ Async Processing
   • Non-blocking I/O
   • Promise-based operations
   • Event-driven architecture

✅ Performance Monitoring
   • Health check endpoints
   • Error logging
   • Activity tracking


FILE SIZE & COMPLEXITY:
═══════════════════════════════════════════════════════════════════════════════

Code:
├─ Models: ~800 lines (11 files)
├─ Routes: ~2000 lines (11 files)
├─ Services: ~600 lines (2 files)
├─ Middleware: ~400 lines (2 files)
└─ Frontend: ~500 lines (4+ files)
  Total: ~4300 lines of code

Documentation:
├─ README.md: 1000+ lines
├─ API_DOCUMENTATION.md: 600+ lines
├─ QUICK_START.md: 300+ lines
├─ SYSTEM_UPGRADES.md: 400+ lines
└─ Other docs: 500+ lines
  Total: 2800+ lines of documentation


═══════════════════════════════════════════════════════════════════════════════
Generated: November 28, 2025
Version: 2.0 - Advanced Edition
Status: ✅ Production Ready
═══════════════════════════════════════════════════════════════════════════════
```
