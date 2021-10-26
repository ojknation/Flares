import  { firebaseStorage }  from './firebase';
import { v1 as uuidv1 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';


const getFileExtension = (file) => {
    if(file?.name) {
      const extension = file.name.split(".")[1];
      return extension;
    }
  }


export const uploadImage = async (file, path) => {
if (file && file?.type) {
  const metadata = {
    contentType: file.type,
  };
  const fileName = uuidv1() + "." + getFileExtension(file);
  const refPath = path+fileName;
  const storageRef = ref(firebaseStorage, refPath)
  const upload =  uploadBytes(storageRef, file, metadata)

  await Promise.resolve(upload);
  const imgUrl = await getDownloadURL(storageRef)
  console.log('....setimgURL', imgUrl)
  return imgUrl
}
else {
    throw new Error("invalid file value");
}
};