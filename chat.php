<?php
$message = isset($_POST['username']) ? $_POST['username'] : '';

// Validate username
if (!empty($message) && strlen($message) < 730) {
    $filename = 'chat.txt';

    // Attempt to write the message to the file
    $result = file_put_contents($filename, $message . "\n", FILE_APPEND | LOCK_EX);

    if ($result === false) {
        // Handle file write error
        trigger_error("Failed to write to file.", E_USER_ERROR);
    } else {
        echo "Message saved successfully.";
    }
} else {
    // Handle validation failure
    trigger_error("Message did not pass validation.", E_USER_ERROR);
}
?>
