import { createContext, useContext, useState, useEffect } from "react";
import { fetchMetadata } from "./fetchMetadata";

const MetadataContext = createContext<any>(null);

export function MetadataProvider({ children }: { children: React.ReactNode }) {
  const [metadata, setMetadata] = useState({});

  useEffect(() => {
    async function loadMetadata() {
      const data = await fetchMetadata("https://example.com");
      setMetadata(data);
    }
    loadMetadata();
  }, []);

  return <MetadataContext.Provider value={metadata}>{children}</MetadataContext.Provider>;
}

export function useMetadata() {
  return useContext(MetadataContext);
}
