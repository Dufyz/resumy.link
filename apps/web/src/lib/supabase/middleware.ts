import { getUserByEmail } from "@/queries/user-queries";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/admin", "/onboarding"];
const unprotectedRoutes = ["/login"];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const redirectTo = (pathname: string) => {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    return NextResponse.redirect(url);
  };

  if (
    !user &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  )
    return redirectTo("/login");

  if (!user) return supabaseResponse;

  if (
    unprotectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    )
  )
    return redirectTo("/admin");

  const responseOrError = await getUserByEmail(user.email as string);

  if (
    request.nextUrl.pathname.startsWith("/onboarding") &&
    responseOrError.isSuccess()
  )
    return redirectTo("/admin");

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    responseOrError.isFailure() &&
    responseOrError.value.status === 404
  )
    return redirectTo("/onboarding");

  return supabaseResponse;
}
