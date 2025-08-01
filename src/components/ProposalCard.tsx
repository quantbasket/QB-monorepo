import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

export default function ProposalCard({ proposal, isDarkMode }: { proposal: any; isDarkMode: boolean }) {
  return (
    <Card className={`${isDarkMode ? 'bg-slate-800/70 border-slate-700/50' : 'bg-white/90 border-slate-200/70'} p-6 rounded-lg`}>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-lg flex items-center gap-2">
            {proposal.status === 'Open' ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-slate-400" />
            )}
            <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{proposal.title}</span>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${proposal.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'} ${isDarkMode ? 'bg-green-900/30 text-green-300' : ''}`}>{proposal.status}</span>
        </div>
        <div className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{proposal.description}</div>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-xs">Created: {proposal.created}</span>
          <span className="text-xs">Yes: {proposal.yes}%</span>
          <span className="text-xs">No: {proposal.no}%</span>
        </div>
      </CardContent>
    </Card>
  );
}
