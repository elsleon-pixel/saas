
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTenancy } from '../context/TenancyContext';
import { Button, EditableBlueprintField } from '../components/UI';
import { getMajorTournamentDetails } from '../utils/poker';

const Home = () => {
  const { userData, isSuperAdmin } = useAuth();
  const { currentClub, isEditMode, setIsEditMode } = useTenancy();
  const major = getMajorTournamentDetails();

  return (
    <div className="min-h-screen bg-poker-black text-white font-sans">
      <header className="bg-green-900 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase italic mb-8">
            <EditableBlueprintField 
              isEditMode={isEditMode} 
              value={currentClub?.heroTitle || "Texas Hold-em Tournaments"} 
              onChange={() => {}} 
              maxValue={80} 
            />
          </h1>
          {isSuperAdmin && (
            <Button variant="outline" onClick={() => setIsEditMode(!isEditMode)}>
              {isEditMode ? "Save Changes" : "Edit Blueprint"}
            </Button>
          )}
          <div className="mt-12 p-8 bg-black/60 rounded-2xl border border-yellow-500/30 backdrop-blur-xl max-w-lg mx-auto">
             <div className="text-[10px] text-yellow-500 font-black uppercase tracking-[0.3em] mb-4">Upcoming Mission</div>
             <div className="text-3xl font-bold font-serif">{major.label}</div>
             <div className="mt-4 text-gray-400 text-sm italic">Points race in progress for qualified members.</div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-20">
         <h2 className="text-2xl font-bold uppercase italic border-l-4 border-yellow-500 pl-4 mb-10">Latest Intel</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-900/60 rounded-2xl border border-white/5 text-center text-gray-500 italic">
               Archiving transmissions... Latest news will appear here.
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
