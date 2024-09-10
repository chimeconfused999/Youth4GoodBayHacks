<?php
// The name we want to remove
$json = file_get_contents('php://input');

// Decode the JSON data into a PHP array
$data = json_decode($json, true);

// Extract title and name from the data
$title = isset($data['title']) ? $data['title'] : null;
$name = isset($data['name']) ? $data['name'] : null;

// Define the file path
$filePath = __DIR__ . "/" . $title . ".txt";

// Read the file contents into an array of lines
if (file_exists($filePath)) {
    $fileContents = file($filePath, FILE_IGNORE_NEW_LINES); // Read file into array, ignoring new lines

    // Check if the name exists in the file
    if (in_array($name, $fileContents)) {
        // Remove the name from the array
        $updatedContents = array_filter($fileContents, function($line) use ($name) {
            return trim($line) !== $name; // Filter out the name
        });

        // Write the updated contents back to the file
        file_put_contents($filePath, implode(PHP_EOL, $updatedContents) . PHP_EOL);

        echo json_encode(["status" => "success", "message" => "$name has been removed."]);
    } else {
        echo json_encode(["status" => "error", "message" => "$name not found."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "File does not exist."]);
}
?>
