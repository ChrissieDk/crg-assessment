# CRG Assessment - Timeline Viewer

A modern React application for viewing and filtering timeline items with audio playback capabilities.

## Features

- View timeline items in a responsive grid layout
- Filter items by category using a dropdown menu
- Search items by date
- Audio playback functionality
- Infinite scroll loading
- Responsive design for mobile and desktop
- Modern UI with Tailwind CSS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v7 or higher)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd CRG-assessment
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

This will start the application in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
CRG-assessment/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
└── index.html         # HTML template
```

## API Integration

The application integrates with an API endpoint at `https://arthurfrost.qflo.co.za/php/getTimeline.php` to fetch timeline data.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- Axios

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Browser Support

The application is tested and works on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


// documentation created for current version as of 2025/06/07 - updated upon deployment of new features
