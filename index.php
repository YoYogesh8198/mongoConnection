<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// for warning when warning show on UI
include 'db.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // var_dump("data");
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

    $filter = ['uniqueId' => $uniqueId];
    $options = [];
    $query = new MongoDB\Driver\Query($filter, $options);
    $rows = $client->executeQuery('Tables.details', $query);

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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="container">

        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" autocomplete="off" class="needs-validation"
            id="cruiseForm">
            <div class="row">
                <div class="col-8">
                    <h3 class="mb-3 text-center">Input Data</h3>
                </div>
            </div>

            <div class="mb-3 row">
                <div class="col-sm-4 mb-3">
                    <div class="input-group has-validation">
                        <input class="w-100 form-control " id="name" type="text" name="name" placeholder="Name"
                            onkeyup="show_name(this.value);" aria-label=".form-control-lg example">
                        <div class="error_1 invalid-tooltip top-arrow" style="display:none">
                        </div>
                    </div>
                </div>
                <!-- <span class="comment" id="comment_1" style="display: none">please Enter your name*</span> -->

                <div class="col-sm-4">
                    <input class="w-100 form-control mb-3" id="email" type="text" name="email" placeholder="Email"
                        aria-label=".form-control-lg example" onkeyup="checkEmail(this.value);">
                </div>
                <div class="col-1"></div>
                <div class="col-sm-4 mb-3">
                    <input class="w-100 form-control " id="mobile" type="tel" name="phone" placeholder="Phone"
                        aria-label=".form-control-lg example" onkeyup="checkValidateMobile(this.value)">
                    <div class="error_2  invalid-tooltip top-arrow" style="display:none">
                    </div>
                </div>

                <div class="col-sm-4 mb-3">
                    <select class="w-100 form-control " name="traveler" aria-label="small select example"
                        onchange="select_traveler(this.value);" id="total_passenger">
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
                    <div class="col-md-12" id="populate_pax_opt"></div>
                    <div class="error_3  invalid-tooltip top-arrow" style="display:none">
                    </div>
                </div>
            </div>

            <!-- //* collection data  -->

            <div class="row">
                <div class="col-8">
                    <h3 class="mb-3 text-center">Collection Data</h3>
                </div>
            </div>
            <div class="mb-3 row">
                <div class="col-sm-4">
                    <select class="w-100 form-control mb-3" name="regions" aria-label="small select example">
                        <option value="">Destination (Any)</option>
                        <?php foreach ($regionsData as $region): ?>
                            <option class="" value="<?php echo $region; ?>"><?php echo $region; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-sm-4">
                    <select class="w-100 form-control mb-3" name="cruise_menu" id="cruise_menu"
                        aria-label="small select example">
                        <option value="">cruise Lines(Any)</option>
                        <?php foreach ($results['cruiseshipLineData'] as $cruiseshipLineData): ?>
                            <option value="<?php echo $cruiseshipLineData->cruisename; ?>">
                                <?php echo $cruiseshipLineData->cruisename; ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-1"></div>

                <div class="col-sm-4">
                    <select class="w-100 form-control mb-3" name="departure_port" id="Departure_ports"
                        aria-label="small select example">
                        <option value="">Departure ports(Any)</option>
                        <?php foreach ($departurePorts as $DeparturePorts): ?>
                            <option class="" value="<?php echo $DeparturePorts; ?>"><?php echo $DeparturePorts; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="form-check col-sm-4 mb-5">
                    <input class="form-check-input ml-8" type="checkbox" value="" id="return_port" name="return_port">
                    <label class="form-check-label" for="return_port">
                        Return to same port
                        <div class="error_6  invalid-tooltip top-arrow" style="display:none"></div>
                    </label>
                </div>

                <div class="col-sm-8">
                    <select class="w-100 mb-3 form-control" name="cruise_ship" id="cruise_ship"
                        aria-label="small select example">
                        <option value="" selected>cruise ships (Any)</option>
                        <?php foreach ($results['cruiseshipLineData'] as $cruiseshipLineData): ?>
                            <?php foreach ($cruiseshipLineData->cruiseShips as $cruiseShips): ?>
                                <option value="<?php echo $cruiseShips->shipname; ?>">
                                    <?php
                                    echo $cruiseShips->shipname; ?>
                                </option>

                            <?php endforeach; ?>

                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-1"></div>

                <div class="col-sm-4">
                    <select class="w-100 mb-3 form-control" name="total_night" aria-label="small select example">
                        <option value="">Total Nights stay</option>
                        <?php foreach ($nightsData as $nightData): ?>
                            <option value="<?php echo $nightData; ?>"><?php echo $nightData; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-sm-4">
                    <select class="w-100 mb-3 form-control" name="visit_place" aria-label="small select example">
                        <option value="">place Visit (Any)</option>
                        <?php foreach ($visitPlaceData as $visitplace): ?>
                            <option value="<?php echo $visitplace; ?>"><?php echo $visitplace; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-1"></div>

                <div class="col-sm-4 ">
                    <div class="cal_flx_input mb-3 w-100">
                        <input class="form-control form-control drop_in w-100" type="text"
                            placeholder="Departure Date(Any)" aria-label=".form-control-lg example" id="depart_date"
                            name="depart_date" autocomplete="off" readonly>
                        <div class="error_4  invalid-tooltip top-arrow" style="display:none"></div>
                    </div>
                </div>

                <div class="col-sm-4 ">
                    <div class="cal_flx_input mb-3 w-100">
                        <input class="form-control form-control drop_in w-100" type="text"
                            placeholder="Return Date(Any)" aria-label=".form-control-lg example" id="return_date"
                            name="return_date" autocomplete="off" readonly>
                        <div class="error_5 invalid-tooltip top-arrow" style="display:none"></div>
                    </div>
                </div>
            </div>
            <input type="hidden" name="uniqueId" value="<?php echo $num; ?>" />


            <div class="row">
                <div class="col-md-3 mb-3">
                    <button type="button" class="btn btn-primary btn w-100 " id="" name=""><i
                            class="fa-regular fa-paper-plane"></i> Confirm</button>
                </div>
                <div class="col-2"></div>
                <div class="col-md-3">
                    <button class="btn btn-primary btn w-100" name="deals"><i class="fa-regular fa-bell"></i>
                        Deals</button>
                </div>
            </div>
        </form>
    </div>
    <section class="popup">
        <div class="popup__content">
            <div class="close">
                <span></span>
                <span></span>
            </div>
            <p>Are you Sure</p>
            <div class="row center">
                <div class="col-md-5 mb-3">
                    <button class="btn btn-primary w-100 cancel">cancel</button>
                </div>
                <div class="col-md-5 mb-3">
                    <button type="submit" class="btn btn-primary  w-100 btnSubmit" id="submit1" name="submit1"><i
                            class="fa-regular fa-paper-plane"></i> submit</button>
                </div>
            </div>
        </div>
    </section>

    <div class="container">
        <div class="row ">
            <h4 style="color: rgb(55, 101, 175);">Top Cruise Ship</h4>
            <?php
            foreach ($results['cruiseLine'] as $cruise) {
                ?>
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <img src="<?php echo $cruise->ship_image; ?>" class="card-img-top" alt="...">
                        <!-- <img src="img.jpg" alt="" class="card-img-top"> -->
                        <div class="card-body">
                            <!-- <h5 class="card-title"><?php //echo $cruise->Ship_name; ?></h5> -->
                            <div class="col-6" style="display: inline-block;">
                                <img src="logo.png" alt="" style="height:50px;width:150px;">
                            </div>
                            <div class="col-4" style="display: inline-block;text-align: right;">
                                <span style="font-size: 10px;">From</span>
                                <p style="font-weight: 900;color: green;font-size: 20px;"><?php echo $cruise->ship_price; ?>
                                </p>

                            </div>
                            <p class="card-text">
                            <ul style="min-height:150px">
                                <?php foreach ($cruise->ship_desription as $description) { ?>
                                    <li style="font-size: 14px;">
                                        <h5><?php echo $description->title ?></h5>
                                        <p class="text-truncate"><?php echo $description->text ?></p>
                                    </li>
                                <?php } ?>
                            </ul>
                            </p>
                            <a href="#" class="btn btn-primary"
                                style="width: 100%;border-radius: 25px;font-weight: 600;"><?php echo $cruise->ship_name; ?></a>
                        </div>
                    </div>
                </div>
            <?php }
            ?>
        </div>
    </div>


    <div class="container">
        <div class="row ">
            <h4 style="color: rgb(55, 101, 175);">Top Cruise Ship</h4>
            <?php
            foreach ($results['popularCruiseLine'] as $popularCruise) {
                ?>
                <div class="col-lg-2 mb-3">
                    <div class="card">
                        <img src="<?php echo $popularCruise->img; ?>" style="height: 300px;" class="card-img-top "
                            alt="...">
                        <h3 class="popular-title"><?php echo $popularCruise->title; ?></>
                    </div>
                </div>
            <?php }
            ?>
        </div>
    </div>


    <div class="container">
        <div class="row ">
            <h4 style="color: rgb(55, 101, 175);">Best Departs Ports</h4>
            <?php
            foreach ($results['bestDepartPortsLine'] as $bestDepartData) {
                ?>
                <div class="col-lg-2 mb-3">
                    <div class="card">
                        <img src="<?php echo $bestDepartData->img; ?>" style="height: 300px;" class="card-img-top "
                            alt="...">
                        <h3 class="popular-title1"><?php echo $bestDepartData->title; ?></h3>
                        <!-- <p class="best-text"><?php //echo $bestDepartData->text; ?></p> -->
                    </div>
                </div>
            <?php }
            ?>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <h4 style="color: rgb(55, 101, 175);">Find the Best Cruise for you</h4>
            <?php foreach ($results['findbest'] as $findbest) { ?>
                <div class="text-wrap ">
                    <h3><?php echo $findbest->question; ?></h3>
                    <p><?php echo $findbest->answer; ?></p>
                </div>
            <?php } ?>
        </div>
    </div>


    <!-- //*script -->

    <script>
        $("button").click(function () {
            $(".popup").fadeIn(500);
        });
        $(".close").click(function () {
            $(".popup").fadeOut(500);
        });
        $(".cancel").click(function () {
            $(".popup").fadeOut(500);
        })
        $(document).ready(function () {

            // $("#cruise_menu").change(function () {
            //     var cruisedata = <?php //echo json_encode($results['cruiseshipLineData']) ?>;
            //     // console.log(cruisedata);
            //     $("#cruise_ship").empty();
            //     for (key in cruisedata) {
            //         if ($("#cruise_menu").val() == "") {
            //             var cruiseship_a = cruisedata[key]['cruiseShips']

            //             $("#cruise_ship").append('<option value="" selected>cruise ships (Any)</option>')
            //             for (val of cruiseship_a) {
            //                 $("#cruise_ship").append(
            //                     '<option value="' + val['shipname'] + '">' + val['shipname'] + "</option>"
            //                 );
            //             }
            //         } else {
            //             if (cruisedata[key].cruisename == $("#cruise_menu").val()) {
            //                 var cruiseship_a = cruisedata[key]['cruiseShips']
            //                 $("#cruise_ship").empty()
            //                 $("#cruise_ship").append('<option value="" selected>cruise ships (Any)</option>')
            //                 for (val of cruiseship_a) {
            //                     $("#cruise_ship").append(
            //                         '<option value="' + val['shipname'] + '">' + val['shipname'] + "</option>"
            //                     );
            //                 }
            //             }
            //         }

            //     }
            //     // var selectedValue = $(this).val();
            //     // var selectedText = $(this).find("option:selected").text();

            // });

            $("#cruise_menu").change(function () {
                var cruisedata = <?php echo json_encode($results['cruiseshipLineData']) ?>;

                var selectedCruise = $(this).val();
                $("#cruise_ship").empty();

                var selectedCruiseData = cruisedata.find(function (cruise) {
                    return cruise.cruisename === selectedCruise;
                });
                $("#cruise_ship").append('<option value="" selected>cruise ships (Any)</option>')
                if (selectedCruiseData) {
                    selectedCruiseData.cruiseShips.forEach(function (ship) {
                        $("#cruise_ship").append(
                            '<option value="' + ship.shipname + '">' + ship.shipname + "</option>"
                        );
                    });
                }
            });

        });



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
            console.log(input)
            // var regex = /^[0-9]*$/;
            var regex = /^[0-9]{10}$/;
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

        function select_cruiseLine(value, id) {
            console.log(value, id);
            // function getKeyByValue(object, value) {
            //     return Object.keys(object).find(key =>
            //         object[key] === value);
            // }

            // const exampleObject = {
            //     key1: 'Geeks',
            //     key2: 100,
            //     key3: 'Javascript'
            // };

            // ans = getKeyByValue(exampleObject, 'Geeks');
            // console.log(ans);
        }



        $(document).ready(function () {
            $('#submit1').click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                var name = $("#name").val();
                var phone_number = $("#mobile").val();
                var phone_length = $("#mobile").length;
                var total_passenger = $("#total_passenger").val();
                var pax_type = $('input[name=pax_type]:checked').val()
                var depart_date = $('#depart_date').val();
                var return_date = $('#return_date').val();
                var depart_ports = $('#Departure_ports').val();
                var checkbox = $('#return_port');
                var ErrorMsg = false;

                if (name == "" || name == null || name == undefined) {
                    // $(".error_1").addClass("invalid-tooltip");
                    $(".error_1").html("Please enter your name");
                    $(".popup").fadeOut(500);
                    $(".error_1").show();
                    $("#name").focus();
                    ErrorMsg = true;
                    return false;
                } else {
                    $(".error_1").hide();
                }

                //*Email
                // if (email_length != 0 && emailRegex.test(email) == false) {
                //     $(".error_2").show();
                // } else {
                //     $(".error_2").hide();
                // }


                // * phone
                if (phone_number == "" || phone_number == undefined || phone_number == null) {
                    // $(".error_2").addClass("invalid-tooltip");
                    $('.error_2').html("Please Fill your Mobile Number*");
                    $(".popup").fadeOut(500);
                    $('.error_2').show();
                    ErrorMsg = true;
                    return false;
                } else if (phone_length != 10) {
                    // $(".error_2").addClass("invalid-tooltip");
                    $('.error_2').html("please enter 10 digit*");
                    $('.error_2').show();
                    $(".popup").fadeOut(500);
                    ErrorMsg = true;
                    return false;
                }
                else {
                    $(".error_2").hide();
                }

                //* traveler
                if (total_passenger == "" || total_passenger == null || total_passenger == undefined) {
                    $(".error_3").addClass("invalid-tooltip");
                    $('.error_3').html("Please Fill your Total Passenger*");
                    $('.error_3').show();
                    $(".popup").fadeOut(500);
                    ErrorMsg = true;
                    return false;
                }
                else if (
                    total_passenger !== "" && total_passenger !== null && (
                        pax_type == null || pax_type == "" || pax_type == undefined)
                ) {
                    $(".error_3").addClass("invalid-tooltip");
                    $('.error_3').html("Error: Please choose the option below.*");
                    $('.error_3').show();
                    $(".popup").fadeOut(500);
                    ErrorMsg = true;
                    return false;
                } else {
                    $(".error_3").hide();
                }

                //* return and depart date
                if (depart_date == "" || depart_date == null || depart_date == undefined) {
                    $(".error_4").addClass("invalid-tooltip");
                    $('.error_4').html("Please Fill your Departure Date*");
                    $('.error_4').show();
                    $(".popup").fadeOut(500);
                    ErrorMsg = true;
                    return false;
                } else {
                    $(".error_4").hide();
                }

                if (return_date == "" || return_date == null || return_date == undefined) {
                    $(".error_5").addClass("invalid-tooltip");
                    $('.error_5').html("Please Fill your Return Date*");
                    $('.error_5').show();
                    $(".popup").fadeOut(500);
                    ErrorMsg = true;
                    return false;
                } else if (depart_date == return_date) {
                    $(".error_5").addClass("invalid-tooltip");
                    $('.error_5').html("Departure Date and Return Date cannot be same*");
                    $(".popup").fadeOut(500);
                    ErrorMsg = true;
                    return false;
                }
                else {
                    $(".error_5").hide();
                }


                if (!checkbox.is(':checked') && (depart_ports == "" || depart_ports == undefined || depart_ports == null)) {
                    // $(".error_6").addClass("invalid-feedback");
                    // $('.error_6').html("please choose the depart ports*");
                    // $('.error_6').show();
                    // ErrorMsg = true;

                } else if (checkbox.is(':checked') || depart_ports !== "") {
                    // console.log("Filled");
                    if (depart_ports !== "") {
                        checkbox.val(checkbox.val() + ' ' + depart_ports);
                        $(".popup").fadeOut(500);
                        console.log("Value updated: " + checkbox.val());
                    }
                } else {
                    $('.error_6').hide();
                }


                if (!ErrorMsg) {
                    $("#cruiseForm").submit()
                }

            });
        })



        $(function () {
            var date = new Date();
            $('#depart_date').daterangepicker({
                singleDatePicker: true,
                timePicker: false,
                autoUpdateInput: false,
                minDate: new Date(),
                maxDate: new Date(date.getFullYear(), date.getMonth() + 35, date.getDate()),// datepicker for 35 months from current months 
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
                    maxDate: new Date(date.getFullYear(), date.getMonth() + 35, date.getDate()),// datepicker for 35 months from current months 
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

        //total_passenger
        function select_traveler(val) {
            var text;
            if (val == 1) {
                text = "1 Adult";
            } else {
                text = val + " Adults";
            }
            var startingValueInfant = val == 1 ? 1 : 0;
            var html_text = `
            <div class="passenger_rio">
                <div class='mt-2 pt-2'>` + text + ` Choose: 
                    <input type="radio" class="radio" value="yes"  name="pax_type"  onclick="pax_travler(&quot;yes&quot;);" style="margin-left:10px;"> Yes
                    <input type="radio" class="radio" value="no"  name="pax_type" onclick="pax_travler(&quot;no&quot;);" style="margin-left:10px;"> No
                </div> 
                <span id="pax_travler" style="display:none;">
                    <div class="d-flex">
                        <div class="d-grid col-md-4 me-4">Adult
                            <select class="form-select drop_in" aria-label=".form-select-lg example" id="number_of_adults" name="number_of_adults">                         
                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
                        </div>
                        <div class="d-grid col-md-4 me-4">Child
                            <select class="form-select drop_in" aria-label=".form-select-lg example" id="number_of_children" name="number_of_children">                                                                                              
                                <option value="0" selected>0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                        </div>
                        <div class="d-grid col-md-4 me-4">Infant
                            <select class="form-select drop_in" aria-label=".form-select-lg example" id="number_of_infant" name="number_of_infant">                                                                            
                                <option value="${startingValueInfant}">${startingValueInfant}</option>
                            </select>
                        </div>
                    </div>
                </span> 
            </div>`;

            $('#populate_pax_opt').html(html_text);

            $("#number_of_adults").change(function () {
                let selectedValue = $(this).val();
                // console.log(selectedValue);
                $("#number_of_infant").empty();
                for (var i = 0; i <= selectedValue; i++) {
                    $("#number_of_infant").append(
                        '<option value="' + i + '">' + i + "</option>"
                    );
                }
            });
        }

        function pax_travler(val) {
            var totalpass = $("#total_passenger").val()
            // console.log(totalpass)
            if (val == "yes") {
                $("#number_of_adults").val(totalpass)
                // console.log(totalpass,"yes")
                $("#pax_travler").hide();
            } else if (val == "no") {
                $("#pax_travler").show();
            }
        }

    </script>
</body>

</html>