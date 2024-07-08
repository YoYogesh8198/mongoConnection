<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// for warning when warning show on UI
include 'db.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cruise</title>
    <link rel="stylesheet" href="css/owl.carousel.min.css" />
    <link rel="stylesheet" type="text/css" href="css/daterangepicker.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css" />

    <style>

    </style>
</head>

<body>

    <div id="main_ctr">
        <div class="cfgInner">
            <?php include_once "header.php"; ?>
            <div class="main_section">

                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 p_lrzero">
                            <div class="form-left">
                                <form class="needs-validation" action="#" id="cruiseForm">
                                    <div class="upperside">
                                        <h2 class="mb-2 form_heding">Cruise Inquiry </h2>
                                        <div class="form-row row m_bottom">
                                            <div class="form-group col-md-6 p_lzero">

                                                <input type="text" class="form-control input-sm" id="name" name="name"
                                                    placeholder="Name" onkeyup="show_name(this.value);" required=""
                                                    oninvalid="this.setCustomValidity('Please enter your name.')"
                                                    oninput="setCustomValidity('')">
                                                <div class="invalid-tooltip top-arrow error_1" style="display: none;">
                                                    Please enter your name.
                                                </div>
                                            </div>
                                            <div class="form-group col-md-6">

                                                <input type="email" class="form-control input-sm" id="email"
                                                    name="email" placeholder="Email" required=""
                                                    oninvalid="this.setCustomValidity('Please enter a valid email.')"
                                                    oninput="setCustomValidity('')" onkeyup="checkEmail(this.value);">
                                                <div class="invalid-tooltip top-arrow error_2" style="display: none;">
                                                    Please enter a valid email.
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-row row mb-1">
                                            <div class="form-group col-md-6 mb-2 p_lzero">

                                                <input type="tel" class="form-control input-sm" id="number"
                                                    name="number" placeholder="Number" required=""
                                                    oninvalid="this.setCustomValidity('Please enter your phone number.')"
                                                    oninput="setCustomValidity('')"
                                                    onkeyup="checkValidateMobile(this.value)">
                                                <div class="invalid-tooltip top-arrow error_3" style="display: none;">
                                                    Please enter your phone number.
                                                </div>
                                            </div>
                                            <div class="form-group col-md-6 mb-2">

                                                <select class="form-select input-sm input-sm2" id="travelers"
                                                    name="travelers" required=""
                                                    oninvalid="this.setCustomValidity('Please select the number of travelers.')"
                                                    oninput="setCustomValidity('')">
                                                    <option value disabled selected>
                                                        Travelers</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                </select>
                                                <div class="invalid-tooltip top-arrow error_4" style="display: none;">
                                                    Please select the number of travelers.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="downside">
                                        <div class="form-row row m_bottom">
                                            <div class="form-group col-md-6 mt-2 p_lzero">

                                                <select class="form-select input-sm" id="destination" name="destination"
                                                    required=""
                                                    oninvalid="this.setCustomValidity('Please select a destination.')"
                                                    oninput="setCustomValidity('')">
                                                    <option value="">Destination (Any)</option>
                                                    <?php foreach ($regionsData as $region): ?>
                                                        <option class="" value="<?php echo $region; ?>">
                                                            <?php echo $region; ?>
                                                        </option>
                                                    <?php endforeach; ?>

                                                </select>
                                                <div class="invalid-tooltip top-arrow error_5" style="display: none;">
                                                    Please select a destination.
                                                </div>
                                            </div>
                                            <div class="form-group col-md-6  mt-2">

                                                <select class="form-select input-sm" id="cruise-length"
                                                    name="cruise-length" required=""
                                                    oninvalid="this.setCustomValidity('Please select a cruise length.')"
                                                    oninput="setCustomValidity('')">
                                                    <option value="" disabled selected>Cruise
                                                        length (Any)</option>
                                                    <?php foreach ($nightsData as $nightData): ?>
                                                        <option value="<?php echo $nightData; ?>"><?php echo $nightData; ?>
                                                        </option>
                                                    <?php endforeach; ?>

                                                </select>
                                                <div class="invalid-tooltip top-arrow error_6" style="display: none;">
                                                    Please select a cruise length.
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-row row m_bottom">
                                            <div class="form-group col-md-6 position-relative p_lzero">
                                                <input type="text" id="depart_date" name="add_hold_time"
                                                    class="form-control input-sm">
                                                <img class="ui-datepicker-trigger" src="images/cal.png"
                                                    alt="Click here for calendar" title="Click here for calendar">
                                                <div class="invalid-tooltip top-arrow error_7" style="display: none;">
                                                    Please select a departure date.
                                                </div>
                                                <input type="hidden" id="depart">
                                                <input type="hidden" id="return">
                                            </div>

                                            <div class="form-group col-md-6">

                                                <select class="form-select input-sm" id="cruise-line" name="cruise-line"
                                                    required=""
                                                    oninvalid="this.setCustomValidity('Please select a cruise line.')"
                                                    oninput="setCustomValidity('')">
                                                    <option value="" disabled selected>cruise Lines(Any)</option>
                                                    <?php foreach ($results['cruiseshipLineData'] as $cruiseshipLineData): ?>
                                                        <option value="<?php echo $cruiseshipLineData->cruisename; ?>">
                                                            <?php echo $cruiseshipLineData->cruisename; ?>
                                                        </option>
                                                    <?php endforeach; ?>
                                                </select>
                                                <div class="invalid-tooltip top-arrow error_8" style="display: none;">
                                                    Please select a cruise line.
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-row row m_bottom">
                                            <div class="form-group col-md-6 p_lzero">

                                                <select class="form-select input-sm" id="cruise-ship" name="cruise-ship"
                                                    required=""
                                                    oninvalid="this.setCustomValidity('Please select a cruise ship.')"
                                                    oninput="setCustomValidity('')">

                                                    <option value="" disabled selected>Cruise
                                                        ship (Any)</option>
                                                    <?php foreach ($results['cruiseshipLineData'] as $cruiseshipLineData): ?>
                                                        <?php foreach ($cruiseshipLineData->cruiseShips as $cruiseShips): ?>
                                                            <option value="<?php echo $cruiseShips->shipname; ?>">
                                                                <?php
                                                                echo $cruiseShips->shipname; ?>
                                                            </option>

                                                        <?php endforeach; ?>

                                                    <?php endforeach; ?>
                                                </select>
                                                <div class="invalid-tooltip top-arrow error_9" style="display: none;">
                                                    Please select a cruise ship.
                                                </div>
                                            </div>
                                            <div class="form-group col-md-6">

                                                <select class="form-select input-sm" id="departure-port"
                                                    name="departure-port" required=""
                                                    oninvalid="this.setCustomValidity('Please select a departure port.')"
                                                    oninput="setCustomValidity('')">
                                                    <option value="" disabled selected>Departure ports(Any)</option>
                                                    <?php foreach ($departurePorts as $DeparturePorts): ?>
                                                        <option class="" value="<?php echo $DeparturePorts; ?>">
                                                            <?php echo $DeparturePorts; ?>
                                                        </option>
                                                    <?php endforeach; ?>
                                                </select>
                                                <div class="invalid-tooltip top-arrow error_10" style="display: none;">
                                                    Please select a departure port.
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-row row m_bottom">
                                            <div class="form-group col-md-6 p_lzero">
                                                <a id="pop_up" tabindex="0" class="lock_btn_page" data-placement="top"
                                                    role="button" data-bs-toggle="popover" title="">Additional Discounts
                                                    <img class="arrow-down" src="images/add_arrow.svg"></a>
                                                <div hidden>
                                                    <div data-name="popover-content">
                                                        <div class="add_body">
                                                            <span>Discount $ <input type="number">
                                                            </span>
                                                            <!-- <button class="btn-close btn-close-popover close-popover">X</button> -->
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- <a class="collapsed" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                            Additional Discounts
                                            <img class="arrow-down" src="images/add_arrow.svg" alt="Arrow">
                                        </a>
                                        
                                        <div class="collapse add_collapse" id="collapseExample">
                                            <div class="card card-body add_body">
                                           <span>Discount $ <input type="number">
                                            </span>
                                            </div>
                                        </div> -->

                                            </div>
                                            <div class="form-group custombtn col-md-6">
                                                <button type="submit" id="submit1"
                                                    class="btn btn_submit ">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="form-right ">
                                <div class="upto_main">
                                    <div class="uptotxt">
                                        <div class="Up_to">Up to</div>
                                        <div class="OFF">37% OFF</div>
                                        <div class="Cheap_Cruises">Cheap Cruises</div>
                                    </div>
                                    <div class="banner_sec_por text-center">
                                        <h1>Need Help Booking?</h1>
                                        <p class="banner_deal">It's Free! <span><br>Call Experts 24x7x365</span></p>

                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="banner_call"><i class="fas fa fa-phone"
                                                        aria-hidden="true"></i>
                                                    1-844-313-1111</div>
                                            </div>
                                        </div>
                                        <h1 class="world_lar">World’s Largest Cruise Agency</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 col-xs-12">
                        <div class="sa-icnInfo">
                            <div class="row">

                                <div class="col-4 col-md-4">
                                    <img role="img" alt="Easier Than Ever Booking Icon" class="s_booking img-fluid"
                                        src="images/eaiser_than.png">
                                    <h2>Easier Than Ever Booking</h2>
                                </div>

                                <div class="col-4 col-md-4">
                                    <img role="img" alt="Available 24x7x365 Icon" class="s_24hr img-fluid"
                                        src="images/available_24.png">
                                    <h2>Available 24x7x365</h2>
                                </div>

                                <div class="col-4 col-md-4">
                                    <img role="img" alt="Flight Expert Since 1990 Icon" class="s_expert img-fluid"
                                        src="images/flight_expert.png">
                                    <h2>Flight Expert Since 1990</h2>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <div class="row polDest">
                    <div class="col-sm-12 col-xs-12 no-paddLF">

                        <div class="sa-call-now-section">

                            <div class="sa-for-new">

                                <div class="sa-top-callbox">
                                    <div class="sa-call-inner-sec">
                                        <h2>Get Great Flight Prices from Our Travel Experts 24x7x365</h2>
                                    </div>
                                    <!-- <div class="sa-supersale">Super Sale</div> -->
                                    <div class="getcl-blk">
                                        <img role="img" alt="Call Icon" class="get-phnimg"
                                            src="https://cdn.airfuture.com/img/res/simPhn.svg">
                                        <span class="sa-call-new" role="heading">Call</span>
                                        <span class="sa-phno-txt">
                                            <a role="button" aria-label="call 1-213-225-9867" href="tel:1-213-225-9867"
                                                class="hidden-xs">1-213-225-9867</a>
                                            <a role="button" aria-label="call 1-213-955-9695" href="tel:+1213-955-9695"
                                                class="visible-xs">1-213-955-9695</a>
                                        </span>
                                    </div>
                                    <div class="sa-or">or</div>
                                    <a role="button" aria-label="Get a Call" href="javascript:void(0)"
                                        class="sa-clnowbtn" onclick="MobGetCall();">Get a Call</a>
                                </div>
                                <div class="sa-assist-img-desk">
                                    <img role="img" alt="Call Assist Icon" src="images/call-center-girl1.jpg">
                                </div>

                            </div>

                            <div class="clearfix"></div>
                            <div class="mob_get_form" id="mob_getcall_form"></div>
                        </div>



                    </div>
                </div>
            </div>
            <!--  -->

            <div class="container">
                <div class="row">
                    <div class="col-md-12 top_heading">Top Cruise Line</div>
                </div>
                <div class="row popular_top">
                    <?php
                    foreach ($results['cruiseLine'] as $cruise) {
                        ?>
                        <div class="col-12 col-md-4">
                            <div class="box_shadow">
                                <img class="w-100 img-fluid" src="<?php echo $cruise->ship_image; ?>" alt="Cuise">
                                <div class="priceTagConainer">
                                    <div class="priceTag">
                                        <p>From</p>
                                        <span><?php echo $cruise->ship_price; ?></span>
                                    </div>
                                </div>
                                <div class="card-content">
                                    <!-- <div class="card-heading"><img src="images/cruise-logo-2.jpg" alt="Top Cruise Logo"> -->
                                    <div class="card-heading"><img src="<?php echo $cruise->ship_logo; ?>"
                                            alt="Top Cruise Logo">
                                    </div>
                                    <ul class="list">
                                        <?php foreach ($cruise->Ship_desription as $description) { ?>
                                            <li>
                                                <h4><?php echo $description->title ?></h4>
                                                <p> <?php echo $description->text ?></p>
                                            </li>
                                        <?php } ?>
                                        <!-- <li>
                                            <h4>Early Saver Sale</h4>
                                            <p> Up to 40% Savings + $50 to Spend on Board </p>
                                        </li>
                                        <li>
                                            <h4>Military Bonus</h4>
                                            <p> Limited-Time Reduced Rates </p>
                                        </li> -->
                                    </ul>
                                    <div class="actionButton"><a href="#"><?php echo $cruise->Ship_name; ?><img
                                                src="images/price-arrow.jpg" alt="Price arrow icon"></a></div>
                                </div>
                            </div>
                        </div>
                    <?php }
                    ?>
                </div>
            </div>
            <!-- <div class="col-12 col-md-4">
                        <div class="box_shadow">
                            <img class="w-100 img-fluid" src="images/top_cruise_img2.jpg" alt="Cuise">
                            <div class="priceTagConainer">
                                <div class="priceTag">
                                    <p>From</p>
                                    <span>$215</span>
                                </div>
                            </div>
                            <div class="card-content">
                                <div class="card-heading"><img src="images/cruise-logo-3.jpg" alt="Top Cruise Logo">
                                </div>
                                <ul class="list">
                                    <li>
                                        <h4>Our Royal Exclusive</h4>
                                        <p> Free Specialty Dinner for 2</p>
                                    </li>
                                    <li>
                                        <h4>Our Royal Exclusive</h4>
                                        <p>Up to $100 to Spend on Board</p>
                                    </li>
                                    <li>
                                        <h4>Buzzer Beater</h4>
                                        <p>Up to $550 Instant Savings</p>
                                    </li>
                                </ul>
                                <div class="actionButton"><a href="#">Carnival Cruise Line <img
                                            src="images/price-arrow.jpg" alt="Price arrow icon"></a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="box_shadow">
                            <img class="w-100 img-fluid" src="images/top_cruise_img3.jpg" alt="Cuise">
                            <div class="priceTagConainer">
                                <div class="priceTag">
                                    <p>From</p>
                                    <span>$224</span>
                                </div>
                            </div>
                            <div class="card-content">
                                <div class="card-heading"><img src="images/cruise-logo-4.jpg" alt="Top Cruise Logo">
                                </div>
                                <ul class="list">
                                    <li>
                                        <h4>Our Norwegian Exclusive</h4>
                                        <p> Up to to $200 to Spend on Board</p>
                                    </li>
                                    <li>
                                        <h4>Father's Day Sale</h4>
                                        <p>35% Off All Cruises+ All the Free at Sea Offers(Like Free Drinks)</p>
                                    </li>
                                    <li>
                                        <h4>Military Bonus</h4>
                                        <p>10% Savings</p>
                                    </li>
                                </ul>
                                <div class="actionButton"><a href="#">Carnival Cruise Line <img
                                            src="images/price-arrow.jpg" alt="Price arrow icon"></a></div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row popular_bottom">
                    <div class="col-12 col-md-4">
                        <div class="box_shadow">
                            <img class="w-100 img-fluid" src="images/top_cruise_img4.jpg" alt="Cuise">
                            <div class="priceTagConainer">
                                <div class="priceTag">
                                    <p>From</p>
                                    <span>$211</span>
                                </div>
                            </div>
                            <div class="card-content">
                                <div class="card-heading"><img src="images/cruise-logo-5.jpg" alt="Top Cruise Logo">
                                </div>
                                <ul class="list">
                                    <li>
                                        <h4>Our Carnival Exclusive</h4>
                                        <p> Up to $75 to Spend on Board </p>
                                    </li>
                                    <li>
                                        <h4>Early Saver Sale</h4>
                                        <p> Up to 40% Savings + $50 to Spend on Board </p>
                                    </li>
                                    <li>
                                        <h4>Military Bonus</h4>
                                        <p> Limited-Time Reduced Rates </p>
                                    </li>
                                </ul>
                                <div class="actionButton"><a href="#">Carnival Cruise Line <img
                                            src="images/price-arrow.jpg" alt="Price arrow icon"></a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="box_shadow">
                            <img class="w-100 img-fluid" src="images/top_cruise_img5.jpg" alt="Cuise">
                            <div class="priceTagConainer">
                                <div class="priceTag">
                                    <p>From</p>
                                    <span>$215</span>
                                </div>
                            </div>
                            <div class="card-content">
                                <div class="card-heading"><img src="images/top_cruise_logo-1.jpg" alt="Top Cruise Logo">
                                </div>
                                <ul class="list">
                                    <li>
                                        <h4>Our Royal Exclusive</h4>
                                        <p> Free Specialty Dinner for 2</p>
                                    </li>
                                    <li>
                                        <h4>Our Royal Exclusive</h4>
                                        <p>Up to $100 to Spend on Board</p>
                                    </li>
                                    <li>
                                        <h4>Buzzer Beater</h4>
                                        <p>Up to $550 Instant Savings</p>
                                    </li>
                                </ul>
                                <div class="actionButton"><a href="#">Carnival Cruise Line <img
                                            src="images/price-arrow.jpg" alt="Price arrow icon"></a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="box_shadow mb-zero">
                            <img class="w-100 img-fluid" src="images/top_cruise_img6.jpg" alt="Cuise">
                            <div class="priceTagConainer">
                                <div class="priceTag">
                                    <p>From</p>
                                    <span>$224</span>
                                </div>
                            </div>
                            <div class="card-content">
                                <div class="card-heading"><img src="images/cruise-logo-1.jpg" alt="Top Cruise Logo">
                                </div>
                                <ul class="list">
                                    <li>
                                        <h4>Our Norwegian Exclusive</h4>
                                        <p> Up to to $200 to Spend on Board</p>
                                    </li>
                                    <li>
                                        <h4>Father's Day Sale</h4>
                                        <p>35% Off All Cruises+ All the Free at Sea Offers(Like Free Drinks)</p>
                                    </li>
                                    <li>
                                        <h4>Military Bonus</h4>
                                        <p>10% Savings</p>
                                    </li>
                                </ul>
                                <div class="actionButton"><a href="#">Carnival Cruise Line <img
                                            src="images/price-arrow.jpg" alt="Price arrow icon"></a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- * -->
            <div class="container">
                <div class="row">
                    <div class="col-md-12 top_heading2">Popular Crumise Destination</div>
                </div>
                <!-- Slider -->
                <div class="carousel-container">
                    <div id="new-slider" class="owl-carousel owl-theme">
                        <?php foreach ($results['popularCruiseLine'] as $popularCruise) { ?>
                            <div class="slider-wrapper">
                                <div class="imgCard">
                                    <div class="imgtext">
                                        <?php echo $popularCruise->title; ?>
                                    </div>
                                    <img src="<?php echo $popularCruise->img; ?>" alt="Popular Cruise Image1">
                                </div>
                            </div>
                        <?php } ?>
                    </div>
                </div>

            </div>
            <!-- <div class="slider-wrapper">
                            <div class="imgCard">
                                <div class="imgtext">
                                    Mexico
                                </div>
                                <img src="images/scroll_img2.jpg" alt="Popular Cruise Image2">
                            </div>
                        </div>
                        <div class="slider-wrapper">
                            <div class="imgCard">
                                <div class="imgtext">
                                    Hawai
                                </div>
                                <img src="images/scroll_img3.jpg" alt="Popular Cruise Image3">
                            </div>
                        </div>
                        <div class="slider-wrapper">
                            <div class="imgCard">
                                <div class="imgtext">
                                    Alaska
                                </div>
                                <img src="images/scroll_img4.jpg" alt="Popular Cruise Image4">
                            </div>
                        </div>
                        <div class="slider-wrapper">
                            <div class="imgCard">
                                <div class="imgtext">
                                    Caribbean
                                </div>
                                <img src="images/scroll_img5.jpg" alt="Popular Cruise Image5">
                            </div>
                        </div>
                        <div class="slider-wrapper">
                            <div class="imgCard">
                                <div class="imgtext">
                                    Europe
                                </div>
                                <img src="images/scroll_img6.jpg" alt="Popular Cruise Image6">
                            </div>
                        </div>
                        <div class="slider-wrapper">
                            <div class="imgCard">
                                <div class="imgtext">
                                    New Jersy
                                </div>
                                <img src="images/scroll_img7.jpg" alt="Popular Cruise Image7">
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
            <!--  -->
            <div class="container">
                <div class="row">
                    <div class="col-md-12 top_heading3">Departure Port with Great Cruises Leaving from</div>
                </div>
                <!-- Slider -->
                <div class="carousel-container">
                    <div id="new-slider2" class="owl-carousel owl-theme">
                        <?php foreach ($results['bestDepartPortsLine'] as $bestDepartData) { ?>

                            <div class="slider-wrapper">
                                <div class="imgCard imgCard2">
                                    <div class="imgtext">
                                        <?php echo $bestDepartData->title; ?>
                                    </div>
                                    <img src="<?php echo $bestDepartData->img; ?>" alt="Popular Cruise Image1">
                                </div>
                            </div>
                        <?php } ?>
                        <!-- <div class="slider-wrapper">
                            <div class="imgCard imgCard2">
                                <div class="imgtext">
                                    Mexico
                                </div>
                                <img src="images/scroll_sec_img2.jpg" alt="Popular Cruise Image2">
                            </div>
                        </div>
                        <div class="slider-wrapper">
                            <div class="imgCard imgCard2">
                                <div class="imgtext">
                                    Hawai
                                </div>
                                <img src="images/scroll_sec_img3.jpg" alt="Popular Cruise Image3">
                            </div>
                        </div>
                        <div class="slider-wrapper">
                            <div class="imgCard imgCard2">
                                <div class="imgtext">
                                    Alaska
                                </div>
                                <img src="images/scroll_sec_img4.jpg" alt="Popular Cruise Image4">
                            </div>
                        </div>
                        <div class="slider-wrapper">
                            <div class="imgCard imgCard2">
                                <div class="imgtext">
                                    Caribbean
                                </div>
                                <img src="images/scroll_sec_img5.jpg" alt="Popular Cruise Image5">
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>

            <!-- *  -->
            <div class="container">
                <div class="row">
                    <div class="col-md-12 top_heading3">Find the Best Cruise Vacation for you</div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="accordion accordion_mine" id="accordionExample">
                            <?php foreach ($results['findbest'] as $index => $findbest) { ?>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="heading_<?php echo $index; ?>">
                                        <button class="accordion-button <?php echo $index === 0 ? 'active' : ''; ?>"
                                            type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapse_<?php echo $index; ?>"
                                            aria-expanded="<?php echo $index === 0 ? 'true' : 'false'; ?>"
                                            aria-controls="collapse_<?php echo $index; ?>">
                                            <?php echo $findbest->question; ?>
                                        </button>
                                    </h2>
                                    <div id="collapse_<?php echo $index; ?>"
                                        class="accordion-collapse collapse <?php echo $index === 0 ? 'show' : ''; ?>"
                                        aria-labelledby="heading_<?php echo $index; ?>" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <?php echo $findbest->answer; ?>
                                        </div>
                                    </div>
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <?php include_once "footer.php" ?>
        <!--Responsive menu css end here-->


        <!-- form -->

    </div>
    <!-- end -->

    <!-- <script src="js/index.js"></script> -->
    <script src="js/jquery.min.js"></script>
    <script src="js/owl.carousel.min.js"></script>
    <script src="js/validation.js"></script>

    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/index.js"></script>
    <script>

        //Script for sidebar nav start
        $(window).resize(function () {
            if ($(window).width() < 768) {
                document.getElementById("mySidenav").style.width = "0";
            }
            else {
                document.getElementById("mySidenav").style.width = "auto";
            }

        });


        function openNav() {
            event.stopPropagation();
            $('.hambrg').hide();
            $('.hambrg').addClass('open');
            if ($('.hambrg').hasClass("open")) {
                $('body').addClass('noscroll');
            }
            else {
                $('body').removeClass('noscroll');
            }
            document.getElementById("mySidenav").style.width = "180px";
            document.getElementById("main_ctr").style.marginLeft = "-180px";
        }

        function closeNav() {
            event.stopPropagation();
            $('.hambrg').show();
            $('.hambrg').removeClass('open');
            if ($('.hambrg').hasClass("open")) {
                $('body').addClass('noscroll');
            }
            else {
                $('body').removeClass('noscroll');
            }
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main_ctr").style.marginLeft = "0";
        }


    </script>
    <script type="text/javascript" src="js/moment.min.js"></script>
    <script type="text/javascript" src="js/daterangepicker.min.js"></script>

    <script>
        $(function () {
            $('input[name="add_hold_time"]').daterangepicker({
                minDate: new Date(),
                startDate: moment(),
                endDate: moment().add(1, "Day"),
                locale: {
                    format: 'YYYY-MM-DD'
                }
            })
            .on("apply.daterangepicker", function (ev, picker) {
                $('#depart').val(picker.startDate.format("YYYY-MM-DD"));
                $('#return').val(picker.endDate.format("YYYY-MM-DD"));
            })

        });

    </script>

    <script>
        $(document).ready(function () {
            var options = {
                html: true,
                content: $('[data-name="popover-content"]'),
                placement: 'top' // Set the placement to 'top'

            }
            var exampleEl = document.getElementById('pop_up')
            var popover = new bootstrap.Popover(exampleEl, options)
            // Close popover if click outside of it
            $('body').on('click', function (e) {
                // Check if the clicked element is not within the popover content or the popover trigger
                if (!popover._element.contains(e.target) && !exampleEl.contains(e.target)) {
                    popover.hide();
                }
            });
            // Prevent closing popover when clicking on any element inside the popover content
            $('[data-name="popover-content"]').on('click', function (e) {
                e.stopPropagation(); // Prevent event from bubbling up to body click event
            });
            // Close popover when close button is clicked
            $('.close-popover').on('click', function () {
                popover.hide();
            });
        })
    </script>
    <script>
        document.getElementById('pop_up').addEventListener('click', function () {
            // Get the image element
            var image = this.querySelector('img.arrow-down');

            // Toggle rotation
            if (image.classList.contains('rotate')) {
                image.style.transform = 'rotate(0deg)';
                image.classList.remove('rotate');
            } else {
                image.style.transform = 'rotate(180deg)';
                image.classList.add('rotate');
            }
        });



        $("#cruise-line").change(function () {
            var cruisedata = <?php echo json_encode($results['cruiseshipLineData']) ?>;

            var selectedCruise = $(this).val();
            $("#cruise-ship").empty();

            var selectedCruiseData = cruisedata.find(function (cruise) {
                return cruise.cruisename === selectedCruise;
            });
            $("#cruise-ship").append('<option value="" selected>cruise ships (Any)</option>')
            if (selectedCruiseData) {
                selectedCruiseData.cruiseShips.forEach(function (ship) {
                    $("#cruise-ship").append(
                        '<option value="' + ship.shipname + '">' + ship.shipname + "</option>"
                    );
                });
            }
        }); 
    </script>
    <!-- <script src="js/guru-new.js"></script> -->
</body>

</html>