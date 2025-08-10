import React from "react";
import { Leaf, Home, ChefHat, ListChecks, History as HistoryIcon, User } from "lucide-react";
import { Avatar, AvatarFallback } from "components/ui/avatar";
import { Button } from "components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Input } from "components/ui/input";
import { Badge } from "components/ui/badge";

function TopNavButton({ to, icon: Icon, label, active }) {
  return (
    <Link to={to}>
      <Button variant={active ? "default" : "ghost"} className={active ? "" : "text-neutral-600"}>
        <Icon className="h-4 w-4 mr-2"/>{label}
      </Button>
    </Link>
  );
}
function BottomTab({ to, icon: Icon, label, active }) {
  return (
    <Link to={to} className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl ${active? 'text-emerald-700' : 'text-neutral-500'}`} aria-current={active? 'page':'false'}>
      <Icon className="h-5 w-5"/>
      <span className="text-[11px] mt-1">{label}</span>
    </Link>
  );
}

export default function Layout({ user, children }) {
  const loc = useLocation();
  const is = (p) => loc.pathname === p;

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-emerald-50 to-white">
      <div className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-500 to-lime-500 grid place-items-center text-white"><Leaf className="h-5 w-5"/></div>
            <div className="font-semibold tracking-tight">Nourishfy</div>
            <Badge variant="secondary" className="ml-2 hidden md:inline-flex">Personalized Nutrition</Badge>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <TopNavButton to="/" icon={Home} label="Dashboard" active={is("/")} />
            <TopNavButton to="/plan" icon={ChefHat} label="Plan" active={is("/plan")} />
            <TopNavButton to="/grocery" icon={ListChecks} label="Grocery" active={is("/grocery")} />
            <TopNavButton to="/history" icon={HistoryIcon} label="History" active={is("/history")} />
            <TopNavButton to="/profile" icon={User} label="Profile" active={is("/profile")} />
          </div>
          <div className="flex items-center gap-3">
            <Input className="hidden md:block w-64" placeholder="Search foods, plans…" />
            <Avatar className="h-9 w-9"><AvatarFallback>{(user?.email?.[0] || 'U').toUpperCase()}</AvatarFallback></Avatar>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 pb-24 md:pb-12">{children}</main>

      <nav className="md:hidden fixed bottom-3 left-0 right-0 z-50">
        <div className="mx-auto max-w-md rounded-2xl shadow-lg border bg-white/90 backdrop-blur px-3 py-2 flex items-center justify-around">
          <BottomTab to="/" icon={Home} label="Home" active={is("/")} />
          <BottomTab to="/plan" icon={ChefHat} label="Plan" active={is("/plan")} />
          <BottomTab to="/grocery" icon={ListChecks} label="List" active={is("/grocery")} />
          <BottomTab to="/history" icon={HistoryIcon} label="History" active={is("/history")} />
          <BottomTab to="/profile" icon={User} label="Profile" active={is("/profile")} />
        </div>
      </nav>
    </div>
  );
}
