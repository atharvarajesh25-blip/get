# Studybox

A private AI study tutor that runs entirely on your phone. Paste notes or open a PDF, then make notes,
flashcards (with spaced repetition), quizzes, and chat with a tutor. The AI model runs in your browser,
so your material never leaves your device.

## Put it online with GitHub Pages

1. Create a free account at github.com and tap **New repository**. Name it `studybox` and set it to **Public**.
2. Upload every file in this folder to the repository: `index.html`, `manifest.webmanifest`, `sw.js`,
   `icon-192.png`, `icon-512.png`, `.nojekyll`, and `README.md`.
   (On the repository page choose **Add file > Upload files**, drop them in, then **Commit changes**.)
3. Open **Settings > Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**,
   choose the `main` branch and the `/ (root)` folder, then **Save**.
4. Wait a minute or two. Your app will be at `https://YOUR-USERNAME.github.io/studybox/`.

## Use it on Android

1. Open the link in **Chrome 121 or newer**.
2. Tap **Download and start** on Wi-Fi. The Medium model is about 1 GB and downloads once.
3. In Chrome's menu, tap **Add to Home screen** (or **Install app**) to open it like an app.

## Notes

- Needs a phone with WebGPU support. If the app says WebGPU is missing, update Chrome or try another phone.
- Small on-device models make mistakes. Flashcards and quizzes sometimes come out in the wrong format: tap the button again.
- After the first load, the app and the model are cached, so it should work offline. If you update the files on GitHub,
  change `CACHE = "studybox-v1"` in `sw.js` to `"studybox-v2"` so phones pick up the new version.
