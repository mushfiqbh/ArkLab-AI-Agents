# 🤖 ArkLab AI Agents Catalog

A modern, responsive web application for browsing and discovering AI agents. Built with Next.js 15, TypeScript, and featuring a beautiful UI with authentication, filtering, and search capabilities.

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
│   │   ├── ProtectedRoute.tsx    # Protected route wrapper
│   ├── general/                  # Shared components
│   │   ├── Header.tsx            # Navigation header
│   │   ├── Footer.tsx            # Site footer
│   │   ├── ThemeToggle.tsx       # Dark/light mode toggle
│   │   ├── ProtectedRoute.tsx    # Route protection wrapper
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
│   ├── authOprations.ts          # Authentication operations
│   ├── badgeColor.ts             # Badge color utilities
│   ├── data-fetching.ts          # Data fetching functions
│   ├── metadata.ts               # SEO metadata generation
│   └── utils.ts                  # General utilities
├── store/                        # Redux store
│   ├── agentSlice.ts             # Agent state management
│   └── index.ts                  # Store configuration
└── types/
    ├── agent.ts                  # Agent type definitions
```

## 🧩 Technical Challenges & Solutions

### **Challenge 1: Animation Performance**

- **Problem**: Smooth animations without impacting performance
- **Solution**: Framer Motion with optimized animations and reduced motion support
- **Outcome**: 60fps animations with accessibility considerations

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
