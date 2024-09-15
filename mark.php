<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve the buttonId and filePat from the POST request
    $buttonId = isset($_POST['buttonId']) ? $_POST['buttonId'] : null;
    $filePat = isset($_POST['filePat']) ? $_POST['filePat'] : null;

    // Check if both values are present
    if (!$buttonId || !$filePat) {
        echo "Error: buttonId or filePat is missing!";
        exit;
    }

    // Define the file path to the text file
    $filePath = __DIR__ . "/" . $filePat . ".txt";

    // Check if the file exists
    if (!file_exists($filePath)) {
        echo "Error: File not found!";
        exit;
    }

    // Read the file contents into an array
    $fileContents = file($filePath, FILE_IGNORE_NEW_LINES);

    // Find and update the entry that matches buttonId
    $found = false;
    foreach ($fileContents as $index => $line) {
        if (trim($line) === $buttonId) {
            // Append " here" to the buttonId
            $fileContents[$index] = "HERE";
            $found = true;
            break;
        }
    }

    if ($found) {
        // Write the updated content back to the file
        if (file_put_contents($filePath, implode(PHP_EOL, $fileContents))) {
            echo "Name updated successfully!";
        } else {
            echo "Error: Could not update the file.";
        }
    } else {
        echo "Error: Name not found in the file.";
    }
} else {
    echo "Invalid request.";
}
?>
