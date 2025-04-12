# Wordle API Documentation

## Overview

This API provides a Wordle-like word guessing game experience. It selects a random word daily from a predefined word list and allows users to make guesses, providing feedback on the correctness of each guess.

## Base URL

```
http://localhost:3000
```

## Authentication

Currently, this API does not require authentication.

## Endpoints

### Make a Guess

Submit a guess for the word of the day.

```
POST /api/guess
```

#### Request Body

| Field | Type   | Description                    |
|-------|--------|--------------------------------|
| guess | string | The word you want to guess     |

Example:
```json
{
  "guess": "hello"
}
```

#### Response

| Field   | Type    | Description                                                |
|---------|---------|-----------------------------------------------------------|
| guess   | string  | The word you guessed                                       |
| result  | string  | Feedback pattern for each letter                           |
| correct | boolean | Whether the guess is correct                               |
| message | string  | A message indicating success or encouragement to try again |

##### Result Pattern

For each letter in your guess, the result string will contain:
- `o`: Letter is in the correct position
- `.`: Letter exists in the word but is in the wrong position
- `x`: Letter does not exist in the word

Example Successful Response:
```json
{
  "guess": "hello",
  "result": "o.xx.",
  "correct": false,
  "message": "Try again!"
}
```

Example Correct Guess:
```json
{
  "guess": "world",
  "result": "ooooo",
  "correct": true,
  "message": "Congratulations! You guessed the word correctly!"
}
```

#### Error Responses

If the guess is not in the word list:
```json
{
  "error": "No such word exists in the word list."
}
```

If no guess is provided:
```json
{
  "error": "Invalid guess. Please provide a valid word."
}
```

If the guess length is incorrect:
```json
{
  "error": "Invalid guess. Word must be 5 letters long."
}
```

### Get Game Status

Get the current status of the game, including the date and length of the current word.

```
GET /api/status
```

#### Response

| Field      | Type   | Description                            |
|------------|--------|----------------------------------------|
| date       | string | Current date in YYYY-MM-DD format      |
| wordLength | number | Length of the current word of the day  |
| status     | string | Status of the game (always "active")   |

Example:
```json
{
  "date": "2025-04-12",
  "wordLength": 5,
  "status": "active"
}
```

## Error Codes

| Status Code | Description                                           |
|-------------|-------------------------------------------------------|
| 200         | Success                                               |
| 400         | Bad Request - Invalid input parameters                |
| 500         | Server Error - Issue retrieving word of the day       |

## Rate Limiting

This API does not currently implement rate limiting. In a production environment, rate limiting should be considered to prevent abuse.

## Notes

- The word of the day changes at midnight UTC
- All words and guesses are case-insensitive
- The API only accepts words that exist in the predefined word list

## Example Usage

### Using cURL

Make a guess:
```bash
curl -X POST http://localhost:3000/api/guess \
  -H "Content-Type: application/json" \
  -d '{"guess": "hello"}'
```

Get game status:
```bash
curl http://localhost:3000/api/status
```

### Using JavaScript/Fetch

```javascript
// Make a guess
fetch('http://localhost:3000/api/guess', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    guess: 'hello'
  })
})
.then(response => response.json())
.then(data => console.log(data));

// Get game status
fetch('http://localhost:3000/api/status')
.then(response => response.json())
.then(data => console.log(data));
```