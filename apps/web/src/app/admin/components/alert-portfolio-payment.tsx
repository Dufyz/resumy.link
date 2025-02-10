import PaymentModal from "@/components/payment-modal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import usePortfolio from "@/hooks/usePortfolio";
import { IconTerminal } from "@tabler/icons-react";

export default function AlertPortfolioPayment() {
  const { portfolio } = usePortfolio();

  if (portfolio?.is_active) return null;

  return (
    <Alert
      className="flex items-start p-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-400"
      role="alert"
    >
      <div className="flex items-center gap-4 w-full justify-between">
        <div className="flex items-center gap-4">
          <IconTerminal className="flex-shrink-0 w-5 h-5 text-red-700" />
          <div>
            <AlertTitle className="font-semibold">Aviso!</AlertTitle>
            <AlertDescription>
              Esta página não está ativa pois é necessário comprar a licença.
            </AlertDescription>
          </div>
        </div>
        <div>
          <PaymentModal />
        </div>
      </div>
    </Alert>
  );
}
