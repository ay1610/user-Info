export async function fetchUsers({ limit, skip }: { limit: number; skip: number }) {
    const res = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
    if (!res.ok) {
        throw new Error(`Http error: ${res.status}`);
        
    }
    return res.json();
}