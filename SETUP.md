# MNO AI LABS — Setup

This is a static site. It can be opened directly in a browser, or hosted on GitHub Pages / Netlify / Vercel / Cloudflare Pages as-is.

## 1. Activate the contact form (one-time, ~2 minutes)

The form is wired to **Web3Forms** — a free service that relays submissions straight to your inbox. No backend, no database.

1. Go to https://web3forms.com
2. Enter `mnoailabs@gmail.com` and click **Create Access Key**. You'll receive a one-time access key by email.
3. Open `index.html`, find this line (near the contact form):

   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
   ```

   Replace `YOUR_WEB3FORMS_ACCESS_KEY` with the key you received.
4. Save and redeploy. That's it — every form submission now arrives at `mnoailabs@gmail.com`.

**Free tier:** 250 submissions / month, includes spam protection, unlimited forms.

**Fallback:** until you set the key, the form falls back to a `mailto:` link, so it still works — it just opens the user's email client instead of sending silently.

## 2. Deploy to GitHub Pages

```bash
# from the project root
git init
git add .
git commit -m "MNO AI LABS website"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

Then in the GitHub repo → **Settings → Pages → Source: Deploy from branch → main / root**. Your site will be live at `https://<user>.github.io/<repo>/` within a minute.

## 3. File map

```
/
├── index.html     — page markup
├── styles.css     — design system + all section styles
├── script.js      — animations, cursor, canvas, form submit
├── logo.png       — your logo
└── SETUP.md       — this file
```
