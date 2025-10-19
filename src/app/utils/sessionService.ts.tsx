// utils/sessionService.ts

const SESSION_KEYS = {
  RECENT_LOCATION: "recentLocation",
};

export const sessionService = {
  getRecentLocation: (): string | null => {
    return sessionStorage.getItem(SESSION_KEYS.RECENT_LOCATION);
  },

  setRecentLocation: (value: string) => {
    sessionStorage.setItem(SESSION_KEYS.RECENT_LOCATION, value);

    // Dispatch a custom event so other files can listen for updates
    window.dispatchEvent(
      new CustomEvent("sessionLocationUpdated", { detail: value })
    );
  },

  clearRecentLocation: () => {
    sessionStorage.removeItem(SESSION_KEYS.RECENT_LOCATION);
  },
};
