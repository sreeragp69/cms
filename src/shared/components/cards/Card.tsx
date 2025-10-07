export interface BalanceCard {
  balance: number;
  cardNumber: string;
  validThru: string;
  cardHolder: string;
}

interface BalanceCardProps {
  data: BalanceCard;
}



export default function Card({ data }: BalanceCardProps) {
  const { balance, cardNumber, validThru, cardHolder } = data;

  return (
    <div className="relative w-full h-44 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-700 rounded-3xl p-6 shadow-xl overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-white/70 text-sm mb-1">Balance</p>
            <p className="text-white text-2xl font-bold">
              $ {balance.toLocaleString()}
            </p>
          </div>
          <div className="text-white/90 text-sm font-semibold bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm">
            CARD {cardNumber.slice(-2)}
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-0.5">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="w-1 h-1 bg-white/60 rounded-full"></div>
                  ))}
                </div>
              ))}
            </div>
            <span className="text-white/90 text-sm font-medium ml-2">
              {cardNumber.slice(-4)}
            </span>
          </div>

          <div className="flex gap-6 text-white/90 text-xs">
            <div>
              <p className="text-white/60 text-[10px] uppercase mb-1">Valid Thru</p>
              <p className="font-medium">{validThru}</p>
            </div>
            <div>
              <p className="text-white/60 text-[10px] uppercase mb-1">Card Holder</p>
              <p className="font-medium">{cardHolder}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
