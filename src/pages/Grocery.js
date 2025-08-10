import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import { watchAuth } from "lib/firebase";
import GroceryList from "components/GroceryList";
import { Card, CardHeader, CardContent } from "components/ui/card";
import SectionTitle from "components/SectionTitle";
import { ShoppingCart } from "lucide-react";

export default function Grocery() {
  const [user, setUser] = useState(null);
  useEffect(()=> watchAuth(setUser), []);
  if (!user) return <div className="p-6">Loading…</div>;

  return (
    <Layout user={user}>
      <div className="py-6">
        <Card>
          <CardHeader>
            <SectionTitle icon={ShoppingCart} title="My Grocery List" desc="Add items manually or from your plan"/>
          </CardHeader>
          <CardContent>
            <GroceryList user={user} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
