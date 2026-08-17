<?php
error_reporting(0); // Suppress warnings that might corrupt JSON output

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $background = $_POST['background'] ?? '';
    $experience = $_POST['experience'] ?? '';
    $payment_id = 'Not Applicable - Free Workshop';


    $url = "https://script.google.com/macros/s/AKfycbyeOsulFfNlYci_F3uXnOrDNkJLowfaTnMs9GNJUt_ZuD7a7qlsVZRNIZ-qPGqiBuTvJg/exec";
    
    $data = array(
        "sheet_name" => "Sheet1", // This corresponds to the sheet named 'Sheet1'
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
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode(["status" => "success"]);
        exit();
    } else {
        $error_msg = $error ? $error : "Response: " . $result;
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode(["status" => "error", "message" => $error_msg]);
        exit();
    }

}

?>