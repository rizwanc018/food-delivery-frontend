import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { RestaurantFilters } from "@/types";

export function useURLFilters() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const filters = useMemo((): Partial<RestaurantFilters> => {
        const params = new URLSearchParams(searchParams);

        return {
            search: params.get("q") || "",
            cuisine: params.getAll("cuisine"),
            priceRange: params.getAll("priceRange"),
            location: params.getAll("location"),
            rating: params.get("rating") ? parseFloat(params.get("rating")!) : 0,
            isVeg: params.get("veg") === "true",
            sortBy: (params.get("sortBy") as RestaurantFilters["sortBy"]) || "rating",
            sortOrder: (params.get("sortOrder") as RestaurantFilters["sortOrder"]) || "desc",
            deliveryTime: params.get("deliveryTime") || "",
        };
    }, [searchParams]);

    const updateFilters = useCallback(
        (newFilters: Partial<RestaurantFilters>) => {
            const params = new URLSearchParams(searchParams);

            Object.entries(newFilters).forEach(([key, value]) => {
                params.delete(key);

                if (key === "search") {
                    if (value) params.set("q", value as string);
                } else if (key === "cuisine" || key === "priceRange" || key === "location") {
                    const paramKey = key;
                    (value as string[]).forEach((v) => {
                        if (v) params.append(paramKey, v);
                    });
                } else if (key === "isVeg") {
                    if (value === true) params.set("veg", "true");
                    else params.delete("veg");
                } else if (key === "rating") {
                    if (value && Number(value) > 0) params.set("rating", value.toString());
                } else if (value && value !== "" && value !== "desc") {
                    params.set(key, value.toString());
                }
            });

            const page = params.get("page");
            if (page && page !== "1") {
                params.delete("page");
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [searchParams, router, pathname]
    );

    // const updateFilters = useCallback((newFilters: Partial<RestaurantFilters>) => {
    //   console.log("🚀 ~ useURLFilters ~ newFilters🚀", newFilters)

    //   const params = new URLSearchParams(searchParams);

    //   Object.entries(newFilters).forEach(([key, value]) => {
    //     params.delete(key);

    //     if (key === 'search') {
    //       if (value) params.set('q', value as string);
    //     } else if (key === 'cuisine' || key === 'priceRange' || key === 'location') {
    //       const paramKey = key === 'priceRange' ? 'price' : key;
    //       (value as string[]).forEach(v => {
    //         if (v) params.append(paramKey, v);
    //       });
    //     } else if (key === 'isVeg') {
    //       if (value === true) params.set('veg', 'true');
    //     } else if (key === 'rating') {
    //       if (value && value > 0) params.set('rating', value.toString());
    //     } else if (value && value !== '' && value !== 'desc') {
    //       params.set(key, value.toString());
    //     }
    //   });

    //   const page = params.get('page');
    //   if (page && page !== '1') {
    //     params.delete('page');
    //   }

    //   router.push(`${pathname}?${params.toString()}`, { scroll: false });
    // }, [searchParams, router, pathname]);

    const clearFilters = useCallback(() => {
        router.push(pathname, { scroll: false });
    }, [router, pathname]);

    const updatePage = useCallback(
        (page: number) => {
            const params = new URLSearchParams(searchParams);
            if (page > 1) {
                params.set("page", page.toString());
            } else {
                params.delete("page");
            }
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [searchParams, router, pathname]
    );

    const currentPage = useMemo(() => {
        const page = searchParams.get("page");
        return page ? parseInt(page, 10) : 1;
    }, [searchParams]);

    return {
        filters,
        updateFilters,
        clearFilters,
        updatePage,
        currentPage,
    };
}
