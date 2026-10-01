export interface SubstitutionItem {
  ingredient: string;
  category: string;
  alternatives: {
    name: string;
    ratio: string;
    dietary: string[];
    flavorImpact: string;
    bestFor: string;
  }[];
}

export const COMMON_SUBSTITUTIONS: SubstitutionItem[] = [
  {
    ingredient: 'Butter',
    category: 'Dairy & Fats',
    alternatives: [
      {
        name: 'Olive Oil / Vegetable Oil',
        ratio: '¾ cup oil per 1 cup butter (3:4 ratio)',
        dietary: ['Dairy-free', 'Vegan'],
        flavorImpact: 'Olive oil adds subtle fruity aroma; vegetable oil stays neutral. Retains moisture well.',
        bestFor: 'Sautéing, pan-searing, and pasta sauces'
      },
      {
        name: 'Ghee (Clarified Butter)',
        ratio: '1:1 ratio',
        dietary: ['Gluten-free', 'Low Lactose'],
        flavorImpact: 'Intense nutty, rich toasted aroma with higher smoke point.',
        bestFor: 'Curries, biryanis, and tandoori searing'
      },
      {
        name: 'Applesauce or Mashed Banana',
        ratio: '½ cup per 1 cup butter',
        dietary: ['Vegan', 'Low Fat', 'Dairy-free'],
        flavorImpact: 'Adds natural sweetness and dense, soft crumb structure.',
        bestFor: 'Cakes, muffins, and sweet baking'
      }
    ]
  },
  {
    ingredient: 'Parmesan Cheese',
    category: 'Dairy & Cheeses',
    alternatives: [
      {
        name: 'Nutritional Yeast',
        ratio: '1:1 ratio (by volume)',
        dietary: ['Vegan', 'Dairy-free', 'Gluten-free'],
        flavorImpact: 'Deep savory, cheesy umami punch with vitamin B12.',
        bestFor: 'Pasta, risottos, and salad toppings'
      },
      {
        name: 'Pecorino Romano',
        ratio: '1:1 ratio (reduce added salt slightly)',
        dietary: ['Vegetarian option'],
        flavorImpact: 'Sharp, salty, and slightly more pungent sheep milk profile.',
        bestFor: 'Authentic Roman pastas (Cacio e Pepe, Carbonara)'
      },
      {
        name: 'Aged White Cheddar (finely grated)',
        ratio: '1:1 ratio',
        dietary: ['Gluten-free'],
        flavorImpact: 'Rich, creamy sharpness with great melting capability.',
        bestFor: 'Baked pasta and gratin casseroles'
      }
    ]
  },
  {
    ingredient: 'Heavy Cream',
    category: 'Dairy & Fats',
    alternatives: [
      {
        name: 'Coconut Cream (Full Fat)',
        ratio: '1:1 ratio',
        dietary: ['Vegan', 'Dairy-free', 'Gluten-free'],
        flavorImpact: 'Very creamy texture with mild natural sweetness and subtle coconut undertone.',
        bestFor: 'Indian curries, Thai curries, and rich soups'
      },
      {
        name: 'Whole Milk + Melted Butter',
        ratio: '¾ cup whole milk + ¼ cup melted butter',
        dietary: ['Vegetarian'],
        flavorImpact: 'Close imitation of heavy cream fat percentage and mouthfeel.',
        bestFor: 'Sauces and creamy pan gravies'
      },
      {
        name: 'Soaked Cashew Cream',
        ratio: '1:1 ratio (blend 1/2 cup soaked cashews with 1/2 cup water)',
        dietary: ['Vegan', 'Dairy-free'],
        flavorImpact: 'Velvety, rich restaurant-style body with neutral nutty finish.',
        bestFor: 'Makhani gravies, kormas, and pasta sauces'
      }
    ]
  },
  {
    ingredient: 'Eggs (in Baking)',
    category: 'Baking & Binding',
    alternatives: [
      {
        name: 'Flaxseed Meal Slurry',
        ratio: '1 tbsp ground flax + 3 tbsp warm water (rest 5 mins) per egg',
        dietary: ['Vegan', 'Egg-free'],
        flavorImpact: 'Nutty flavor and excellent binding properties with added fiber.',
        bestFor: 'Pancakes, waffles, brownies, and rustic breads'
      },
      {
        name: 'Silken Tofu (Blended)',
        ratio: '¼ cup blended silken tofu per egg',
        dietary: ['Vegan', 'Egg-free', 'Dairy-free'],
        flavorImpact: 'Completely neutral taste with great dense moisture.',
        bestFor: 'Moist cakes and quick breads'
      },
      {
        name: 'Greek Yogurt or Curd',
        ratio: '¼ cup yogurt per egg',
        dietary: ['Vegetarian', 'Egg-free'],
        flavorImpact: 'Adds pleasant tang and light, tender crumb.',
        bestFor: 'Muffins and sponge cakes'
      }
    ]
  },
  {
    ingredient: 'Soy Sauce',
    category: 'Sauces & Condiments',
    alternatives: [
      {
        name: 'Tamari (Gluten-Free)',
        ratio: '1:1 ratio',
        dietary: ['Gluten-free'],
        flavorImpact: 'Rich, smooth fermented umami, slightly darker and less salty.',
        bestFor: 'All stir-fries and marinades'
      },
      {
        name: 'Coconut Aminos',
        ratio: '1:1 ratio (plus pinch of salt)',
        dietary: ['Soy-free', 'Gluten-free', 'Paleo'],
        flavorImpact: 'Sweeter and milder with lower sodium.',
        bestFor: 'Asian dishes and salads'
      }
    ]
  },
  {
    ingredient: 'Paneer / Cottage Cheese',
    category: 'Protein',
    alternatives: [
      {
        name: 'Extra-Firm Tofu (Pressed)',
        ratio: '1:1 ratio by weight',
        dietary: ['Vegan', 'Dairy-free', 'High Protein'],
        flavorImpact: 'Absorbs marinades effortlessly with firm chewy bite.',
        bestFor: 'Tikkas, biryanis, and curries'
      },
      {
        name: 'Halloumi Cheese',
        ratio: '1:1 ratio',
        dietary: ['Vegetarian', 'Gluten-free'],
        flavorImpact: 'Salty, savory with great grill sear.',
        bestFor: 'Skewers and salads'
      }
    ]
  }
];
