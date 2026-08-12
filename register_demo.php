<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $background = $_POST['background'] ?? 'N/A';
    $experience = $_POST['experience'] ?? 'N/A';

    $url = "https://script.google.com/macros/s/AKfycbzgXrNUhQy9rnVrXprf94f8Hi-kPuGDeDhblNFt0B7aINKa9oqxS7KRGd-pkpZM5Gqb/exec";
    
    $data = array(
        "sheet_name" => "Sheet1",
        "spreadsheet_id" => "15YLBv2kSTBEEf7VzjzZyCYM4FgGUwWUrpnvz_YEIzQI",
        "sheet_url" => "https://docs.google.com/spreadsheets/d/15YLBv2kSTBEEf7VzjzZyCYM4FgGUwWUrpnvz_YEIzQI/edit?usp=sharing",
        "name" => $name,
        "phone" => $phone,
        "email" => $email,
        "background" => $background,
        "experience" => $experience,
        "payment_id" => "Free Workshop"
    );

    // --- START EMAIL SENDING ---
    $to = "tradepulse14@gmail.com";
    $cc = "danishwebsite002@gmail.com";
    $subject = "New 2-Day Workshop Registration";
    $message = "
    New Demo Registration Received:

    Name: $name

    Phone: $phone

    Email: $email
    ";

    $headers = "From: noreply@tradepulse.academy\r\n";
    $headers .= "CC: $cc\r\n";
    if (!empty($email)) {
        $headers .= "Reply-To: $email\r\n";
    }
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mail($to, $subject, $message, $headers);
    // --- END EMAIL SENDING ---

    // Send POST request to Google Apps Script
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Fix for local server SSL issues
    
    $result = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);

    if ($result !== false && $result !== "Sheet not found") {
        header("Location: thank-you.php");
        exit();
    } else {
        $error_msg = $error ? $error : "Response: " . $result;
        echo "
        <script>
        alert('Data sending failed! Error: " . addslashes($error_msg) . "');
        window.history.back();
        </script>
        ";
    }

}

?>