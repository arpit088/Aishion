import { beforeEach, describe, expect, it, vi } from "vitest";

import { fetchMemories, sendChatMessage } from "@/lib/api";

declare global {
  // eslint-disable-next-line no-var
  var fetch: typeof fetch;
}

const mockFetch = vi.fn();

global.fetch = mockFetch as unknown as typeof fetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe("sendChatMessage", () => {
  it("returns parsed response when request succeeds", async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ message: { id: "1", role: "assistant", content: "hi", createdAt: "2024-01-01" } }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      })
    );

    const result = await sendChatMessage("hello");
    expect(result.message.content).toBe("hi");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/chat$/),
      expect.objectContaining({ method: "POST" })
    );
  });

  it("throws when response fails", async () => {
    mockFetch.mockResolvedValueOnce(
      new Response("bad", {
        status: 500,
        headers: { "Content-Type": "text/plain" }
      })
    );

    await expect(sendChatMessage("hello")).rejects.toThrow("bad");
  });
});

describe("fetchMemories", () => {
  it("returns empty array on 404", async () => {
    mockFetch.mockResolvedValueOnce(new Response(undefined, { status: 404 }));
    await expect(fetchMemories()).resolves.toEqual([]);
  });

  it("returns parsed memories", async () => {
    const payload = [
      { id: "1", title: "Memory 1", summary: "A", createdAt: "2024-01-01" }
    ];
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify(payload), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      })
    );

    const result = await fetchMemories();
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Memory 1");
  });
});
