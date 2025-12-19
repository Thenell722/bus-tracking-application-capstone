## Saint Lucia Bus Tracking Application (Prototype)
A mobile-first prototype designed to improve visibility, predictability, and usability in Saint Lucia’s public transportation network.

## Project Overview
This project explores the design and partial implementation of a bus tracking and passenger guidance system for the public minibus network in Saint Lucia.
The goal was to investigate how real-time location tracking, route visibility, and fare guidance could be delivered through a modern mobile application supported by a cloud-based backend.
This is not a production system, but a functional prototype demonstrating how mapping services, APIs, and simulated GPS data can work together to improve transport predictability.

## Problem Context
Public transportation in Saint Lucia currently lacks:
•	Real-time bus location visibility
•	Predictable waiting times
•	Transparent and consistent fare information
•	Digital route information
Passengers often experience long and unpredictable wait times, while drivers operate without insight into passenger demand or system-level efficiency.
This prototype explores how a digital mobile application could address these gaps.

## System Architecture (High-Level)
The project uses a client–server architecture:
Frontend
•	React Native (Expo) mobile application
•	Displays routes, ETAs, maps, and driver information
Backend
•	Node.js + Express REST API
•	Provides route, pricing, and driver data
Database
•	MongoDB Atlas cloud database
•	Stores driver details, routes, fares, and stop coordinates
Mapping & Location
•	Google Maps API
•	Polyline route visualization
•	Real-time bus movement simulation
A full architecture diagram will be included in the /docs directory.

## Development Approach
The system was built using an incremental development process:
Increment 1 – User Interface Prototype
•	Paper sketches
•	Figma digital prototypes
•	React Native UI with placeholder data
Increment 2 – Backend & Data Layer
•	MongoDB Atlas database setup
•	Node.js + Express API creation
•	Integration of backend with the mobile app
Increment 3 – Real-Time Simulation
•	Google Maps integration
•	Bus and stop markers
•	Route polyline rendering
•	GPS simulation for real-time movement
•	Work-status indicator for drivers
This approach ensured steady progress while allowing the flexibility to learn new technologies.

## Current Project Status

Prototype only — not production ready.
Implemented
•	Mobile UI
•	Backend API structure
•	Database models (routes, stops, pricing, drivers)
•	Simulated bus movement
•	Route and map rendering
•	Driver work-status indicator
Not Implemented (Out of Scope)
•	Live GPS tracking
•	Authentication and role management
•	Online payments
•	Production deployment
•	Security hardening
•	Full-scale testing

## Skills Demonstrated

| Skill                     | Application                                                    |
|---------------------------|----------------------------------------------------------------|
| System Architecture       | Designed mobile–backend–database workflow                     |
| React Native Development  | Built cross-platform UI with Expo                             |
| Backend Engineering       | Developed REST APIs with Node.js & Express                    |
| Database Modeling         | Structured route, fare, and driver data                       |
| API Integration           | Connected mobile app to backend services                      |
| Real-Time Simulation      | Built JavaScript-based GPS movement engine                    |
| Technical Documentation   | Created full technical report                                 |
| Project Management        | Executed incremental development lifecycle                    |

These skills demonstrate full-stack problem-solving, independent learning, and the ability to design, build, and document a working prototype from concept to implementation.

## Tools & Technologies

| Category         | Tools                     |
|------------------|---------------------------|
| Frontend         | React Native, Expo        |
| Backend          | Node.js, Express.js       |
| Database         | MongoDB Atlas             |
| Mapping          | Google Maps API           |
| UI/UX            | Figma                     |
| Testing          | Postman                   |
| Development      | Visual Studio Code        |
| Version Control  | Git, GitHub               |

## Security Considerations (High-Level)
While full security was not implemented, the design acknowledges:
•	Need to protect GPS and driver data
•	Importance of authentication and access control
•	Requirement for encrypted communication
•	Logging and monitoring considerations 
•	Potential for API rate limiting and anomaly detection
These elements would be essential for a production-ready system.

## Future Improvements
Core Features
•	Live GPS ingestion from driver devices
•	ETA calculation for every stop
•	Dynamic fare calculation
•	Search-based route selection
Security and Reliability
•	Authentication and authorization
•	TLS encryption
•	Logging and monitoring
•	Rate limiting and abuse prevention
User and Driver Experience
•	Push notifications
•	Accessibility improvements
•	Driver navigation and shift automation
•	Digital payment integration

## Full Technical Documentation
A complete technical report (approximately 100 pages) is available in the /docs directory and includes:
•	Requirements analysis
•	System and architecture design
•	UI and backend implementation
•	GPS simulation logic
•	Testing methodology
•	Risk analysis
•	Future development roadmap

## About This Project
This prototype was originally developed as a final-year capstone project for the BSc Computing & IT (Hons) degree.
It has been refined and reorganized here for technical review, learning, and portfolio presentation.

