# 🧘‍♀️ AyushAstra - Python Flask Version

A beautiful web application that combines the ancient wisdom of Ayurveda and Yoga to provide personalized wellness recommendations.

## 🚀 **Quick Start**

### **Option 1: Run with Python (Easiest)**
```bash
python run.py
```

### **Option 2: Manual Setup**
```bash
pip install -r requirements.txt
python app.py
```

### **Option 3: Direct Flask**
```bash
pip install Flask
python app.py
```

### 🔍 **AI-Powered Search**

The home page search bar now asks the ChatGPT API for smarter recommendations.  
Set these environment variables (PowerShell example shown, adjust for your shell):

```powershell
$env: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="sk-your-secret-key"
# optional override
$env:OPENAI_MODEL="gpt-4o-mini"
```

If the key is missing, the modal will still open but show a friendly error.

## 🖼️ **Yoga Pose Images**

The yoga cards now show real photos sourced from the Kaggle dataset [`niharika41298/yoga-poses-dataset`](https://www.kaggle.com/datasets/niharika41298/yoga-poses-dataset).  
When the Flask app starts, it will:

1. Ensure `static/images/` exists.
2. Download the dataset via `kagglehub` (only the first time, or whenever an image is missing).
3. Copy representative samples for each pose (e.g., Downward Dog, Warrior II, etc.) so the UI always has visuals.

If you prefer to fetch them manually, you can run:

```python
import kagglehub

path = kagglehub.dataset_download("niharika41298/yoga-poses-dataset")
print("Path to dataset files:", path)
```

> Make sure `kagglehub` is installed (`pip install kagglehub`) before running the snippet above.

## 🌟 **Features**

- 🏠 **Home Page** - Beautiful animated landing page
- 🧘 **Yoga for Health** - Interactive yoga pose browser with filtering
- 🌿 **Ayurvedic Remedies** - Traditional healing remedies and herbs
- 💨 **Pranayama** - Breathing exercises and techniques
- ✨ **Personalized Recommendations** - AI-powered wellness assessment
- 📚 **About Ayurveda** - Educational content about doshas and principles
- 📞 **Contact** - Professional consultation booking

## 🛠️ **Requirements**

- Python 3.7 or higher
- Flask web framework
- Modern web browser

## 📁 **Project Structure**

```
ayushastra/
├── app.py                 # Main Flask application
├── run.py                 # Easy startup script
├── requirements.txt       # Python dependencies
├── data/                  # JSON data files
│   ├── yoga_poses.json
│   ├── ayurvedic_remedies.json
│   └── pranayama_exercises.json
├── templates/             # HTML templates
│   ├── base.html
│   ├── index.html
│   └── yoga.html
└── static/               # CSS, JS, images
    ├── css/
    ├── js/
    └── images/
```

## 🎨 **Design Features**

- **Responsive Design** - Works on all devices
- **Ayurvedic Color Palette** - Calming greens and earth tones
- **Smooth Animations** - CSS animations and transitions
- **Interactive Elements** - Search, filtering, and modals
- **Modern UI** - Clean, professional interface

## 🔧 **Customization**

### **Adding New Yoga Poses**
Edit `data/yoga_poses.json` and add new pose objects with:
- name, sanskrit_name, category, benefits, instructions, etc.

### **Adding New Remedies**
Edit `data/ayurvedic_remedies.json` and add new remedy objects with:
- name, herb_name, preparation, dosage, benefits, etc.

### **Styling**
Modify the CSS in `templates/base.html` or create separate CSS files in `static/css/`

## 🌐 **Access the Application**

Once running, open your browser and go to:
**http://localhost:5000**

## 📱 **Browser Support**

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎯 **Key Features**

### **Interactive Yoga Browser**
- Filter by category and health condition
- Search poses by name or Sanskrit name
- Detailed pose information with benefits and instructions
- Difficulty levels and precautions

### **Ayurvedic Remedies**
- Traditional herbs and treatments
- Preparation methods and dosages
- Benefits and safety precautions
- Related yoga pose suggestions

### **Pranayama Exercises**
- Breathing techniques with instructions
- Benefits for different conditions
- Safety guidelines and precautions

### **Personalized Recommendations**
- Comprehensive wellness assessment
- AI-powered recommendations based on symptoms
- Customized yoga, remedy, and breathing plans

## 🔮 **Future Enhancements**

- User authentication and profiles
- Progress tracking
- Video demonstrations
- Mobile app development
- Community features

## 📞 **Support**

For questions or support:
- Email: info@ayushastra.com
- Website: [AyushAstra.com](https://ayushastra.com)

## 🙏 **Acknowledgments**

- Ancient Ayurvedic wisdom and texts
- Traditional Yoga practices
- Modern web development best practices

---

**Made with ❤️ for your wellness journey**

*ॐ Shanti Shanti Shanti*
