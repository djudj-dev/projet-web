"use client";
import { useAuth } from "../../../lib/useAuth";
import { LogList } from "../../../components/pages/log-list";

export default function Page() {
    const { jwt } = useAuth("GlobalAdmin");

    return <LogList jwt={jwt} />;
}
