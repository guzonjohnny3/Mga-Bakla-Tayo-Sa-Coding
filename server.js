const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

dotenv.config();
const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(limiter);

app.use(express.static('public'));

// Redirect root to home
app.get('/', (req, res) => {
  res.redirect('/home.html');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
const { verifyAccessToken } = require('./middleware/advancedAuth');

app.use('/farmers', require('./Routes/FarmerRoutes'));
app.use('/api/farmers', require('./Routes/FarmerRoutes')); // API endpoint alias

// Get farmer profile by ID (MUST BE BEFORE /api/farmers route)
app.get('/api/farmers/:id', verifyAccessToken, async (req, res) => {
  try {
    const Farmer = require('./models/Farmer');
    const farmer = await Farmer.findById(req.params.id).select('-password');
    
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    res.json(farmer);
  } catch (error) {
    console.error('❌ Error fetching farmer:', error);
    res.status(500).json({ message: 'Error fetching farmer data' });
  }
});

app.use('/plants', verifyAccessToken, require('./Routes/plantRoutes'));
app.use('/fertilizers', verifyAccessToken, require('./Routes/fertilizerRoutes'));
app.use('/weather', verifyAccessToken, require('./Routes/weatherRoutes'));
app.use('/recommendations', verifyAccessToken, require('./Routes/recommendationRoutes'));
app.use('/chatbot', verifyAccessToken, require('./Routes/chatbotRoutes'));

// Advanced Routes
app.use('/api/predictions', require('./Routes/predictionRoutes'));
app.use('/api/soil-analysis', require('./Routes/soilAnalysisRoutes'));
app.use('/api/analytics', require('./Routes/analyticsRoutes'));
app.use('/api/ai', require('./Routes/aiRoutes'));
app.use('/api/locations', require('./Routes/locationRoutes'));
app.use('/api/guides', require('./Routes/farmingGuideRoutes'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date(),
    version: '2.0 Advanced',
    database: 'Connected',
    services: ['AI', 'Predictions', 'Weather', 'Analytics', 'Email', 'Alerts']
  });
});

// Personalized AI Recommendations
app.get('/api/recommendations', verifyAccessToken, async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.farmer.id);
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    const { farmType, location, latitude, longitude, farmSize, experience } = farmer;

    // AI-Powered recommendations based on farmer profile
    const recommendations = [];

    // Based on farm type
    const farmTypeRecommendations = {
      'rice': [
        { title: '🌾 Optimal Water Management', description: 'Maintain 5-7cm water level during tillering. Ensure proper drainage during ripening phase. Install check dams for water conservation.', icon: 'droplet' },
        { title: '🧪 Nitrogen Application', description: 'Apply nitrogen in 3 splits: 40% at tillering, 40% at panicle initiation, 20% at heading. Use urea or ammonium nitrate.', icon: 'flask' },
        { title: '🐛 Pest Management', description: 'Monitor for rice leaf folder and stem borer. Use light traps and pheromone traps. Apply organic insecticides during active pest periods.', icon: 'bug' }
      ],
      'corn': [
        { title: '🌽 Hybrid Seed Selection', description: 'Use certified hybrid seeds with good disease resistance. Plant population: 70-80k plants/hectare for optimal yield.', icon: 'leaf' },
        { title: '💧 Irrigation Schedule', description: 'Critical stages: V6, VT (tasseling), and R1-R4 (grain filling). Provide 500-600mm water total for good yield.', icon: 'droplet' },
        { title: '🪴 Soil Fertility', description: 'Apply 120kg N, 60kg P2O5, 60kg K2O per hectare. Split nitrogen application for better uptake.', icon: 'mountain' }
      ],
      'vegetables': [
        { title: '🥬 Crop Rotation', description: 'Practice 3-year rotation to reduce soil-borne diseases. Avoid planting same family crops consecutively.', icon: 'leaf' },
        { title: '🪴 Soil Preparation', description: 'Add 20-30 tons compost/manure per hectare. Mix in NPK fertilizer 10 days before planting.', icon: 'mountain' },
        { title: '🚰 Daily Irrigation', description: 'Light, frequent watering to maintain soil moisture at 60-70%. Use drip irrigation for water efficiency.', icon: 'droplet' }
      ],
      'fruits': [
        { title: '✂️ Pruning & Training', description: 'Regular pruning improves fruit quality and yield. Remove diseased and crossing branches.', icon: 'scissors' },
        { title: '🐝 Pollinator Management', description: 'Encourage bees and butterflies for better fruit set. Avoid pesticides during flowering.', icon: 'butterfly' },
        { title: '🌱 Nutrient Management', description: 'Micronutrients like Zn, B are critical for fruit trees. Conduct soil testing annually.', icon: 'flask' }
      ]
    };

    // Based on experience level
    const experienceRecommendations = {
      'beginner': { title: '📚 Farming Basics', description: 'Start with simple crop varieties. Keep detailed farm records. Attend training programs regularly.', icon: 'book' },
      'intermediate': { title: '🔬 Advanced Techniques', description: 'Implement precision farming and soil testing. Use weather data for better planning.', icon: 'microscope' },
      'advanced': { title: '🤖 Modern Technology', description: 'Adopt IoT sensors for monitoring. Use predictive analytics for disease management.', icon: 'robot' }
    };

    // Add farm-type specific recommendations
    if (farmTypeRecommendations[farmType]) {
      recommendations.push(...farmTypeRecommendations[farmType]);
    } else {
      recommendations.push({ title: '🌾 General Farming', description: 'Practice crop rotation, maintain soil health, and use organic methods when possible.', icon: 'leaf' });
    }

    // Add experience-based recommendations
    if (experienceRecommendations[experience]) {
      recommendations.push(experienceRecommendations[experience]);
    }

    // Location-based recommendations
    if (location && location.toLowerCase().includes('cabadbaran')) {
      recommendations.push({
        title: '🌧️ Monsoon Season Preparation',
        description: 'Cabadbaran receives high rainfall (2500mm/year). Build proper drainage systems and use flood-resistant varieties.',
        icon: 'cloud-rain'
      });
    }

    res.json({ 
      recommendations,
      farmProfile: { farmType, location, farmSize, experience },
      generatedAt: new Date()
    });
  } catch (error) {
    console.error('❌ Error generating recommendations:', error);
    res.status(500).json({ message: 'Error generating recommendations' });
  }
});

// Chatbot endpoint - mounted at /api/chatbot
app.use('/api/chatbot', verifyAccessToken, require('./Routes/chatbotRoutes'));

// Debug endpoint for testing registration
app.post('/debug/test-farmer', async (req, res) => {
  try {
    const Farmer = require('./models/Farmer');
    const bcrypt = require('bcrypt');
    
    const testEmail = `test-${Date.now()}@email.com`;
    const hashedPassword = await bcrypt.hash('test123456', 10);
    
    const farmer = new Farmer({
      name: 'Test Farmer',
      email: testEmail,
      phone: '09123456789',
      password: hashedPassword,
      location: 'Test City',
      farmSize: '5',
      farmType: 'rice',
      crops: ['rice'],
      experience: 'beginner'
    });
    
    await farmer.save();
    res.json({ 
      message: 'Test farmer created successfully',
      farmer: {
        id: farmer._id,
        name: farmer.name,
        email: farmer.email
      }
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Test failed',
      error: err.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal Server Error',
    status: err.status || 500
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));