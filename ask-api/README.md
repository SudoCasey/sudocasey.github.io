# Ask API (Docker)

Standalone backend for the AI "Ask about Casey" form. Calls Gemini and returns markdown. Use this when the main site is served elsewhere (e.g. GitHub Pages) and you run the API in a Docker container.

## Build and run

1. **Build the image** (from repo root or from `ask-api/`):

   ```bash
   docker build -t ask-api ./ask-api
   ```

2. **Run the container** with your Gemini API key and port mapping:

   ```bash
   docker run -d --name ask-api -p 3001:3000 -e GEMINI_API_KEY=your_key_here ask-api
   ```

   Replace `your_key_here` with your key from [Google AI Studio](https://aistudio.google.com/). The API listens on port **3000** inside the container; `-p 3001:3000` maps host port 3001 to the container.

3. **Point the frontend** at this API. When building or serving the Next.js site, set:

   ```bash
   NEXT_PUBLIC_ASK_API_URL=http://172.17.48.1:3001/api/ask
   ```

   Use the host port you chose (e.g. `3001`) and the IP where the host is reachable from the browser (e.g. `172.17.48.1`). The path must be `/api/ask` to match the form.

## Optional: `.env` for Docker

Create `ask-api/.env` (do not commit) with:

```
GEMINI_API_KEY=your_key_here
```

Then run with `--env-file`:

```bash
docker run -d --name ask-api -p 3001:3000 --env-file ask-api/.env ask-api
```

## Health

- **POST** `/api/ask` with JSON `{ "question": "Who is Casey?" }` returns `{ "answer": "..." }`.
- Other methods or paths respond with 404.
