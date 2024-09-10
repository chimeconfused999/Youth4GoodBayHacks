<?php
// Get the raw POST data
$json = file_get_contents('php://input');

// Decode the JSON data into a PHP array
$data = json_decode($json, true);

// Extract title and name from the data
$title = isset($data['title']) ? $data['title'] : null;
$name = isset($data['name']) ? $data['name'] : null;

// Validate the received data
if ($title && $name) {
    // Define the file path
    $filePath = __DIR__ . "/" . $title . ".txt";

    // Read the existing content
    $existingData = file_exists($filePath) ? file_get_contents($filePath) : "";

    // Print the existing data (for debugging purposes)
    print_r($existingData);

    // Open the file for appending
    $myfile = fopen($filePath, "a"); // Use "a" mode for appending

    if ($myfile) {
        // Check if the file has existing content and if the name exists in it
        if (strpos($existingData, $name) !== false) {
            // Name already exists in the file
            error_log("Name '{$name}' already exists in the chat.");
            echo json_encode(["status" => "error", "message" => "Name already exists."]);
        } else {
            // Append the new data to the file since the name doesn't exist
            fwrite($myfile, $name . "\n");
            fclose($myfile);

            // Respond with success
            echo json_encode(["status" => "success", "message" => "Data appended successfully.", "file" => $filePath]);
        }
    } else {
        // Respond with error if the file could not be opened
        echo json_encode(["status" => "error", "message" => "Could not open file for appending."]);
    }
} else {
    // Respond with error if data is missing
    echo json_encode(["status" => "error", "message" => "Title or name is missing."]);
}
?>
