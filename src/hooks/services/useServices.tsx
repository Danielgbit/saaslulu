"use client";

import { useEffect, useState } from "react";
import { getAllServices } from "@/services/services/services.service";
import { Service } from "@/types/services";

export const useServices = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllServices().then((res: Service[]) => {
            setServices(res || []);
            setLoading(false);
        });
    }, []);

    return { services, loading };
};
