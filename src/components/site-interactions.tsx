"use client";
import { useEffect } from "react";
import { initializeSite } from "@/legacy-interactions";
export default function SiteInteractions() { useEffect(() => { initializeSite(); }, []); return null; }
