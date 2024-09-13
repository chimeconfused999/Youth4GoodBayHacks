<?php
// Enable error reporting for debugging
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);

ini_set('display_errors', 1);

// Define the file path for the JSON file
$filePath = 'data.json';

// Get the raw POST data from the input stream and decode it from JSON
$input = json_decode(file_get_contents('php://input'), true);

// Access the data from $input instead of $_POST
$eventTitle = isset($input['eventTitle']) ? trim($input['eventTitle']) : null;
$newEventTitle = isset($input['newEventTitle']) ? trim($input['newEventTitle']) : null;
$eventDate = isset($input['eventDate']) ? trim($input['eventDate']) : null;
$eventDuration = isset($input['eventDuration']) ? trim($input['eventDuration']) : null;
$eventPlace = isset($input['eventPlace']) ? trim($input['eventPlace']) : null;
$eventDescription = isset($input['eventDescription']) ? trim($input['eventDescription']) : null;

// Validate input to ensure required fields are present

// Read and decode the JSON filea
if (!file_exists($filePath)) {
    echo json_encode([
        "status" => "error", 
        "message" => "JSON file not found."
    ]);
    exit;
}

$filePath = 'data.json';

// Read the JSON data from the file
$jsonData = file_get_contents($filePath);
$data = json_decode($jsonData, true);

$eventDeleted = false;

// Iterate through the JSON array
foreach ($data as $key => $event) {
    // Check if all components (title, date, duration, place, description) are missing or empty
    if (
        (!isset($event['title']) || empty(trim($event['title']))) &&
        (!isset($event['data']) || empty(trim($event['data']))) &&
        (!isset($event['duration']) || empty(trim($event['duration']))) &&
        (!isset($event['place']) || empty(trim($event['place']))) &&
        (!isset($event['description']) || empty(trim($event['description'])))
    ) {
        // If an event's title exists, check for its corresponding .txt file and delete it
        if (isset($event['title']) && !empty($event['title'])) {
            $fileToDelete = strtolower(trim($event['title'])) . '.txt';
            if (file_exists($fileToDelete)) {
                unlink($fileToDelete); // Delete the .txt file
                echo "Deleted file: " . $fileToDelete . "\n";
            }
        }

        // Remove the event from the JSON data
        unset($data[$key]);
        $eventDeleted = true;
    }
}

// If an event was deleted, write the updated JSON back to the file
if ($eventDeleted) {
    // Encode the updated data back to JSON
    $newJsonData = json_encode(array_values($data), JSON_PRETTY_PRINT);

    // Write the updated JSON data back to the file
    if (file_put_contents($filePath, $newJsonData)) {
        echo json_encode(["status" => "success", "message" => "Event and file deleted successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error writing updated data to file."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "No events matched the deletion criteria."]);
}


// Check if the file decoding was successful
if ($data === null) {
    echo json_encode([
        "status" => "error", 
        "message" => "Error decoding JSON data."
    ]);
    exit;
}

// Flag to track if the event was found and updated or deleted
$eventFound = false;

// Iterate through the JSON array and find the event by its title


foreach ($data as $key => $event) {
    

    
    if (isset($event['title']) && $event['title'] == $eventTitle) {
        // If event is found, update its details or delete if conditions don't match
       
        // Update the event details
        $data[$key] = [
            'title' => $newEventTitle,
            'data' => $eventDate, // Corrected key from 'data' to 'date'
            'place' => $eventPlace,
            'duration' => $eventDuration,
            'description' => $eventDescription,
            'name' => $event['name'] // Preserve the 'name' field
        ];
         
        $eventFound = true;
        break;
    }
}

// Check if the event was found and processed
if (!$eventFound) {
    echo json_encode([
        "status" => "error", 
        "message" => "Event not found or did not match the criteria."
    ]);
    exit;
}

// Reindex the array after deletion (if any event was deleted)
$data = array_values($data);

// Encode the updated data back to JSON
$newJsonData = json_encode($data, JSON_PRETTY_PRINT);

// Write the updated data back to the file
if (file_put_contents($filePath, $newJsonData)) {
    echo json_encode([
        "status" => "success", 
        "message" => "Event updated or deleted successfully."
    ]);
} else {
    echo json_encode([
        "status" => "error", 
        "message" => "Error writing to file."
    ]);
}
?>
