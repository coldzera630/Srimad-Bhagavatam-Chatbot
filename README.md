🙏 Srimad Bhagavatam AI Chatbot 🤖

A conversational AI designed to answer questions and provide insights from the sacred text of the Srimad Bhagavatam. This project leverages the power of Large Language Models (LLMs) to make the profound wisdom of the Bhagavatam accessible and easy to explore through a natural chat interface.

Harness the divine knowledge of the Vedas, right from your terminal. Inspired by the spiritual heritage of India and developed with reverence in Bhubaneswar, Odisha.

Note: You should add a screenshot of your chatbot in action and name it chatbot_screenshot.png in your repository for the image to display correctly.

✨ Key Features

    Conversational Q&A: Ask questions in plain English about characters, events, philosophy, and teachings within the Srimad Bhagavatam.

    Context-Aware Responses: The chatbot uses Retrieval-Augmented Generation (RAG) to ensure answers are grounded in the actual verses of the text, minimizing hallucinations and providing relevant context.

    Source Referencing (Optional Feature): Ask the chatbot to cite the Canto, Chapter, and Verse for its answers.

    Web-Based Interface: A simple and clean user interface built with Flask for easy interaction.

⚙️ How It Works (Technical Architecture)

This chatbot employs a Retrieval-Augmented Generation (RAG) architecture to provide accurate, context-based answers.

    Data Ingestion & Embedding: The entire Srimad Bhagavatam text is parsed, cleaned, and divided into smaller, meaningful chunks. Each chunk is then converted into a numerical vector (embedding) using an AI model.

    Vector Storage & Indexing: These embeddings are stored and indexed in a specialized vector database (e.g., Pinecone, ChromaDB) for efficient, high-speed semantic searching.

    User Query & Retrieval: When a user asks a question, it is also converted into an embedding. The system then searches the vector database to find the text chunks with the most similar meaning (i.e., the closest vectors).

    Prompt Augmentation & Generation: The retrieved text chunks are passed as "context" to a powerful Large Language Model (like OpenAI's GPT series) along with the user's original question. The LLM is instructed to formulate a final answer based only on the provided context from the scripture.

User Query --> Embedding --> Semantic Search --> Retrieve Relevant Verses --> Augment Prompt --> LLM Generation --> Answer

🛠️ Technology Stack

    Backend: Python, Flask

    AI/ML:

        LLM Provider: OpenAI (for embeddings and generation)

        Framework: LangChain

        Vector Database: Pinecone / ChromaDB

    Frontend: HTML, CSS, JavaScript

    Environment Management: python-dotenv

🚀 Getting Started

Follow these instructions to set up and run the project locally.

Prerequisites

    Python 3.9+

    An API Key from OpenAI.

    An API Key and environment details from a vector database provider like Pinecone.

Installation & Setup

    Clone the repository:
    Bash

git clone https://github.com/coldzera630/Srimad-Bhagavatam-Chatbot.git
cd Srimad-Bhagavatam-Chatbot

Create a virtual environment and activate it:
Bash

# For Windows
python -m venv venv
.\venv\Scripts\activate

# For macOS/Linux
python3 -m venv venv
source venv/bin/activate

Install the required dependencies:
Bash

pip install -r requirements.txt

Set up your environment variables:

    Create a copy of the example environment file:
    Bash

copy .env.example .env

Open the .env file and add your secret API keys:
Code snippet

    OPENAI_API_KEY="sk-..."
    PINECONE_API_KEY="your-pinecone-api-key"
    PINECONE_ENVIRONMENT="your-pinecone-environment"

Ingest and Embed the Data:

    (This step is crucial and only needs to be done once). Run the data processing script to read the Srimad Bhagavatam text, create embeddings, and load them into your vector database.

    Note: You may need to create this script (ingest_data.py) or check the existing files for its functionality.

Bash

    python ingest_data.py

Running the Application

    Start the Flask server:
    Bash

flask run

or
Bash

    python app.py

    Open your browser and navigate to http://127.0.0.1:5000. You can now start chatting with the Srimad Bhagavatam!

🎯 Future Improvements

    [ ] Support for multiple languages, including Sanskrit and Odia.

    [ ] Implement user session history to remember conversation context.

    [ ] Add a voice-to-text and text-to-speech feature for accessibility.

    [ ] Deploy the application to a cloud service like Vercel, Heroku, or AWS.

    [ ] Add the ability to query specific Cantos or Chapters.

🙏 Acknowledgments

    To His Divine Grace A. C. Bhaktivedanta Swami Prabhupāda for his unparalleled translation and commentary on the Srimad Bhagavatam.

    To Srila Vyasadeva, the original author of the Puranas.

    To the teams at OpenAI, LangChain, and Pinecone for their incredible tools that make projects like this possible.

📄 License

This project is licensed under the MIT License. See the LICENSE file for more details.