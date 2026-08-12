<?php
error_reporting(0); // Suppress warnings that might corrupt JSON output

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $background = $_POST['background'] ?? '';
    $experience = $_POST['experience'] ?? '';
    $payment_id = 'Not Applicable - Free Workshop';


    $url = "https://script.google.com/macros/s/AKfycbzgXrNUhQy9rnVrXprf94f8Hi-kPuGDeDhblNFt0B7aINKa9oqxS7KRGd-pkpZM5Gqb/exec";
    
    $data = array(
        "sheet_name" => "Sheet1", // This corresponds to the sheet named 'Sheet1'
        "spreadsheet_id" => "15YLBv2kSTBEEf7VzjzZyCYM4FgGUwWUrpnvz_YEIzQI",
        "sheet_url" => "https://docs.google.com/spreadsheets/d/15YLBv2kSTBEEf7VzjzZyCYM4FgGUwWUrpnvz_YEIzQI/edit?usp=sharing",
        "name" => $name,
        "phone" => $phone,
        "email" => $email,
        "background" => $background,
        "experience" => $experience,
        "payment_id" => $payment_id
    );

    // --- START EMAIL SENDING ---
    $to = "tradepulse14@gmail.com";
    $cc = "danishwebsite002@gmail.com";
    $subject = "New 2-Day Workshop Registration";
    $message = "
    New Registration Received:

    Name: $name

    Phone: $phone

    Email: $email
    
    Workshop: Free 2-Day Workshop
    Payment: Not Applicable - Free Workshop
    ";

    $headers = "From: noreply@tradepulse.academy\r\n";
    $headers .= "CC: $cc\r\n";
    if (!empty($email)) {
        $headers .= "Reply-To: $email\r\n";
    }
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mail($to, $subject, $message, $headers);
    // --- END EMAIL SENDING ---

    // Send POST request to Google Apps Script (fast non-blocking execution)
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Fix for local server SSL issues
    curl_setopt($ch, CURLOPT_TIMEOUT, 3); // Max 3s timeout
    
    $result = curl_exec($ch);
    curl_close($ch);

    ob_clean();
    header('Content-Type: application/json');
    echo json_encode(["status" => "success"]);
    exit();

}

?>