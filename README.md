# 🤖 ArkLab AI Agents Catalog

A modern, responsive web application for browsing and discovering AI agents. Built with Next.js 15, TypeScript, and featuring a beautiful UI with authentication, filtering, and search capabilities.

## ✨ Features

### 🎨 **Modern UI/UX**

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Automatic theme switching with system preference detection
- **Smooth Animations**: Powered by Framer Motion for delightful user interactions
- **Beautiful Cards**: Custom-designed agent cards with hover effects and gradients
- **Advanced Styling**: Tailwind CSS with custom animations and glassmorphism effects

### 🔐 **Authentication System**

- **NextAuth.js Integration**: Secure, server-side authentication
- **Google OAuth**: Sign in with Google for seamless user experience
- **Session Management**: Persistent sessions with automatic token refresh
- **Protected Routes**: Optional authentication requirements for specific pages
- **User Profile**: Popover component with profile information and logout

### 🔍 **Search & Filtering**

- **Real-time Search**: Instant search across agent names and descriptions
- **Advanced Filters**: Filter by category, status, and pricing model
- **URL State Management**: Shareable URLs with filter parameters
- **Redux State**: Centralized state management for seamless UX

### 📱 **Component Architecture**

- **Modular Design**: Reusable components with clear separation of concerns
- **TypeScript**: Full type safety throughout the application
- **Radix UI**: Accessible, unstyled components as foundation
- **Custom Hooks**: Shared logic for Redux and theme management

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Google Cloud Account** (for OAuth setup)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd arklabaiagents
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

4. **Configure Google OAuth**

   Follow the [Google Auth Setup Guide](./GOOGLE_AUTH_SETUP.md) to:

   - Create Google Cloud credentials
   - Set up OAuth 2.0 client
   - Configure authorized domains

5. **Update `.env.local`**

   ```env
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   NEXTAUTH_SECRET=your_nextauth_secret_here
   NEXTAUTH_URL=http://localhost:3000
   ```

6. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/auth/[...nextauth]/   # NextAuth.js API routes
│   ├── globals.css               # Global styles and animations
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Home page with agent catalog
├── components/
│   ├── auth/                     # Authentication components
│   │   └── AuthPopover.tsx       # Login/profile popover
│   ├── general/                  # Shared components
│   │   ├── Header.tsx            # Navigation header
│   │   ├── Footer.tsx            # Site footer
│   │   ├── ThemeToggle.tsx       # Dark/light mode toggle
│   │   ├── ProtectedRoute.tsx    # Route protection wrapper
│   │   └── ClientPage.tsx        # Client-side page wrapper
│   ├── home/                     # Home page components
│   │   ├── AgentsPage.tsx        # Main catalog page
│   │   ├── AgentCard.tsx         # Individual agent cards
│   │   ├── AgentFilters.tsx      # Search and filter UI
│   │   ├── AgentDetailsModal.tsx # Agent detail modal
│   │   └── AgentHero.tsx         # Hero section
│   ├── provider/                 # Context providers
│   │   ├── AuthProvider.tsx      # NextAuth session provider
│   │   ├── ReduxProvider.tsx     # Redux store provider
│   │   └── ThemeProvider.tsx     # Theme context provider
│   └── ui/                       # Reusable UI components
├── data/
│   └── mock-agents.json          # Sample agent data
├── hooks/
│   └── redux.ts                  # Typed Redux hooks
├── lib/
│   ├── badgeColor.ts             # Badge color utilities
│   ├── data-fetching.ts          # Data fetching functions
│   ├── metadata.ts               # SEO metadata generation
│   └── utils.ts                  # General utilities
├── store/                        # Redux store
│   ├── agentSlice.ts             # Agent state management
│   └── index.ts                  # Store configuration
└── types/
    ├── agent.ts                  # Agent type definitions
    └── auth.ts                   # Authentication types
