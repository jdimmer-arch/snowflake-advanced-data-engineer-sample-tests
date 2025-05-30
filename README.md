# Snowflake Advanced Data Engineering Certificate Practice Tests

This interactive quiz application contains three comprehensive practice tests for the Snowflake Advanced Data Engineering Certificate (DEA-C02) exam. Each test follows the official domain weightings and includes detailed explanations for all answers.

## Live Demo

The application is deployed and available at: https://mtqvryyz.manus.space

## Features

- Three complete practice tests with 65 questions each
- Questions distributed according to official exam domain weightings:
  - Domain 1.0: Data Movement (26%)
  - Domain 2.0: Performance Optimization (21%)
  - Domain 3.0: Storage and Data Protection (14%)
  - Domain 4.0: Data Governance (14%)
  - Domain 5.0: Data Transformation (25%)
- Interactive quiz interface with:
  - Immediate feedback on answers
  - Detailed explanations for each question
  - Progress tracking
  - Domain-based scoring analysis
  - Complete test review

## Getting Started

### Prerequisites

- Node.js 16+ and npm/pnpm

### Installation

1. Clone the repository
   ```
   git clone https://github.com/jdimmer-arch/snowflake-advanced-data-engineer-sample-tests.git
   cd snowflake-advanced-data-engineer-sample-tests
   ```

2. Install dependencies
   ```
   pnpm install
   ```

3. Start the development server
   ```
   pnpm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Select one of the three practice tests to begin
2. Answer each question and check your answer before proceeding
3. Review your score and performance by domain at the end of the test
4. Use the review feature to see explanations for all questions

## Building for Production

To build the application for production:

```
pnpm run build
```

The build artifacts will be stored in the `dist/` directory.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Content based on the official Snowflake Advanced Data Engineering Certificate (DEA-C02) exam domains
- Created to help candidates prepare for the certification exam
