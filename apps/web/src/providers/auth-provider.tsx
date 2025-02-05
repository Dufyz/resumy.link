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
import { getPortfoliosByUserId } from "@/queries/portfolio-queries";
import { getPortfolioSectionsByPortfolioId } from "@/queries/portfolio-section-queries";
import { getPortfolioSectionItemsByPortfolioId } from "@/queries/portfolio-section-item-queries";
import SplashScreen from "@/app/admin/components/splash-screen";
import useUser from "@/hooks/useUser";
import usePortfolio from "@/hooks/usePortfolio";

const AuthContext = createContext<{
  isLoading: boolean;
} | null>(null);

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

  const { setUser } = useUser();
  const { setPortfolio } = usePortfolio();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (!session) return;

      if (event === "INITIAL_SESSION") {
        try {
          setIsLoading(true);

          const {
            user: { email },
          } = session;

          if (!email) return;

          const userResponseOrError = await getUserByEmail(email);
          if (userResponseOrError.isFailure()) return;

          const { user } = userResponseOrError.value;
          setUser(user);

          const portfolioResponseOrError = await getPortfoliosByUserId(user.id);
          if (portfolioResponseOrError.isFailure()) return;

          const { portfolio } = portfolioResponseOrError.value;
          setPortfolio(portfolio);

          const [portfolioSectionsOrError, portfolioSectionItemsOrError] =
            await Promise.all([
              getPortfolioSectionsByPortfolioId(portfolio.id),
              getPortfolioSectionItemsByPortfolioId(portfolio.id),
            ]);

          if (portfolioSectionsOrError.isFailure()) return;
          if (portfolioSectionItemsOrError.isFailure()) return;

          const { portfolio_sections } = portfolioSectionsOrError.value;
          const { portfolio_section_items } =
            portfolioSectionItemsOrError.value;

          portfolio.portfolio_sections = portfolio_sections;
          portfolio.portfolio_section_items = portfolio_section_items;
        } catch (error) {
          console.error(error);
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 750);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [session, setPortfolio, setUser]);

  const value = {
    isLoading,
  };

  if (isLoading)
    return (
      <AuthContext.Provider value={value}>
        <SplashScreen />
      </AuthContext.Provider>
    );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
