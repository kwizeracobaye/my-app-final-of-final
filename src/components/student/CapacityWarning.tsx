import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  message: string;
}

export function CapacityWarning({ message }: Props) {
  return (
    <div className="flex items-center p-3 bg-yellow-50 rounded-md text-yellow-800">
      <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
      {message}
    </div>
  );
}