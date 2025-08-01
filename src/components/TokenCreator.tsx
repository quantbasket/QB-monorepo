import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilePlus, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import TokenPreview from '@/components/TokenPreview';

export default function TokenCreator({ isDarkMode }: { isDarkMode: boolean }) {
  const [tokenName, setTokenName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState('');
  const [rewardLogic, setRewardLogic] = useState('fixed');
  const [logo, setLogo] = useState<File | null>(null);
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [mockAddress, setMockAddress] = useState('');

  const handleDeploy = () => {
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      setDeployed(true);
      setMockAddress('0x1234...ABCD');
      toast.success('Token deployed (mock)!');
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Form Card */}
      <Card className={`${isDarkMode ? 'bg-slate-800/70 border-slate-700/50' : 'bg-white/90 border-slate-200/70'} p-6 rounded-lg`}>
        <CardContent className="space-y-4">
          <h2 className={`text-lg font-semibold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <FilePlus className="w-5 h-5" /> Create Community Token
          </h2>
          <Input placeholder="Token Name" value={tokenName} onChange={e => setTokenName(e.target.value)} />
          <Input placeholder="Symbol" value={symbol} onChange={e => setSymbol(e.target.value)} />
          <Input placeholder="Total Supply" type="number" value={supply} onChange={e => setSupply(e.target.value)} />
          <Select value={rewardLogic} onValueChange={setRewardLogic}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fixed">Fixed</SelectItem>
              <SelectItem value="activity">Activity-based</SelectItem>
            </SelectContent>
          </Select>
          <input type="file" accept="image/*" onChange={e => setLogo(e.target.files?.[0] || null)} className="block w-full text-sm" />
          <Button className="w-full mt-2" disabled={deploying || deployed} onClick={handleDeploy}>
            {deploying ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : deployed ? <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> : null}
            {deploying ? 'Deploying...' : deployed ? 'Deployed' : 'Deploy Token'}
          </Button>
        </CardContent>
      </Card>
      {/* Preview Card */}
      <TokenPreview
        isDarkMode={isDarkMode}
        tokenName={tokenName}
        symbol={symbol}
        supply={supply}
        logo={logo}
        deployed={deployed}
        mockAddress={mockAddress}
        deploying={deploying}
      />
    </div>
  );
}
