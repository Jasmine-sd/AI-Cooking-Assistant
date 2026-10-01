import { Recipe } from '../src/types';
import { PANIPURI_RECIPE, ASIAN_CHEF_RECIPES } from './extraRecipes';
import { CULINARY_KNOWLEDGE_BASE } from './culinaryKnowledge';

const RAW_INITIAL_RECIPES: Recipe[] = [
  ...CULINARY_KNOWLEDGE_BASE,
  ...ASIAN_CHEF_RECIPES,
  {
    id: 'butter-chicken',
    name: 'Classic Murgh Makhani (Butter Chicken)',
    nameTranslations: {
      te: 'క్లాసిక్ బటర్ చికెన్ (ముర్గ్ మఖని)',
      hi: 'क्लासिक बटर चिकन (मुर्ग मखनी)',
      es: 'Pollo a la Mantequilla Clásico'
    },
    description: 'Tender chicken marinated in aromatic spices, grilled and simmered in a silky, rich tomato-butter-cashew gravy scented with fenugreek.',
    descriptionTranslations: {
      te: 'సుగంధ ద్రవ్యాలతో మారినేట్ చేసిన చికెన్ ముక్కలు, టొమాటో, వెన్న మరియు కాజూతో చేసిన రిచ్ గ్రేవీలో నెమ్మదిగా ఉడికిస్తారు.',
      hi: 'मसालेदार मैरिनेटेड चिकन को रिच मखमली टमाटर-मक्खन ग्रेवी में पकाया गया।',
      es: 'Pollo tierno marinado en especias, cocinado en una salsa cremosa de tomate y mantequilla.'
    },
    cuisine: 'Indian',
    tasteProfile: 'Mild',
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80',
    baseServings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 30,
    totalTimeMinutes: 50,
    difficulty: 'Medium',
    spiceLevel: 'Medium',
    dietaryTags: ['Non-vegetarian', 'Gluten-free', 'Egg-free'],
    budget: '$$',
    rating: 4.9,
    reviewsCount: 342,
    author: 'Chef Sanjeev R.',
    authenticStyleNotes: 'Uses charcoal dhungar smoking, slow-simmered Kashmiri chili-cashew tomato base, fresh makhana butter, and toasted Kasuri Methi for genuine Delhi restaurant depth.',
    homestyleNotes: 'Uses standard heavy cream or milk in place of cashew paste, store-bought tomato puree, and pan-searing without tandoor skewers for quick 30-minute weeknight preparation.',
    ingredients: [
      { id: 'i1', name: 'Chicken Thighs (boneless)', nameTranslations: { te: 'చికెన్ ముక్కలు' }, baseQuantity: 600, unit: 'g', category: 'Meat & Seafood' },
      { id: 'i2', name: 'Greek Yogurt / Thick Curd', nameTranslations: { te: 'పెరుగు' }, baseQuantity: 100, unit: 'g', category: 'Dairy & Refrigerated' },
      { id: 'i3', name: 'Ginger-Garlic Paste', nameTranslations: { te: 'అల్లం వెల్లుల్లి పేస్ట్' }, baseQuantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i4', name: 'Kashmiri Red Chili Powder', nameTranslations: { te: 'కాశ్మీరీ కారం' }, baseQuantity: 2, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'i5', name: 'Garam Masala', nameTranslations: { te: 'గరం మసాలా' }, baseQuantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'i6', name: 'Butter', nameTranslations: { te: 'వెన్న' }, baseQuantity: 40, unit: 'g', category: 'Dairy & Refrigerated', homestyleSubstitute: { name: 'Cooking Oil or Ghee', quantityRatio: 1, unit: 'g', note: 'Ghee or oil provides good aroma with less saturated fat' } },
      { id: 'i7', name: 'Tomato Puree', nameTranslations: { te: 'టొమాటో గుజ్జు' }, baseQuantity: 400, unit: 'g', category: 'Produce' },
      { id: 'i8', name: 'Cashew Nuts (soaked & blended)', nameTranslations: { te: 'జీడిపప్పు పేస్ట్' }, baseQuantity: 30, unit: 'g', category: 'Pantry & Spices', homestyleSubstitute: { name: 'Heavy Cream or Milk', quantityRatio: 2, unit: 'tbsp', note: 'Cream adds silkiness without requiring blender soaked cashews' } },
      { id: 'i9', name: 'Heavy Cream', nameTranslations: { te: 'ఫ్రెష్ క్రీమ్' }, baseQuantity: 60, unit: 'ml', category: 'Dairy & Refrigerated', homestyleSubstitute: { name: 'Whole Milk + 1 tsp flour', quantityRatio: 60, unit: 'ml', note: 'Lighter everyday alternative' } },
      { id: 'i10', name: 'Kasuri Methi (Dried Fenugreek)', nameTranslations: { te: 'కసూరీ మేథీ' }, baseQuantity: 1, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i11', name: 'Salt', nameTranslations: { te: 'ఉప్పు' }, baseQuantity: 1.5, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'i12', name: 'Sugar / Honey', nameTranslations: { te: 'పంచదార' }, baseQuantity: 0.5, unit: 'tsp', category: 'Pantry & Spices', optional: true }
    ],
    steps: [
      {
        id: 's1',
        stepNumber: 1,
        title: 'Marinate the Chicken',
        instruction: 'In a bowl, combine cut chicken with yogurt, 1 tbsp ginger-garlic paste, 1 tsp Kashmiri chili powder, 0.5 tsp garam masala, and 0.5 tsp salt. Rest for 15 minutes.',
        instructionTranslations: {
          te: 'ఒక గిన్నెలో చికెన్ ముక్కలు, పెరుగు, అల్లం-వెల్లుల్లి పేస్ట్, కారం, గరం మసాలా మరియు ఉప్పు వేసి బాగా కలిపి 15 నిమిషాలు నానబెట్టండి.'
        },
        durationMinutes: 15,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
        chefTip: 'Marinating with yogurt tenderizes the meat fibres thoroughly.'
      },
      {
        id: 's2',
        stepNumber: 2,
        title: 'Pan-Sear the Chicken',
        instruction: 'Heat 1 tbsp butter/oil in a pan over medium-high heat. Sear the marinated chicken pieces for 4-5 minutes per side until charred edges appear. Set aside.',
        instructionTranslations: {
          te: 'బాణలిలో 1 చెంచా నూనె/వెన్న వేడి చేసి, చికెన్ ముక్కలను రెండు వైపులా 4-5 నిమిషాలు బంగారు రంగు వచ్చే వరకు వేయించి పక్కన పెట్టండి.'
        },
        durationMinutes: 8,
        temperatureOrHeat: 'Medium-High',
        image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 's3',
        stepNumber: 3,
        title: 'Build the Silky Makhani Gravy',
        instruction: 'In the same pan, melt remaining butter. Add remaining ginger-garlic paste and sauté for 1 minute. Add tomato puree, remaining chili powder, cashew paste, and salt. Simmer for 10 minutes.',
        instructionTranslations: {
          te: 'అదే బాణలిలో మిగిలిన వెన్న వేసి, అల్లం వెల్లుల్లి పేస్ట్ వేయించండి. టొమాటో గుజ్జు, జీడిపప్పు పేస్ట్, కారం వేసి 10 నిమిషాలు మగ్గనివ్వండి.'
        },
        durationMinutes: 10,
        temperatureOrHeat: 'Medium',
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 's4',
        stepNumber: 4,
        title: 'Simmer Chicken in Sauce',
        instruction: 'Add seared chicken pieces and any resting juices to the simmering gravy. Cover and cook on low heat for 8 minutes until chicken is cooked through.',
        instructionTranslations: {
          te: 'వేయించిన చికెన్ ముక్కలను గ్రేవీలో వేసి మూత పెట్టి తక్కువ మంటపై 8 నిమిషాలు ఉడికించండి.'
        },
        durationMinutes: 8,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 's5',
        stepNumber: 5,
        title: 'Finishing Touches with Cream & Kasuri Methi',
        instruction: 'Stir in heavy cream, sugar, and crushed Kasuri Methi between your palms. Cook for 2 more minutes on gentle heat. Garnish with a swirl of cream.',
        instructionTranslations: {
          te: 'ఫ్రెష్ క్రీమ్, అర చెంచా చక్కెర మరియు చేతులతో నలిపిన కసూరీ మేథీ వేసి 2 నిమిషాలు ఉడికించి స్టవ్ ఆపండి.'
        },
        durationMinutes: 3,
        temperatureOrHeat: 'Simmer',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
      }
    ],
    nutrition: {
      calories: 460,
      protein: 38,
      carbohydrates: 14,
      fat: 28,
      fiber: 2.5
    },
    substitutions: [
      { original: 'Heavy Cream', substitute: 'Coconut Milk or Greek Yogurt', ratio: '1:1', notes: 'Gives great texture; coconut milk adds subtle sweet nuttiness' },
      { original: 'Chicken Thighs', substitute: 'Paneer or Tofu or Cauliflower', ratio: '1:1 weight', notes: 'Perfect vegetarian substitution' },
      { original: 'Kasuri Methi', substitute: 'Pinch of celery leaves or oregano', ratio: '1:0.5', notes: 'Kasuri methi is unique, but mild dried herbs provide earthy tone' }
    ]
  },
  {
    id: 'garlic-tomato-pasta',
    name: 'Creamy Garlic & Roasted Tomato Penne',
    nameTranslations: {
      te: 'క్రీమీ గార్లిక్ టొమాటో పాస్తా',
      hi: 'क्रीमी लहसुन और भुना टमाटर पास्ता',
      es: 'Pasta Penne con Ajo y Tomate Asado'
    },
    description: 'Al dente penne tossed in an emulsified sauce of sweet cherry tomatoes, slow-roasted garlic cloves, fresh basil, and aged Parmesan.',
    descriptionTranslations: {
      te: 'టొమాటోలు, వెల్లుల్లి, బాసిల్ మరియు చీజ్ తో కూడిన అద్భుతమైన ఇటాలియన్ పాస్తా డిష్.',
      hi: 'भुने हुए लहसुन, चेरी टमाटर और तुलसी के साथ मखमली पास्ता।',
      es: 'Penne al dente con tomates asados, ajo caramelizado y queso parmesano.'
    },
    cuisine: 'Italian',
    category: 'Main Course',
    image: '/images/garlic_tomato_penne.jpg',
    imageUrl: '/images/garlic_tomato_penne.jpg',
    baseServings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    totalTimeMinutes: 25,
    difficulty: 'Easy',
    spiceLevel: 'Mild',
    dietaryTags: ['Vegetarian', 'Egg-free'],
    budget: '$',
    rating: 4.8,
    reviewsCount: 289,
    author: 'Chef Marco V.',
    authenticStyleNotes: 'Cooks pasta to genuine al dente in heavily salted water, utilizes starchy pasta cooking water for silk emulsion, and tops with Parmigiano-Reggiano and cold-pressed EVOO.',
    homestyleNotes: 'Uses pre-grated cheddar or mozzarella, standard pantry canned crushed tomatoes, and dried Italian seasoning instead of fresh garden basil.',
    ingredients: [
      { id: 'p1', name: 'Penne Pasta', nameTranslations: { te: 'పెన్నె పాస్తా' }, baseQuantity: 200, unit: 'g', category: 'Grains & Pasta' },
      { id: 'p2', name: 'Cherry Tomatoes (halved)', nameTranslations: { te: 'టొమాటోలు' }, baseQuantity: 250, unit: 'g', category: 'Produce' },
      { id: 'p3', name: 'Garlic Cloves (thinly sliced)', nameTranslations: { te: 'వెల్లుల్లి రెబ్బలు' }, baseQuantity: 6, unit: 'cloves', category: 'Produce' },
      { id: 'p4', name: 'Extra Virgin Olive Oil', nameTranslations: { te: 'ఆలివ్ ఆయిల్' }, baseQuantity: 3, unit: 'tbsp', category: 'Oils & Condiments', homestyleSubstitute: { name: 'Sunflower or Vegetable Oil + 0.5 tsp Butter', quantityRatio: 1, unit: 'tbsp', note: 'Smooth rich mouthfeel' } },
      { id: 'p5', name: 'Parmesan Cheese (grated)', nameTranslations: { te: 'పర్మేసన్ చీజ్' }, baseQuantity: 40, unit: 'g', category: 'Dairy & Refrigerated', homestyleSubstitute: { name: 'Cheddar or Nutritional Yeast', quantityRatio: 1, unit: 'g', note: 'Nutritional yeast provides savory cheesy umami for vegans' } },
      { id: 'p6', name: 'Fresh Basil Leaves', nameTranslations: { te: 'బాసిల్ ఆకులు' }, baseQuantity: 15, unit: 'leaves', category: 'Produce', homestyleSubstitute: { name: 'Dried Oregano / Italian Herbs', quantityRatio: 1, unit: 'tsp', note: 'Standard pantry spice rack substitute' } },
      { id: 'p7', name: 'Red Chili Flakes', nameTranslations: { te: 'ఎండిన మిరపకాయ ముక్కలు' }, baseQuantity: 0.5, unit: 'tsp', category: 'Pantry & Spices', optional: true },
      { id: 'p8', name: 'Salt & Freshly Cracked Black Pepper', nameTranslations: { te: 'ఉప్పు మరియు మిరియాల పొడి' }, baseQuantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'p9', name: 'Heavy Cream', nameTranslations: { te: 'క్రీమ్' }, baseQuantity: 50, unit: 'ml', category: 'Dairy & Refrigerated', optional: true }
    ],
    steps: [
      {
        id: 'ps1',
        stepNumber: 1,
        title: 'Boil Pasta & Reserve Starch Water',
        instruction: 'Bring 2 liters of salted water to a rolling boil. Add penne and cook for 9-10 minutes until al dente. Reserve 1/2 cup pasta water, then drain.',
        instructionTranslations: {
          te: 'నీటిలో ఉప్పు వేసి మరిగించండి. పాస్తా వేసి 9-10 నిమిషాలు ఉడికించండి. అర కప్పు పాస్తా నీటిని పక్కన పెట్టుకుని మిగిలినవి వడకట్టండి.'
        },
        durationMinutes: 10,
        temperatureOrHeat: 'High',
        image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=800&q=80',
        chefTip: 'The reserved salty starchy water is the secret to emulsifying a glossy restaurant sauce!'
      },
      {
        id: 'ps2',
        stepNumber: 2,
        title: 'Sauté Garlic & Sizzle Tomatoes',
        instruction: 'In a large pan, heat olive oil over medium-low heat. Add sliced garlic and chili flakes. Sizzle for 60 seconds until golden and fragrant, without burning.',
        instructionTranslations: {
          te: 'బాణలిలో ఆలివ్ నూనె వేసి వెల్లుల్లి, చిల్లీ ఫ్లేక్స్ 1 నిమిషం దోరగా వేయించండి.'
        },
        durationMinutes: 2,
        temperatureOrHeat: 'Medium-Low',
        image: '/images/pasta_cherry_tomato.jpg'
      },
      {
        id: 'ps3',
        stepNumber: 3,
        title: 'Burst the Tomatoes',
        instruction: 'Add halved cherry tomatoes and 0.5 tsp salt. Cook over medium heat for 4-5 minutes, gently crushing them with the back of a spoon to release sweet juices.',
        instructionTranslations: {
          te: 'టొమాటో ముక్కలు, ఉప్పు వేసి 5 నిమిషాలు ఉడికిస్తూ గరిటెతో మెత్తగా నొక్కండి.'
        },
        durationMinutes: 5,
        temperatureOrHeat: 'Medium',
        image: '/images/pasta_cherry_tomato.jpg'
      },
      {
        id: 'ps4',
        stepNumber: 4,
        title: 'Combine, Emulsify & Gloss',
        instruction: 'Toss cooked pasta, splash of reserved pasta water, and cream into the pan. Stir vigorously over medium heat for 2 minutes until sauce clings to the pasta.',
        instructionTranslations: {
          te: 'ఉడికించిన పాస్తా, పక్కన పెట్టిన పాస్తా నీరు మరియు క్రీమ్ వేసి బాగా కలపండి.'
        },
        durationMinutes: 2,
        temperatureOrHeat: 'Medium',
        image: '/images/garlic_tomato_penne.jpg'
      },
      {
        id: 'ps5',
        stepNumber: 5,
        title: 'Finish with Basil & Cheese',
        instruction: 'Remove pan from heat. Fold in torn fresh basil and grated Parmesan. Season with fresh black pepper and serve immediately.',
        instructionTranslations: {
          te: 'స్టవ్ ఆపి బాసిల్ ఆకులు, తురిమిన చీజ్, మిరియాల పొడి వేసి వేడివేడిగా సర్వ్ చేయండి.'
        },
        durationMinutes: 1,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=800&q=80'
      }
    ],
    nutrition: {
      calories: 420,
      protein: 15,
      carbohydrates: 58,
      fat: 16,
      fiber: 4
    },
    substitutions: [
      { original: 'Parmesan', substitute: 'Nutritional Yeast (Vegan) or Pecorino', ratio: '1:1', notes: 'Nutritional yeast gives a rich dairy-free umami punch' },
      { original: 'Penne', substitute: 'Spaghetti, Fusilli, or Gluten-free Rice Pasta', ratio: '1:1', notes: 'Any sturdy pasta shape holds tomato garlic sauce well' }
    ]
  },
  {
    id: 'hyderabadi-biryani',
    name: 'Hyderabadi Chicken Dum Biryani',
    nameTranslations: {
      te: 'హైదరాబాదీ చికెన్ దమ్ బిర్యానీ',
      hi: 'हैदराबादी चिकन दम बिरयानी',
      es: 'Biryani Dum de Pollo de Hyderabad'
    },
    description: 'Royal Nizam-style fragrant basmati rice layered with succulent marinated chicken, saffron milk, crispy golden fried onions (birista), fresh mint, and slow-cooked to perfection under sealed dum.',
    descriptionTranslations: {
      te: 'సుగంధ ద్రవ్యాలు, పెరుగులో నానబెట్టిన లేత చికెన్ ముక్కలు, బాస్మతి బియ్యం, వేయించిన ఉల్లిపాయలు, కుంకుమపువ్వు పాలతో సంప్రదాయ పద్ధతిలో దమ్ చేసిన రాయల్ చికెన్ బిర్యానీ.',
      hi: 'केसर, भुनी हुई प्याज, पुदीने और रसीले मैरीनेट किए हुए चिकन के साथ दम में पकी शाही हैदराबादी बिरयानी।',
      es: 'Auténtico biryani estilo Nizam con pollo marinado, arroz basmati aromático, azafrán, cebolla frita y menta cocinado al vapor.'
    },
    cuisine: 'Indian',
    category: 'Main Course',
    image: '/images/hyderabadi_biryani.jpg',
    imageUrl: '/images/hyderabadi_biryani.jpg',
    baseServings: 4,
    prepTimeMinutes: 30,
    cookTimeMinutes: 40,
    totalTimeMinutes: 70,
    difficulty: 'Hard',
    spiceLevel: 'Spicy',
    dietaryTags: ['Non-Vegetarian', 'Gluten-free', 'High-Protein'],
    budget: '$$',
    rating: 4.96,
    reviewsCount: 580,
    author: 'Chef Ustad Mohammed',
    authenticStyleNotes: 'Authentic Hyderabadi Kacchi Biryani: raw marinated bone-in chicken layered with 70% parboiled long-grain basmati, sealed with dough, and slow-steamed (dum) over a gentle tawa.',
    homestyleNotes: 'Can also be prepared in a heavy pressure cooker (without whistle weight) or thick-bottomed Dutch oven with a tightly crimped aluminum foil seal.',
    ingredients: [
      { id: 'b1', name: 'Fresh Chicken (Bone-in, Curry Cut)', nameTranslations: { te: 'తాజా చికెన్ ముక్కలు' }, baseQuantity: 650, unit: 'g', category: 'Meat & Seafood' },
      { id: 'b2', name: 'Aged Basmati Rice', nameTranslations: { te: 'బాస్మతి బియ్యం' }, baseQuantity: 400, unit: 'g', category: 'Grains & Pasta' },
      { id: 'b3', name: 'Thick Whisked Yogurt / Curd', nameTranslations: { te: 'చిక్కటి పెరుగు' }, baseQuantity: 180, unit: 'g', category: 'Dairy & Refrigerated' },
      { id: 'b4', name: 'Fried Golden Onions (Birista)', nameTranslations: { te: 'వేయించిన ఉల్లిపాయలు (బిరిస్తా)' }, baseQuantity: 100, unit: 'g', category: 'Produce' },
      { id: 'b5', name: 'Shahi Biryani Masala Powder', nameTranslations: { te: 'షాహీ బిర్యానీ మసాలా' }, baseQuantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'b6', name: 'Fresh Ginger-Garlic Paste', nameTranslations: { te: 'అల్లం వెల్లుల్లి పేస్ట్' }, baseQuantity: 2.5, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'b7', name: 'Fresh Mint & Coriander Leaves (Chopped)', nameTranslations: { te: 'పుదీనా మరియు కొత్తిమీర' }, baseQuantity: 1.5, unit: 'cup', category: 'Produce' },
      { id: 'b8', name: 'Slit Green Chilies', nameTranslations: { te: 'పచ్చిమిరపకాయలు' }, baseQuantity: 5, unit: 'pieces', category: 'Produce' },
      { id: 'b9', name: 'Pure Desi Ghee', nameTranslations: { te: 'స్వచ్ఛమైన నెయ్యి' }, baseQuantity: 3.5, unit: 'tbsp', category: 'Dairy & Refrigerated' },
      { id: 'b10', name: 'Saffron Strands steeped in Warm Milk', nameTranslations: { te: 'కుంకుమపువ్వు పాలు' }, baseQuantity: 1, unit: 'pinch', category: 'Pantry & Spices' },
      { id: 'b11', name: 'Whole Biryani Spices (Bay Leaf, Cardamom, Cloves, Shahi Jeera, Star Anise, Cinnamon)', nameTranslations: { te: 'షాహీ హోల్ బిర్యానీ స్పైసెస్' }, baseQuantity: 1, unit: 'set', category: 'Pantry & Spices' },
      { id: 'b12', name: 'Kashmiri Red Chili Powder', nameTranslations: { te: 'కాశ్మీరీ కారం' }, baseQuantity: 1.5, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'b13', name: 'Fresh Lemon Juice', nameTranslations: { te: 'నిమ్మరసం' }, baseQuantity: 1.5, unit: 'tbsp', category: 'Produce' },
      { id: 'b14', name: 'Salt', nameTranslations: { te: 'ఉప్పు' }, baseQuantity: 2.5, unit: 'tsp', category: 'Pantry & Spices' }
    ],
    steps: [
      {
        id: 'bs1',
        stepNumber: 1,
        title: 'Marinate the Tender Chicken (Kacchi Biryani Base)',
        instruction: 'In a heavy-bottomed biryani pot or handi, combine cleaned chicken pieces with thick yogurt, ginger-garlic paste, Kashmiri red chili powder, shahi biryani masala, lemon juice, half the fried onions (birista), half the chopped mint and coriander, slit green chilies, 1 tbsp ghee, and 1.5 tsp salt. Rub thoroughly into the meat and rest for 30 minutes.',
        instructionTranslations: {
          te: 'మందపాటి బిర్యానీ గిన్నెలో శుభ్రం చేసిన చికెన్ ముక్కలను వేసి పెరుగు, అల్లం వెల్లుల్లి పేస్ట్, కారం, బిర్యానీ మసాలా, నిమ్మరసం, వేయించిన ఉల్లిపాయలు, పచ్చిమిర్చి, పుదీనా, కొత్తిమీర, నెయ్యి, ఉప్పు వేసి బాగా కలిపి 30 నిమిషాలు నాననివ్వండి.'
        },
        durationMinutes: 15,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
        chefTip: 'Marinating with yogurt and lemon tenderizes the chicken fibers so the meat stays exceptionally juicy during slow steaming.'
      },
      {
        id: 'bs2',
        stepNumber: 2,
        title: 'Wash & Parboil Basmati Rice to 70%',
        instruction: 'Wash aged basmati rice gently until water runs clear and soak for 30 minutes. In a large stockpot, bring 4 liters of water to a rolling boil with whole spices (bay leaf, cloves, cardamom, shahi jeera, star anise) and 1 tsp salt. Add soaked rice and boil for exactly 5 to 6 minutes until 70% cooked (grains should break into 3 pieces when pressed). Strain immediately.',
        instructionTranslations: {
          te: 'బాస్మతి బియ్యాన్ని కడిగి 30 నిమిషాలు నానబెట్టండి. మరిగే నీటిలో హోల్ గరం మసాలాలు, ఉప్పు వేసి బియ్యాన్ని 70% మాత్రమే ఉడికించి వెంటనే నీటిని వడకట్టండి.'
        },
        durationMinutes: 10,
        temperatureOrHeat: 'High',
        image: '/images/biryani_boil_rice.jpg',
        chefTip: 'Do not cook past 70%; the rice will absorb rich steam and juices from the chicken while in dum.'
      },
      {
        id: 'bs3',
        stepNumber: 3,
        title: 'Layer the Dum Handi',
        instruction: 'Evenly spread the hot parboiled rice over the marinated chicken layer in the handi. Drizzle warm saffron milk, remaining crispy fried onions, freshly chopped mint leaves, and 2 tbsp melted desi ghee across the top.',
        instructionTranslations: {
          te: 'నానిన చికెన్ పైన ఉడికించిన వేడి బాస్మతి బియ్యాన్ని సమంగా పరచండి. పైన కుంకుమపువ్వు పాలు, మిగిలిన వేయించిన ఉల్లిపాయలు, తాజా పుదీనా మరియు స్వచ్ఛమైన నెయ్యిని చల్లండి.'
        },
        durationMinutes: 5,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'bs4',
        stepNumber: 4,
        title: 'Seal & Slow Dum Cook',
        instruction: 'Seal the pot tightly with heavy foil or dough and place the lid firmly on top to trap steam. Cook on high heat for 5 minutes, then transfer pot onto a flat iron tawa (griddle) over low heat for 25-30 minutes of gentle dum cooking.',
        instructionTranslations: {
          te: 'గిన్నెపై మూత గట్టిగా పెట్టి ఆవిరి పోకుండా సీల్ చేయండి. 5 నిమిషాలు ఎక్కువ మంటపై, ఆపై పెనం మీద తక్కువ మంటపై 25 నుండి 30 నిమిషాలు నిదానంగా దమ్ చేయండి.'
        },
        durationMinutes: 30,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
        chefTip: 'Using an iron tawa under the pot prevents the chicken from scorching while creating a rich, caramelized bottom layer.'
      },
      {
        id: 'bs5',
        stepNumber: 5,
        title: 'Rest, Fluff & Serve with Raita',
        instruction: 'Turn off the heat and let the handi rest for 10 minutes without opening. Gently fluff from the side corners using a flat spatula to reveal alternating layers of spiced chicken, saffron rice, and white rice. Serve hot with mirchi ka salan and cucumber raita!',
        instructionTranslations: {
          te: 'స్టవ్ ఆపి 10 నిమిషాలు అలాగే ఉంచండి. నెమ్మదిగా కింద నుంచి కలుపుతూ రాయితాతో వడ్డించండి.'
        },
        durationMinutes: 10,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80'
      }
    ],
    nutrition: {
      calories: 640,
      protein: 38,
      carbohydrates: 68,
      fat: 22,
      fiber: 3
    },
    substitutions: [
      { original: 'Bone-in Chicken', substitute: 'Boneless Chicken Thighs or Mutton', ratio: '1:1', notes: 'For mutton, increase dum cooking time to 45-50 minutes' },
      { original: 'Desi Ghee', substitute: 'Refined Oil', ratio: '1:1', notes: 'Lighter everyday alternative' }
    ]
  },
  {
    id: 'mexican-street-tacos',
    name: 'Authentic Smoky Black Bean & Avocado Tacos',
    nameTranslations: {
      te: 'మెక్సికన్ బ్లాక్ బీన్ టాకోస్',
      hi: 'मैक्सिकन स्ट्रीट टैकोस',
      es: 'Tacos Callejeros de Frijoles Negros y Aguacate'
    },
    description: 'Warm toasted corn tortillas filled with cumin-spiced simmered black beans, charred corn, fresh pico de gallo, and creamy avocado salsa.',
    descriptionTranslations: {
      te: 'మొక్కజొన్న టోర్టిల్లాలు, మసాలా బ్లాక్ బీన్స్, అవకాడో మరియు టొమాటో సల్సాతో రుచికరమైన మెక్సికన్ వంటకం.',
      hi: 'मक्के की टॉर्टिला, मसालेदार ब्लैक बीन्स और ताज़ा एवोकाडो सालसा के साथ लज़ीज़ टैकोस।',
      es: 'Tortillas de maíz calientes con frijoles negros sazonados, maíz tatemado y salsa de aguacate.'
    },
    cuisine: 'Mexican',
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=80',
    baseServings: 2,
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    totalTimeMinutes: 30,
    difficulty: 'Easy',
    spiceLevel: 'Medium',
    dietaryTags: ['Vegan', 'Vegetarian', 'Gluten-free', 'Dairy-free', 'Egg-free'],
    budget: '$',
    rating: 4.85,
    reviewsCount: 198,
    author: 'Chef Elena R.',
    authenticStyleNotes: 'Uses double-layered small nixtamalized white corn tortillas, roasted chipotle chiles in adobo, and freshly pressed lime juice with cotija cheese.',
    homestyleNotes: 'Uses flour tortillas, canned black beans, frozen sweet corn, and mild store-bought salsa.',
    ingredients: [
      { id: 't1', name: 'Small Corn Tortillas', nameTranslations: { te: 'కార్న్ టోర్టిల్లాలు' }, baseQuantity: 6, unit: 'pieces', category: 'Bakery' },
      { id: 't2', name: 'Black Beans (cooked/canned, rinsed)', nameTranslations: { te: 'బ్లాక్ బీన్స్' }, baseQuantity: 250, unit: 'g', category: 'Pantry & Spices' },
      { id: 't3', name: 'Ripe Avocado (diced)', nameTranslations: { te: 'అవకాడో' }, baseQuantity: 1, unit: 'piece', category: 'Produce' },
      { id: 't4', name: 'Sweet Corn Kernels', nameTranslations: { te: 'మొక్కజొన్న గింజలు' }, baseQuantity: 100, unit: 'g', category: 'Produce' },
      { id: 't5', name: 'Red Onion & Tomato (finely diced)', nameTranslations: { te: 'ఉల్లిపాయ మరియు టొమాటో' }, baseQuantity: 150, unit: 'g', category: 'Produce' },
      { id: 't6', name: 'Fresh Cilantro (Coriander)', nameTranslations: { te: 'కొత్తిమీర' }, baseQuantity: 0.5, unit: 'cup', category: 'Produce' },
      { id: 't7', name: 'Ground Cumin & Smoked Paprika', nameTranslations: { te: 'జీలకర్ర మరియు పాప్రికా పొడి' }, baseQuantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 't8', name: 'Fresh Lime Juice', nameTranslations: { te: 'నిమ్మరసం' }, baseQuantity: 2, unit: 'tbsp', category: 'Produce' },
      { id: 't9', name: 'Olive Oil', nameTranslations: { te: 'నూనె' }, baseQuantity: 1, unit: 'tbsp', category: 'Oils & Condiments' },
      { id: 't10', name: 'Salt & Pepper', nameTranslations: { te: 'ఉప్పు మరియు మిరియాల పొడి' }, baseQuantity: 0.75, unit: 'tsp', category: 'Pantry & Spices' }
    ],
    steps: [
      {
        id: 'ts1',
        stepNumber: 1,
        title: 'Make Fresh Pico de Gallo',
        instruction: 'In a bowl, toss diced tomatoes, red onions, half of chopped cilantro, 1 tbsp lime juice, and 0.5 tsp salt. Let sit for flavors to meld.',
        instructionTranslations: {
          te: 'గిన్నెలో టొమాటో, ఉల్లిపాయ ముక్కలు, కొత్తిమీర, నిమ్మరసం, ఉప్పు వేసి కలపండి.'
        },
        durationMinutes: 5,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'ts2',
        stepNumber: 2,
        title: 'Warm & Season Black Beans & Corn',
        instruction: 'Heat oil in a skillet over medium heat. Add black beans, sweet corn, cumin, smoked paprika, and a splash of water. Sauté for 5-6 minutes, lightly mashing some beans for texture.',
        instructionTranslations: {
          te: 'బాణలిలో నూనె వేడి చేసి బ్లాక్ బీన్స్, మొక్కజొన్న, జీలకర్ర పొడి, పాప్రికా వేసి 5 నిమిషాలు వేయించండి.'
        },
        durationMinutes: 6,
        temperatureOrHeat: 'Medium',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'ts3',
        stepNumber: 3,
        title: 'Char the Tortillas',
        instruction: 'Warm corn tortillas in a dry skillet over medium-high heat for 30 seconds per side until pliable and lightly charred around edges.',
        instructionTranslations: {
          te: 'పెనంపై టోర్టిల్లాలను రెండు వైపులా 30 సెకన్లు కాల్చండి.'
        },
        durationMinutes: 3,
        temperatureOrHeat: 'Medium-High',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'ts4',
        stepNumber: 4,
        title: 'Assemble Street Tacos',
        instruction: 'Spoon warm black bean corn filling into each tortilla. Top with avocado cubes, fresh pico de gallo, cilantro, and a squeeze of lime.',
        instructionTranslations: {
          te: 'టోర్టిల్లాలో బీన్స్ మిశ్రమం, అవకాడో, సల్సా మరియు కొత్తిమీర వేసి నిమ్మరసం పిండి వడ్డించండి.'
        },
        durationMinutes: 3,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    nutrition: {
      calories: 380,
      protein: 14,
      carbohydrates: 62,
      fat: 11,
      fiber: 14
    },
    substitutions: [
      { original: 'Black Beans', substitute: 'Pinto Beans or Chickpeas or Ground Meat', ratio: '1:1', notes: 'Chickpeas or kidney beans work wonderfully with Mexican spices' },
      { original: 'Corn Tortillas', substitute: 'Flour Tortillas, Pita, or Lettuce Wraps', ratio: '1:1', notes: 'Lettuce wraps reduce carbs for keto diet' }
    ]
  },
  {
    id: 'kung-pao-tofu',
    name: 'Szechuan Kung Pao Tofu & Veggies',
    nameTranslations: {
      te: 'స్పైసీ కుంగ్ పావో టోఫు',
      hi: 'सिचुआन कुंग पाओ टोफू',
      es: 'Tofu Kung Pao al Estilo Szechuan'
    },
    description: 'Crispy pan-fried tofu cubes tossed with crunchy peanuts, bell peppers, dried red chilies, and a savory-sweet tangy Szechuan glaze.',
    descriptionTranslations: {
      te: 'క్రిస్పీ టోఫు, వేరుశెనగ గుళ్లు, క్యాప్సికమ్ మరియు సోయా-వెనిగర్ సాస్ తో చేసిన చైనీస్ వంటకం.',
      hi: 'कुरकुरा टोफू, मूंगफली और शिमला मिर्च के साथ स्वादिष्ट कुंग पाओ सॉस।',
      es: 'Cubos de tofu crujiente con cacahuates tostados, pimientos y salsa agridulce Szechuan.'
    },
    cuisine: 'Chinese',
    category: 'Main Course',
    image: '/images/tofu_szechuan.jpg',
    baseServings: 2,
    prepTimeMinutes: 15,
    cookTimeMinutes: 12,
    totalTimeMinutes: 27,
    difficulty: 'Medium',
    spiceLevel: 'Spicy',
    dietaryTags: ['Vegan', 'Vegetarian', 'Dairy-free', 'Egg-free'],
    budget: '$',
    rating: 4.75,
    reviewsCount: 165,
    author: 'Chef Chen Wei',
    authenticStyleNotes: 'Uses Szechuan peppercorns for mouth-tingling mala sensation, aged Chinkiang black vinegar, Shaoxing wine, and whole facing-heaven chilies.',
    homestyleNotes: 'Uses regular soy sauce, apple cider vinegar or white vinegar, brown sugar, and standard red chili flakes or dried chilies.',
    ingredients: [
      { id: 'k1', name: 'Extra Firm Tofu (pressed & cubed)', nameTranslations: { te: 'టోఫు' }, baseQuantity: 300, unit: 'g', category: 'Produce', homestyleSubstitute: { name: 'Paneer or Chicken or Cauliflower florets', quantityRatio: 1, unit: 'g', note: 'Paneer or crispy mushrooms work brilliantly' } },
      { id: 'k2', name: 'Cornstarch (for coating)', nameTranslations: { te: 'కార్న్ ఫ్లోర్' }, baseQuantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'k3', name: 'Roasted Peanuts (unsalted)', nameTranslations: { te: 'వేరుశెనగ గుళ్లు' }, baseQuantity: 40, unit: 'g', category: 'Pantry & Spices' },
      { id: 'k4', name: 'Bell Peppers (diced)', nameTranslations: { te: 'క్యాప్సికమ్' }, baseQuantity: 150, unit: 'g', category: 'Produce' },
      { id: 'k5', name: 'Scallions / Spring Onions (cut in 1-inch lengths)', nameTranslations: { te: 'ఉల్లికాడలు' }, baseQuantity: 3, unit: 'stalks', category: 'Produce' },
      { id: 'k6', name: 'Dried Whole Red Chilies', nameTranslations: { te: 'ఎండిన మిరపకాయలు' }, baseQuantity: 4, unit: 'pieces', category: 'Pantry & Spices' },
      { id: 'k7', name: 'Garlic & Ginger (minced)', nameTranslations: { te: 'వెల్లుల్లి మరియు అల్లం' }, baseQuantity: 1.5, unit: 'tbsp', category: 'Produce' },
      { id: 'k8', name: 'Soy Sauce (Low Sodium)', nameTranslations: { te: 'సోయా సాస్' }, baseQuantity: 2.5, unit: 'tbsp', category: 'Oils & Condiments' },
      { id: 'k9', name: 'Rice Vinegar or Black Vinegar', nameTranslations: { te: 'వెనిగర్' }, baseQuantity: 1.5, unit: 'tbsp', category: 'Oils & Condiments' },
      { id: 'k10', name: 'Brown Sugar / Maple Syrup', nameTranslations: { te: 'చక్కెర' }, baseQuantity: 1, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'k11', name: 'Sesame Oil or Neutral Oil', nameTranslations: { te: 'నూనె' }, baseQuantity: 2, unit: 'tbsp', category: 'Oils & Condiments' }
    ],
    steps: [
      {
        id: 'ks1',
        stepNumber: 1,
        title: 'Coat & Crisp the Tofu',
        instruction: 'Toss tofu cubes with cornstarch and a pinch of salt. Heat 1.5 tbsp oil in a wok or large pan over medium-high heat. Fry tofu for 6-7 minutes, turning occasionally until golden and crispy on all sides. Remove.',
        instructionTranslations: {
          te: 'టోఫు ముక్కలపై కార్న్ ఫ్లోర్, ఉప్పు వేసి కలపండి. బాణలిలో నూనె వేసి టోఫును బంగారు రంగు వచ్చేవరకు వేయించి పక్కన పెట్టండి.'
        },
        durationMinutes: 7,
        temperatureOrHeat: 'Medium-High',
        image: '/images/tofu_crispy_fry.jpg'
      },
      {
        id: 'ks2',
        stepNumber: 2,
        title: 'Whisk Kung Pao Sauce',
        instruction: 'In a small bowl, whisk together soy sauce, vinegar, brown sugar, 1 tsp cornstarch, and 3 tbsp water until smooth.',
        instructionTranslations: {
          te: 'ఒక గిన్నెలో సోయా సాస్, వెనిగర్, చక్కెర, 1 చెంచా కార్న్ ఫ్లోర్ మరియు నీరు వేసి కలపండి.'
        },
        durationMinutes: 2,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'ks3',
        stepNumber: 3,
        title: 'Stir-Fry Aromatics & Peppers',
        instruction: 'Add remaining oil to hot wok. Sauté minced garlic, ginger, and dried chilies for 30 seconds. Add diced bell peppers and spring onion whites, stir-frying on high heat for 2 minutes.',
        instructionTranslations: {
          te: 'బాణలిలో అల్లం, వెల్లుల్లి, ఎండిన మిరపకాయలు, క్యాప్సికమ్ వేసి 2 నిమిషాలు వేగంగా వేయించండి.'
        },
        durationMinutes: 3,
        temperatureOrHeat: 'High',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'ks4',
        stepNumber: 4,
        title: 'Glaze Tofu & Toss with Peanuts',
        instruction: 'Pour in the sauce mixture and stir until it bubbles and thickens (about 45 seconds). Toss in crispy tofu, roasted peanuts, and spring onion greens. Serve hot with jasmine rice.',
        instructionTranslations: {
          te: 'సాస్ మిశ్రమాన్ని వేసి చిక్కబడేవరకు కలిపి, వేయించిన టోఫు, వేరుశెనగ గుళ్లు, ఉల్లికాడలు వేసి కలపండి.'
        },
        durationMinutes: 2,
        temperatureOrHeat: 'Medium-High',
        image: '/images/tofu_szechuan.jpg'
      }
    ],
    nutrition: {
      calories: 340,
      protein: 18,
      carbohydrates: 24,
      fat: 20,
      fiber: 5
    },
    substitutions: [
      { original: 'Peanuts', substitute: 'Cashews, Almonds, or Toasted Sesame Seeds', ratio: '1:1', notes: 'Great for peanut allergies' },
      { original: 'Soy Sauce', substitute: 'Tamari (Gluten-free) or Coconut Aminos', ratio: '1:1', notes: 'Tamari makes it 100% gluten-free' }
    ]
  },
  {
    id: 'avocado-egg-toast',
    name: 'Gourmet Smashed Avocado & Poached Egg Sourdough',
    nameTranslations: {
      te: 'అవకాడో ఎగ్ టోస్ట్',
      hi: 'गॉरमे एवोकाडो और पोच्ड एग टोस्ट',
      es: 'Tostada Gourmet de Aguacate y Huevo Escalfado'
    },
    description: 'Crusty toasted artisan sourdough layered with creamy lemon-dill smashed avocado, runny soft-poached egg, chili crunch, and microgreens.',
    descriptionTranslations: {
      te: 'కరకరలాడే టోస్ట్ బ్రెడ్ పై అవకాడో, నిమ్మరసం, ఉడికించిన గుడ్డు మరియు చిల్లీ ఫ్లేక్స్ తో చేసిన బ్రేక్‌ఫాస్ట్.',
      hi: 'कुरकुरी टोस्टेड ब्रेड पर क्रीमी एवोकाडो, सॉफ्ट पोच्ड एग और चिली फ्लेक्स का नाश्ता।',
      es: 'Pan de masa madre tostado con aguacate machacado al limón, huevo pochado y semillas.'
    },
    cuisine: 'Continental',
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80',
    baseServings: 2,
    prepTimeMinutes: 5,
    cookTimeMinutes: 8,
    totalTimeMinutes: 13,
    difficulty: 'Easy',
    spiceLevel: 'Mild',
    dietaryTags: ['Non-Vegetarian', 'Dairy-free', 'High-Protein'],
    budget: '$',
    rating: 4.88,
    reviewsCount: 220,
    author: 'Chef Sarah L.',
    authenticStyleNotes: 'Uses naturally fermented sourdough loaf, farm-fresh pasture eggs gently vortex-poached in simmering water, and cold-pressed olive oil with Maldon flaky sea salt.',
    homestyleNotes: 'Uses standard sliced sandwich bread toasted in toaster, sunny-side-up fried egg, and everyday table salt and black pepper.',
    ingredients: [
      { id: 'a1', name: 'Thick Artisan Sourdough Bread Slices', nameTranslations: { te: 'బ్రెడ్ ముక్కలు' }, baseQuantity: 2, unit: 'slices', category: 'Bakery' },
      { id: 'a2', name: 'Ripe Hass Avocado', nameTranslations: { te: 'అవకాడో' }, baseQuantity: 1, unit: 'piece', category: 'Produce' },
      { id: 'a3', name: 'Fresh Eggs', nameTranslations: { te: 'గుడ్లు' }, baseQuantity: 2, unit: 'pieces', category: 'Dairy & Refrigerated', homestyleSubstitute: { name: 'Fried Tofu or Sliced Mushrooms', quantityRatio: 100, unit: 'g', note: 'Egg-free / vegan option' } },
      { id: 'a4', name: 'Fresh Lemon Juice', nameTranslations: { te: 'నిమ్మరసం' }, baseQuantity: 1, unit: 'tsp', category: 'Produce' },
      { id: 'a5', name: 'Extra Virgin Olive Oil', nameTranslations: { te: 'ఆలివ్ నూనె' }, baseQuantity: 1, unit: 'tsp', category: 'Oils & Condiments' },
      { id: 'a6', name: 'Red Pepper Chili Flakes & Flaky Salt', nameTranslations: { te: 'చిల్లీ ఫ్లేక్స్ మరియు ఉప్పు' }, baseQuantity: 0.5, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'a7', name: 'White Vinegar (for poaching)', nameTranslations: { te: 'వెనిగర్' }, baseQuantity: 1, unit: 'tsp', category: 'Pantry & Spices', optional: true }
    ],
    steps: [
      {
        id: 'as1',
        stepNumber: 1,
        title: 'Toast the Bread',
        instruction: 'Brush sourdough slices with olive oil and toast on a skillet or in a toaster until deep golden and crispy.',
        instructionTranslations: {
          te: 'బ్రెడ్ ముక్కలకు కొద్దిగా ఆలివ్ నూనె రాసి పెనంపై లేదా టోస్టర్ లో బంగారు రంగు వచ్చేవరకు కాల్చండి.'
        },
        durationMinutes: 3,
        temperatureOrHeat: 'Medium',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'as2',
        stepNumber: 2,
        title: 'Season & Smash Avocado',
        instruction: 'In a bowl, mash avocado flesh with lemon juice, a pinch of salt, and black pepper using a fork until chunky-smooth.',
        instructionTranslations: {
          te: 'ఒక గిన్నెలో అవకాడో, నిమ్మరసం, ఉప్పు మరియు మిరియాల పొడి వేసి ఫోర్క్‌తో మెత్తగా కలపండి.'
        },
        durationMinutes: 2,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'as3',
        stepNumber: 3,
        title: 'Poach or Fry the Eggs',
        instruction: 'Bring 3 inches of water and vinegar to a gentle simmer. Create a gentle vortex with a spoon, slide cracked egg in center, and poach for 3 minutes for a luscious runny yolk. (Or pan-fry sunny-side up in 1 tsp oil).',
        instructionTranslations: {
          te: 'మరుగుతున్న నీటిలో గుడ్డు వేసి 3 నిమిషాలు ఉడికించండి (లేదా పెనంపై ఫ్రై చేయండి).'
        },
        durationMinutes: 4,
        temperatureOrHeat: 'Simmer',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'as4',
        stepNumber: 4,
        title: 'Assemble & Garnish',
        instruction: 'Generously spread mashed avocado over warm toasted sourdough. Top with the warm egg, chili flakes, and a crack of black pepper. Slice and enjoy!',
        instructionTranslations: {
          te: 'టోస్ట్ చేసిన బ్రెడ్‌పై అవకాడో మిశ్రమం, దానిపై ఉడికించిన గుడ్డు, చిల్లీ ఫ్లేక్స్ వేసి సర్వ్ చేయండి.'
        },
        durationMinutes: 1,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80'
      }
    ],
    nutrition: {
      calories: 310,
      protein: 13,
      carbohydrates: 28,
      fat: 17,
      fiber: 7
    },
    substitutions: [
      { original: 'Egg', substitute: 'Sautéed mushrooms, hemp seeds, or smoked tofu', ratio: '1:1', notes: 'Vegan alternative providing great texture and protein' },
      { original: 'Sourdough', substitute: 'Whole wheat toast or gluten-free bread', ratio: '1:1', notes: 'Gluten-free option' }
    ]
  },
  {
    id: 'quinoa-buddha-bowl',
    name: 'Mediterranean Rainbow Quinoa & Chickpea Bowl',
    nameTranslations: {
      te: 'మెడిటరేనియన్ క్వినోవా సలాడ్ బౌల్',
      hi: 'भूमध्यसागरीय क्विनोआ और चना बाउल',
      es: 'Bowl Mediterráneo de Quinoa y Garbanzos'
    },
    description: 'Fluffy organic quinoa, crispy cumin-roasted chickpeas, diced Persian cucumbers, cherry tomatoes, kalamata olives, and creamy tahini lemon dressing.',
    descriptionTranslations: {
      te: 'క్వినోవా, వేయించిన శనగలు, దోసకాయ, టొమాటోలు మరియు లెమన్ తాహిని డ్రెస్సింగ్ తో కూడిన హెల్తీ బౌల్.',
      hi: 'प्रोटीन युक्त क्विनोआ, भुने हुए छोले, खीरा और ताहिनी लेमन ड्रेसिंग का पौष्टिक बाउल।',
      es: 'Quinoa esponjosa con garbanzos tostados al comino, pepino, tomates y aderezo de tahini.'
    },
    cuisine: 'Mediterranean',
    category: 'Healthy',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    baseServings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    totalTimeMinutes: 25,
    difficulty: 'Easy',
    spiceLevel: 'Mild',
    dietaryTags: ['Vegan', 'Vegetarian', 'Gluten-free', 'Dairy-free', 'Egg-free'],
    budget: '$$',
    rating: 4.82,
    reviewsCount: 140,
    author: 'Nutritionist Maya K.',
    authenticStyleNotes: 'Uses white tri-color quinoa simmered in vegetable broth, house-blended sesame tahini with sumac spice, and organic kalamata olives.',
    homestyleNotes: 'Uses brown or white rice, canned boiled chickpeas with a quick pan-toss, and simple peanut butter or olive oil lemon vinaigrette.',
    ingredients: [
      { id: 'q1', name: 'Quinoa (rinsed)', nameTranslations: { te: 'క్వినోవా' }, baseQuantity: 120, unit: 'g', category: 'Grains & Pasta', homestyleSubstitute: { name: 'Brown Rice, Couscous, or Millets', quantityRatio: 1, unit: 'g', note: 'Rice or millets are economical and hearty' } },
      { id: 'q2', name: 'Cooked Chickpeas', nameTranslations: { te: 'ఉడకబెట్టిన శనగలు' }, baseQuantity: 200, unit: 'g', category: 'Pantry & Spices' },
      { id: 'q3', name: 'Cucumbers & Cherry Tomatoes (chopped)', nameTranslations: { te: 'దోసకాయ మరియు టొమాటో' }, baseQuantity: 200, unit: 'g', category: 'Produce' },
      { id: 'q4', name: 'Tahini (Sesame Paste)', nameTranslations: { te: 'నువ్వుల పేస్ట్ (తాహిని)' }, baseQuantity: 2, unit: 'tbsp', category: 'Pantry & Spices', homestyleSubstitute: { name: 'Greek Yogurt or Hummus or Olive oil vinaigrette', quantityRatio: 2, unit: 'tbsp', note: 'Creamy and tangy dressing base' } },
      { id: 'q5', name: 'Lemon Juice', nameTranslations: { te: 'నిమ్మరసం' }, baseQuantity: 2, unit: 'tbsp', category: 'Produce' },
      { id: 'q6', name: 'Ground Cumin, Garlic Powder, Paprika', nameTranslations: { te: 'జీలకర్ర మరియు వెల్లుల్లి పొడి' }, baseQuantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'q7', name: 'Olive Oil', nameTranslations: { te: 'ఆలివ్ నూనె' }, baseQuantity: 1.5, unit: 'tbsp', category: 'Oils & Condiments' },
      { id: 'q8', name: 'Salt & Pepper', nameTranslations: { te: 'ఉప్పు' }, baseQuantity: 0.5, unit: 'tsp', category: 'Pantry & Spices' }
    ],
    steps: [
      {
        id: 'qs1',
        stepNumber: 1,
        title: 'Cook Fluffy Quinoa',
        instruction: 'Add rinsed quinoa with 1 cup water and pinch of salt to a small saucepan. Bring to a boil, cover with lid, lower heat and simmer for 13 minutes. Remove from heat and let sit covered for 5 minutes, then fluff with a fork.',
        instructionTranslations: {
          te: 'గిన్నెలో క్వినోవా, 1 కప్పు నీరు, ఉప్పు వేసి మూత పెట్టి తక్కువ మంటపై 13 నిమిషాలు ఉడికించి ఆ తర్వాత ఫోర్క్‌తో కలపండి.'
        },
        durationMinutes: 15,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'qs2',
        stepNumber: 2,
        title: 'Crisp the Spiced Chickpeas',
        instruction: 'Heat 1 tbsp olive oil in a skillet over medium heat. Toss chickpeas with cumin, garlic powder, paprika, and salt for 5 minutes until lightly crispy.',
        instructionTranslations: {
          te: 'బాణలిలో నూనె వేడి చేసి శనగలు, జీలకర్ర పొడి, వెల్లుల్లి పొడి, ఉప్పు వేసి 5 నిమిషాలు వేయించండి.'
        },
        durationMinutes: 5,
        temperatureOrHeat: 'Medium',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'qs3',
        stepNumber: 3,
        title: 'Whisk Lemon Tahini Dressing',
        instruction: 'In a small jar or bowl, whisk tahini, lemon juice, 1-2 tbsp warm water, remaining olive oil, salt, and pepper until a creamy pourable dressing forms.',
        instructionTranslations: {
          te: 'ఒక గిన్నెలో తాహిని, నిమ్మరసం, 2 చెంచాల నీరు, ఉప్పు మరియు మిరియాల పొడి వేసి డ్రెస్సింగ్ తయారు చేయండి.'
        },
        durationMinutes: 2,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'qs4',
        stepNumber: 4,
        title: 'Assemble the Power Bowl',
        instruction: 'Divide fluffy quinoa into two bowls. Arrange crispy chickpeas, chopped cucumbers, and tomatoes side by side. Drizzle generously with lemon tahini dressing.',
        instructionTranslations: {
          te: 'బౌల్‌లో క్వినోవా, వేయించిన శనగలు, దోసకాయ, టొమాటోలు సర్ది పైన తాహిని డ్రెస్సింగ్ వేయండి.'
        },
        durationMinutes: 3,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
      }
    ],
    nutrition: {
      calories: 390,
      protein: 15,
      carbohydrates: 54,
      fat: 14,
      fiber: 11
    },
    substitutions: [
      { original: 'Tahini', substitute: 'Hummus or Greek Yogurt with lemon', ratio: '1:1', notes: 'Gives the same luscious creamy dressing texture' }
    ]
  },
  {
    id: 'lava-cake',
    name: 'Molten Chocolate Lava Cake',
    nameTranslations: {
      te: 'చాక్లెట్ లావా కేక్',
      hi: 'मोल्टन चॉकलेट लावा केक',
      es: 'Pastel de Chocolate con Centro Líquido (Lava Cake)'
    },
    description: 'Decadent classic French molten chocolate mini cakes prepared with farm-fresh eggs and butter, with a warm, flowing melted chocolate ganache center, dusted with powdered sugar.',
    descriptionTranslations: {
      te: 'నోరూరించే క్లాసిక్ చాక్లెట్ కేక్, తాజా గుడ్లు, వెన్న మరియు మధ్యలో వేడిగా కరిగిన చాక్లెట్ లావాతో నిండి ఉంటుంది.',
      hi: 'अंडे और मक्खन से बना क्लासिक डार्क चॉकलेट केक, जिसके अंदर गर्म पिघली हुई चॉकलेट लावा भरा होता है।',
      es: 'Pasteles individuales clásicos de chocolate negro preparados con huevos frescos y centro líquido caliente de chocolate derretido.'
    },
    cuisine: 'Continental',
    tasteProfile: 'Sweet',
    category: 'Desserts',
    image: '/images/molten_lava_baked.jpg',
    imageUrl: '/images/molten_lava_baked.jpg',
    baseServings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 11,
    totalTimeMinutes: 21,
    difficulty: 'Medium',
    spiceLevel: 'None',
    dietaryTags: ['Non-Vegetarian'],
    budget: '$',
    rating: 4.95,
    reviewsCount: 340,
    author: 'Chef Jean-Pierre',
    authenticStyleNotes: 'Classic Parisian patisserie recipe: gently whips whole eggs and yolks with sugar until ribbony, folds with 70% dark melted chocolate and European butter, and bakes in cocoa-dusted ramekins for an oozy molten core.',
    homestyleNotes: 'Can use 2 whole eggs, semi-sweet baking chocolate chips, and bake in silicone cups or oven-safe ramekins.',
    ingredients: [
      { id: 'd1', name: 'Dark Chocolate (60-70% chopped)', nameTranslations: { te: 'డార్క్ చాక్లెట్' }, baseQuantity: 100, unit: 'g', category: 'Pantry & Spices' },
      { id: 'd2', name: 'Unsalted Butter', nameTranslations: { te: 'వెన్న' }, baseQuantity: 60, unit: 'g', category: 'Dairy & Refrigerated' },
      { id: 'd3', name: 'Fresh Whole Eggs & Yolk (Room Temp)', nameTranslations: { te: 'తాజా గుడ్లు' }, baseQuantity: 2, unit: 'pieces', category: 'Dairy & Refrigerated' },
      { id: 'd4', name: 'Powdered Sugar', nameTranslations: { te: 'చక్కెర పొడి' }, baseQuantity: 45, unit: 'g', category: 'Pantry & Spices' },
      { id: 'd5', name: 'All-Purpose Flour (Maida)', nameTranslations: { te: 'మైదా పిండి' }, baseQuantity: 30, unit: 'g', category: 'Grains & Pasta', homestyleSubstitute: { name: 'Almond flour or Gluten-free flour', quantityRatio: 1, unit: 'g', note: 'Gluten-free alternative' } },
      { id: 'd6', name: 'Vanilla Extract & Pinch of Salt', nameTranslations: { te: 'వెనీలా ఎసెన్స్' }, baseQuantity: 0.5, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'd7', name: 'Dark Chocolate Chunks (for Molten Center)', nameTranslations: { te: 'లావా సెంటర్ కోసం చాక్లెట్ ముక్కలు' }, baseQuantity: 30, unit: 'g', category: 'Pantry & Spices' },
      { id: 'd8', name: 'Cocoa Powder (for dusting ramekins)', nameTranslations: { te: 'కోకో పౌడర్' }, baseQuantity: 1, unit: 'tsp', category: 'Pantry & Spices' }
    ],
    steps: [
      {
        id: 'ds1',
        stepNumber: 1,
        title: 'Melt Dark Chocolate & Butter',
        instruction: 'Preheat oven to 400°F (200°C). Grease two ceramic ramekins with butter and dust with cocoa powder. In a heatproof bowl set over simmering water or in the microwave (30-second bursts), gently melt chopped dark chocolate and butter together until silky, glossy, and smooth.',
        instructionTranslations: {
          te: 'ఓవెన్‌ను 200°C వద్ద ప్రీహీట్ చేయండి. చాక్లెట్ మరియు వెన్న వేసి కరిగించి మెత్తని మిశ్రమం చేయండి.'
        },
        durationMinutes: 4,
        temperatureOrHeat: 'Low',
        image: '/images/melt_chocolate_butter.jpg'
      },
      {
        id: 'ds2',
        stepNumber: 2,
        title: 'Whisk Fresh Eggs & Sugar',
        instruction: 'In a separate mixing bowl, crack the whole eggs and egg yolk. Add powdered sugar, pure vanilla extract, and a pinch of salt. Whisk vigorously with a wire whisk for 2 minutes until the mixture turns pale, slightly thickened, and ribbony.',
        instructionTranslations: {
          te: 'గిన్నెలో గుడ్లు, చక్కెర పొడి, వెనీలా ఎసెన్స్ మరియు చిటికెడు ఉప్పు వేసి 2 నిమిషాలు బాగా నురుగు వచ్చేవరకు విస్క్ చేయండి.'
        },
        durationMinutes: 2,
        temperatureOrHeat: 'Low',
        image: '/images/whisk_eggs_sugar.jpg'
      },
      {
        id: 'ds3',
        stepNumber: 3,
        title: 'Fold Chocolate Batter & Sift Flour',
        instruction: 'Gently pour the warm melted chocolate-butter mixture into the whipped eggs while whisking smoothly. Sift in the all-purpose flour. Using a spatula, fold gently just until no dry flour streaks remain. Pour half into prepared ramekins, insert a dark chocolate chunk in the center, and cover with remaining batter.',
        instructionTranslations: {
          te: 'కరిగించిన చాక్లెట్ మిశ్రమాన్ని గుడ్లలో కలిపి, మైదా పిండి జల్లించి నెమ్మదిగా కలపండి. కప్పులలో పోసి మధ్యలో చాక్లెట్ ముక్క ఉంచండి.'
        },
        durationMinutes: 3,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'ds4',
        stepNumber: 4,
        title: 'Bake for Exactly 10-11 Minutes',
        instruction: 'Bake at 400°F (200°C) for exactly 10 to 11 minutes until the edges are firm and matte, but the center is still soft and trembling. Cool for 2 minutes, run a butter knife around the edges, invert onto plates, dust with powdered sugar, and cut open to release the rich molten lava flow!',
        instructionTranslations: {
          te: 'ఓవెన్‌లో 10-11 నిమిషాలు బేక్ చేయండి. 2 నిమిషాలు ఆగి ప్లేట్‌లోకి తిరగవేసి వేడివేడి లావా కేక్ సర్వ్ చేయండి.'
        },
        durationMinutes: 11,
        temperatureOrHeat: '400°F / 200°C',
        image: '/images/molten_lava_baked.jpg'
      }
    ],
    nutrition: {
      calories: 450,
      protein: 8,
      carbohydrates: 40,
      fat: 28,
      fiber: 4
    },
    substitutions: [
      { original: 'Flour', substitute: 'Almond flour or Gluten-free 1-to-1 blend', ratio: '1:1', notes: 'Makes this dessert 100% gluten-free' }
    ]
  },
  {
    id: 'crispy-paneer-tikka',
    name: 'Tandoori Spiced Paneer Tikka Skewers',
    nameTranslations: {
      te: 'తందూరి పన్నీర్ టిక్కా',
      hi: 'तंदूरी पनीर टिक्का',
      es: 'Brochetas de Paneer Tikka al Tandoori'
    },
    description: 'Succulent cubes of cottage cheese, bell peppers, and red onions marinated in spiced mustard oil yogurt and roasted until smoky and charred.',
    descriptionTranslations: {
      te: 'పన్నీర్ ముక్కలు, క్యాప్సికమ్ మరియు ఉల్లిపాయలను పెరుగు, మసాలా దినుసులతో మారినేట్ చేసి కాల్చిన రుచికరమైన స్నాక్.',
      hi: 'दही, सरसों के तेल और मसालों में मैरिनेट किया हुआ कुरकुरा तंदूरी पनीर टिक्का।',
      es: 'Cubos de queso paneer con pimientos y cebollas marinados en yogur especiado y asados.'
    },
    cuisine: 'Indian',
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=80',
    baseServings: 3,
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    totalTimeMinutes: 30,
    difficulty: 'Easy',
    spiceLevel: 'Medium',
    dietaryTags: ['Vegetarian', 'Gluten-free', 'Egg-free'],
    budget: '$$',
    rating: 4.89,
    reviewsCount: 245,
    author: 'Chef Sanjeev R.',
    authenticStyleNotes: 'Uses raw pungent mustard oil whisked with Kashmiri degi mirch, ajwain (carom seeds), roasted gram flour (besan), and charcoal flame roasting.',
    homestyleNotes: 'Uses regular cooking oil, standard curd, air fryer or stovetop grill pan without skewers for easy snacking.',
    ingredients: [
      { id: 'pt1', name: 'Paneer (cut into 1-inch cubes)', nameTranslations: { te: 'పన్నీర్ ముక్కలు' }, baseQuantity: 300, unit: 'g', category: 'Dairy & Refrigerated', homestyleSubstitute: { name: 'Extra Firm Tofu or Halloumi', quantityRatio: 1, unit: 'g', note: 'Tofu is vegan and absorbs tikka marinade well' } },
      { id: 'pt2', name: 'Bell Peppers (cut into squares)', nameTranslations: { te: 'క్యాప్సికమ్ ముక్కలు' }, baseQuantity: 150, unit: 'g', category: 'Produce' },
      { id: 'pt3', name: 'Red Onions (cut into petals)', nameTranslations: { te: 'ఉల్లిపాయ ముక్కలు' }, baseQuantity: 100, unit: 'g', category: 'Produce' },
      { id: 'pt4', name: 'Thick Hung Curd / Greek Yogurt', nameTranslations: { te: 'గట్టి పెరుగు' }, baseQuantity: 120, unit: 'g', category: 'Dairy & Refrigerated' },
      { id: 'pt5', name: 'Roasted Gram Flour (Besan)', nameTranslations: { te: 'శనగపిండి' }, baseQuantity: 2, unit: 'tbsp', category: 'Grains & Pasta' },
      { id: 'pt6', name: 'Mustard Oil or Vegetable Oil', nameTranslations: { te: 'నూనె' }, baseQuantity: 2, unit: 'tbsp', category: 'Oils & Condiments' },
      { id: 'pt7', name: 'Ginger-Garlic Paste', nameTranslations: { te: 'అల్లం వెల్లుల్లి పేస్ట్' }, baseQuantity: 1.5, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'pt8', name: 'Kashmiri Chili Powder, Chaat Masala, Garam Masala', nameTranslations: { te: 'కారం మరియు చాట్ మసాలా' }, baseQuantity: 2, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'pt9', name: 'Kasuri Methi (crushed) & Lemon Juice', nameTranslations: { te: 'కసూరీ మేథీ మరియు నిమ్మరసం' }, baseQuantity: 1, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'pt10', name: 'Salt', nameTranslations: { te: 'ఉప్పు' }, baseQuantity: 1, unit: 'tsp', category: 'Pantry & Spices' }
    ],
    steps: [
      {
        id: 'pts1',
        stepNumber: 1,
        title: 'Prepare Tandoori Marinade',
        instruction: 'In a mixing bowl, whisk mustard oil and Kashmiri chili powder until vibrant red. Add hung curd, roasted besan, ginger-garlic paste, garam masala, chaat masala, kasuri methi, lemon juice, and salt. Mix until smooth.',
        instructionTranslations: {
          te: 'గిన్నెలో నూనె, కారం, పెరుగు, శనగపిండి, అల్లం వెల్లుల్లి పేస్ట్, మసాలాలు, నిమ్మరసం మరియు ఉప్పు వేసి కలపండి.'
        },
        durationMinutes: 5,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'pts2',
        stepNumber: 2,
        title: 'Coat Paneer & Veggies',
        instruction: 'Gently fold in paneer cubes, bell pepper chunks, and onion petals. Coat thoroughly with the thick marinade. Let marinate for 15 minutes.',
        instructionTranslations: {
          te: 'పన్నీర్, క్యాప్సికమ్ మరియు ఉల్లిపాయ ముక్కలను మసాలాలో వేసి 15 నిమిషాలు నానబెట్టండి.'
        },
        durationMinutes: 15,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'pts3',
        stepNumber: 3,
        title: 'Thread onto Skewers or Arrange on Pan',
        instruction: 'Thread alternate pieces of bell pepper, paneer, and onion onto wooden/metal skewers. (Or arrange in a single layer on a heated grill pan/air fryer).',
        instructionTranslations: {
          te: 'స్టీల్ లేదా చెక్క పుల్లలకు కూరగాయలు, పన్నీర్ ముక్కలను వరుసగా గుచ్చండి.'
        },
        durationMinutes: 5,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'pts4',
        stepNumber: 4,
        title: 'Grill to Charred Perfection',
        instruction: 'Cook on a hot grill pan or bake in oven at 425°F (220°C) for 10-12 minutes, turning halfway and basting with butter until edges are charred. Sprinkle chaat masala and mint chutney.',
        instructionTranslations: {
          te: 'పెనంపై లేదా ఓవెన్‌లో 10-12 నిమిషాలు కాల్చండి. పైన చాట్ మసాలా చల్లి పుదీనా చట్నీతో వడ్డించండి.'
        },
        durationMinutes: 12,
        temperatureOrHeat: 'Medium-High',
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80'
      }
    ],
    nutrition: {
      calories: 360,
      protein: 19,
      carbohydrates: 12,
      fat: 26,
      fiber: 3
    },
    substitutions: [
      { original: 'Paneer', substitute: 'Extra Firm Tofu or Mushrooms or Cauliflower florets', ratio: '1:1', notes: 'Tofu makes an authentic vegan tikka' }
    ]
  }
];

// Strictly deduplicate INITIAL_RECIPES by unique ID and normalized title
const seenIds = new Set<string>();
const seenNames = new Set<string>();
export const INITIAL_RECIPES: Recipe[] = [];

for (const r of RAW_INITIAL_RECIPES) {
  // Purge any accidental partial rasg test entries
  if ((r.id.startsWith('rasg') || r.name.toLowerCase().startsWith('authentic rasg')) && r.id !== 'kolkata-white-rasgulla') {
    continue;
  }
  const normName = r.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!seenIds.has(r.id) && !seenNames.has(normName)) {
    seenIds.add(r.id);
    seenNames.add(normName);
    INITIAL_RECIPES.push(r);
  }
}

