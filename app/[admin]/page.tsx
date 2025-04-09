import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation";

export default async function Admin() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect('/');
    }

    return (
        <h1>Admin - {typeof currentUser === "string" ? currentUser : "Unknown User"}</h1>
    );
}