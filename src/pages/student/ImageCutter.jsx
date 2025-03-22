import { useState, useRef } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import './ImageCutter.css'
import ImageCutter1 from '@/assets/images/Mask group.png'
import ImageCutter2 from '@/assets/images/pixelarticons_arrow-up.png'
import ImageCutter3 from '@/assets/images/Rectangle 740.png'

import { AiFillPicture } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ImageCutter = () => {
  const location = useLocation()
  const userData = location.state
  const [imgSrc, setImgSrc] = useState('')
  const [crop, setCrop] = useState({
    unit: '%',
    width: 100,
    aspect: 1,
    x: 10,
    y: 10,
  })
  const [zoom, setZoom] = useState(50)
  const imgRef = useRef(null)
  const navigate = useNavigate()
  console.log('dataaaa', userData)
  
  useEffect(() => {
    if (userData?.profileImage instanceof File) {
      const imageUrl = URL.createObjectURL(userData.profileImage)
      setImgSrc(imageUrl)

      return () => URL.revokeObjectURL(imageUrl) // Cleanup
    } else if (typeof userData?.profileImage === 'string') {
      setImgSrc(userData.profileImage) // If it's a URL, use it directly
    }
  }, [userData])

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setImgSrc(reader.result))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e) {
    const { width, height } = e.currentTarget
    const cropInit = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 80,
        },
        1,
        width,
        height
      ),
      width,
      height
    )
    setCrop(cropInit)
  }

  function handleZoomChange(e) {
    setZoom(e.target.value)
    if (imgRef.current) {
      imgRef.current.style.transform = `scale(${e.target.value / 50})`
    }
  }

  function handleCancel() {
    setImgSrc('')
    setZoom(50)
  }

  function getCroppedImg(image, crop) {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob)
      }, 'image/jpeg')
    })
  }

  async function handleSave() {
    // try {
    if (!crop || !imgRef.current) return

    // const croppedImageBlob = await getCroppedImg(imgRef.current, crop)

    // const formData = new FormData()
    // formData.append('icroppedImagemage', Blob, 'cropped-image.jpg')
    // console.log(formData)
    if (!crop || !imgRef.current) return

    const croppedImageBlob = await getCroppedImg(imgRef.current, crop)
    console.log('The image')

    navigate('/sign-up', {
      state: {
        ...userData,
        croppedImage: croppedImageBlob,
      },
    })
    // const croppedImageUrl = URL.createObjectURL(croppedImageBlob)

    // setImgSrc(croppedImageUrl)
    //   const response = await fetch('YOUR_API_ENDPOINT', {
    //     method: 'POST',
    //     body: formData,
    //   })

    //   if (response.ok) {
    //     alert('Image successfully uploaded')
    //   } else {
    //     throw new Error('Upload failed')
    //   }
    // } catch (error) {
    //   console.error('Error:', error)
    //   alert('Failed to save image')
    // }
  }

  return (
    <>
      <div className='container-ImageCut'>
        <div className='Header-ImageCut'>
          <h2>Crop your photo</h2>
          <p>
            Adjust the image to focus only on your face for optimal AI
            detection. Follow the example below for best results.
          </p>
        </div>
        <div className='section-ImageCut'>
          <div className='exemple-ImageCut'>
            <div>
              <img src={ImageCutter1} alt='' />
            </div>
            <div>
              <img src={ImageCutter2} alt='' />
            </div>
            <div>
              <img src={ImageCutter3} alt='' />
            </div>
          </div>

          <div className='cutImage'>
            <h2>Crop Photo</h2>
            <div className='cropper-container'>
              {!imgSrc && (
                <div className='upload-container'>
                  <label htmlFor='file-upload' className='upload-btn'>
                    Sélectionner une image
                  </label>
                  <input
                    id='file-upload'
                    type='file'
                    accept='image/*'
                    onChange={onSelectFile}
                    className='file-input'
                  />
                </div>
              )}

              {imgSrc && (
                <>
                  <div className='crop-frame-container'>
                    <div className='crop-frame'>
                      <ReactCrop
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        aspect={1}
                        ruleOfThirds
                      >
                        <div className='image-container'>
                          <img
                            ref={imgRef}
                            alt='Image à recadrer'
                            src={imgSrc}
                            onLoad={onImageLoad}
                            style={{
                              // width: '100%',
                              height: '100%',
                              // objectFit: 'cover',
                              transform: `scale(${zoom / 50})`,
                            }}
                          />
                        </div>
                      </ReactCrop>
                    </div>
                  </div>

                  <div className='zoom-controls'>
                    <span className='zoom-icon zoom-out'>
                      <AiFillPicture className='size-4' />
                    </span>
                    <input
                      type='range'
                      min='25'
                      max='100'
                      value={zoom}
                      onChange={handleZoomChange}
                      className='zoom-slider'
                      style={{ '--zoom-value': `${(zoom - 25) * (100 / 75)}%` }}
                    />
                    <span className='zoom-icon zoom-in'>
                      <AiFillPicture className='size-9 ml-1' />
                    </span>
                  </div>

                  <div className='action-buttons'>
                    <button className='cancel-btn' onClick={handleCancel}>
                      Cancel
                    </button>
                    <button className='save-btn' onClick={handleSave}>
                      Save
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ImageCutter
