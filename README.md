# AyushAstra - Your Holistic Wellness Guide

A comprehensive web application that combines the ancient wisdom of Ayurveda and Yoga to provide personalized wellness recommendations.

## 🌟 Features

### 🏠 **Home Tab**
- Beautiful hero section with animated background
- Quick search functionality
- Introduction to Ayurveda and Yoga
- Call-to-action for wellness journey

### 🧘 **Yoga for Health Tab**
- Categorized yoga poses for specific health conditions
- Detailed pose information with benefits and instructions
- Interactive filters for conditions and categories
- Difficulty levels and precautions

### 🌿 **Ayurvedic Remedies Tab**
- Traditional Ayurvedic herbs and treatments
- Preparation methods and dosages
- Benefits and precautions
- Related yoga pose suggestions

### 💨 **Pranayama & Breathing Tab**
- Interactive breathing exercises with timers
- Visual breathing guides and animations
- Different techniques for various conditions
- Safety guidelines and instructions

### ✨ **Personalized Recommendations Tab**
- Comprehensive wellness assessment form
- AI-powered recommendations based on symptoms
- Customized yoga, remedy, and breathing exercise plans
- Experience level consideration

### 📚 **About Ayurveda Tab**
- Educational content about Ayurvedic principles
- The three doshas (Vata, Pitta, Kapha)
- Connection between Yoga and Ayurveda
- Core principles and philosophy

### 📞 **Contact & Consultation Tab**
- Contact information and consultation booking
- Different types of wellness consultations
- Newsletter subscription
- Professional contact form

## 🛠️ **Technical Stack**

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom Ayurvedic color palette
- **Animations**: Framer Motion for smooth transitions
- **UI Components**: Custom components with shadcn/ui patterns
- **Icons**: Lucide React
- **State Management**: React hooks and local state

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ayushastra
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 **Project Structure**

```
src/
├── app/
│   ├── globals.css          # Global styles and Ayurvedic theme
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Main app component
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── YogaCard.tsx        # Yoga pose card component
│   ├── RemedyCard.tsx      # Ayurvedic remedy card component
│   ├── PranayamaCard.tsx   # Breathing exercise card component
│   ├── Navigation.tsx      # Main navigation component
│   ├── HeroSection.tsx     # Home page hero section
│   └── [Tab]Tab.tsx        # Individual tab components
├── data/
│   ├── yogaPoses.ts        # Yoga poses data
│   ├── ayurvedicRemedies.ts # Ayurvedic remedies data
│   └── pranayamaExercises.ts # Pranayama exercises data
├── lib/
│   └── utils.ts            # Utility functions
└── types/
    └── index.ts            # TypeScript type definitions
```

## 🎨 **Design Features**

### **Color Palette**
- **Ayurvedic Green**: Primary brand color
- **Sage Green**: Secondary accent
- **Earth Brown**: Natural, grounding tone
- **Gold**: Warm, spiritual accent
- **Cream**: Soft, calming background
- **Leaf Green**: Fresh, natural accent
- **Lotus Pink**: Gentle, feminine touch

### **Animations**
- Smooth page transitions with Framer Motion
- Hover effects on cards and buttons
- Breathing animations for Pranayama exercises
- Floating background elements
- Staggered card animations

### **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Adaptive layouts

## 🔧 **Customization**

### **Adding New Yoga Poses**
1. Edit `src/data/yogaPoses.ts`
2. Add new pose object with required fields
3. Include appropriate categories and conditions

### **Adding New Ayurvedic Remedies**
1. Edit `src/data/ayurvedicRemedies.ts`
2. Add new remedy object with preparation details
3. Include related yoga poses and conditions

### **Adding New Pranayama Exercises**
1. Edit `src/data/pranayamaExercises.ts`
2. Add new exercise with breathing patterns
3. Include benefits and precautions

### **Styling Customization**
- Modify `tailwind.config.js` for color palette changes
- Update `src/app/globals.css` for custom styles
- Adjust component styles in individual files

## 📱 **Features in Detail**

### **Interactive Elements**
- **Search Functionality**: Real-time filtering across all tabs
- **Category Filters**: Dynamic filtering by health conditions
- **Breathing Timers**: Interactive Pranayama practice sessions
- **Form Validation**: Comprehensive contact and recommendation forms
- **Responsive Navigation**: Mobile-friendly tab navigation

### **Data Management**
- **Local JSON Data**: No external API dependencies
- **Type Safety**: Full TypeScript implementation
- **Modular Structure**: Easy to extend and maintain
- **Performance Optimized**: Efficient rendering and animations

## 🌐 **Browser Support**

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 **Support**

For support and questions:
- Email: info@ayushastra.com
- Phone: +1 (555) 123-4567
- Website: [AyushAstra.com](https://ayushastra.com)

## 🙏 **Acknowledgments**

- Ancient Ayurvedic texts and wisdom
- Traditional Yoga practices and teachings
- Modern web development best practices
- Open source community contributions

---

**Made with ❤️ for your wellness journey**

*ॐ Shanti Shanti Shanti*
