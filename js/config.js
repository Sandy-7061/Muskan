// ============================================
// CONFIGURATION FILE
// Easy customization for images, messages, and game content
// ============================================

const CONFIG = {
    // Birthday Configuration
    birthday: {
        name: "Muskan",
        fullName: "Arti Kumari",
        nickname: "Muskan",
        date: new Date("2026-01-20T00:00:00+05:30"), // January 20, 2026, midnight IST
        age: 21
    },

    // Image Paths (user has uploaded actual photos!)
    images: {
        // Couple photo
        couple: [
            "assets/images/couple/IMG-20221127-WA0005.jpg"
        ],

        // Muskan's beautiful photos - organized by category
        muskan: {
            // Traditional saree photos
            saree: [
                "assets/images/muskan/Saree 1.jpg",
                "assets/images/muskan/Saree 2.jpg",
                "assets/images/muskan/Saree 3.jpg",
                "assets/images/muskan/Saree 4.jpg",
                "assets/images/muskan/Saree 5.jpg",
                "assets/images/muskan/Saree 6.jpg",
                "assets/images/muskan/Saree 7.jpg",
                "assets/images/muskan/Saree.jpg"
            ],

            // Special poses and outfits
            special: [
                "assets/images/muskan/Smart Pose.jpg",
                "assets/images/muskan/Hot Dress pose.jpg",
                "assets/images/muskan/Cute coat.jpg",
                "assets/images/muskan/Dancing hair.jpg",
                "assets/images/muskan/Topi bali.jpg"
            ],

            // Beautiful candid shots
            candid: [
                "assets/images/muskan/Lake view.jpg",
                "assets/images/muskan/Night light.jpg",
                "assets/images/muskan/Google.jpg",
                "assets/images/muskan/Shadow.jpg",
                "assets/images/muskan/Starting.jpg"
            ],

            // Snapchat photos
            snapchat: [
                "assets/images/muskan/Snapchat-1025594138.jpg",
                "assets/images/muskan/Snapchat-1062305384.jpg",
                "assets/images/muskan/Snapchat-1197511444.jpg",
                "assets/images/muskan/Snapchat-1722849694.jpg",
                "assets/images/muskan/Snapchat-275859403.jpg",
                "assets/images/muskan/Snapchat-752666523.jpg"
            ],

            // Sweet expressions
            expressions: [
                "assets/images/muskan/Smile.jpg",
                "assets/images/muskan/Face.jpg",
                "assets/images/muskan/Kis.jpg",
                "assets/images/muskan/Moti.jpg",
                "assets/images/muskan/Poud.jpg",
                "assets/images/muskan/Ugly Face.jpg"
            ],

            // Timeline photos (dated)
            timeline: [
                "assets/images/muskan/IMG-20200806-WA0002 - Copy.jpg",
                "assets/images/muskan/IMG-20200904-WA0024 - Copy.jpg",
                "assets/images/muskan/IMG-20200905-WA0022 - Copy.jpg",
                "assets/images/muskan/IMG-20200921-WA0013.jpg",
                "assets/images/muskan/IMG-20201023-WA0085.jpg",
                "assets/images/muskan/IMG-20201105-WA0009.jpg",
                "assets/images/muskan/IMG-20201105-WA0012.jpg",
                "assets/images/muskan/IMG-20201217-WA0028.jpg",
                "assets/images/muskan/IMG-20201229-WA0008.jpg",
                "assets/images/muskan/IMG-20210110-WA0055.jpg",
                "assets/images/muskan/IMG-20210110-WA0056 - Copy.jpg",
                "assets/images/muskan/IMG-20210228-WA0040.jpg",
                "assets/images/muskan/IMG-20210726-WA0039.jpg",
                "assets/images/muskan/IMG-20210726-WA0043.jpg",
                "assets/images/muskan/IMG-20210807-WA0167.jpg",
                "assets/images/muskan/IMG-20211002-WA0010.jpg",
                "assets/images/muskan/IMG-20220907-WA0072.jpg",
                "assets/images/muskan/IMG-20251214-WA0008.jpg",
                "assets/images/muskan/arti_7024-20210701-0005.jpg",
                "assets/images/muskan/arti_7024-20210709-0011.jpg",
                "assets/images/muskan/arti_7024-20210723-0008.jpg",
                "assets/images/muskan/arti_7024-20210823-0007.jpg",
                "assets/images/muskan/arti_7024-20210916-0001.jpg",
                "assets/images/muskan/FB_IMG_1662310662584.jpg"
            ]
        },

        // Get all muskan photos as flat array for gallery
        getAllMuskanPhotos() {
            return [
                ...this.muskan.saree,
                ...this.muskan.special,
                ...this.muskan.candid,
                ...this.muskan.snapchat,
                ...this.muskan.expressions,
                ...this.muskan.timeline
            ];
        },

        // Placeholder (fallback)
        placeholder: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23FFB6D9' width='400' height='400'/%3E%3Ctext fill='%231A1A2E' font-family='Arial' font-size='24' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EAdd Your Photo Here%3C/text%3E%3C/svg%3E"
    },

    // Love Messages for Message Cards
    messages: [
        {
            icon: "💕",
            message: "Your smile is the most beautiful thing I've ever seen. It lights up my entire world."
        },
        {
            icon: "🌟",
            message: "You are not just pretty, you are absolutely stunning inside and out."
        },
        {
            icon: "❤️",
            message: "Every moment with you feels like a dream I never want to wake up from."
        },
        {
            icon: "🌹",
            message: "You make me want to be a better person every single day."
        },
        {
            icon: "✨",
            message: "I fall in love with you more and more with each passing day."
        },
        {
            icon: "💖",
            message: "You are my best friend, my partner, and my everything."
        },
        {
            icon: "🎂",
            message: "Happy 21st birthday to the most amazing person in my life!"
        },
        {
            icon: "🌈",
            message: "Thank you for being you. You are absolutely perfect."
        }
    ],

    // Photo Guessing Game Content - Using actual photos!
    photoGuessGame: [
        {
            image: "assets/images/muskan/Saree 4.jpg",
            question: "You look absolutely stunning in this saree! Do you remember this special day?",
            options: [
                "Yes! I felt so beautiful that day! 💕",
                "That was a special occasion!",
                "I love wearing sarees!",
                "This one is my favorite!"
            ],
            correctIndex: 0,
            successMessage: "You looked like a queen in this saree! Every time I see you in traditional wear, my heart skips a beat. You're absolutely gorgeous! 👑❤️"
        },
        {
            image: "assets/images/muskan/Lake view.jpg",
            question: "This beautiful moment by the lake... What were you thinking about?",
            options: [
                "The peaceful scenery",
                "Our future together",
                "How lucky I am",
                "All of the above!"
            ],
            correctIndex: 3,
            successMessage: "This photo is so peaceful and beautiful, just like you. Your smile against that lake view is my favorite wallpaper memory! 🌅💕"
        },
        {
            image: "assets/images/muskan/Smart Pose.jpg",
            question: "This smart pose! You're looking absolutely confident here. What makes this photo special?",
            options: [
                "I felt really confident that day!",
                "I love this outfit!",
                "The lighting was perfect!",
                "I was thinking of you! 💕"
            ],
            correctIndex: 3,
            successMessage: "Your confidence shines through in every photo! You're smart, beautiful, and absolutely perfect. This pose captures your amazing personality! ✨"
        },
        {
            image: "assets/images/muskan/Dancing hair.jpg",
            question: "Your hair dancing in this photo is magical! What moment was this?",
            options: [
                "A windy day captured perfectly!",
                "Playing with my hair!",
                "Carefree moment!",
                "Feeling beautiful!"
            ],
            correctIndex: 0,
            successMessage: "The way your hair flows in this photo is like poetry in motion. You look so carefree and happy. This is one of my absolute favorites! 🌟"
        },
        {
            image: "assets/images/muskan/Night light.jpg",
            question: "The night lights make you glow in this photo! Remember this evening?",
            options: [
                "Yes, it was magical!",
                "The lights were so pretty!",
                "I felt like a star!",
                "Perfect evening!"
            ],
            correctIndex: 0,
            successMessage: "You don't need any lights to shine - you're already a star! But these night lights definitely captured your natural glow. Absolutely mesmerizing! ✨🌙"
        },
        {
            image: "assets/images/muskan/Cute coat.jpg",
            question: "This cute coat looks amazing on you! What do you love about this look?",
            options: [
                "The coat is so cozy!",
                "I felt stylish!",
                "Perfect winter vibe!",
                "Everything! 😊"
            ],
            correctIndex: 3,
            successMessage: "You make everything look cute! This coat, your smile, your whole vibe - perfection! You're the cutest person I know! 🧥💕"
        },
        {
            image: "assets/images/couple/IMG-20221127-WA0005.jpg",
            question: "Our special moment together! Do you remember this day?",
            options: [
                "Of course! How could I forget us together?",
                "This was such a beautiful day!",
                "I cherish every moment with you!",
                "All of the above! ❤️"
            ],
            correctIndex: 3,
            successMessage: "Every moment with you is precious to me. This photo captures our love perfectly. Thank you for being mine. I love you so much! 💑💕"
        },
        {
            image: "assets/images/muskan/Smile.jpg",
            question: "Your beautiful smile! What makes you this happy?",
            options: [
                "Thinking of good memories",
                "Feeling blessed",
                "Your love!",
                "Just being happy!"
            ],
            correctIndex: 2,
            successMessage: "Your smile is the most beautiful thing I've ever seen. It lights up my entire world. Keep smiling, my love! 😊💖"
        }
    ],

    // Truth or Dare Content
    truthOrDare: {
        truths: [
            "What's your favorite memory of us together?",
            "What do you love most about our relationship?",
            "What's one thing about me that always makes you smile?",
            "What was your first impression of me?",
            "What's your favorite thing I've ever said to you?",
            "If you could describe our love in three words, what would they be?",
            "What's your favorite quality about yourself?",
            "What makes you happiest when we're together?"
        ],
        dares: [
            "Send me a voice note saying 'I love you' in your cutest voice!",
            "Take a selfie right now and send it to me!",
            "Tell me one thing you've never told me before!",
            "Do a little dance and think of me! 💃",
            "Send me a heart emoji for every reason you love me!",
            "Write a short poem about us (even if it's silly!)",
            "Sing your favorite love song (even just one line!)",
            "Give yourself a compliment - you deserve it!"
        ]
    },

    // Love Quiz Questions
    quiz: [
        {
            question: "What is Muskan's birthday?",
            options: [
                "January 20, 2005",
                "January 21, 2005",
                "February 20, 2005",
                "January 20, 2004"
            ],
            correctIndex: 0
        },
        {
            question: "What is Muskan's full name?",
            options: [
                "Arti Sharma",
                "Arti Kumari",
                "Muskan Kumari",
                "Arti Singh"
            ],
            correctIndex: 1
        },
        {
            question: "What is Muskan currently?",
            options: [
                "Working professional",
                "College student",
                "Teacher",
                "Artist"
            ],
            correctIndex: 1
        },
        {
            question: "How old is Muskan turning today?",
            options: [
                "20",
                "21",
                "22",
                "19"
            ],
            correctIndex: 1
        },
        {
            question: "What's the best word to describe Muskan?",
            options: [
                "Amazing",
                "Beautiful",
                "Perfect",
                "All of the above!"
            ],
            correctIndex: 3
        }
    ],

    // Quiz Result Messages
    quizResults: {
        perfect: {
            title: "Perfect Score! 🎉",
            message: "You know everything! Just like you know my heart belongs to you. You're amazing!"
        },
        good: {
            title: "Great Job! ⭐",
            message: "You did wonderful! But then again, you're wonderful at everything you do!"
        },
        okay: {
            title: "Not Bad! 😊",
            message: "You know what matters most - that we love each other! That's the only quiz that counts!"
        },
        low: {
            title: "Oops! 😅",
            message: "That's okay! The real test is the love in our hearts, and you ace that every single day!"
        }
    },

    // Hidden Secrets (scattered throughout the site)
    secrets: [
        {
            icon: "💝",
            message: "You found secret #1! Your kindness is one of the things I love most about you."
        },
        {
            icon: "🎁",
            message: "Secret #2 discovered! You make even ordinary moments feel extraordinary."
        },
        {
            icon: "⭐",
            message: "Secret #3! Your laugh is my favorite sound in the entire world."
        },
        {
            icon: "🌸",
            message: "Secret #4 unlocked! You inspire me to be better every single day."
        },
        {
            icon: "💫",
            message: "Secret #5! I love how you light up when you talk about things you're passionate about."
        },
        {
            icon: "🦋",
            message: "Secret #6! Your smile could brighten the darkest day."
        },
        {
            icon: "🌺",
            message: "Secret #7! Thank you for being patient with me always."
        },
        {
            icon: "🎀",
            message: "Secret #8! You are the best thing that ever happened to me."
        },
        {
            icon: "💐",
            message: "Secret #9! I love every single thing about you, even your quirks!"
        },
        {
            icon: "🌙",
            message: "Secret #10! You are my dream come true. Happy Birthday, my love!"
        }
    ],

    // Music file path
    music: {
        path: "assets/music/background.mp3",
        volume: 0.3 // 30% volume (soft and pleasant)
    },

    // Game completion tracking keys (for localStorage)
    storageKeys: {
        photoGuessCompleted: "muskan_birthday_photoguess",
        puzzleCompleted: "muskan_birthday_puzzle",
        quizCompleted: "muskan_birthday_quiz",
        secretsFound: "muskan_birthday_secrets",
        finaleUnlocked: "muskan_birthday_finale"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
