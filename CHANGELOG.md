# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and I will make an attempt to adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.5.2] - 2023-05-14

### Fixed

- Fixed hydration error caused by using wrong input handler

## [0.5.1] - 2023-05-14

### Changed
- Made mobile nav more accessible

## [0.5.0] - 2023-05-14

### Added
- Added functionality to create new categories

### Changed
- Changed from using notFound API to alerting user of missing data

## [0.4.1] - 2023-05-14

### Fixed
- Fixed bug where mobile nav wasn't working

## [0.4.0] - 2023-05-14

### Added
- Search functionality

### Changed
- Filter bar is now in layout component

### Removed
- Errant console logs

## [0.3.0] - 2023-05-14

### Added
- Conditional check for pathname
- Dark mode styling as default
- Basic loading UI
- Title metadata to routes
- Intensity field
- Default template page for nespresso-capsules category
- Mobile navigation
- Rating functionality

### Fixed
- Link in add item button
- References that weren't properly refactored
- Missing gap in navbar
- Redirect function moved out of try/catch block
- Fixed empty nextconfig
- Fixed typo in env variable and changed to module
- Fixed type error

### Changed
- Prefetching tested on links
- Project structure refactored
- README.md updated
- Rating and delete rating functionality added, and folders reorganized
- Project/folder structure changed
- Client side code refactored to client components

### Removed
- Upstash

## [0.2.0] - 2023-05-08

### Added
- Middleware config tested and layout set in app directory
- Some more auth-based server components to edit items
- Server actions (vrooom, vrooom) and upstash
- Form to create new items (vertuo coffee pods)
- Notes added to seed data
- Admin_id for easy authorization on routes
- Navbar component reorganized and breadcrumb started
- 404 not found with global catcher
- Images from prisma query
- Tailwind UI components and styles using data from db
- Node env variable to enable development logging
- Database seed script
- Navbar

### Changed
- Database model updated to separate images from item
- Database schema and seed file updated
- DB lib folder moved out of app directory

## [0.1.0] - 2023-05-06

### Added
- DB schema made more generic
- Clerk implemented for auth
- Basic routing
- Basic schema for ratings
- Basic landing page
- iRate logo assets

### Removed
- Bootstrapped layout removed
- Base styling from globals.css removed
- Unused icons deleted

### Fixed
- Fixed type error

### Changed
- DB solution changed

## [0.0.1] - 2023-05-05

### Added
- Initial setup

*The changelog up until version 0.3.0 was generated with the help of OpenAI's ChatGPT. Future updates will be manually maintained.*
