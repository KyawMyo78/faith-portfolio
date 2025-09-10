"use client";

import React, { useState } from 'react';
import IconPicker from './IconPicker';

export default function IconPickerModal({ value, onChange }: { value?: string; onChange: (key: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)} className="px-3 py-1 border rounded bg-white hover:bg-gray-50">Add / Change Icon</button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative bg-white w-11/12 max-w-3xl rounded-lg p-4 shadow-lg z-10">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Choose an Icon</h3>
              <button onClick={() => setOpen(false)} className="text-sm text-gray-600">Close</button>
            </div>
            <IconPicker value={value} onChange={(k) => { onChange(k); setOpen(false); }} />
          </div>
        </div>
      )}
    </div>
  );
}
