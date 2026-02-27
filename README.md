#  HK Real-time Transport Explorer

A React-based real-time transport information platform that integrates **DATA.GOV.HK (Public Sector Information)** APIs to provide accurate Estimated Time of Arrival (ETA) for users.

👉 **[Live Demo](https://transport-rho-blush.vercel.app)**

---

## 🚀 Technical Highlights

*   **Real-time Data Fetching**: Integrated multiple Government Open Data APIs using **Async/Await** and the Fetch API.
*   **Component-based Architecture**: Leveraged **React functional components** to ensure reusability and clean code structure.
*   **Dynamic UI Rendering**: Real-time updates of the DOM based on JSON payloads from transport operators.
*   **State Management**: Efficiently handled loading states and error boundaries to ensure a smooth user experience.

## 🛠️ Tech Stack

*   **Frontend**: React.js
*   **Deployment**: Vercel
*   **Data Source**: DATA.GOV.HK (Public Transport ETA API)
*   **Styling**: CSS Modules / Flexbox (Responsive Design)

## 💡 Engineering Challenges & Solutions

1.  **Parsing Heterogeneous Data**: Handled inconsistent JSON structures from different transport operators (Bus vs. Minibus) by implementing a data normalization layer.
2.  **Asynchronous Synchronization**: Managed race conditions during rapid API calls to ensure the UI always displays the most recent data.
