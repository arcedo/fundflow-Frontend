import Resizer from "react-image-file-resizer";

export async function resizeImage(file, width, height, quality) {
    return new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            width,
            height,
            'WEBP',
            quality,
            0,
            (uri => {
                resolve(uri);
            }),
            'file'
        )
    });
}