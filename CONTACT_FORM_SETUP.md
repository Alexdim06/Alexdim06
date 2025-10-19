# Contact Form Setup Instructions

Your contact form is now fully responsive and ready to send emails! Just follow these simple steps to activate it:

## Step 1: Get Your Free Web3Forms Access Key

1. Go to [https://web3forms.com](https://web3forms.com)
2. Scroll down to the "Get Started" section
3. Enter your email address where you want to receive contact form submissions
4. Click "Create Access Key"
5. Check your email and verify it
6. Copy your access key (it looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

## Step 2: Add Your Access Key to the Form

1. Open `index.html`
2. Find line 227 which contains:
   ```html
   <input type="hidden" name="access_key" id="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
3. Replace `YOUR_ACCESS_KEY_HERE` with your actual access key
4. Save the file

## Step 3: Test Your Form

1. Open your website in a browser
2. Fill out the contact form
3. Click "Send"
4. You should see a success message
5. Check your email inbox for the form submission!

## Features Included

✅ **Responsive Design**
- Looks great on desktop, tablet, and mobile
- Full-width button on mobile devices
- Prevents zoom on iOS when focusing inputs
- Form appears above image on mobile for better UX

✅ **Email Functionality**
- Sends real emails to your inbox
- Professional email formatting
- Free (up to 250 submissions/month)
- No backend server needed

✅ **User Experience**
- Form validation with helpful error messages
- Loading spinner while sending
- Success/error messages
- Form resets after successful submission
- Disabled button during submission to prevent double-sends

## Troubleshooting

**Form not sending emails?**
- Make sure you've replaced `YOUR_ACCESS_KEY_HERE` with your actual key
- Check that you verified your email with Web3Forms
- Check your spam folder
- Open browser console (F12) to see any error messages

**Need more submissions?**
- Web3Forms free tier: 250/month
- For more, you can upgrade or use alternatives like:
  - Formspree (https://formspree.io)
  - EmailJS (https://www.emailjs.com)
  - GetForm (https://getform.io)

**Want to customize the email format?**
- Web3Forms allows you to customize email templates
- Log in to your Web3Forms dashboard to set up custom templates
- You can add your logo, change colors, etc.

## Alternative: Using Formspree

If you prefer Formspree instead:

1. Go to [https://formspree.io](https://formspree.io)
2. Sign up with your email
3. Create a new form
4. You'll get an endpoint like: `https://formspree.io/f/FORM_ID`
5. In `main.js` line 63, replace the Web3Forms URL with your Formspree endpoint:
   ```javascript
   var response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```
6. Remove or comment out the access_key hidden input in `index.html`

---

That's it! Your contact form is ready to receive messages. 🎉

