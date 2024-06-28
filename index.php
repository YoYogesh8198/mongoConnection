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
    $depart_date = $_POST['depart_date'];
    $return_date = $_POST['return_date'];
    $uniqueId = $_POST['uniqueId'];

    $filter = ['uniqueId' => $uniqueId];
    $options = [];
    $query = new MongoDB\Driver\Query($filter, $options);
    $rows = $client->executeQuery('Tables.details', $query);

    if (count($rows->toArray()) == 0) {
        $insert = new MongoDB\Driver\BulkWrite;
        $insert->insert(['uniqueId' => $uniqueId, 'name' => $name, 'email' => $email, 'phone' => $phone, 'traveler' => $traveler, 'regions' => $regions, 'cruise_menu' => $cruise_menu, 'departure_port' => $departure_port, 'cruise_ship' => $cruise_ship, 'total_night' => $total_night, "visit_place" => $visit_place, "depart_date" => $depart_date, "return_date" => $return_date]);
        $client->executeBulkWrite('Tables.details', $insert);
    }
}
$num = mt_rand(100000, 999999);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MongoDB Collection Data</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />


    <!-- <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script> -->
    <!-- <link href="http://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css" rel="stylesheet"> -->
    <!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> -->
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

        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" autocomplete="off">
            <h1>Input Data</h1>
            <div class="mb-3 row">
                <div class="col-sm-4">
                    <input class="w-100 form-control" id="name" type="text" name="name" placeholder="Name"
                        onkeyup="show_name(this.value);" aria-label=".form-control-lg example">
                </div>

                <div class="col-sm-4">
                    <input class="w-100 form-control" id="email" type="text" name="email" placeholder="Email"
                        aria-label=".form-control-lg example" onkeyup="checkEmail(this.value);">
                </div>
            </div>

            <div class="mb-3 row">
                <div class="col-sm-4">
                    <input class="w-100 form-control" id="mobile" type="tel" name="phone" placeholder="Phone"
                        aria-label=".form-control-lg example" onkeyup="checkValidateMobile(this.value)">
                </div>

                <div class="col-sm-4">
                    <select class="w-100 form-control" name="traveler" aria-label="small select example">
                        <option value="">choose Travelers</option>
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
                    <select class="w-100 form-control" name="regions" aria-label="small select example">
                        <option value="">Destination (Any)</option>
                        <?php foreach ($regionsData as $region): ?>
                            <option class="" value="<?php echo $region; ?>"><?php echo $region; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-sm-4">
                    <select class="w-100 form-control" name="cruise_menu" aria-label="small select example">
                        <option value="">cruise Lines(Any)</option>
                        <?php foreach ($cruiseData as $cruise): ?>
                            <option value="<?php echo $cruise; ?>"><?php echo $cruise; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
            </div>
            <div class="mb-3 row">
                <div class="col-sm-4">
                    <select class="w-100 form-control" name="departure_port" aria-label="small select example">
                        <option value="">Departure ports(Any)</option>
                        <?php foreach ($departurePorts as $DeparturePorts): ?>
                            <option class="" value="<?php echo $DeparturePorts; ?>"><?php echo $DeparturePorts; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <!-- </div>
                <div class="mb-3 row"> -->
                <div class="col-sm-4">
                    <select class="w-100 form-control" name="cruise_ship" aria-label="small select example">
                        <option value="">cruise ships (Any)</option>
                        <?php foreach ($cruiseShipData as $shipData): ?>
                            <option value="<?php echo $shipData; ?>"><?php echo $shipData; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
            </div>
            <div class="mb-3 row">
                <div class="col-sm-4">
                    <select class="w-100 form-control" name="total_night" aria-label="small select example">
                        <option value="">Total Nights stay</option>
                        <?php foreach ($nightsData as $nightData): ?>
                            <option value="<?php echo $nightData; ?>"><?php echo $nightData; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-sm-4">
                    <select class="w-100 form-control" name="visit_place" aria-label="small select example">
                        <option value="">place Visit (Any)</option>
                        <?php foreach ($visitPlaceData as $visitplace): ?>
                            <option value="<?php echo $visitplace; ?>"><?php echo $visitplace; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
            </div>
            <div class="mb-3 row">
                <div class="col-sm-4 ">
                    <div class="cal_flx_input mb-3 w-100">
                        <input class="form-control form-control drop_in w-100" type="text"
                            placeholder="Departure Date(Any)" aria-label=".form-control-lg example" id="depart_date"
                            name="depart_date" autocomplete="off">
                    </div>
                </div>
                <div class="col-sm-4 ">
                    <div class="cal_flx_input mb-3 w-100">
                        <input class="form-control form-control drop_in w-100" type="text"
                            placeholder="Departure Date(Any)" aria-label=".form-control-lg example" id="return_date"
                            name="return_date" autocomplete="off">
                    </div>
                </div>
            </div>
            <input type="hidden" name="uniqueId" value="<?php echo $num; ?>" />

            <button type="submit" class="btn btn-primary btn" name="submit">submit</button>
        </form>
    </div>


    <script>
        function show_name(value) {
            //   console.log(value);
            var nameRegex =
                /^([a-zA-Z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff][a-zA-Z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff ',.-]*)+$/;
            if (!nameRegex.test(value)) {
                $("#name").css("border", "1px solid red");
            } else {
                $("#name").css("border", "1px solid #ced4da");
            }

            if (value.length == "" || value.length == null) {
                $("#name").css("border", "1px solid #ced4da");
                $("#name").focus();
            }
        }

        function checkEmail(value) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                $("#email").css("border", "1px solid red");
            } else {
                $("#email").css("border", "1px solid #ced4da");
            }

            if (value.length == null || value.length == "") {
                $("#email").css("border", "1px solid #ced4da");
                $("#email").focus();
            }
        }

        function checkValidateMobile(input) {
            // console.log(input)
            // var regex = /^[0-9]*$/;
            var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            if (!regex.test(input) || input.length > 10) {
                $("#mobile").css("border", "1px solid red");
                $("#mobile").focus();
            } else {
                $("#mobile").css("border", "1px solid #ced4da");
                $("#mobile").focus();
            }

            if (input.length == null || input.length == "") {
                $("#mobile").css("border", "1px solid #ced4da");
                $("#mobile").focus();
            }
        }

        $(function () {
            $('#depart_date').daterangepicker({
                singleDatePicker: true,
                timePicker: false,
                autoUpdateInput: false,
                minDate: new Date(),
                startDate: moment().startOf('hour'),
                endDate: moment().startOf('hour').add(32, 'hour'),
                locale: {
                    format: 'YYYY-MM-DD'
                }
            }).on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('YYYY-MM-DD'));

                $('#return_date').daterangepicker({
                    singleDatePicker: true,
                    timePicker: false,
                    autoUpdateInput: false,
                    minDate: new Date(picker.startDate.format('YYYY-MM-DD')),
                    startDate: moment().startOf('hour'),
                    endDate: moment().startOf('hour').add(32, 'hour'),
                    locale: {
                        format: 'YYYY-MM-DD'
                    }
                }).on('apply.daterangepicker', function (ev, picker) {
                    $(this).val(picker.startDate.format('YYYY-MM-DD'));
                });
            });

            $('#return_date').daterangepicker({
                singleDatePicker: true,
                timePicker: false,
                autoUpdateInput: false,
                minDate: new Date(),
                startDate: moment().startOf('hour'),
                endDate: moment().startOf('hour').add(32, 'hour'),
                locale: {
                    format: 'YYYY-MM-DD'
                }
            }).on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('YYYY-MM-DD'));

                $('#depart_date').daterangepicker({
                    singleDatePicker: true,
                    timePicker: false,
                    autoUpdateInput: false,
                    minDate: new Date(),
                    maxDate: new Date(picker.startDate.format('YYYY-MM-DD')),
                    startDate: moment().startOf('hour'),
                    endDate: moment().startOf('hour').add(32, 'hour'),
                    locale: {
                        format: 'YYYY-MM-DD'
                    }
                }).on('apply.daterangepicker', function (ev, picker) {
                    $(this).val(picker.startDate.format('YYYY-MM-DD'));
                });
            });
        });

    </script>
</body>

</html>