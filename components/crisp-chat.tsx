"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web"

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("5f4ecc58-0ded-433f-bb84-599add3fc456");
    }, []);

    return null;
}