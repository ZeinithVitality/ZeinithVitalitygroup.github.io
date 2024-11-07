<?php
// Include Composer's autoloader
require 'vendor/autoload.php';

// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Initialize variables
$name = $email = $date = $service = $message = $anonymity = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate and assign form inputs
    $anonymity = isset($_POST['anonymity']) ? htmlspecialchars($_POST['anonymity']) : 'Yes'; // Default to Yes
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $date = isset($_POST['date']) ? htmlspecialchars($_POST['date']) : '';
    $service = isset($_POST['service']) ? htmlspecialchars($_POST['service']) : '';
    $message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : '';

    // Validate email format and required fields
    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL) && ($anonymity == "No" ? !empty($name) : true)) {
        // Create a new PHPMailer instance
        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP();                                      // Use SMTP
            $mail->Host = 'smtp.office365.com';                    // SMTP server (Outlook)
            $mail->SMTPAuth = true;                                // Enable SMTP authentication
            $mail->Username = 'OnkarabileDube@ZeinithVitalityGroup.onmicrosoft.com';    // Your Outlook email
            $mail->Password = 'ZeinithVitality2024';     // Your password (or app password if 2FA is enabled)
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;    // Enable TLS encryption
            $mail->Port = 587;                                     // TCP port to connect to

            // Set the sender's address to your own email
            $mail->setFrom('OnkarabileDube@ZeinithVitalityGroup.onmicrosoft.com', 'zeinvitality
            
            
            
            
            ');

            // Set the client's email as the Reply-To address
            $mail->addReplyTo($email, ($anonymity == "Yes" ? "Anonymous" : $name));

            // Recipient (fixed recipient such as hiring manager)
            $mail->addAddress('invoices@zeinithvitalitygroup883.onmicrosoft.com'); // Replace with the recipient's email

            // Content
            $mail->isHTML(true);                                   // Set email format to HTML
            $mail->Subject = 'New Booking Request';
            $mail->Body = "Name: " . ($anonymity == "Yes" ? "Anonymous" : $name) . "<br>Email: $email<br>Preferred Date: $date<br>Service: $service<br>Additional Notes: $message";

            // Send the email
            $mail->send();
            echo 'Message has been sent';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    } else {
        echo "Please fill out all required fields with valid information.";
    }
}
