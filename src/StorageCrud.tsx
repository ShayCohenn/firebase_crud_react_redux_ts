import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import db from './firebaseConfig';
import { ref, listAll, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';
import { setFiles, addFile, deleteFile } from './reduxSlices/storageSlice';

interface FirebaseFile {
    name: string;
    fullPath: string;
    downloadURL: string;
}


function FileCrud() {
    const dispatch = useDispatch();
    const files = useSelector((state: RootState) => state.files.files);

    const [newFileName, setNewFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const storageRef = ref(db, 'files');
            const fileList = await listAll(storageRef);
            const fileData: File[] = await Promise.all(
                fileList.items.map(async item => {
                    const url = await getDownloadURL(item);
                    return { id: item.name, name: item.name, url };
                })
            );
            dispatch(setFiles(fileData));
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };


    const uploadFile = async (file: File) => {
        try {
          const storageRef = ref(db, `files/${file.name}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          const firebaseFile: FirebaseFile = { name: file.name, fullPath: storageRef.fullPath, downloadURL };
          dispatch(addFile(firebaseFile)); // Use the new FirebaseFile type here
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };
      
      const handleDeleteFile = async (file: FirebaseFile) => {
        try {
          const storageRef = ref(db, file.fullPath);
          await deleteObject(storageRef);
          dispatch(deleteFile(file.name)); // Use the new FirebaseFile type here
        } catch (error) {
          console.error('Error deleting file:', error);
        }
      };
      

    return (
        <div>
            <div>
                <input
                    type="file"
                    onChange={e => setSelectedFile(e.target.files && e.target.files[0])}
                />
                <button onClick={() => selectedFile && uploadFile(selectedFile)}>Upload</button>
            </div>
            <div>
                <h2>Files:</h2>
                <ul>
                    {files.map(file => (
                        <li key={file.id}>
                            <a href={file.url} target="_blank" rel="noopener noreferrer">
                                {file.name}
                            </a>
                            <button onClick={() => handleDeleteFile(file)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FileCrud;
