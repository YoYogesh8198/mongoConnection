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
    <?php include 'db.php'; ?>
    <div class="container">

        <h1>Collection Data</h1>
        <div class="mb-3 row">
            <div class="col-sm-4">
                <select class="form-select-lg mb-3 w-75 " aria-label="small select example">
                    <option selected class=""> regions menu</option>
                    <?php foreach ($regionsData as $region): ?>
                        <option class="" value="<?php echo $region; ?>"><?php echo $region; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="col-sm-4">
                <select class="form-select-lg mb-3 w-75" aria-label="small select example">
                    <option selected class="">cruise menu</option>
                    <?php foreach ($cruiseData as $cruise): ?>
                        <option value="<?php echo $cruise; ?>"><?php echo $cruise; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="col-sm-4">
                <select class="form-select-lg mb-3  w-75" aria-label="small select example">
                    <option selected class="">All Departure ports</option>
                    <?php foreach ($departurePorts as $DeparturePorts): ?>
                        <option class="" value="<?php echo $DeparturePorts; ?>"><?php echo $DeparturePorts; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
        </div>
        <div class="mb-3 row">
        <div class="col-sm-4">
                <select class="form-select-lg mb-3 w-75" aria-label="small select example">
                    <option selected class="">cruise ships</option>
                    <?php foreach ($cruiseShipData as $shipData): ?>
                        <option value="<?php echo $shipData; ?>"><?php echo $shipData; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="col-sm-4"">
                <select class="form-select-lg mb-3 w-75" aria-label="small select example">
                    <option selected>Total Nights stay</option>
                    <?php foreach ($nightsData as $nightData): ?>
                        <option value="<?php echo $nightData; ?>"><?php echo $nightData; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="col-sm-3">
                <select class="form-select-lg mb-3 w-75" aria-label="small select example">
                    <option selected class="">place Visit</option>
                    <?php foreach ($visitPlaceData as $visitplace): ?>
                        <option value="<?php echo $visitplace; ?>"><?php echo $visitplace; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
        </div>

        <h1>Input Data</h1>
        <div class="mb-3 row">
            <div class="col-sm-4">
                <input class="form-control form-control-lg" type="text" placeholder="Name"
                    aria-label=".form-control-lg example">
            </div>

            <div class="col-sm-4">
                <input class="form-control form-control-lg" type="text" placeholder="Email"
                    aria-label=".form-control-lg example">
            </div>
        </div>

        <div class="mb-3 row">
            <div class="col-sm-4">
                <input class="form-control form-control-lg" type="text" placeholder="Phone"
                    aria-label=".form-control-lg example">
            </div>

            <div class="col-sm-4">
                <input class="form-control form-control-lg" type="text" placeholder="Travelers"
                    aria-label=".form-control-lg example">
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function () {
            $('select').select2();
        });
    </script>
</body>

</html>