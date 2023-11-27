import axios from 'axios';
import imageSize from 'image-size';

async function isImageUrl(url: string): Promise<boolean> {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        if (response.status === 200) {
            const dimensions = imageSize(response.data);
            // Jika image-size berhasil mendapatkan dimensi, kita anggap itu adalah gambar
            return !!dimensions.width && !!dimensions.height;
        } else {
            // Jika status code bukan 200, kita anggap bukan gambar
            return false;
        }
    } catch (error) {
        // Jika terjadi kesalahan, kita anggap bukan gambar
        return false;
    }
}

export { isImageUrl };
