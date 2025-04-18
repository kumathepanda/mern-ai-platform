```mermaid
flowchart TD
  A[User] --> B{Has Account?}
  B -- Yes --> C[Login]
  C --> D{Valid Credentials?}
  D -- Yes --> E[Set Cookie & Token]
  D -- No --> F[Show Error]

  B -- No --> G[Signup]
  G --> H{Valid Details?}
  H -- Yes --> I[Store User]
  H -- No --> F

  E --> J[Home Page]
  J --> ChatUI[Chat UI]

  ChatUI --> Mistral[Send Message to Mistral API]
  Mistral --> Response[Receive Response]
  Response --> ChatUI

  J --> Logout[Logout]
  Logout --> X[Clear Tokens & Session]
  X --> Y[Redirect to Login]
```

Phase 1 - Completed: Phase 1 focused on developing an MVP chat-bot, which leverages API calls to interact with users and provide basic functionality. This foundational phase enables further development and testing of the core features.

Upcoming Phases:

Phase 2: Integration of a RAG-based bot, such as a Quiz generator tailored to the LNMIIT curriculum.
