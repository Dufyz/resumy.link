export type User = {
  id: number;
  name: string;
  email: string;
  portfolio_limit: number;
  plan_type: UserPlanType;
  created_at: Date;
  updated_at: Date;
};

export type UserPlanType = "free" | "standard" | "lifetime";
