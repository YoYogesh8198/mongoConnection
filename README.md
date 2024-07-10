# mongoConnection
# mongoConnection
git init
git add .
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YoYogesh8198/mongoConnection.git
git push -u origin main




This PHP code snippet connects to a MongoDB database, retrieves documents from various collections, and processes the results. Let's break down the code step by step:

Step 1: MongoDB Connection and Collection Initialization
php
Copy code
$client = new MongoDB\Driver\Manager("mongodb://localhost:27017");
This line initializes a MongoDB client connecting to a MongoDB server running on localhost at port 27017.
Step 2: Define Collection Names
php
Copy code
$database = 'Tables';
$regions = 'regions';
$cruise_line = 'cruise_lines';
$all_departure_ports = 'all_departure_ports';
$cruise_ship = 'cruise_ships';
$total_night = 'number_of_nights';
$placeVisit = 'places_to_visit';
$TopCruiseLine = 'TopCruiseLine';
These variables store the names of collections within the database Tables.
Step 3: Execute Queries and Retrieve Results
php
Copy code
$query = new MongoDB\Driver\Query([]);
$regions_a = $client->executeQuery("$database.$regions", $query);
$cruise_a = $client->executeQuery("$database.$cruise_line", $query);
$all_departure_ports_a = $client->executeQuery("$database.$all_departure_ports", $query);
$cruiseShip_a = $client->executeQuery("$database.$cruise_ship", $query);
$totalNight_a = $client->executeQuery("$database.$total_night", $query);
$visitPlace_a = $client->executeQuery("$database.$placeVisit", $query);
$TopCruiseLine_a = $client->executeQuery("$database.$TopCruiseLine", $query);
Each executeQuery call retrieves all documents from the specified collection ($regions, $cruise_line, etc.) in the Tables database and stores the result sets in variables ($regions_a, $cruise_a, etc.).
Step 4: Process Results into an Array
php
Copy code
$results = [];
foreach ($regions_a as $document) {
    $results['region'] = $document;
}
foreach ($cruise_a as $document) {
    $results['cruise'] = $document;
}
foreach ($all_departure_ports_a as $document) {
    $results['departure_ports'] = $document;
}
foreach ($cruiseShip_a as $document) {
    $results['cruiseShip'] = $document;
}
foreach ($totalNight_a as $document) {
    $results['TotalNights'] = $document;
}
foreach ($visitPlace_a as $document) {
    $results['visitPlace'] = $document;
}
$results['cruiseLine'] = $TopCruiseLine_a->toArray();
This section populates the $results array with documents retrieved from each collection. Each document is stored under a corresponding key ('region', 'cruise', 'departure_ports', etc.). For the 'cruiseLine' key, documents are converted to an array using toArray().
Step 5: Extract Specific Data from Results
php
Copy code
$regionsData = $results['region']->region;
$cruiseData = $results['cruise']->cruiselines;
$departurePorts = $results['departure_ports']->alldepartureports;
$cruiseShipData = $results['cruiseShip']->cruiseships;
$nightsData = $results['TotalNights']->numberofnights;
$visitPlaceData = $results['visitPlace']->placestovisit;
$topcruiseData = isset($results['cruiseLine']->topcruiseline);
This section extracts specific fields or properties from each document stored in $results.
Summary:
Initialization: Connects to MongoDB and defines collection names.
Query Execution: Retrieves all documents from each collection.
Result Processing: Stores documents in $results array under respective keys.
Data Extraction: Extracts specific fields or properties from stored documents.




<!-- https://drive.google.com/file/d/13DYGJmuzDkAfmaISLs2O6h_I-Fetbdkg/view?usp=sharing -->
<!-- drive link -->
<!-- https://www.freepik.com/free-photos-vectors/animated-wallpaper -->




















Step 1: Error Reporting and Database Connection
php
Copy code
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include MongoDB connection file
include 'db.php';
Explanation:
error_reporting(E_ALL); and ini_set('display_errors', 1); ensure that all errors, warnings, and notices are displayed on the UI for debugging purposes.
include 'db.php'; includes a file (db.php) that presumably contains the MongoDB client initialization ($client).
Step 2: Handling POST Request Data
php
Copy code
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve POST data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $traveler = $_POST['traveler'];
    $number_of_adults = isset($_POST['number_of_adults']) ? $_POST['number_of_adults'] : "";
    $number_of_children = isset($_POST['number_of_children']) ? $_POST['number_of_children'] : "";
    $number_of_infant = isset($_POST['number_of_infant']) ? $_POST['number_of_infant'] : "";
    $regions = $_POST['regions'];
    $cruise_menu = $_POST['cruise_menu'];
    $departure_port = $_POST['departure_port'];
    $return_port = isset($_POST['return_port']) ? $_POST['return_port'] : "";
    $cruise_ship = $_POST['cruise_ship'];
    $total_night = $_POST['total_night'];
    $visit_place = $_POST['visit_place'];
    $depart_date = $_POST['depart_date'];
    $return_date = $_POST['return_date'];
    $uniqueId = $_POST['uniqueId'];
Explanation:
This section checks if the current request method is POST ($_SERVER['REQUEST_METHOD'] === 'POST').
It retrieves various form data submitted via POST method into respective variables ($name, $email, $phone, etc.).
It also handles cases where optional fields ($number_of_adults, $number_of_children, $number_of_infant, $return_port) may not be set using isset().
Step 3: Query MongoDB for Existing Data
php
Copy code
    // Prepare MongoDB query to check if entry already exists
    $filter = ['uniqueId' => $uniqueId];
    $options = [];
    $query = new MongoDB\Driver\Query($filter, $options);
    $rows = $client->executeQuery('Tables.details', $query);
Explanation:
A MongoDB query is prepared to check if an entry with the given uniqueId already exists in the Tables.details collection.
$filter defines the query filter based on uniqueId.
$options are left empty here, which defaults to an empty array.
Step 4: Insert Data into MongoDB if Not Exists
php
Copy code
    // If no matching entry found, insert new document into MongoDB
    if (count($rows->toArray()) == 0) {
        $insert = new MongoDB\Driver\BulkWrite;
        $insert->insert(
            [
                'uniqueId' => $uniqueId,
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'traveler' => $traveler,
                "number_of_adults" => $number_of_adults,
                "number_of_children" => $number_of_children,
                "number_of_infant" => $number_of_infant,
                'regions' => $regions,
                'cruise_menu' => $cruise_menu,
                'departure_port' => $departure_port,
                "return_port" => $return_port,
                'cruise_ship' => $cruise_ship,
                'total_night' => $total_night,
                "visit_place" => $visit_place,
                "depart_date" => $depart_date,
                "return_date" => $return_date,
            ]
        );
        $client->executeBulkWrite('Tables.details', $insert);
    }
Explanation:
Checks if the query result ($rows) has zero entries (count($rows->toArray()) == 0).
If no matching entry is found, it initializes a MongoDB BulkWrite operation to insert a new document into the Tables.details collection.
The document fields are populated with the values retrieved from the POST data.
Step 5: Generate Random Number
php
Copy code
$num = mt_rand(100000, 999999);
Explanation:
Generates a random number between 100000 and 999999 and assigns it to the variable $num.