"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Script from "next/script";
import { OnlineStatusProvider } from "./api/useCheakOnlineOffline";

const GOOGLE_MAPS_API_KEY = "AIzaSyAMZ4GbRFYSevy7tMaiH5s0JmMBBXc0qBA"; // Replace with your API key

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <Script
        id="google-maps-script"
        strategy="lazyOnload"
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`}
      />

      {/*  live  */}
      <GoogleOAuthProvider clientId="434256650617-qko9mmr93lga9q3j71g54hf95g8m1o86.apps.googleusercontent.com">
      {/*  local */}
        {/* <GoogleOAuthProvider clientId="434256650617-vvkln803c8eaebca2e31jp2mtq54pav0.apps.googleusercontent.com"> */}
        <QueryClientProvider client={queryClient}>
          <OnlineStatusProvider>
            <Provider store={store}>{children}</Provider>
          </OnlineStatusProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </>
  );
};

export default StoreProvider;
