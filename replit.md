# Overview

FandomHub is a React-based entertainment content discovery platform that allows users to explore games, movies, and series. The application provides detailed information about entertainment content including characters, weapons, locations, and other categorized data. Built with a modern tech stack featuring React, TypeScript, Express.js, and PostgreSQL with Drizzle ORM.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for build tooling
- **Routing**: Wouter for client-side routing with clean URL patterns
- **State Management**: TanStack Query for server state management and caching
- **Styling**: Tailwind CSS with custom design system using CSS variables
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Component Structure**: Modular component architecture with reusable UI components

## Backend Architecture
- **Server Framework**: Express.js with TypeScript
- **API Design**: RESTful API structure with organized route handlers
- **Data Layer**: In-memory storage implementation with interface abstraction for future database integration
- **Error Handling**: Centralized error handling middleware
- **Development Setup**: Hot reloading with Vite integration in development mode

## Data Storage Solutions
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL with Neon serverless database provider
- **Schema Design**: Three main entities - users, content, and categories with JSON fields for flexible metadata
- **Migration System**: Drizzle-kit for database schema management

## Content Management System
- **Content Types**: Support for games, movies, and series
- **Categorization**: Flexible category system for characters, weapons, locations, and other content types
- **Metadata Storage**: JSON fields for extensible content properties
- **Search & Discovery**: Trending and featured content functionality

## Development & Build System
- **Build Tool**: Vite with React plugin and TypeScript support
- **Development Tools**: Runtime error overlay, hot module replacement
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)
- **Code Quality**: TypeScript strict mode with comprehensive type checking

# External Dependencies

## UI Framework Dependencies
- **Radix UI**: Complete set of unstyled, accessible UI primitives (@radix-ui/*)
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **Class Variance Authority**: For component variant management
- **Lucide React**: Icon library for consistent iconography

## Database & Data Management
- **Neon Database**: Serverless PostgreSQL hosting (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe ORM with schema validation (drizzle-orm, drizzle-zod)
- **Connect PG Simple**: PostgreSQL session store for Express

## Development & Build Tools
- **Vite**: Build tool with React plugin and development server
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds
- **TSX**: TypeScript execution for development server

## State & Form Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation and type inference

## Utility Libraries
- **Date-fns**: Date manipulation and formatting
- **CLSX & Tailwind Merge**: Conditional CSS class management
- **Nanoid**: Unique ID generation
- **CMDK**: Command palette component