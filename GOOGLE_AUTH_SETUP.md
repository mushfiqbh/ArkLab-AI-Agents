# 🔐 Google Authentication Setup with NextAuth.js

This comprehensive guide will help you set up Google Sign-In authentication using NextAuth.js for your ArkLab AI Agents catalog application.

## 📋 Prerequisites

- A Google Cloud Platform account
- A Google Cloud project (or create a new one)
- Node.js (v18 or higher) installed
- Your Next.js project set up

## 🚀 Step 1: Create Google OAuth 2.0 Credentials

### 1.1 Access Google Cloud Console

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select your existing project or create a new one
3. Make sure billing is enabled for your project (required for OAuth)

### 1.2 Enable Google Identity Services

1. In the Google Cloud Console, navigate to **APIs & Services** > **Library**
2. Search for "Google Identity Services" or "Google+ API"
3. Click on it and press **Enable**
4. Wait for the API to be enabled

### 1.3 Create OAuth 2.0 Client ID

1. Navigate to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client ID**
3. If prompted, configure the OAuth consent screen first:
   - Choose **External** for user type
   - Fill in the required application information
   - Add your email to test users during development
4. Select **Web application** as the application type
5. Give your OAuth client a name (e.g., "ArkLab AI Agents")

### 1.4 Configure Authorized Origins and Redirect URIs

**Authorized JavaScript origins:**

- Development: `http://localhost:3000`
- Production: `https://yourdomain.com`

**Authorized redirect URIs:**

- Development: `http://localhost:3000/api/auth/callback/google`
- Production: `https://yourdomain.com/api/auth/callback/google`

### 1.5 Save Your Credentials

1. Click **Create**
2. Copy the **Client ID** and **Client Secret**
3. Keep these credentials secure and never commit them to version control

## 🔧 Step 2: Configure Environment Variables

### 2.1 Create Environment File

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

### 2.2 Update Environment Variables

Edit your `.env.local` file with your Google credentials:

```bash
# Google Sign-In Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Secret - Generate a random string for production
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 2.3 Generate NextAuth Secret

For production, generate a secure random string:

**On macOS/Linux:**

```bash
openssl rand -base64 32
```

**On Windows:**

```cmd
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Online Generator:**
You can also use: https://generate-secret.vercel.app/32

## 🧪 Step 3: Test the Authentication

### 3.1 Start Development Server

```bash
npm run dev
```

### 3.2 Test Sign-In Flow

1. Open your browser to [http://localhost:3000](http://localhost:3000)
2. Click the **Sign In** button in the header
3. Select **Continue with Google**
4. Complete the Google sign-in process
5. Verify you're redirected back to the app and logged in

## 🔒 Step 4: Enable Protected Routes (Optional)

To make the AI Agent Catalog accessible only to logged-in users:

1. Open `src/app/page.tsx`
2. Find the line: `const requireAuth = false;`
3. Change it to: `const requireAuth = true;`
4. Save the file

Now users must sign in to access the catalog.

## 🌐 API Routes Created

NextAuth.js automatically creates these API endpoints:

- `GET /api/auth/signin` - Sign in page
- `GET /api/auth/signout` - Sign out page
- `POST /api/auth/signin/google` - Sign in with Google
- `GET /api/auth/callback/google` - Google OAuth callback
- `GET /api/auth/session` - Get current session
- `GET /api/auth/csrf` - CSRF token endpoint

## 📚 Additional Resources

### Documentation

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Authentication Patterns](https://nextjs.org/docs/authentication)

### Support

- [NextAuth.js GitHub Issues](https://github.com/nextauthjs/next-auth/issues)
- [Google Cloud Console Support](https://cloud.google.com/support)
- [Stack Overflow NextAuth.js](https://stackoverflow.com/questions/tagged/next-auth)

## 💡 Tips for Success

1. **Keep Credentials Secure**: Never commit secrets to version control
2. **Test Thoroughly**: Test sign-in/out flows in different browsers
3. **Monitor Usage**: Keep track of API quotas in Google Cloud Console
4. **Stay Updated**: Keep NextAuth.js updated for security patches
5. **Documentation**: Document any custom configurations for your team

---

**🎉 Congratulations!** You've successfully set up Google Authentication with NextAuth.js. Your users can now securely sign in to access your AI Agents catalog!

For additional support, check the project README.md or create an issue in the repository.
