import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Coins, Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function TokenPreview({
  isDarkMode,
  tokenName,
  symbol,
  supply,
  logo,
  deployed,
  mockAddress,
  deploying
}: {
  isDarkMode: boolean;
  tokenName: string;
  symbol: string;
  supply: string;
  logo: File | null;
  deployed: boolean;
  mockAddress: string;
  deploying: boolean;
}) {
  return (
    <Card className={`${isDarkMode ? 'bg-slate-800/70 border-slate-700/50' : 'bg-white/90 border-slate-200/70'} p-6 rounded-lg flex flex-col items-center justify-center`}>
      <CardContent className="flex flex-col items-center gap-4 w-full">
        <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
          {logo ? (
            <img src={URL.createObjectURL(logo)} alt="Logo" className="object-cover w-full h-full" />
          ) : (
            <Coins className="w-10 h-10 text-slate-400" />
          )}
        </div>
        <div className="text-center">
          <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{tokenName || 'Token Name'}</div>
          <div className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{symbol || 'SYM'}</div>
          <div className={`text-sm mt-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Supply: {supply || '0'}</div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          {deploying ? (
            <Loader2 className="animate-spin w-4 h-4 text-blue-500" />
          ) : deployed ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <XCircle className="w-4 h-4 text-slate-400" />
          )}
          <span className={`text-xs font-semibold ${deployed ? 'text-green-500' : 'text-slate-400'}`}>{deployed ? 'Deployed' : 'Not Deployed'}</span>
        </div>
        <div className="text-xs mt-2 break-all">
          <span className="font-mono">{mockAddress || '0x0000...0000'}</span>
        </div>
      </CardContent>
    </Card>
  );
}
