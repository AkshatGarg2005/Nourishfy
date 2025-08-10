import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "components/ui/card";
import { Button } from "components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function FoodCard({ food, imageUrl, emoji, onAdd }) {
  const showEmoji = !!emoji && !imageUrl;
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        {showEmoji ? (
          <div className="text-5xl leading-none">{emoji}</div>
        ) : imageUrl ? (
          <img src={imageUrl} alt={food.name} className="w-full h-32 object-cover rounded-lg mb-2" />
        ) : (
          <div className="w-full h-32 rounded-lg border border-dashed grid place-items-center text-neutral-400 dark:text-neutral-500 dark:border-neutral-700 text-sm mb-2">
            Finding image…
          </div>
        )}
        <CardTitle className="mt-1 text-lg capitalize">{food.name}</CardTitle>
        <CardDescription className="text-sm">{food.why}</CardDescription>
      </CardHeader>
      <CardContent>
        {onAdd && (
          <Button variant="secondary" className="w-full" onClick={onAdd}>
            <ShoppingCart className="mr-2 h-4 w-4"/> Add to list
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
