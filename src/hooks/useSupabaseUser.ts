import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UserData {
  email: string;
  continent?: string;
}

export const useSupabaseUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectContinent = (): string => {
    // Simple continent detection based on timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    if (timezone.includes("Africa")) return "Africa";
    if (timezone.includes("Europe")) return "Europe";
    if (timezone.includes("America")) return "Americas";
    if (timezone.includes("Asia")) return "Asia";
    if (timezone.includes("Australia") || timezone.includes("Pacific")) return "Oceania";
    
    return "Unknown";
  };

  const saveUser = async (userData: UserData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const continent = userData.continent || detectContinent();

      const { error: insertError } = await supabase.from("users").insert({
        email: userData.email,
        continent,
      });

      if (insertError) {
        // Check if it's a duplicate email error
        if (insertError.code === "23505") {
          // User already exists, that's fine
          console.log("User already exists:", userData.email);
          return true;
        }
        throw insertError;
      }

      console.log("User saved:", userData.email, continent);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur de sauvegarde";
      setError(message);
      console.error("Save user error:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveUser,
    isLoading,
    error,
    detectContinent,
  };
};
