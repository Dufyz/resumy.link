"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import useUser from "@/hooks/useUser";
import { useRouter, useSearchParams } from "next/navigation";

export default function AccountPage() {
  const { user, setUser, updateUser, purchasePlan } = useUser();
  const [name, setName] = useState(user?.name);
  const [avatar, setAvatar] = useState(user?.avatar);
  const [planType, setPlanType] = useState(user?.plan_type);
  const [portfolioCount, setPortfolioCount] = useState(
    user?.portfolio_count || 1
  );
  const router = useRouter();

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(tab || "profile");

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  const handleSave = () => {
    updateUser({ name, avatar });
  };

  const handlePurchase = () => {
    purchasePlan(planType, portfolioCount);
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    router.push(`/admin/account?tab=${value}`, undefined, { shallow: true });
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Minha Conta</h1>
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="plans">Planos e Portfolios</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardContent className="p-6 flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <Avatar className="cursor-pointer relative group">
                  <AvatarImage
                    src={avatar}
                    alt="Avatar"
                    onClick={() =>
                      document.getElementById("avatarUpload").click()
                    }
                  />
                  <AvatarFallback
                    onClick={() =>
                      document.getElementById("avatarUpload").click()
                    }
                  >
                    U
                  </AvatarFallback>
                  {avatar && (
                    <Button
                      onClick={handleRemoveAvatar}
                      variant="destructive"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      X
                    </Button>
                  )}
                </Avatar>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  id="avatarUpload"
                />
              </div>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                className="w-full"
              />
              <Input
                type="email"
                value={user.email}
                disabled
                placeholder="Email"
                className="w-full"
              />
              <Button onClick={handleSave} className="self-end">
                Salvar
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
          <Card>
            <CardContent className="p-6 flex flex-col gap-6">
              {user.plan_type === "lifetime" ? (
                <p className="text-green-600 font-semibold">
                  Você tem acesso a tudo! 🚀
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  <p className="text-yellow-600">
                    Seu plano é <strong>Standard</strong>. Você possui{" "}
                    {user.portfolio_count} portfólios.
                  </p>
                  <p className="text-gray-600">
                    Benefícios de comprar mais portfólios:
                    <ul className="list-disc list-inside">
                      <li>Acesso a mais recursos</li>
                      <li>Maior visibilidade</li>
                      <li>Suporte prioritário</li>
                    </ul>
                  </p>
                  <Select value={planType} onValueChange={setPlanType}>
                    <SelectContent>
                      <SelectItem value="lifetime">
                        Mudar para Lifetime
                      </SelectItem>
                      <SelectItem value="standard">
                        Continuar Standard
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={portfolioCount}
                    onValueChange={(value) => setPortfolioCount(Number(value))}
                  >
                    <SelectContent>
                      <SelectItem value={1}>
                        Comprar 1 Portfolio - $10
                      </SelectItem>
                      <SelectItem value={2}>
                        Comprar 2 Portfolios - $18
                      </SelectItem>
                      <SelectItem value={3}>
                        Comprar 3 Portfolios - $25
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handlePurchase} className="self-end">
                    Confirmar Compra
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
