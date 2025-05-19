# Golden Raspberry Awards API

API to query nominees and winners of the "Worst Picture" category of the Golden Raspberry Awards.

## Requirements

- Node.js 14+
- npm

## Installation

1. Clone this repository

2. Install the dependencies:
```bash
npm install
```

## Running the Application

To start in development mode:
```bash
npm run dev 
```

## To build and start in production:
```bash
npm run build
npm start
```

## The server will start on port 3000.

## Running Tests

To run the integration tests:
```bash
npm test
```

## API Endpoints

Get award intervals for producers  
Returns the producers with the shortest and longest intervals between consecutive awards.

- URL: /api/producers/award-intervals
- Method: GET
- Response Format:

```json
{
  "min": [
    {
      "producer": "Producer Name",
      "interval": 1,
      "previousWin": 2008,
      "followingWin": 2009
    }
  ],
  "max": [
    {
      "producer": "Producer Name",
      "interval": 99,
      "previousWin": 1900,
      "followingWin": 1999
    }
  ]
}
```
