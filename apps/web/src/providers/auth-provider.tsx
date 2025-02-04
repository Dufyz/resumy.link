"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { createClient, Session } from "@supabase/supabase-js";
import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
} from "@/config";
import { getUserByEmail } from "@/queries/user-queries";
import { useUserStore } from "@/stores/user-store";
import { getPortfoliosByUserId } from "@/queries/portfolio-queries";
import { usePortfolioStore } from "@/stores/portfolio-store";
import { getPortfolioSectionsByPortfolioId } from "@/queries/portfolio-section-queries";
import { getPortfolioSectionItemsByPortfolioId } from "@/queries/portfolio-section-item-queries";

const AuthContext = createContext(null);

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export function AuthProvider({
  session,
  children,
}: {
  session: Session | null;
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const setUser = useUserStore((state) => state.setUser);
  const setPortfolio = usePortfolioStore((state) => state.setPortfolio);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (!session) return;

      if (event === "INITIAL_SESSION") {
        try {
          setIsLoading(false);

          const {
            user: { email },
          } = session;

          if (!email) return;

          const { user } = await getUserByEmail(email);
          setUser(user);

          const { portfolio } = await getPortfoliosByUserId(user.id);

          const [{ portfolio_sections }, { portfolio_section_items }] =
            await Promise.all([
              getPortfolioSectionsByPortfolioId(portfolio.id),
              getPortfolioSectionItemsByPortfolioId(portfolio.id),
            ]);

          portfolio.portfolio_sections = portfolio_sections;
          portfolio.portfolio_section_items = portfolio_section_items;

          setPortfolio(portfolio);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [session, setPortfolio, setUser]);

  if (isLoading)
    return (
      <AuthContext.Provider value={{}}>
        <p>Carregando...</p>
      </AuthContext.Provider>
    );

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
