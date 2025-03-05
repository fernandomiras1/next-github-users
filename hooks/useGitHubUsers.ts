import { useState, useCallback, useRef, useEffect } from "react";
import { useStore } from "../store/store";

const BASE_URL = "https://api.github.com";

const useGitHubUsers = () => {
  const { users, setUsers } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchUsers = useCallback(
    async (searchTerm = "") => {
      if (!searchTerm && users.length > 0) return;

      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const endpoint = searchTerm
          ? `${BASE_URL}/search/users?q=${encodeURIComponent(searchTerm)}`
          : `${BASE_URL}/users`;

        const response = await fetch(endpoint, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(searchTerm ? data.items : data);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    [users, setUsers]
  );

  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  return { users, loading, error, fetchUsers };
};

export default useGitHubUsers;
