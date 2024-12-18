const fileInput = document.getElementById('fileInput');
        const uploadButton = document.getElementById('uploadButton');
        const fileNameDisplay = document.querySelector('.file-name');

        // Max file size in bytes (1GB)
        const MAX_FILE_SIZE = 1024 * 1024 * 1024;

        // Trigger file input click when button is clicked
        uploadButton.addEventListener('click', function () {
            fileInput.click(); // Open file dialog
        });

        // Listen for file input change (file selection)
        fileInput.addEventListener('change', function () {
            const files = fileInput.files;
            let fileNames = '';
            let isValid = true;
            let errorMessage = '';

            // Loop through each selected file
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileType = file.type;
                const fileSize = file.size;

                // Validate file type
                if (!['image/png', 'image/gif', 'image/webp', 'video/mp4', 'audio/mp3'].includes(fileType)) {
                    isValid = false;
                    errorMessage += `File type not supported: ${file.name}\n`;
                }

                // Validate file size (Max 1GB per file)
                if (fileSize > MAX_FILE_SIZE) {
                    isValid = false;
                    errorMessage += `File size exceeds 1GB: ${file.name}\n`;
                }

                // Append file names to display
                fileNames += file.name + '<br>';
            }

            // Display file names if valid
            if (isValid) {
                fileNameDisplay.innerHTML = fileNames;
            } else {
                alert(`Validation failed:\n${errorMessage}`);
                fileInput.value = ''; // Reset file input
            }
        });