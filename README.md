# Win Yan Naing Htut - Portfolio Website

This is the personal portfolio website of **Win Yan Naing Htut**, designed with an Ubuntu 20.04 desktop simulation theme. Built using Next.js and Tailwind CSS, it showcases skills, certifications, and professional information in an interactive desktop environment.

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd winyan
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables (optional):
   - Copy `.env.local` to create your environment file
   - Add your Google Analytics and EmailJS credentials

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production
```bash
npm run build
# or
yarn build
```

## 📧 Contact Form Configuration

To enable the contact form functionality:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service (Gmail or Outlook recommended)
3. Set up a new service and get your Service ID
4. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_USER_ID=your_emailjs_user_id
NEXT_PUBLIC_TEMPLATE_ID=template_fqqqb9g
NEXT_PUBLIC_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_GA_TRACKING_ID=your_google_analytics_id (optional)
```

Replace the placeholder values with your actual EmailJS credentials.

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Contact Form**: EmailJS
- **Analytics**: Google Analytics (optional)
- **Theme**: Ubuntu 20.04 Desktop Simulation

## 📁 Project Structure

```
components/
├── apps/           # Desktop applications (About, VS Code, etc.)
├── base/           # Base UI components
├── context menus/  # Right-click context menus
├── screen/         # Main screen components
└── util components/# Utility components

pages/              # Next.js pages
public/             # Static assets
styles/             # Global styles
```

## ✨ Features

- Interactive Ubuntu desktop simulation
- Responsive design
- Contact form integration
- Resume download functionality
- Skills and certifications showcase
- Professional work experience display

## 📜 Available Scripts

### `npm run dev`
Runs the development server on [http://localhost:3000](http://localhost:3000).
The page will reload automatically when you make changes.

### `npm run build`
Builds the application for production. The build is optimized and minified.

### `npm start`
Runs the built application in production mode.

### `npm run lint`
Runs ESLint to check for code quality issues.

## 🚀 Deployment

This Next.js application can be deployed on various platforms:

- **Vercel** (recommended): Deploy directly from GitHub repository
- **Netlify**: Build command: `npm run build`, Publish directory: `out`
- **GitHub Pages**: Requires static export configuration

For static export, add the following to `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
module.exports = nextConfig
```

## 🤝 Contributing

This is a personal portfolio project. If you'd like to use this as a template for your own portfolio:

1. Fork the repository
2. Update personal information in `components/apps/winyan.js`
3. Replace images in `public/images/`
4. Update contact information and social links
5. Modify the color scheme in `tailwind.config.js` if desired

## � Credits

This portfolio website is based on the amazing Ubuntu desktop simulation template originally created by **Vivek Patel**. The original project can be found at:
- Original Repository: [vivek9patel/vivek9patel.github.io](https://github.com/vivek9patel/vivek9patel.github.io)
- Original Portfolio: [vivek9patel.github.io](https://vivek9patel.github.io)

Special thanks to Vivek Patel for creating this innovative Ubuntu desktop simulation concept and making it open source for the community to use and adapt.

## �📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Win Yan Naing Htut**
- LinkedIn: [linkedin.com/in/wynh](https://linkedin.com/in/wynh)
- GitHub: [github.com/WinYanNaingHtut](https://github.com/WinYanNaingHtut)
- Email: winyannainghtut98@gmail.com
