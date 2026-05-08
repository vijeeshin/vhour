import { authentication, createDirectus, rest } from "@directus/sdk";
import { isTokenValid } from "@/shared/utils/tokenValidator";

const directus = createDirectus(import.meta.env.VITE_BACKEND_URL)
  .with(authentication("cookie", { autoRefresh: false }))
  .with(rest({ credentials: "include" }));

const storedToken = localStorage.getItem("access_token");
if (storedToken) {
  if (isTokenValid(storedToken)) {
    directus.setToken(storedToken);
  } else {
    // Stale token — remove it so login screen is shown
    localStorage.removeItem("access_token");
  }
}

export default directus;
