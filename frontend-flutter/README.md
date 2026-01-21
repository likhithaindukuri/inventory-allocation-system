# Flutter Frontend

Minimal Flutter application that calls the same backend API as the React frontend.

## Setup

1. Install Flutter SDK: https://docs.flutter.dev/get-started/install
2. Run `flutter pub get` to install dependencies
3. Run `flutter run` to start the app

## API Endpoint

- POST `http://localhost:3000/api/order`
- Body: `{ "productId": number, "quantity": number }`

## Note

This is a minimal implementation with no UI focus, matching the assignment requirements.
