import React from 'react';
import { Building2, Plus, ArrowRight } from 'lucide-react';

export const OrganizationPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Organization & Hierarchy</h1>
          <p className="text-muted-foreground mt-1">Structure offices, define nested departments, and manage structural units.</p>
        </div>
        <button className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg text-sm transition-all shadow-md flex items-center gap-2 self-start md:self-auto">
          <Plus className="h-4 w-4" /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border p-6 rounded-xl shadow-premium lg:col-span-2 space-y-6">
          <h3 className="font-bold text-lg">Department Hierarchy Tree</h3>
          <div className="space-y-2 text-sm">
            <div className="p-3 bg-secondary/50 rounded-lg flex justify-between items-center border border-border/50">
              <span className="font-semibold">Corporate Headquarters (HQ)</span>
              <span className="text-xs text-muted-foreground font-mono">CODE: HQ</span>
            </div>
            <div className="pl-6 border-l border-border space-y-2">
              <div className="p-3 bg-secondary/50 rounded-lg flex justify-between items-center border border-border/50">
                <span className="font-semibold">Engineering Department</span>
                <span className="text-xs text-muted-foreground font-mono">CODE: ENG</span>
              </div>
              <div className="p-3 bg-secondary/50 rounded-lg flex justify-between items-center border border-border/50">
                <span className="font-semibold">Marketing Department</span>
                <span className="text-xs text-muted-foreground font-mono">CODE: MKT</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border p-6 rounded-xl shadow-premium space-y-6">
          <h3 className="font-bold text-lg">Organization Profile</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Company Name</p>
              <p className="font-semibold mt-1">AssetFlow Solutions Corp</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Address</p>
              <p className="font-semibold mt-1">100 Tech Venture Pkwy, Suite 400</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Website</p>
              <p className="font-semibold mt-1 text-primary cursor-pointer hover:underline">https://assetflow.example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
