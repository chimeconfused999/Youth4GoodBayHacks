<?php
if (isset($_POST['filename'])) {
    $file = $_POST['filename'];

    // Make sure it's a .txt file
    if (pathinfo($file, PATHINFO_EXTENSION) == 'txt') {
        // Check if the file exists
        if (file_exists($file)) {
            // Try to delete the file
            if (unlink($file)) {
                echo json_encode(["status" => "success", "message" => "File deleted successfully."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Unable to delete the file."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "File not found."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid file type."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "No filename specified."]);
}
?>
