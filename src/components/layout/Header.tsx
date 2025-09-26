import React from "react";
import Link from "next/link";
import { Utensils } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                        <Utensils className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">FoodieHub</h1>
                        <p className="text-xs text-muted-foreground">Delicious food delivered</p>
                    </div>
                </Link>
            </div>
        </header>
    );
}
