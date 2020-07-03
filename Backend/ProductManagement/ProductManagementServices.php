<?php

include_once 'config.php';
include_once 'HelperFunctions.php';
include_once 'Paths.php';
include_once 'TableVars.php';
include_once 'ConstantValues.php';
include_once 'CommonFunctions.php';
include_once 'SecurityFunctions.php';
include_once 'EventFunctions.php';
include_once 'UserFunctions.php';
include_once 'ChallengesFunctions.php';
include_once 'ProductFunctions.php';



error_reporting(E_ALL);

$post_body = file_get_contents('php://input');
$post_body = iconv('UTF-8', 'UTF-8//IGNORE', utf8_encode($post_body));
$reqData[] = json_decode($post_body);

$postData = $reqData[0];

if (!empty($_POST['secret_key']) && !empty($_POST['access_key'])) {
    $postData = (object) array('access_key' => $_POST['access_key'], 'secret_key' => $_POST['secret_key'], 'device_type' => $_POST['device_type']);
}

$debug = 0;
//$logger->Log($debug, 'POST DATA :', $postData);
$status = "";

$user = new UserFunctions($GLOBALS['con']);
$security = new SecurityFunctions($GLOBALS['con']);
$event = new EventFunctions($GLOBALS['con']);
$challenge = new ChallengesFunctions($GLOBALS['con']);
$product = new ProductFunctions($GLOBALS['con']);

//$logger->Log($debug, 'Service :', $_REQUEST['Service']);

