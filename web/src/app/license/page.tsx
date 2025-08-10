"use client";

import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function LicensePage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();

  const renewMutation = useMutation({
    mutationFn: () => api.post('/license/renew-license'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'license'] });
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-bold">Você precisa estar logado para ver o status da licença.</h2>
      </div>
    );
  }

  const isLicenseValid =
    user?.licenseExpiresAt ? new Date(user.licenseExpiresAt) > new Date() : false;

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Status da sua Licença</CardTitle>
          <CardDescription>
            {isLicenseValid ? (
              <span className="text-green-500 font-bold">Ativa</span>
            ) : (
              <span className="text-red-500 font-bold">Expirada</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Válida até:{" "}
            <span className="font-bold">
              {user?.licenseExpiresAt
                ? format(new Date(user.licenseExpiresAt), "dd/MM/yyyy")
                : ""}
            </span>
          </p>
          <Button
            onClick={() => renewMutation.mutate()}
            disabled={renewMutation.isPending}
            className="w-full"
          >
            {renewMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Renovar Licença por 30 dias
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
