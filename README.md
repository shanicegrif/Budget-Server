# Budget-Server
Budgeting App Server
The Budgeting App Server is a Node.js application built using the Express.js framework. This server serves as the backend for a budgeting application, allowing users to manage financial transactions.

# Table of Contents
- Features
- API Routes

## Features
- Transaction Management: Add, update, delete, and retrieve financial transactions.
- Sorting and Filtering: Sort transactions by name and filter by amount using various operators.
- Error Handling: Handle errors for invalid routes and transactions.
- CORS Support: Enable Cross-Origin Resource Sharing for cross-origin requests.

## API Routes
- GET /transactions: Retrieve a list of transactions. You can provide query parameters to sort or filter the transactions.
- GET /transactions/:index: Retrieve a single transaction by its index.
- POST /transactions: Add a new transaction.
- DELETE /transactions/:arrayIndex: Delete a transaction by its index.
- PUT /transactions/:arrayIndex: Update a transaction by its index.