switch ($_REQUEST['Service']) {
        /*********************  User Functions ******************************/
    case "RefreshToken": {
            $data = $security->call_service($_REQUEST['Service'], $postData);
        }
        break;

    case "Register": {
            // $isSecure = (new SecurityFunctions($GLOBALS['con']))->checkForSecurityNew($postData->access_key, $postData->secret_key);
            // if ($isSecure == NO) {
            //     $data['status'] = MALICIOUS_SOURCE_STATUS;
            //     $data['message'] = MALICIOUS_SOURCE;
            // } elseif ($isSecure == ERROR) {
            //     $data['status'] = FAILED;
            //     $data['message'] = TOKEN_ERROR;
            // } else {
            //     $data = $user->call_service($_REQUEST['Service'], $postData);
            // }
            $isSecure = (new SecurityFunctions($GLOBALS['con']))->checkForSecurityNew($_POST['access_key'], $_POST['secret_key']);
            if ($isSecure == NO) {
                $data['status'] = MALICIOUS_SOURCE_STATUS;
                $data['message'] = MALICIOUS_SOURCE;
            } elseif ($isSecure == ERROR) {
                $data['status'] = FAILED;
                $data['message'] = TOKEN_ERROR;
            } else {
                $data = $user->call_service($_REQUEST['Service'], $_POST);
            }
        }
        break;

    case "TestEncryption": {
            $data = $security->call_service($_REQUEST['Service'], $postData);
        }
        break;

    case "Login": {
            $isSecure = (new SecurityFunctions($GLOBALS['con']))->checkForSecurityNew($postData->access_key, $postData->secret_key);
            if ($isSecure == NO) {
                $data['status'] = MALICIOUS_SOURCE_STATUS;
                $data['message'] = MALICIOUS_SOURCE;
            } elseif ($isSecure == ERROR) {
                $data['status'] = FAILED;
                $data['message'] = TOKEN_ERROR;
            } else {
                $data = $user->call_service($_REQUEST['Service'], $postData);
            }
        }
        break;

    case "UpdateProfile": {
            $isSecure = (new SecurityFunctions($GLOBALS['con']))->checkForSecurityNew($_POST['access_key'], $_POST['secret_key']);
            if ($isSecure == NO) {
                $data['status'] = MALICIOUS_SOURCE_STATUS;
                $data['message'] = MALICIOUS_SOURCE;
            } elseif ($isSecure == ERROR) {
                $data['status'] = FAILED;
                $data['message'] = TOKEN_ERROR;
            } else {
                $data = $user->call_service($_REQUEST['Service'], $_POST);
            }
        }
        break;

    case "AddProduct": {
            $isSecure = (new SecurityFunctions($GLOBALS['con']))->checkForSecurityNew($_POST['access_key'], $_POST['secret_key']);
            if ($isSecure == NO) {
                $data['status'] = MALICIOUS_SOURCE_STATUS;
                $data['message'] = MALICIOUS_SOURCE;
            } elseif ($isSecure == ERROR) {
                $data['status'] = FAILED;
                $data['message'] = TOKEN_ERROR;
            } else {
                $data = $product->call_service($_REQUEST['Service'], $_POST);
            }
        }
        break;

    case "GetProductdetails": {
            $isSecure = (new SecurityFunctions($GLOBALS['con']))->checkForSecurityNew($postData->access_key, $postData->secret_key);
            if ($isSecure == NO) {
                $data['status'] = MALICIOUS_SOURCE_STATUS;
                $data['message'] = MALICIOUS_SOURCE;
            } elseif ($isSecure == ERROR) {
                $data['status'] = FAILED;
                $data['message'] = TOKEN_ERROR;
            } else {
                $data = $product->call_service($_REQUEST['Service'], $postData);
            }
        }
        break;


    case "GetProductImage": {
            $isSecure = (new SecurityFunctions($GLOBALS['con']))->checkForSecurityNew($postData->access_key, $postData->secret_key);
            if ($isSecure == NO) {
                $data['status'] = MALICIOUS_SOURCE_STATUS;
                $data['message'] = MALICIOUS_SOURCE;
            } elseif ($isSecure == ERROR) {
                $data['status'] = FAILED;
                $data['message'] = TOKEN_ERROR;
            } else {
                $data = $product->call_service($_REQUEST['Service'], $postData);
            }
        }
        break;

    case "RemoveProduct": {
            $isSecure = (new SecurityFunctions($GLOBALS['con']))->checkForSecurityNew($postData->access_key, $postData->secret_key);
            if ($isSecure == NO) {
                $data['status'] = MALICIOUS_SOURCE_STATUS;
                $data['message'] = MALICIOUS_SOURCE;
            } elseif ($isSecure == ERROR) {
                $data['status'] = FAILED;
                $data['message'] = TOKEN_ERROR;
            } else {
                $data = $product->call_service($_REQUEST['Service'], $postData);
            }
        }
        break;



    case "GetUserDetails": {
            $isSecure = (new SecurityFunctions($GLOBALS['con']))->checkForSecurityNew($postData->access_key, $postData->secret_key);
            if ($isSecure == NO) {
                $data['status'] = MALICIOUS_SOURCE_STATUS;
                $data['message'] = MALICIOUS_SOURCE;
            } elseif ($isSecure == ERROR) {
                $data['status'] = FAILED;
                $data['message'] = TOKEN_ERROR;
            } else {
                $data = $user->call_service($_REQUEST['Service'], $postData);
            }
        }
        break;



    case "Logout": {
            $isSecure = (new SecurityFunctions($GLOBALS['con']))->checkForSecurityNew($postData->access_key, $postData->secret_key);
            if ($isSecure == NO) {
                $data['status'] = MALICIOUS_SOURCE_STATUS;
                $data['message'] = MALICIOUS_SOURCE;
            } elseif ($isSecure == ERROR) {
                $data['status'] = FAILED;
                $data['message'] = TOKEN_ERROR;
            } else {
                $data = $user->call_service($_REQUEST['Service'], $postData);
            }
        }
        break;


    case "ForgotPassword": {
            $isSecure = YES;
            if ($isSecure == NO) {
                $data['status'] = MALICIOUS_SOURCE_STATUS;
                $data['message'] = MALICIOUS_SOURCE;
            } elseif ($isSecure == ERROR) {
                $data['status'] = FAILED;
                $data['message'] = TOKEN_ERROR;
            } else {
                $data = $user->call_service($_REQUEST['Service'], $postData);
                if ($isSecure != YES) {
                    if ($isSecure['key'] == "Temp") {
                        $data['tempToken'] = $isSecure['value'];
                    } else {
                        $data['userToken'] = $isSecure['value'];
                    }
                }
            }
            break;
        }

    case "ChangePassword": {
            $isSecure = YES;
            if ($isSecure == NO) {
                $data['status'] = MALICIOUS_SOURCE_STATUS;
                $data['message'] = MALICIOUS_SOURCE;
            } elseif ($isSecure == ERROR) {
                $data['status'] = FAILED;
                $data['message'] = TOKEN_ERROR;
            } else {
                $data = $user->call_service($_REQUEST['Service'], $postData);
                if ($isSecure != YES) {
                    if ($isSecure['key'] == "Temp") {
                        $data['tempToken'] = $isSecure['value'];
                    } else {
                        $data['userToken'] = $isSecure['value'];
                    }
                }
            }
            break;
        }


        // case "LoginWithGoogle":
        // case "Logout": {

        //     //     $isSecure = (new SecurityFunctions($GLOBALS['con']))->checkForSecurityNew($postData->access_key, $postData->secret_key);
        //     //     //        $isSecure=YES;
        //     //     if ($isSecure == NO) {
        //     //         $data['status'] = MALICIOUS_SOURCE_STATUS;
        //     //         $data['message'] = MALICIOUS_SOURCE;
        //     //     } elseif ($isSecure == ERROR) {
        //     //         $data['status'] = FAILED;
        //     //         $data['message'] = TOKEN_ERROR;
        //     //     } else {
        //     //         include_once 'UserFunctions.php';
        //     //         $user = new UserFunctions($GLOBALS['con']);
        //     //         $data = $user->call_service($_REQUEST['Service'], $postData);
        //     //         if ($isSecure != YES) {
        //     //             if ($isSecure['key'] == "Temp") {
        //     //                 $data['tempToken'] = $isSecure['value'];
        //     //             } else {
        //     //                 $data['userToken'] = $isSecure['value'];
        //     //             }
        //     //         }
        //     //     }
        //     }
        //     // break;

        // case "GetEventDetails":
        // case "SearchEvent":
        // case "GetVolunteersList":
        // case "GetDashboardData":
        // case "ApproveLoggedHours":
        // case "ApproveManualHours":
        // case "ResetHours":
        // case "AddManualHours":
        // case "SendEmail":
        // case "RegisterUnRegisterEvent":
        // case "AwardBadge":
        // case "GetNotification":
        // case "CancelEvent":
        // case "SearchHashtag":
        // case "MarkAttendanceWithQRCode":
        // case "GetQRCode":
        // case "ManageActivity":
        // case "DeleteActivity":
        // case "ReadNotifications":
        // case "GetNotificationBadge":
        // case "GetEventList":
        // case "ManageEvent":
        //     // {
        //     //     $isSecure = (new SecurityFunctions($GLOBALS['con']))->checkForSecurityNew($postData->access_key, $postData->secret_key);
        //     //     if ($isSecure == NO) {
        //     //         $data['status'] = MALICIOUS_SOURCE_STATUS;
        //     //         $data['message'] = MALICIOUS_SOURCE;
        //     //     } elseif ($isSecure == ERROR) {
        //     //         $data['status'] = FAILED;
        //     //         $data['message'] = TOKEN_ERROR;
        //     //     } else {
        //     //         include_once 'EventFunctions.php';
        //     //         $feed = new EventFunctions($GLOBALS['con']);
        //     //         $data = $feed->call_service($_REQUEST['Service'], $postData);
        //     //     }
        //     // }
        //     //     break;

        //     // case "ForgotPassword": {
        //     //     $isSecure = YES;
        //     //     if ($isSecure == NO) {
        //     //         $data['status'] = MALICIOUS_SOURCE_STATUS;
        //     //         $data['message'] = MALICIOUS_SOURCE;
        //     //     } elseif ($isSecure == ERROR) {
        //     //         $data['status'] = FAILED;
        //     //         $data['message'] = TOKEN_ERROR;
        //     //     } else {
        //     //         include_once 'UserFunctions.php';
        //     //         $user = new UserFunctions($GLOBALS['con']);
        //     //         $data = $user->call_service($_REQUEST['Service'], $postData);
        //     //         if ($isSecure != YES) {
        //     //             if ($isSecure['key'] == "Temp") {
        //     //                 $data['tempToken'] = $isSecure['value'];
        //     //             } else {
        //     //                 $data['userToken'] = $isSecure['value'];
        //     //             }
        //     //         }
        //     //     }
        //     //     break;
        //     // }

        //     // case "UploadFileTest": {

        //     //     include_once 'UploadFileTest.php';
        //     //     $user = new UploadFileTest($GLOBALS['con']);
        //     //     $data = $user->call_service($_REQUEST['Service'], $postData);

        //     // }
        //     //     break;

        //     // case "Logout": {
        //     //     $isSecure = YES;
        //     //     include_once 'UserFunctions.php';
        //     //     $user = new UserFunctions($GLOBALS['con']);
        //     //     $data = $user->call_service($_REQUEST['Service'], $postData);
        //     //     if ($isSecure != YES) {
        //     //         if ($isSecure['key'] == "Temp") {
        //     //             $data['tempToken'] = $isSecure['value'];
        //     //         } else {
        //     //             $data['userToken'] = $isSecure['value'];
        //     //         }
        //     //     }
        //     // }
        //     //     break;

        //     // case "ResendOTP":
        //     // case "ValidateOTPCode": {
        //     //     include_once 'OTPFunctions.php';
        //     //     $user = new OTPFunctions($GLOBALS['con']);
        //     //     $data = $user->call_service($_REQUEST['Service'], $postData);
        //     // }
        //     //     break;

        //     // /***************************        PROFILE MODULE       ******************************/
        //     // case "SearchUsers":
        //     // case "FollowUnfollowUser":
        //     // case "AcceptRejectRequest":
        //     // case "PendingRequest":
        //     // case "ShowFollowers":
        //     // case "ShowFollowing":
        //     // case "ShowAllUser":
        //     // case "ShowFollowersFollowing":
        //     // case "ViewProfile":
        //     // case "BlockUnBlockUser":
        //     // case "BlocklistUser":
        //     // case "NotificationList":
        //     // case "IsOPenNotification":
        //     // case "FollowerUserListing": {
        //     //     $isSecure = (new SecurityFunctions($GLOBALS['con']))->checkForSecurityNew($postData->access_key, $postData->secret_key, $postData->device_type);
        //     //     if ($isSecure == NO) {
        //     //         $data['status'] = MALICIOUS_SOURCE_STATUS;
        //     //         $data['message'] = MALICIOUS_SOURCE;
        //     //     } elseif ($isSecure == ERROR) {
        //     //         $data['status'] = FAILED;
        //     //         $data['message'] = TOKEN_ERROR;
        //     //     } else {
        //     //         include_once 'ProfileFunctions.php';
        //     //         $profile = new ProfileModule($GLOBALS['con']);
        //     //         $data = $profile->call_service($_REQUEST['Service'], $postData);
        //     //     }
        //     // }
        //     //     break;

        //     // case "AddPost":
        //     // case "AddPostV2":
        //     // case "GetPostDetails":
        //     // case "UpdateFeed":
        //     // case "GetAllPosts":
        //     // case "GetCategoryPost":
        //     // case "GetFollowUserFeeds":
        //     // case "AddComment":
        //     // case "GetRelevantPost":
        //     // case "LoadComments":
        //     // case "LikeComments":
        //     // case "LoadLikes":
        //     // case "LikeUnlikePosts":
        //     // case "DeleteComment":
        //     // case "DeletePost":
        //     // case "AddFavoritePost":
        //     // case "ReportPost":
        //     // case "ListSavedPost": {
        //         // $isSecure = (new SecurityFunctions($GLOBALS['con']))->checkForSecurityNew($postData->access_key, $postData->secret_key);
        //         // if ($isSecure == NO) {
        //         //     $data['status'] = MALICIOUS_SOURCE_STATUS;
        //         //     $data['message'] = MALICIOUS_SOURCE;
        //         // } elseif ($isSecure == ERROR) {
        //         //     $data['status'] = FAILED;
        //         //     $data['message'] = TOKEN_ERROR;
        //         // } else {
        //         //     include_once 'FeedFunctions.php';
        //         //     $feed = new FeedFunctions($GLOBALS['con']);
        //         //     $data = $feed->call_service($_REQUEST['Service'], $postData);
        //         // }
        //     }
        //     //     break;

        //     // /* Challenges function */
        //     // case "GetCategoryList":
        //     // case "GetAllChallengeList":
        //     // case "GetChallengeDetails":
        //     // case "AddChallenges":
        //     // case "AcceptOrDeclineChallenges":
        //     // case "AddCategory": {
        //     //     $isSecure = (new SecurityFunctions($GLOBALS['con']))->checkForSecurityNew($postData->access_key, $postData->secret_key);
        //     //     if ($isSecure == NO) {
        //     //         $data['status'] = MALICIOUS_SOURCE_STATUS;
        //     //         $data['message'] = MALICIOUS_SOURCE;
        //     //     } elseif ($isSecure == ERROR) {
        //     //         $data['status'] = FAILED;
        //     //         $data['message'] = TOKEN_ERROR;
        //     //     } else {
        //     //         include_once 'ChallengesFunctions.php';
        //     //         $feed = new ChallengesFunctions($GLOBALS['con']);
        //     //         $data = $feed->call_service($_REQUEST['Service'], $postData);
        //     //     }
        //     }
        //     //     break;


        // case "ExpiredAllTokenofUser":
        // case "UpdateTokenForUser":


    default: {
            $message = "No service found";
            $status = FAILED;
            $data['status'] = $status;
            $data['message'] = $message;
        }
        break;
}

header('Content-type: application/json');

echo json_encode($data);
mysqli_close($GLOBALS['con']);
