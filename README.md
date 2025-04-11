# TransportSimple Trip Visualizer

A React app to visualize trips between cities using SVG graphics. It intelligently distinguishes between continued, non-continued, and repeated trips using Y-axis positions and curved paths.

## ✨ Features

- Select start and end cities from a predefined list
- Dynamically add trips and visualize them
- Smooth SVG paths for visual clarity
- Color-coded trips with arrows and labels
- Trip logic:
  - Continued trip → Same Y
  - Repeated trip → Y = 200
  - Non-continued trip → Y = 100

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Setup

```bash
git clone https://github.com/your-username/transport-trip-visualizer.git
cd transport-trip-visualizer
npm install
npm start