```

## 🎯 Key Design Decisions

### **1. Next.js 15 with App Router**

- **Reasoning**: Latest Next.js features with improved performance and developer experience
- **Benefits**: Server components, improved routing, and better SEO capabilities
- **Trade-offs**: Learning curve for new App Router patterns

### **2. NextAuth.js for Authentication**

- **Reasoning**: Industry standard for Next.js authentication with built-in security
- **Benefits**: OAuth providers, session management, CSRF protection
- **Challenges**: Initial setup complexity, but provides robust security out-of-the-box

### **3. Redux Toolkit for State Management**

- **Reasoning**: Predictable state management for complex filtering and search
- **Benefits**: Time-travel debugging, centralized state, excellent DevTools
- **Alternative Considered**: Context API (chose Redux for scalability)

### **4. Tailwind CSS + Radix UI**

- **Reasoning**: Utility-first CSS with accessible, unstyled components
- **Benefits**: Rapid development, consistent design system, accessibility
- **Custom Additions**: Extended with custom animations and glassmorphism effects

### **5. TypeScript Throughout**

- **Reasoning**: Type safety prevents runtime errors and improves DX
- **Benefits**: Better IntelliSense, refactoring safety, self-documenting code
- **Implementation**: Strict TypeScript config with comprehensive type coverage

## 🧩 Technical Challenges & Solutions

### **Challenge 1: Authentication Integration**

- **Problem**: Integrating NextAuth.js with existing Redux state
- **Solution**: Separated concerns - NextAuth for session, Redux for app state
- **Outcome**: Clean separation with optimal performance

### **Challenge 2: Complex Filtering Logic**

- **Problem**: Real-time search with multiple filters and URL state sync
- **Solution**: Redux for state, URL params for shareability, debounced search
- **Outcome**: Smooth UX with performant filtering

### **Challenge 3: Responsive Card Layout**

- **Problem**: Complex card designs that work across all screen sizes
- **Solution**: CSS Grid with responsive breakpoints and flexible card content
- **Outcome**: Beautiful, consistent layout on all devices

### **Challenge 4: Animation Performance**

- **Problem**: Smooth animations without impacting performance
- **Solution**: Framer Motion with optimized animations and reduced motion support
- **Outcome**: 60fps animations with accessibility considerations

## 🛠️ Built With

### **Core Technologies**

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 19](https://react.dev/)** - UI library with latest features

### **Styling & UI**

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### **State Management**

- **[Redux Toolkit](https://redux-toolkit.js.org/)** - Efficient Redux development
- **[React Redux](https://react-redux.js.org/)** - React bindings for Redux

### **Authentication**

- **[NextAuth.js](https://next-auth.js.org/)** - Authentication for Next.js
- **[Google OAuth](https://developers.google.com/identity)** - Google sign-in integration

### **Developer Experience**

- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[Class Variance Authority](https://cva.style/)** - Component variant management
- **[Tailwind Merge](https://github.com/dcastil/tailwind-merge)** - Tailwind class merging
- **[clsx](https://github.com/lukeed/clsx)** - Conditional class names

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Authentication Setup
# Follow GOOGLE_AUTH_SETUP.md for detailed instructions
```

## 🔧 Configuration

### **Optional: Enable Protected Routes**

To require authentication for the agent catalog:

1. Open `src/app/page.tsx`
2. Change `const requireAuth = false;` to `const requireAuth = true;`
3. Users must sign in to view the catalog

### **Customize Theme**

Edit `src/app/globals.css` to modify:

- Color schemes
- Custom animations
- Typography
- Spacing

### **Add New Agents**

Update `src/data/mock-agents.json` with new agent data following the existing schema.

## 🚢 Deployment

### **Vercel (Recommended)**

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### **Other Platforms**

The app can be deployed to any platform supporting Node.js:

- Netlify
- Railway
- Render
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check [GOOGLE_AUTH_SETUP.md](./GOOGLE_AUTH_SETUP.md) for auth setup
- **Issues**: Create an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Radix UI** for accessible components
- **Tailwind CSS** for the utility-first approach
- **Framer Motion** for smooth animations
- **NextAuth.js** for secure authentication

---

**Built with ❤️ by ArkLab AI Team**
