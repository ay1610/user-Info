

import type { User } from "../types/user";

interface UserTableProps {
    users: User[];
    isLoading: boolean;
    error?: { message: string };
}

export const UserTable = ({ users, isLoading, error }: UserTableProps) => {
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    console.log(users);
    return (
        <>
            {users.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-400 rounded-lg shadow-lg bg-white dark:bg-gray-900">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-700 to-blue-500 text-white text-base">
                                <th className="px-6 py-3 border-b border-gray-500 text-left font-bold">First Name</th>
                                <th className="px-6 py-3 border-b border-gray-500 text-left font-bold">Last Name</th>
                                <th className="px-6 py-3 border-b border-gray-500 text-left font-bold">Age</th>
                                <th className="px-6 py-3 border-b border-gray-500 text-left font-bold">Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, idx) => (
                                <tr
                                    key={user.id}
                                    className={`text-white text-base ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} hover:bg-blue-900 transition-colors duration-150`}
                                >
                                    <td className="px-6 py-3 border-b border-gray-600">{user.firstName}</td>
                                    <td className="px-6 py-3 border-b border-gray-600">{user.lastName}</td>
                                    <td className="px-6 py-3 border-b border-gray-600">{user.age}</td>
                                    <td className="px-6 py-3 border-b border-gray-600">{user.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </>
    );
};
