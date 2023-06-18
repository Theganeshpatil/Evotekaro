import smtplib
from email.mime.text import MIMEText
from dotenv.main import load_dotenv
import os
import ssl

load_dotenv()

def login_details(to_email: str, username: str, password: str):
    # Set up email content
    subject = "Your Account Details"
    message = f"Hello {username},\n\nYour account has been created.\nUsername: {to_email}\nPassword: {password}\n\nThank you!"

    # Set up email parameters
    from_email = os.environ['FROM_EMAIL']
    smtp_server = os.environ['SMTP_SERVER']
    smtp_port = os.environ['SMTP_PORT']
    smtp_username = os.environ['SMTP_USERNAME']
    smtp_password = os.environ['SMTP_PASSWORD']
    # Create email object
    email = MIMEText(message)
    email["Subject"] = subject
    email["From"] = from_email
    email["To"] = to_email

    # Send email using SMTP
    try:
        with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
            # server.starttls()
            server.login(smtp_username, smtp_password)
            server.sendmail(from_email, to_email, email.as_string())
        print("Email sent successfully.")
    except smtplib.SMTPException as e:
        print("An error occurred while sending the email:", str(e))
