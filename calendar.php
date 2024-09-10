
<?php
// server.php

// Get the raw POST data
$json = file_get_contents('php://input');

// Decode it into a PHP array
$data = json_decode($json, true);

// Define the file path for JSON data
$file = 'data.json';

// If the file exists, get the current contents and append the new data
if (file_exists($file)) {
    $currentData = json_decode(file_get_contents($file), true);
    $currentData[] = $data; // Add new data to the array
} else {
    $currentData = [$data]; // Create a new array with the data
}

// Encode the updated data back to JSON
$jsonData = json_encode($currentData, JSON_PRETTY_PRINT);

// Write the JSON data back to the file
if (file_put_contents($file, $jsonData)) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}

// Check if 'title' is set in the data and create a text file with that name
$title = isset($data['title']) ? $data['title'] : null;
$name = isset($data['name']) ? $data['name'] : null;

if ($title) {
    $myfile = fopen($title . ".txt", "w+");
    if ($myfile) {
        // // Write data to the file (you can adjust what you write here)
        fwrite($myfile, $name . "\n");  
        
        
        // // Close the file
        fclose($myfile);
    } else {
        echo json_encode(["status" => "error", "message" => "Could not create file."]);
    }
}
?>
