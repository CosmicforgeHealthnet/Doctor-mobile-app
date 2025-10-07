import { storage } from "@/core/storage";
import { useEffect, useState } from "react";

export const useAuth = () => {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

   useEffect(() => {
      let mounted = true;

      (async () => {
         const userData = await storage.getUserData();
         const accessToken = await storage.getToken();
         if (mounted) setIsAuthenticated(Boolean(userData && accessToken));
      })();

      return () => {
         mounted = false;
      };
   }, []);

   return { isAuthenticated };
};
