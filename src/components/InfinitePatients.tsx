import { DynamicMotion } from './DynamicMotion';

const PatientCard = ({ p }: { p: typeof patients[0] }) => (
  <DynamicMotion
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="group relative h-48 sm:h-56 lg:h-60 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-secondary shadow-sm md:shadow-premium border border-accent/5 transform-gpu"
  >
    <img 
       loading="lazy"
       decoding="async"
       src={p.img}
       alt={p.name}
       width="600"
       height="800"
       className="w-full h-full object-cover transition-transform duration-700 lg:group-hover:scale-110"
    />
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8">
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-accent/80 mb-1">{p.breed}</p>
      <h4 className="text-base md:text-lg font-black font-outfit text-white uppercase tracking-tighter leading-none">{p.name}</h4>
    </div>
  </DynamicMotion>
);

export const InfinitePatients = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [limit, setLimit] = useState(4);

  useEffect(() => {
    const updateLimit = () => {
      setLimit(window.innerWidth < 640 ? 2 : 4);
    };
    updateLimit();
    window.addEventListener('resize', updateLimit);
    return () => window.removeEventListener('resize', updateLimit);
  }, []);

  return (
    <section id="pacjenci" className="py-14 md:py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <Badge>Nasza Galeria</Badge>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-outfit font-black mb-8 md:mb-12 tracking-tighter uppercase leading-none">
          Nasi <span className="text-accent italic">Pacjenci</span>.
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {patients.slice(0, limit).map((p) => (
             <PatientCard key={p.id} p={p} />
          ))}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mt-3 md:mt-5">
                {patients.slice(limit).map((p) => (
                  <PatientCard key={p.id} p={p} />
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>
        
        <div className="mt-10 md:mt-14 flex justify-center relative z-10">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-3 w-full sm:w-auto bg-accent hover:bg-accent/90 text-white px-10 py-4 min-h-[56px] rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all shadow-[0_10px_30px_rgba(254,69,32,0.3)] hover:shadow-[0_15px_40px_rgba(254,69,32,0.4)] group active:scale-[0.97] border border-accent/20 touch-manipulation cursor-pointer select-none"
          >
            {isExpanded ? 'Zwiń galerię' : 'Rozwiń galerię'}
            {isExpanded 
              ? <ChevronUp className="group-hover:-translate-y-1 transition-transform pointer-events-none" size={18} />
              : <ChevronDown className="group-hover:translate-y-1 transition-transform pointer-events-none" size={18} />
            }
          </button>
        </m.div>
      </div>
      
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
    </section>
  );
};
