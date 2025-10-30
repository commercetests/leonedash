# Haleon Amazon Dashboard

A comprehensive Next.js dashboard for managing and analyzing Amazon business operations across Vendor Central, Advertising, DSP, and AMC platforms for Haleon brands in EU5 markets.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules with Glassmorphism design
- **Charts:** Recharts
- **Icons:** Lucide React
- **Deployment:** Vercel

## 📦 Features

- **Vendor Central Analytics** - Revenue, shipments, and inventory tracking
- **Advertising Management** - Sponsored Products, Brands, Display campaigns
- **DSP Performance** - Programmatic advertising insights
- **AMC Analytics** - Path to conversion and audience analysis
- **Multi-Brand Support** - Centrum, Corega, Parodontax, Sensodyne, Voltaren Natura
- **EU5 Coverage** - Germany, France, Italy, Spain, United Kingdom
- **Dynamic Filtering** - Date range, country, brand, platform, and format filters

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Dashboard home
│   ├── vendor/            # Vendor Central page
│   ├── advertising/       # Advertising page
│   ├── dsp/               # DSP page
│   ├── amc/               # AMC page
│   └── api/               # API routes (future)
├── components/            # React components
├── context/               # React Context providers
├── styles/                # Global and component styles
├── utils/                 # Utility functions
└── public/                # Static assets

```

## 🔌 API Integration (Planned)

The dashboard is designed to integrate with:

- **Amazon SP-API** - Vendor orders, shipments, finances
- **Amazon Advertising API** - Campaign performance, reporting
- **Amazon DSP API** - Programmatic advertising data
- **Amazon Marketing Cloud** - Advanced analytics queries

## 🎨 Design System

- **Color Scheme:** Dark theme with lime green (#22ff00) accents
- **UI Pattern:** Glassmorphism with backdrop blur
- **Typography:** Inter font family
- **Responsive:** Mobile-first design approach

## 📝 License

Private - Haleon Internal Use Only
