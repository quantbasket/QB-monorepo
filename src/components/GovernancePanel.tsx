import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import ProposalCard from '@/components/ProposalCard';
import { FilePlus } from 'lucide-react';

const dummyProposals = [
  {
    id: 1,
    title: 'Increase Community Rewards',
    description: 'Proposal to increase rewards for active members.',
    status: 'Open',
    created: '2025-07-30',
    yes: 68,
    no: 32
  },
  {
    id: 2,
    title: 'Add New Token Utility',
    description: 'Proposal to add new utility for the token.',
    status: 'Closed',
    created: '2025-07-25',
    yes: 55,
    no: 45
  }
];

export default function GovernancePanel({ isDarkMode }: { isDarkMode: boolean }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [proposals, setProposals] = useState(dummyProposals);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    const newProposal = {
      id: proposals.length + 1,
      title,
      description: desc,
      status: 'Open',
      created: new Date().toISOString().slice(0, 10),
      yes: 0,
      no: 0
    };
    setProposals([newProposal, ...proposals]);
    setTitle('');
    setDesc('');
    toast.success('Proposal submitted!');
  };

  return (
    <div className="space-y-8">
      {/* Create Proposal */}
      <Card className={`${isDarkMode ? 'bg-slate-800/70 border-slate-700/50' : 'bg-white/90 border-slate-200/70'} p-6 rounded-lg`}>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className={`text-lg font-semibold flex items-center gap-2 mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <FilePlus className="w-5 h-5" /> Create Proposal
            </h2>
            <Input placeholder="Proposal Title" value={title} onChange={e => setTitle(e.target.value)} />
            <Textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
            <Button type="submit" className="w-full">Submit Proposal</Button>
          </form>
        </CardContent>
      </Card>
      {/* Proposal List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {proposals.map(p => (
          <ProposalCard key={p.id} proposal={p} isDarkMode={isDarkMode} />
        ))}
      </div>
    </div>
  );
}
