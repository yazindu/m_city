import {ChangeEvent, useState} from "react";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {storage} from "../../config/firebase_config.ts";
import {showToastError} from "./tools.tsx";

type uploadStateProps = {
    name: string,
    isUploading: boolean,
    fileURL: string
}
export const FileUploader = ({dir}: { dir: string }) => {
    const [uploadState, setUploadState] = useState({name: '', isUploading: false, fileURL: ''} as uploadStateProps)
    const randomFileName = `${crypto.randomUUID()}.png`
    const playersRef = ref(storage, `${dir}/${randomFileName}`);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files[0]) {
            uploadBytesResumable(playersRef, files[0])
            const uploadTask = uploadBytesResumable(playersRef, files[0]);

            uploadTask.on('state_changed',
                (snapshot) => {
                    if(snapshot.state === 'running') setUploadState(state=>({...state, isUploading: true}))
                },
                (error) => {
                    setUploadState(state=>({...state, isUploading: false}))
                    showToastError(error.code)
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUploadState(state=>({...state, isUploading: false, fileURL: downloadURL, name: randomFileName}))
                        console.log('image uploaded!')
                    });
                }
            );
        }
    };

    return (
        <div>
            <input type={'file'} accept={'image/png'} onChange={handleChange}/>
        </div>
    )
}