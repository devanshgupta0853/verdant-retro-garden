import { useState, useEffect } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu, X, Sprout, Bell, LayoutGrid, ScanLine, Leaf, History, NotebookPen, Radio, BookOpen, ArrowUpRight, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const items = [
  { to: '/', title: 'Garden overview', icon: LayoutGrid },
  { to: '/plants', title: 'My plants & profiles', icon: Leaf },
  { to: '/scan', title: 'AI leaf screening', icon: ScanLine },
  { to: '/history', title: 'Sensor trends & history', icon: History },
  { to: '/journal', title: 'Care journal', icon: NotebookPen },
  { to: '/guide', title: 'Plant care guidance', icon: BookOpen },
  { to: '/sensors', title: 'Sensors & calibration', icon: Radio },
] as const;
const bottomItems = [items[0], { to: '/plants', title: 'My plants', icon: Leaf }, { to: '/scan', title: 'Leaf scan', icon: ScanLine }, { to: '/history', title: 'History', icon: History }] as const;
export function AppShell({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [alerts, setAlerts] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { if (!menu) return; const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false); }; document.addEventListener('keydown', onKey); const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = previous; }; }, [menu]);
  return <>
    <header className="app-header"><div className="header-inner">
      <Button variant="ghost" size="icon" aria-label="Open feature menu" aria-expanded={menu} onClick={() => setMenu(true)}><Menu className="size-5" /></Button>
      <Link to="/" className="flex items-center gap-3 no-underline text-foreground"><span className="brand-mark"><Sprout size={23} /></span><div><div className="brand-name">Smart Plant Doctor<span className="text-primary">.</span></div><div className="brand-tagline">LITTLE LEAVES. BIG LOVE.</div></div></Link>
      <span className="small-badge header-status ml-auto"><FlaskConical size={12} /> Demo garden</span>
      <Button variant="ghost" size="icon" className="ml-auto sm:ml-0 relative" aria-label="Care alerts" onClick={() => setAlerts(true)}><Bell size={20} /><span className="status-dot absolute right-2 top-1.5" /></Button>
    </div></header>
    <main className="main-content">{children}</main>
    <nav className="bottom-nav" aria-label="Main navigation"><div className="bottom-nav-inner">{bottomItems.map(item => <Link key={item.to} to={item.to} className={`nav-item ${pathname === item.to ? 'active' : ''}`}><item.icon /><span>{item.title}</span></Link>)}</div></nav>
    {menu && <><div className="menu-backdrop" onClick={() => setMenu(false)} /><aside className="menu-panel" role="dialog" aria-modal="true" aria-label="App features"><div className="flex items-center justify-between mb-8"><div className="pixel-title text-3xl">Your green toolkit</div><Button variant="ghost" size="icon" autoFocus aria-label="Close feature menu" onClick={() => setMenu(false)}><X /></Button></div><div className="eyebrow mb-3">Explore your garden</div><nav>{items.map(item => <Link key={item.to} to={item.to} onClick={() => setMenu(false)} className={`menu-link ${pathname === item.to ? 'active' : ''}`}><item.icon /><span className="flex-1">{item.title}</span><ArrowUpRight size={14} /></Link>)}</nav><div className="mt-auto pt-8"><div className="small-badge"><FlaskConical size={12} /> Interactive UI demo</div><p className="subtext mt-3">Sensors are not connected. New plants and notes stay in this session.</p><div className="pixel-title text-xl text-primary mt-5">Grow a little, every day.</div></div></aside></>}
    <Dialog open={alerts} onOpenChange={setAlerts}><DialogContent><DialogTitle className="pixel-title text-3xl">Garden alerts</DialogTitle><DialogDescription>Connection and care updates for your plants.</DialogDescription><div className="care-banner"><Radio className="size-5 shrink-0 text-sunshine-foreground" /><div><h3>Your sensor station is not connected</h3><p>The garden currently shows sample readings. Connect and calibrate your ESP32 before using readings for care decisions.</p></div></div><Button variant="pixelOutline" asChild onClick={() => setAlerts(false)}><Link to="/sensors">View sensor station <ArrowUpRight /></Link></Button></DialogContent></Dialog>
  </>;
}