# SecureVault - End-to-End Encrypted File Sharing

SecureVault is a local web application for secure file sharing, ensuring files are encrypted end-to-end. It allows users to upload and download files securely using AES-256 encryption with user-provided keys.

## Features
- **Login and Signup:** Users need to register and log in to access the file-sharing functionalities. User credentials are securely stored in a `users.json` file.
- **File Upload with Encryption:** 
  - Users upload files that are encrypted using a 256-bit AES key provided by the user.
  - The encrypted file is saved with a unique identifier and the `.enc` extension to ensure secure storage.
- **File Download with Decryption:**
  - Users can download previously uploaded files by providing the correct file ID and encryption key.
  - The file is decrypted before download, and the original file extension is preserved.

## How it Works
- **Encryption:** The uploaded file is encrypted using the AES-256-CBC algorithm. The encryption key provided by the user must be a 32-character string.
- **Decryption:** During download, the file is decrypted using the same key provided at the time of upload.

## Installation
1. Clone this repository:
    ```bash
    git clone https://github.com/yourusername/SecureVault.git
    cd SecureVault
    ```
2. Install the necessary dependencies:
    ```bash
    npm install
    ```
3. Start the server:
    ```bash
    node server.js
    ```

## Usage
1. Open the browser and go to `http://localhost:3000`.
2. **Login or Signup** to access the file upload page.
3. Upload a file by selecting it and providing a 32-character encryption key.
4. Note the file ID provided after the upload.
5. To download the file, enter the file ID and the same encryption key.

## Security
- AES-256 encryption ensures secure file handling.
- All file transfers are end-to-end encrypted with keys provided by users.
- Files can only be decrypted with the original encryption key.

## Future Enhancements
- Multi-user file sharing.
- Time-limited file access links.
- Improved UI with more advanced 3D elements.

## License
This project is open-source and available under the [MIT License](LICENSE).
