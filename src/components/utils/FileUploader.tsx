import {ChangeEvent, useState} from "react";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {storage} from "../../config/firebase_config.ts";
import {showToastError} from "./tools.tsx";
import {CircularProgress} from "@mui/material";

type uploadStateProps = {
    name: string,
    isUploading: boolean,
    fileURL: string
}

type FileUploaderProps = {
    dir: string
    filename: (filename : string) => void
}
export const FileUploader = ({dir, filename}: FileUploaderProps) => {
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
                    if (snapshot.state === 'running') setUploadState(state => ({...state, isUploading: true}))
                },
                (error) => {
                    setUploadState(state => ({...state, isUploading: false}))
                    showToastError(error.code)
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUploadState(state => ({
                            ...state,
                            isUploading: false,
                            fileURL: downloadURL,
                            name: randomFileName
                        }))
                        filename(randomFileName)
                    });
                }
            );
        }
    };

    return (
        <div>
            {!uploadState.fileURL &&
                <div>
                    <input type={'file'} accept={'image/png'} name={'image'} onChange={handleChange}/>
                </div>
            }{uploadState.isUploading &&
            <div className={'progress'}
                 style={{textAlign: 'center', margin: '30px 0'}}
            >
                <CircularProgress style={{color: '#98c6e9'}} thickness={7}/>
            </div>
        }{uploadState.fileURL &&
            <div className={'image_upload_container'}>
                <img
                    style={{width: '100%'}}
                    src={uploadState.fileURL}
                    alt={uploadState.name}
                ></img>
                <div className={'remove'} onClick={() => alert('remove')}>Remove</div>
            </div>
        }
        </div>
    )
}