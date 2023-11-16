export const resetPasswordHTMLTemplate = (username: string, resetUrl: string) =>
	`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <html xmlns="http://www.w3.org/1999/xhtml">
     <head>
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <meta name="x-apple-disable-message-reformatting" />
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
       <meta name="color-scheme" content="light dark" />
       <meta name="supported-color-schemes" content="light dark" />
       <title></title>
       <style type="text/css" media="all">
         @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
       </style>
     </head>
     <body>

       <h1>Hi! ${username},</h1>
       <p>
         You recently requested to reset your password for your RoomWise account. Use the button below to reset it.
         <strong>This password reset is only valid for the next 30 minutes.</strong>
       </p>
       <br />
       <a href="${resetUrl}" target="_blank">
         Reset your password
       </a>

       <p class="f-fallback sub">
         If you’re having trouble with the button above,
         copy and paste the URL below into your web browser.
       </p>
       <p class="f-fallback sub">
         <a href="${resetUrl}">${resetUrl}</a>
       </p>

       <p>Thanks, <br />The RoomWise Team</p>
       
     </body>
   </html>`;
