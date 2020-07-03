<?php


abstract class FEED_MEDIA
{
    const NONE = "NONE";
    const MSWORD = "DOCUMENT";
    const IMAGE = "IMAGE";
    const VIDEO = "VIDEO";
    const AUDIO = "AUDIO";
}

abstract class NOTE_MEDIA
{
    const NONE = "NONE";
    const MSWORD = "MSWORD";
    const IMAGE = "IMAGE";
    const VIDEO = "VIDEO";
    const AUDIO = "AUDIO";
}

abstract class FOLLOWING_STATUS
{
    const FOLLOW = "FOLLOWERS";
    const FOLLOWING = "ACCEPT";
    const DECLINE="DECLINE";
}

abstract class CHALLENGE_STATUS
{
    const ACCEPT = "1";
    const DECLINE="2";
}
// abstract class DELETE_STATUS
// {
//     const IS_DELETE = 1;
//     const NOT_DELETE = 0;
// }



define("ENCRYPTION_KEY", "niplframework");
define("DEFAULT_NO_RECORDS", "No records found.");

define("INCORRECT_CURRENT_PWD", "Incorrect password."); 
define("CHANGE_PASSWORD", "Password changed successfully.");

define("SUCCESS","1");
define("FAILED", "0");

define("NO_RECORD","2");
define("WARNING","3");
define("NO_ACCESS","4");

define("APPNAME", "ClassJockey");

define("SENDER_EMAIL_ID", "demo.narolainfotech@gmail.com");
define("SENDER_EMAIL_PASSWORD", "#N@rol@12");
define("CLIENT_EMAIL","rga@narola.email"); //cd@narola.email shawn@peak.life
// define("SENDER_EMAIL_ID", "demo.php.narola@gmail.com");
// define("SENDER_EMAIL_PASSWORD", "Narola21!");
define("IS_TEST_DATA","1");

define("DEV_ERROR","Please ensure that data supplied in your request.");
define("SERVER_ERROR","Please try again. Server error.");
define("DEFAULT_NO_RECORD","No record found.");
define("AUTH_ERROR","THE PROVIDED TOKEN DOES NOT EXIST IN OUR SYSTEM");

define("AUTH_TOKEN","auth_token");
define("USERTOKEN","userToken");
define("TEMPTOKEN","tempToken");

define("DATA", "data");
define("MESSAGE","message");
define("STATUS","status");

define("MOZILLA","Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36");

define("MALICIOUS_SOURCE_STATUS",'3');
define("MALICIOUS_SOURCE","Malicious source detected");//Malicious source detected
define("TOKEN_ERROR","Please ensure that security token is supplied in your request.");
define("CHECK_FB_URL","http");
define("APPROVAL_USER","Waiting approval from a team member");

define("YES",'yes');
define("NO",'no');

define("ERROR",  'error');

define("LIMIT_OFFSET_CONTACT",  20);
define("LIMIT_FEED_LOAD_ITEMS", 10);
define("LIMIT_COMMENT_LOAD",10);
define("LIMIT_RANDOM_FEED_LOAD",20);
define("LIMIT_CHAT",20);

define("FONT_SIZE",12);

define("SAME_AS_OLD_PWD", "Same as old password");

define("ADMIN_EMAIL",  'admin@narola.email');

define("ISDELTE",'1');
define("NOTDELTE",'0');


//notification types

define('NOTIFICATION_TYPE_REGISTER',1);
define('NOTIFICATION_TYPE_UNREGISTER',2);
define('NOTIFICATION_TYPE_AWARD_BADGE',3);
define('NOTIFICATION_TYPE_DELETE_ACTIVITY',4);
define('NOTIFICATION_TYPE_CANCEL_EVENT',5);
define('NOTIFICATION_TYPE_MODIFY_EVENT',6);

define('NOTIFICATION_TYPE_ADD_MEMBER_GROUP',5);
define('NOTIFICATION_TYPE_ADD_ME_MEMBER_GROUP',6);
define('NOTIFICATION_TYPE_UPLOAD_POST_GROUP',7);

// define("TWILIO_ACCOUNT_SID",'AC2db834a5f4dcf6251a8793a66f22d9ab');
// define("TWILIO_AUTH_TOKEN",'4fd89c48644705b17a61b0e0d1f5608a');
// define("TWILIO_FROM_NUMBER","+18316123243");

define("TWILIO_ACCOUNT_SID",'AC7ca248febb3f750b153dba07f340782f');
define("TWILIO_AUTH_TOKEN",'9b06353a40fa17b4f270f0213ea12802');
define("TWILIO_FROM_NUMBER","+13016851042");


define('FCM_KEY','AIzaSyBShtuyXk9ehVIS6ilHBgnNOnRaI7Q0VOk');
define('FCM_URL','https://fcm.googleapis.com/fcm/send');

define('LOCATION_KEY','AIzaSyCt9vqKfE2BsB_xBtDAAkl87fFH0ctoYd8');

// classjokeyapp constants
define("USER_INVALID","Please ensure that valid usertype data supplied in your request it should be either 'student' or 'parents' or 'driver' or 'teacher'");
define("INVALID_NOTICE", "Please ensure you supplied valid notice_for it should be either 'students' or 'parents' or 'all'");
define("INVALID_ATTENDANCE_STATUS", "Please ensure you supplied valid attendance_status it should be either '1' or '0' or '3'");

?>