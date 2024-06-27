<?php include 'db.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $traveler = $_POST['traveler'];
    $regions = $_POST['regions'];
    $cruise_menu = $_POST['cruise_menu'];
    $departure_port = $_POST['departure_port'];
    $cruise_ship = $_POST['cruise_ship'];
    $total_night = $_POST['total_night'];
    $visit_place = $_POST['visit_place'];

    $insert = new MongoDB\Driver\BulkWrite;
    $insert->insert(['name' => $name, 'email' => $email, 'phone' => $phone, 'traveler' => $traveler, 'regions' => $regions, 'cruise_menu' => $cruise_menu, 'departure_port' => $departure_port, 'cruise_ship' => $cruise_ship, 'total_night' => $total_night, "visit_place" => $visit_place]);
    $client->executeBulkWrite('Tables.details', $insert);
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MongoDB Collection Data</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="container">

        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
            <h1>Input Data</h1>
            <div class="mb-3 row">
                <div class="col-sm-4">
                    <input class="form-control form-control-lg" id="name" type="text" name="name" placeholder="Name"
                        onkeyup="show_name(this.value);" aria-label=".form-control-lg example">
                </div>

                <div class="col-sm-4">
                    <input class="form-control form-control-lg" id="email" type="text" name="email" placeholder="Email"
                        aria-label=".form-control-lg example" onkeyup="checkEmail(this.value);">
                </div>
            </div>

            <div class="mb-3 row">
                <div class="col-sm-4">
                    <input class="form-control form-control-lg" id="mobile" type="tel" name="phone" placeholder="Phone"
                        aria-label=".form-control-lg example" onkeyup="checkValidateMobile(this.value)">
                </div>

                <div class="col-sm-3">
                    <select class="form-select-lg mb-3 w-100" name="traveler" aria-label="small select example">
                        <option class="">choose Travelers</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                    </select>
                </div>
            </div>



            <h1>Collection Data</h1>
            <div class="mb-3 row">
                <div class="col-sm-4">
                    <select class="form-select-lg mb-3 w-75" name="regions" aria-label="small select example">
                        <option class=""> regions menu</option>
                        <?php foreach ($regionsData as $region): ?>
                            <option class="" value="<?php echo $region; ?>"><?php echo $region; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-sm-4">
                    <select class="form-select-lg mb-3 w-75" name="cruise_menu" aria-label="small select example">
                        <option class="">cruise menu</option>
                        <?php foreach ($cruiseData as $cruise): ?>
                            <option value="<?php echo $cruise; ?>"><?php echo $cruise; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-sm-4">
                    <select class="form-select-lg mb-3  w-75" name="departure_port" aria-label="small select example">
                        <option class="">All Departure ports</option>
                        <?php foreach ($departurePorts as $DeparturePorts): ?>
                            <option class="" value="<?php echo $DeparturePorts; ?>"><?php echo $DeparturePorts; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
            </div>
            <div class="mb-3 row">
                <div class="col-sm-4">
                    <select class="form-select-lg mb-3 w-75" name="cruise_ship" aria-label="small select example">
                        <option class="">cruise ships</option>
                        <?php foreach ($cruiseShipData as $shipData): ?>
                            <option value="<?php echo $shipData; ?>"><?php echo $shipData; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-sm-4"">
                <select class=" form-select-lg mb-3 w-75" name="total_night" aria-label="small select example">
                    <option>Total Nights stay</option>
                    <?php foreach ($nightsData as $nightData): ?>
                        <option value="<?php echo $nightData; ?>"><?php echo $nightData; ?></option>
                    <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-sm-3">
                    <select class="form-select-lg mb-3 w-75" name="visit_place" aria-label="small select example">
                        <option class="">place Visit</option>
                        <?php foreach ($visitPlaceData as $visitplace): ?>
                            <option value="<?php echo $visitplace; ?>"><?php echo $visitplace; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
            </div>
            <input type="submit" class="btn btn-primary btn-lg" name="submit">
        </form>
    </div>

    <script>
        // $(document).ready(function () {
        //     $('select').select2();
        // });
    </script>
    <script src="script.js"></script>
</body>

</html>