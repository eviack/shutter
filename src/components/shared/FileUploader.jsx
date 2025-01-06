import {useDropzone} from 'react-dropzone'
import React, {useCallback, useState} from 'react'
import { Button } from '../ui/button'

const FileUploader = ({fieldChange, mediaUrl}) => {
    const [fileUrl, setfileurl] = useState(mediaUrl)
    const [file, setfile] = useState([])

    const onDrop = useCallback(acceptedFiles => {
        setfile(acceptedFiles)
        fieldChange(acceptedFiles)
        setfileurl(URL.createObjectURL(acceptedFiles[0]))
        
        // Do something with the files
      }, [file])

      const {getRootProps, getInputProps} = useDropzone({onDrop,
        accept:{
            'image/*':['.png', '.jpg', '.jpeg', '.svg']
        }

      })



  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer'/>
      {
        fileUrl ? (
            <>
            <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
                <img src={fileUrl}
                alt="fileupload"
                className='file_uploader-img'
                />
            </div>

            <p className='file_uploader-label'>Click or drag photo to replace</p>
            </>
        ): (
            <div className="file_uploader-box">
                <img src = "/assets/file-upload.svg"
                width={96}
                height={77}
                alt="file upload"
                />

                <h3 className="base-medium text-light-2 mb-2 mt-6">Drag photo here</h3>

                <p className='text-light-4 small-regular mb-6'> SVG, PNG, JPG</p>

                

            </div>

        )
         
      }
    </div>
  )
}

export default FileUploader
