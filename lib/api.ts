export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface ChatResponse {
  message: ChatMessage;
}

export interface MemoryItem {
  id: string;
  title: string;
  summary?: string;
  createdAt: string;
}

function getApiBase() {
  return process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:5050";
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `Request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  const base = getApiBase();
  const response = await fetch(`${base}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  return handleResponse<ChatResponse>(response);
}

export async function fetchMemories(): Promise<MemoryItem[]> {
  const base = getApiBase();
  const response = await fetch(`${base}/memories`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  });

  if (response.status === 404) {
    return [];
  }

  return handleResponse<MemoryItem[]>(response);
}
