# Code Review Assistant

> An intelligent, automated code review tool that helps developers write better code through instant analysis and actionable feedback.

## Overview

Code Review Assistant is a modern web application that analyzes your source code files and provides comprehensive reviews with actionable suggestions. Built with React and TypeScript, it offers a seamless experience for developers looking to improve code quality without the overhead of manual reviews.

<img width="1391" height="627" alt="image" src="https://github.com/user-attachments/assets/a3a6aa5e-e53d-489d-830e-8e40bef7b8eb" />
<img width="1391" height="739" alt="image" src="https://github.com/user-attachments/assets/6e6d6ae2-913e-4607-a0da-2c6a3ab943d7" />
<img width="1419" height="911" alt="image" src="https://github.com/user-attachments/assets/d04c0a55-769d-4458-8896-1c0394cc3369" />

## Features

- **Intelligent File Upload** - Drag and drop or select files for instant analysis
- **Automatic Language Detection** - Supports multiple programming languages with smart detection
- **Comprehensive Code Analysis** - Evaluates readability, modularity, and potential bugs
- **Detailed Review Reports** - Get structured feedback with specific suggestions
- **Review History** - Track and revisit previous code reviews
- **Fast & Lightweight** - Client-side analysis for instant results

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for lightning-fast development
- **Styling**: Tailwind CSS for modern, responsive design
- **Icons**: Lucide React for beautiful, consistent iconography
- **Database**: Supabase for data persistence

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/GarvvB/Code_review_assistant.git
cd Code_review_assistant/project
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` if available
   - Configure Supabase credentials if using database features

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

1. **Upload Code Files** - Click the upload area or drag and drop your source files
2. **Automatic Analysis** - The system detects the programming language and analyzes your code
3. **Review Results** - View detailed feedback including:
   - Code readability scores
   - Modularity assessment
   - Potential bug warnings
   - Improvement suggestions
4. **Export Reports** - Save or share review reports for future reference
5. **Track History** - Access previous reviews from your history dashboard

## Project Structure

```
project/
├── src/
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   ├── components/          # React components
│   ├── services/            # Business logic and API services
│   │   └── codeAnalyzer.ts  # Core analysis logic
│   └── utils/               # Utility functions
│       └── fileUtils.ts     # File handling and language detection
├── public/                  # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality
- `npm run typecheck` - Run TypeScript type checking

## Roadmap

- [ ] Enhanced analysis with AI-powered suggestions
- [ ] Support for more programming languages
- [ ] Integration with GitHub for PR reviews
- [ ] Team collaboration features
- [ ] Custom rule configuration
- [ ] IDE extensions (VS Code, IntelliJ)
- [ ] CI/CD pipeline integration
- [ ] Unit and integration tests

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the documentation

## Acknowledgments

Built with modern web technologies and a passion for code quality. Special thanks to the open-source community for the amazing tools and libraries that made this project possible.

---

Made with ❤️ by developers, for developers
