import { useState, useEffect } from 'react'
import type { User } from '../types/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserTable } from './UserTable';
import { useUsers } from '../hooks/useUser';

export default function UserInfo() {
    const limit = 50;
    const [skip, setSkip] = useState(0);
    const [isFetchUsersEnabled, setIsFetchUsersEnabled] = useState(false);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const { data, isLoading, error } = useUsers(isFetchUsersEnabled, limit, skip);

    useEffect(() => {
        if (data?.users && data.users.length > 0) {
            setAllUsers(prev => {
                if (skip === 0) {
                    return [...data.users];
                }
                const existingIds = new Set(prev.map(user => user.id));
                const newUsers = data.users.filter((user: User) => !existingIds.has(user.id));
                return [...prev, ...newUsers];
            });
        }
    }, [data?.users, skip]);

    const handleAddUser = () => {
        toast.info('Coming soon!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: true,
            progress: undefined,
            theme: "colored",

        });
    };
    return (
        <>
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">User Info</h1>
            <div className="flex gap-4 mb-6 justify-center">

                <button
                    onClick={() => {
                        if (!isFetchUsersEnabled) setIsFetchUsersEnabled(true);
                    }}
                    className="px-4 py-2 rounded-md font-semibold transition-colors duration-300 !bg-blue-600 !text-white border !border-blue-700 hover:!bg-blue-700 !cursor-pointer disabled:!bg-blue-300 disabled:!text-white disabled:!cursor-not-allowed disabled:!opacity-70 dark:!bg-blue-500 dark:!text-white dark:!border-blue-400 dark:hover:!bg-blue-600 dark:disabled:!bg-blue-300"
                    disabled={isFetchUsersEnabled}
                    type="button"
                >
                    Fetch Users
                </button>
                <button
                    onClick={() => setSkip(skip + limit)}
                    className="px-4 py-2 rounded-md font-semibold transition-colors duration-300 bg-gray-200 text-gray-800 border border-gray-400 hover:bg-gray-300 cursor-pointer disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-500 dark:hover:bg-gray-600 dark:disabled:bg-gray-800"
                    disabled={!isFetchUsersEnabled || isLoading || (data && skip + limit >= data.total)}
                >
                    {data && skip + limit >= data.total ? 'No More Users' : 'Load More Users'}
                </button>
                <button
                    onClick={handleAddUser}
                    className="px-4 py-2 rounded-md font-semibold transition-colors duration-300 bg-gray-200 text-gray-800 border border-gray-400 hover:bg-gray-300 cursor-pointer disabled:bg-gray-300 disabled:text-gray-400 disabled:!cursor-not-allowed disabled:opacity-70 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-500 dark:hover:bg-gray-600 dark:disabled:bg-gray-800"
                    type="button"
                    disabled={isLoading}
                >
                    Add User
                </button>
            </div>
            <UserTable users={allUsers} isLoading={isLoading} error={error ? { message: error.message } : undefined} />
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </>
    )
}
