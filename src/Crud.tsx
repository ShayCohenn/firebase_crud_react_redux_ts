import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc,doc, deleteDoc } from 'firebase/firestore';
import {
    setUsers,
    addUser,
    updateUser,
    deleteUser,
} from './redux/userSlice';
import { firebaseConfig } from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface User{
    id:string,
    name:string
}

function Crud() {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users.users);

    const [newUserName, setNewUserName] = useState('');

    useEffect(() => {
        // Fetch users from Firestore and set in Redux store
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
          const usersCollection = collection(db, 'users');
          const snapshot = await getDocs(usersCollection);
          const userData: User[] = snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name, // Assuming 'name' is a field in your Firestore document
          }));
          dispatch(setUsers(userData)); // Use Redux to set fetched users
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      

    const createUser = async () => {
        if (newUserName.trim() !== '') {
            // Simulate adding user to Firestore, replace with actual Firebase logic
            const newUser = { id: '3', name: newUserName };
            dispatch(addUser(newUser));
            setNewUserName('');
        }
    };

    const handleUpdateUser = (userId: string, newName: string) => {
        const updatedName = prompt('Enter new name:', newName);
        if (updatedName !== null) {
            dispatch(updateUser({ id: userId, name: updatedName }));
        }
    };

    const handleDeleteUser = (userId: string) => {
        // Simulate deleting user from Firestore, replace with actual Firebase logic
        dispatch(deleteUser(userId));
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                />
                <button onClick={createUser}>Create User</button>
            </div>
            <div>
                <h2>Users:</h2>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.name}
                            <button onClick={() => handleUpdateUser(user.id, user.name)}>Update</button>
                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Crud;
