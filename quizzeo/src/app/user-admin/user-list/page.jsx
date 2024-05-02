"use client";
import { useAuth } from "../../../lib/useAuth";
import { UserList } from "../../../components/pages/user-list";

export default function Page() {
    const { user, jwt } = useAuth("UserAdmin");

    return <UserList {...{user, jwt}} />
}
