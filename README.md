# 🎉 Muskan's 21st Birthday Website

A romantic, interactive birthday surprise website created with love for Muskan's 21st birthday (January 20, 2026).

## ✨ Features

- 🎂 Live countdown to birthday
- 🎵 Background music with controls
- 💕 5 interactive games
- 💌 Interactive message cards
- 📸 Photo gallery
- 🎁 Hidden secret surprises
- ✨ Particle effects
- 📱 Fully responsive (mobile-first)
- 🎨 Modern glassmorphism design

## 📁 Project Structure

```
Muskan Birthday/
├── index.html                 # Main page
├── css/
│   ├── main.css              # Core styles & design system
│   ├── animations.css        # All animations
│   ├── games.css             # Game-specific styles
│   └── responsive.css        # Mobile-first responsive design
├── js/
│   ├── config.js             # ⭐ CUSTOMIZE YOUR CONTENT HERE
│   ├── main.js               # App initialization
│   ├── utils.js              # Helper functions
│   ├── countdown.js          # Birthday countdown
│   ├── music.js              # Music player
│   ├── particles.js          # Particle effects
│   └── games/
│       ├── photoGuess.js     # Photo guessing game
│       ├── puzzle.js         # Jigsaw puzzle
│       ├── truthDare.js      # Truth or Dare
│       ├── quiz.js           # Love quiz
│       └── secrets.js        # Hidden secrets
└── assets/
    ├── images/
    │   ├── couple/           # ⭐ ADD COUPLE PHOTOS HERE
    │   └── muskan/           # ⭐ ADD MUSKAN'S PHOTOS HERE
    └── music/
        └── background.mp3    # ⭐ ADD MUSIC FILE HERE
```

## 🚀 Quick Start

### 1. Add Your Photos

Add your photos to the appropriate folders and name them with numbers:

**Couple Photos:**
- `assets/images/couple/1.jpg`
- `assets/images/couple/2.jpg`
- `assets/images/couple/3.jpg`

**Muskan's Photos:**
- `assets/images/muskan/1.jpg`
- `assets/images/muskan/2.jpg`
- `assets/images/muskan/3.jpg`
- `assets/images/muskan/4.jpg`
- `assets/images/muskan/5.jpg`
- `assets/images/muskan/6.jpg`

> 💡 **Tip:** Use `.jpg`, `.jpeg`, or `.png` formats. The website will use placeholder images if files are not found.

### 2. Add Background Music

Add your romantic music file:
- `assets/music/background.mp3`

> 💡 **Tip:** Use MP3 format for best compatibility. The music will autoplay after user interaction (browser requirement).

### 3. Customize Content (Optional)

Open `js/config.js` to customize:
- Messages
- Quiz questions
- Truth or Dare content
- Photo game content

### 4. Open the Website

Simply open `index.html` in a modern web browser:

```bash
# Method 1: Double-click index.html

# Method 2: Use a local server (recommended)
cd "Muskan Birthday"
python3 -m http.server 8000
# Then open http://localhost:8000 in your browser
```

## 🎮 Interactive Games

### 1. **Memory Lane** (Photo Guessing)
- Shows blurred photos from your memories
- Multiple choice questions
- Reveals photos with sweet messages

### 2. **Puzzle of Love** (Jigsaw Puzzle)
- Drag & drop jigsaw puzzle
- Uses Muskan's photo
- Touch-friendly for mobile

### 3. **Truth or Dare** (Romantic Edition)
- Custom truths and dares for couples
- Randomized content
- Never repeats until all are used

### 4. **Love Quiz**
- Questions about Muskan and your relationship
- Progress tracking
- Score-based results with messages

### 5. **Hidden Surprises**
- Find hidden ✨ throughout the site
- Each reveals a special message
- Track progress: 0/10 found

## 🎨 Customization Guide

### Change Messages

Edit `js/config.js`:

```javascript
messages: [
    {
        icon: "💕",
        message: "Your custom message here..."
    },
    // Add more messages...
]
```

### Change Quiz Questions

Edit `js/config.js`:

```javascript
quiz: [
    {
        question: "Your question?",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctIndex: 0  // Index of correct answer (0-3)
    },
    // Add more questions...
]
```

### Change Countdown Date

Edit `js/config.js`:

```javascript
birthday: {
    name: "Muskan",
    date: new Date("2026-01-20T00:00:00+05:30"),  // Change this
    age: 21
}
```

### Change Colors

Edit `css/main.css`:

```css
:root {
    --color-primary: #FFB6D9;     /* Soft Pink */
    --color-secondary: #D4ADFC;   /* Lavender */
    --color-accent: #F4D9A6;      /* Champagne Gold */
    /* Change these values */
}
```

## 📱 Mobile Optimization

The website is fully responsive and includes:
- Touch-friendly buttons (minimum 44px)
- Optimized animations for mobile
- Reduced particle count on mobile devices
- Swipe-friendly game interactions
- No horizontal scrolling

## 🌐 Deployment Options

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository
2. Upload all files
3. Enable GitHub Pages in Settings
4. Share the link!

### Option 2: Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the entire folder
3. Get instant deployment!

### Option 3: Share Locally
1. Zip the entire folder
2. Share via Google Drive, Dropbox, etc.
3. Recipient can unzip and open `index.html`

## 🎵 Music Notes

- Music autoplays after first user interaction (browser requirement)
- Click the 🎵 button to pause/play
- Press `M` key to toggle music
- Volume is set to 30% by default (edit in `config.js`)

## ⌨️ Keyboard Shortcuts

- `M` - Toggle music
- `ESC` - Close modal/game
- `Space` - Pause countdown (Easter egg!)

## 🐛 Troubleshooting

### Images Not Showing
- Check that image files are in correct folders
- Ensure filenames match (case-sensitive)
- Try using `.jpg` format
- Check browser console for errors

### Music Not Playing
- Check file exists at `assets/music/background.mp3`
- Try clicking anywhere on the page first
- Check that MP3 format is supported
- Check browser console for errors

### Games Not Working
- Make sure JavaScript is enabled
- Try clearing browser cache
- Check browser console for errors
- Test in different browser (Chrome/Firefox recommended)

## 🎯 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 💝 Final Tips

1. **Test everything** before sharing!
2. **Use good quality images** (not too large, recommended < 2MB each)
3. **Choose romantic, soft music** (not too loud)
4. **Personalize the messages** in config.js
5. **Send the link** at the perfect moment!

## 📝 Technical Details

- **Pure HTML, CSS, JavaScript** - No frameworks
- **No dependencies** - Everything self-contained
- **localStorage** used to save progress
- **Canvas API** for particle effects
- **Web Audio API** for music control

## ❤️ Created with Love

This website was created as a special birthday gift for Muskan's 21st birthday.

---

**Questions or Issues?**
- Check the browser console for error messages
- Ensure all files are in correct locations
- Try opening in different browser
- Make sure JavaScript is enabled

**Enjoy the surprise! 🎉💕**
# Muskan
