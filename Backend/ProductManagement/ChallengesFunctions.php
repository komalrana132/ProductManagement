<?php
include_once "SecurityFunctions.php";
include_once "HelperFunctions.php";

class ChallengesFunctions
{
    protected $connection;

    function __construct(mysqli $con)
    {
        $this->connection = $con;
    }
    public function call_service($service, $postData)
    {
        switch ($service) {
            case "AddChallenge": {
                    return $this->addChallenge($postData);
                }
                break;

            case "EditChallenge": {
                    return $this->editChallenge($postData);
                }
                break;

            case "RemoveChallenge": {
                    return $this->removeChallenge($postData);
                }
                break;

            case "GetAllChallenges": {
                    return $this->getAllChallenges($postData);
                }
                break;

            case "AcceptChallenge": {
                    return $this->acceptChallege($postData);
                }
                break;

            case "GetAllStudentsbyChallenge": {
                    return $this->getAllStudentsbyChallengeid($postData);
                }
                break;

            case "AddCommentToChallenge": {
                    return $this->addCommentToChallenge($postData);
                }
                break;

            case "GetAllCommentsofChallenge": {
                    return $this->getAllCommentsbyChallengeId($postData);
                }
                break;

            case "GetStudentChallengeCount": {
                    return $this->getStudentChallengeCount($postData);
                }
                break;

            case "GetParentsChallengeCount": {
                    return $this->getParentsChallengeCount($postData);
                }
                break;


            default: {
                    return null;
                }
        }
    }

    public function addChallenge($userData)
    {
        $status = 2;

        $id = validateObject($userData, 'id', "");
        $id = addslashes($id);

        $title = validateObject($userData, 'title', "");
        $title = addslashes($title);

        $description = validateObject($userData, 'description', "");
        $description = addslashes($description);

        $completion_date = validateObject($userData, 'completion_date', "");
        $completion_date = addslashes($completion_date);

        $subject_info = validateObject($userData, 'subject_info', "");
        $subject_info = addslashes($subject_info);

        $completion_time = validateObject($userData, 'completion_time', "");
        $completion_time = addslashes($completion_time);

        $note = validateObject($userData, 'note', "");
        $note = addslashes($note);

        $points_of_completion = validateObject($userData, 'points_of_completion', "");
        $points_of_completion = addslashes($points_of_completion);

        $other_info = validateObject($userData, 'other_info', "");
        $other_info = addslashes($other_info);

        $is_testdata = validateObject($userData, 'is_testdata', IS_TEST_DATA);
        $is_testdata = addslashes($is_testdata);

        $is_delete = DELETE_STATUS::NOT_DELETE;

        $secret_key = validateObject($userData, 'secret_key', "");
        $secret_key = addslashes($secret_key);

        $access_key = validateObject($userData, 'access_key', "");
        $access_key = addslashes($access_key);

        $device_token = validateObject($userData, 'device_token', 0);
        $device_token = addslashes($device_token);

        $device_type = validateObject($userData, 'device_type', 0);
        $device_type = addslashes($device_type);

        $resArr = array();
        $data = array();

        if (
            $id == '' || $title == '' || $description == '' || $subject_info == '' || $completion_date == ''
            || $completion_time == '' || $points_of_completion == ''
        ) {
            $data['status'] = FAILED;
            $data['message'] = DEV_ERROR;
        } else {

            $check_user_query = "Select id from " . TABLE_USER . "  where id = ? and userType IN ('parents','teacher') and isDelete='" . $is_delete . "' AND isTestdata = ? ";
            if ($check_user_stmt = $this->connection->prepare($check_user_query)) {
                $check_user_stmt->bind_param("ss", $id, $is_testdata);
                $check_user_stmt->execute();
                $check_user_stmt->store_result();
                if ($check_user_stmt->num_rows > 0) {
                    $status = 1;
                } else {
                    $status = 2;
                    $errorMsg = "not allowed";
                }
                $check_user_stmt->close();
            }

            if ($status == 2) {
                $data['status'] = FAILED;
                $data['message'] = $errorMsg;
                $data['data'] = $resArr;
            } else {
                $completion_date = new DateTime("$completion_date $completion_time");
                $completion_date = $completion_date->format('Y-m-d H:i:s');

                $currentDate = getDefaultDate();

                $security = new SecurityFunctions($this->connection);
                $isSecure = $security->checkForSecurityNew($access_key, $secret_key);

                if ($isSecure == NO) {
                    $data['message'] = MALICIOUS_SOURCE;
                    $data['status'] = FAILED;
                } else {
                    $insertFields = "  `created_by`, `title`, `description`, `subject_info`, `other_info`, `completion_date`, `notes`, `points_of_completion`, `createdDate`, `isDelete`, `isTestdata`";

                    $insert_query = "INSERT INTO " . TABLE_CHALLENGES . " (" . $insertFields . ") VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                    $insertStmt = $this->connection->prepare($insert_query);

                    if ($insertStmt = $this->connection->prepare($insert_query)) {
                        $insertStmt->bind_param('sssssssssss', $id, $title, $description, $subject_info, $other_info, $completion_date, $note, $points_of_completion, $currentDate, $is_delete, $is_testdata);
                        if ($insertStmt->execute()) {
                            // echo "here inserted";
                            $challenge_inserted_id = $insertStmt->insert_id;

                            $event_query = "SELECT c.id, CONCAT(u.firstname, ' ',u.lastname)'created_by',c.title,c.description,
                            c.subject_info,c.other_info,c.completion_date,c.notes,c.points_of_completion 
                            FROM " . TABLE_CHALLENGES . " as c JOIN users as u ON (u.id = c.created_by) 
                            WHERE c.id = ? AND c.isDelete = " . $is_delete . " AND c.isTestdata = ? 
                            AND u.isDelete = " . $is_delete . " AND u.isTestdata = ?";
                            if ($select_stmt = $this->connection->prepare($event_query)) {

                                $select_stmt->bind_param("sss", $challenge_inserted_id, $is_testdata, $is_testdata);
                                $select_stmt->execute();
                                $select_stmt->store_result();


                                if ($select_stmt->num_rows > 0) {

                                    while ($val = fetch_assoc_all_values($select_stmt)) {

                                        $resArr = $val;
                                    }
                                    $status = 1;
                                    $errorMsg = "Challenge registered successfully";
                                }
                            } else {
                                echo "select=> " . $select_stmt->error;
                            }
                            $select_stmt->close();
                        } else {
                            $status = 2;
                            $errorMsg = "Failed to register Challenge." . $insertStmt->error;
                            $resArr = null;
                        }
                    } else {
                        $status = 2;
                        $errorMsg = "Failed to register Challenge." . $insertStmt->error;
                        $resArr = null;
                    }
                }
            }
            $data['status'] = ($status > 1) ? FAILED : SUCCESS;
            $data['message'] = $errorMsg;
            $data['data'] = $resArr;
        }
        return $data;
    }

    public function editChallenge($userData)
    {
        $status = 2;

        $id = validateObject($userData, 'id', "");
        $id = addslashes($id);

        $challenge_id = validateObject($userData, 'challenge_id', "");
        $challenge_id = addslashes($challenge_id);

        $title = validateObject($userData, 'title', "");
        $title = addslashes($title);

        $description = validateObject($userData, 'description', "");
        $description = addslashes($description);

        $completion_date = validateObject($userData, 'completion_date', "");
        $completion_date = addslashes($completion_date);

        $subject_info = validateObject($userData, 'subject_info', "");
        $subject_info = addslashes($subject_info);

        $completion_time = validateObject($userData, 'completion_time', "");
        $completion_time = addslashes($completion_time);

        $note = validateObject($userData, 'note', "");
        $note = addslashes($note);

        $points_of_completion = validateObject($userData, 'points_of_completion', "");
        $points_of_completion = addslashes($points_of_completion);

        $other_info = validateObject($userData, 'other_info', "");
        $other_info = addslashes($other_info);

        $is_testdata = validateObject($userData, 'is_testdata', IS_TEST_DATA);
        $is_testdata = addslashes($is_testdata);

        $is_delete = DELETE_STATUS::NOT_DELETE;

        $secret_key = validateObject($userData, 'secret_key', "");
        $secret_key = addslashes($secret_key);

        $access_key = validateObject($userData, 'access_key', "");
        $access_key = addslashes($access_key);

        $device_token = validateObject($userData, 'device_token', 0);
        $device_token = addslashes($device_token);

        $device_type = validateObject($userData, 'device_type', 0);
        $device_type = addslashes($device_type);
        $data = array();
        $resArr = array();

        if (
            $id == '' || $title == '' || $description == '' || $subject_info == '' || $completion_date == ''
            || $completion_time == '' || $points_of_completion == '' || $challenge_id == ''
        ) {
            $data['status'] = FAILED;
            $data['message'] = DEV_ERROR;
        } else {
            $event_query = "SELECT `id`
                            FROM " . TABLE_CHALLENGES . " WHERE id = ? and created_by = ?  and isDelete='" . $is_delete . "' AND isTestdata = ?";
            if ($select_stmt = $this->connection->prepare($event_query)) {

                $select_stmt->bind_param("sss", $challenge_id, $id, $is_testdata);
                $select_stmt->execute();
                $select_stmt->store_result();


                if ($select_stmt->num_rows > 0) {
                    $status = 1;
                } else {
                    $status = 2;
                    $errorMsg = "Challenge doesn't exists";
                }
            } else {
                echo "select=> " . $select_stmt->error;
            }


            if ($status == 2) {
                $data['status'] = FAILED;
                $data['message'] = $errorMsg;
                $data['data'] = $resArr;
            } else {
                $completion_date = new DateTime("$completion_date $completion_time");
                $completion_date = $completion_date->format('Y-m-d H:i:s');

                $security = new SecurityFunctions($this->connection);
                $isSecure = $security->checkForSecurityNew($access_key, $secret_key);

                if ($isSecure == NO) {
                    $data['message'] = MALICIOUS_SOURCE;
                    $data['status'] = FAILED;
                } else {
                    $update_query = "UPDATE " . TABLE_CHALLENGES . " SET `title`= ?,`description`= ?,
                    `subject_info`= ?,`completion_date`= ?,`notes`= ?,`points_of_completion`= ?,`other_info` = ?
                    WHERE id = ? and `created_by` = ?  and isDelete='" . $is_delete . "' AND isTestdata = ?";

                    if ($updateStmt = $this->connection->prepare($update_query)) {
                        $updateStmt->bind_param('ssssssssss', $title, $description, $subject_info, $completion_date, $note, $points_of_completion, $other_info, $challenge_id, $id, $is_testdata);
                        if ($updateStmt->execute()) {
                            // echo "here inserted";

                            $event_query = "SELECT c.id, CONCAT(u.firstname, ' ',u.lastname)'created_by',c.title,c.description,
                            c.subject_info,c.other_info,c.completion_date,c.notes,c.points_of_completion 
                            FROM " . TABLE_CHALLENGES . " as c JOIN users as u ON (u.id = c.created_by) 
                            WHERE c.id = ? AND c.isDelete = " . $is_delete . " AND c.isTestdata = ? 
                            AND u.isDelete = " . $is_delete . " AND u.isTestdata = ?";
                            if ($select_stmt = $this->connection->prepare($event_query)) {

                                $select_stmt->bind_param("sss", $challenge_id, $is_testdata, $is_testdata);
                                $select_stmt->execute();
                                $select_stmt->store_result();


                                if ($select_stmt->num_rows > 0) {

                                    while ($val = fetch_assoc_all_values($select_stmt)) {

                                        $resArr = $val;
                                    }
                                    $status = 1;
                                    $errorMsg = "challenge updated successfully";
                                }
                            } else {
                                echo "select=> " . $select_stmt->error;
                            }
                            $select_stmt->close();
                        } else {
                            $status = 2;
                            $errorMsg = "Failed to update Event." . $updateStmt->error;
                            $resArr = null;
                        }
                    } else {
                        $status = 2;
                        $errorMsg = "Failed to update Event." . $updateStmt->error;
                        $resArr = null;
                    }
                }
            }
            $data['status'] = ($status > 1) ? FAILED : SUCCESS;
            $data['message'] = $errorMsg;
            $data['data'] = $resArr;
        }
        return $data;
    }

    public function removeChallenge($userData)
    {
        $status = 2;
        $errorMsg = "";

        $id = validateObject($userData, 'id', "");
        $id = addslashes($id);

        $is_testdata = validateObject($userData, 'is_testdata', IS_TEST_DATA);
        $is_testdata = addslashes($is_testdata);

        $is_delete = DELETE_STATUS::NOT_DELETE;

        $secret_key = validateObject($userData, 'secret_key', "");
        $secret_key = addslashes($secret_key);

        $access_key = validateObject($userData, 'access_key', "");
        $access_key = addslashes($access_key);

        $device_token = validateObject($userData, 'device_token', 0);
        $device_token = addslashes($device_token);

        $device_type = validateObject($userData, 'device_type', 0);
        $device_type = addslashes($device_type);
        $data = array();
        $resArr = array();

        if ($id == '') {
            $data['status'] = FAILED;
            $data['message'] = DEV_ERROR;
        } else {
            $challenge_id_query = "SELECT `id`
                            FROM " . TABLE_CHALLENGES . " WHERE id = ?  and isDelete='" . $is_delete . "' AND isTestdata = ?";
            if ($select_stmt = $this->connection->prepare($challenge_id_query)) {

                $select_stmt->bind_param("ss", $id, $is_testdata);
                $select_stmt->execute();
                $select_stmt->store_result();


                if ($select_stmt->num_rows > 0) {
                    $status = 1;
                } else {
                    $status = 2;
                    $errorMsg = "challenge doesn't exists";
                }
            } else {
                echo "select=> " . $select_stmt->error;
            }


            if ($status == 2) {
                $data['status'] = FAILED;
                $data['message'] = $errorMsg;
                $data['data'] = $resArr;
            } else {

                $security = new SecurityFunctions($this->connection);
                $isSecure = $security->checkForSecurityNew($access_key, $secret_key);

                if ($isSecure == NO) {
                    $data['message'] = MALICIOUS_SOURCE;
                    $data['status'] = FAILED;
                } else {
                    $delete = DELETE_STATUS::IS_DELETE;
                    $update_query = "UPDATE " . TABLE_CHALLENGES . " SET `isDelete`= ? 
                    WHERE id = ?  and isDelete='" . $is_delete . "' AND isTestdata = ?";

                    if ($updateStmt = $this->connection->prepare($update_query)) {
                        $updateStmt->bind_param('sss', $delete, $id, $is_testdata);
                        if ($updateStmt->execute()) {
                            // echo "here inserted";

                            $event_query = "SELECT c.id, CONCAT(u.firstname, ' ',u.lastname)'created_by',c.title,c.description,
                            c.subject_info,c.other_info,c.completion_date,c.notes,c.points_of_completion 
                            FROM " . TABLE_CHALLENGES . " as c JOIN users as u ON (u.id = c.created_by) 
                            WHERE c.id = ? AND c.isDelete = " . $delete . " AND c.isTestdata = ? 
                            AND u.isDelete = " . $is_delete . " AND u.isTestdata = ?";
                            if ($select_stmt = $this->connection->prepare($event_query)) {

                                $select_stmt->bind_param("sss", $id, $is_testdata, $is_testdata);
                                $select_stmt->execute();
                                $select_stmt->store_result();


                                if ($select_stmt->num_rows > 0) {

                                    while ($val = fetch_assoc_all_values($select_stmt)) {

                                        $resArr = $val;
                                    }
                                    $status = 1;
                                    $errorMsg = "challenge removed successfully";
                                }
                            } else {
                                echo "select=> " . $select_stmt->error;
                            }
                            $select_stmt->close();
                        } else {
                            $status = 2;
                            $errorMsg = "Failed to remove challenge." . $updateStmt->error;
                            $resArr = null;
                        }
                    } else {
                        $status = 2;
                        $errorMsg = "Failed to remove challenge." . $updateStmt->error;
                        $resArr = null;
                    }
                }
            }
            $data['status'] = ($status > 1) ? FAILED : SUCCESS;
            $data['message'] = $errorMsg;
            $data['data'] = $resArr;
        }
        return $data;
    }

    public function getAllChallenges($userData)
    {
        $status = 2;

        $is_testdata = validateObject($userData, 'is_testdata', IS_TEST_DATA);
        $is_testdata = addslashes($is_testdata);

        $is_delete = DELETE_STATUS::NOT_DELETE;

        $secret_key = validateObject($userData, 'secret_key', "");
        $secret_key = addslashes($secret_key);

        $access_key = validateObject($userData, 'access_key', "");
        $access_key = addslashes($access_key);

        $device_token = validateObject($userData, 'device_token', 0);
        $device_token = addslashes($device_token);

        $device_type = validateObject($userData, 'device_type', 0);
        $device_type = addslashes($device_type);
        $data = array();
        $resArr = array();

        $security = new SecurityFunctions($this->connection);
        $isSecure = $security->checkForSecurityNew($access_key, $secret_key);

        if ($isSecure == NO) {
            $data['message'] = MALICIOUS_SOURCE;
            $data['status'] = FAILED;
        } else {
            $challenges_query = "SELECT c.id, CONCAT(u.firstname, ' ',u.lastname)'created_by',c.title,c.description,
            c.subject_info,c.other_info,c.completion_date,c.notes,c.points_of_completion 
            FROM " . TABLE_CHALLENGES . " as c JOIN users as u ON (u.id = c.created_by) 
            WHERE c.isDelete = " . $is_delete . " AND c.isTestdata = ? 
            AND u.isDelete = " . $is_delete . " AND u.isTestdata = ?";
            if ($select_stmt = $this->connection->prepare($challenges_query)) {

                $select_stmt->bind_param("ss", $is_testdata, $is_testdata);
                $select_stmt->execute();
                $select_stmt->store_result();


                if ($select_stmt->num_rows > 0) {
                    $challenges = fetch_assoc_stmt($select_stmt);
                    $resArr = $challenges;
                    $status = 1;
                    $errorMsg = "challenges fetched successfully";
                } else {
                    $status = 2;
                    $errorMsg = "challenges doesn't exists";
                }
            } else {
                echo "select=> " . $select_stmt->error;
            }
            $data['status'] = ($status > 1) ? FAILED : SUCCESS;
            $data['message'] = $errorMsg;
            $data['data'] = $resArr;
        }

        return $data;
    }

    public function acceptChallege($userData)
    {
        $status = 2;

        $challenge_id = validateObject($userData, 'challenge_id', "");
        $challenge_id = addslashes($challenge_id);

        $student_id = validateObject($userData, 'student_id', "");
        $student_id = addslashes($student_id);

        $is_testdata = validateObject($userData, 'is_testdata', IS_TEST_DATA);
        $is_testdata = addslashes($is_testdata);

        $is_delete = DELETE_STATUS::NOT_DELETE;

        $secret_key = validateObject($userData, 'secret_key', "");
        $secret_key = addslashes($secret_key);

        $access_key = validateObject($userData, 'access_key', "");
        $access_key = addslashes($access_key);

        $device_token = validateObject($userData, 'device_token', 0);
        $device_token = addslashes($device_token);

        $device_type = validateObject($userData, 'device_type', 0);
        $device_type = addslashes($device_type);
        $data = array();
        $resArr = array();
        $currentDate = getDefaultDate();

        $security = new SecurityFunctions($this->connection);
        $isSecure = $security->checkForSecurityNew($access_key, $secret_key);

        if ($challenge_id == '' || $student_id == '') {
            $data['status'] = FAILED;
            $data['message'] = DEV_ERROR;
        } else {

            if ($isSecure == NO) {
                $data['message'] = MALICIOUS_SOURCE;
                $data['status'] = FAILED;
            } else {

                $select_student_query = "Select id from " . TABLE_USER . "  where id = ? and userType='student' and isDelete='" . $is_delete . "' AND isTestdata = ? ";
                if ($select_student_stmt = $this->connection->prepare($select_student_query)) {
                    $select_student_stmt->bind_param("ss", $student_id, $is_testdata);
                    $select_student_stmt->execute();
                    $select_student_stmt->store_result();
                    if ($select_student_stmt->num_rows > 0) {
                        $event_query = "SELECT id FROM " . TABLE_CHALLENGES . " WHERE id = ?  and isDelete='" . $is_delete . "' AND isTestdata = ?";
                        if ($select_stmt = $this->connection->prepare($event_query)) {
                            $select_stmt->bind_param("ss", $challenge_id, $is_testdata);
                            $select_stmt->execute();
                            $select_stmt->store_result();
                            if ($select_stmt->num_rows > 0) {
                                $status = 1;
                            } else {
                                $status = 2;
                                $errorMsg = "Challenge doesn't exists";
                            }
                        } else {
                            echo "select=> " . $select_stmt->error;
                        }
                    } else {
                        $status = 2;
                        $errorMsg = "student does not exists";
                    }
                    $select_student_stmt->close();
                }

                if ($status == 2) {
                    $data['status'] = FAILED;
                    $data['message'] = $errorMsg;
                } else {

                    $event_query = "SELECT id FROM " . TABLE_CHALLENGE_ACCEPT . " WHERE challenge_id = ? and student_id = ? and isDelete='" . $is_delete . "' AND isTestdata = ?";
                    if ($select_stmt = $this->connection->prepare($event_query)) {
                        $select_stmt->bind_param("sss", $challenge_id, $student_id, $is_testdata);
                        $select_stmt->execute();
                        $select_stmt->store_result();
                        if ($select_stmt->num_rows > 0) {
                            $status = 2;
                            $errorMsg = "Student Already Accepted challenge";
                        } else {
                            $insertFields = "`challenge_id`, `student_id`, `createdDate`, `isDelete`, `isTestdata`";
                            $insert_query = "INSERT INTO " . TABLE_CHALLENGE_ACCEPT . " (" . $insertFields . ") VALUES (?,?,?,?,?)";
                            $insertStmt = $this->connection->prepare($insert_query);

                            if ($insertStmt = $this->connection->prepare($insert_query)) {
                                $insertStmt->bind_param('sssss', $challenge_id, $student_id, $currentDate, $is_delete, $is_testdata);
                                if ($insertStmt->execute()) {
                                    $status = 1;
                                    $errorMsg = "challenge accepted successfully";
                                } else {
                                    $status = 2;
                                    $errorMsg = "Failed to accept challenge." . $insertStmt->error;
                                }
                            } else {
                                $status = 2;
                                $errorMsg = "Failed to accept challenge." . $insertStmt->error;
                            }
                        }
                    } else {
                        echo "select=> " . $select_stmt->error;
                    }
                }
                $data['status'] = ($status > 1) ? FAILED : SUCCESS;
                $data['message'] = $errorMsg;
            }
        }


        return $data;
    }

    public function getAllStudentsbyChallengeid($userData)
    {
        $status = 2;

        $challenge_id = validateObject($userData, 'challenge_id', "");
        $challenge_id = addslashes($challenge_id);

        $is_testdata = validateObject($userData, 'is_testdata', IS_TEST_DATA);
        $is_testdata = addslashes($is_testdata);

        $is_delete = DELETE_STATUS::NOT_DELETE;

        $secret_key = validateObject($userData, 'secret_key', "");
        $secret_key = addslashes($secret_key);

        $access_key = validateObject($userData, 'access_key', "");
        $access_key = addslashes($access_key);

        $device_token = validateObject($userData, 'device_token', 0);
        $device_token = addslashes($device_token);

        $device_type = validateObject($userData, 'device_type', 0);
        $device_type = addslashes($device_type);
        $data = array();
        $resArr = array();
        $currentDate = getDefaultDate();

        $security = new SecurityFunctions($this->connection);
        $isSecure = $security->checkForSecurityNew($access_key, $secret_key);

        if ($challenge_id == '') {
            $data['status'] = FAILED;
            $data['message'] = DEV_ERROR;
        } else {

            if ($isSecure == NO) {
                $data['message'] = MALICIOUS_SOURCE;
                $data['status'] = FAILED;
            } else {

                $select_event_query = "Select id from " . TABLE_CHALLENGES . "  where id = ? and isDelete='" . $is_delete . "' AND isTestdata = ? ";
                if ($select_event_stmt = $this->connection->prepare($select_event_query)) {
                    $select_event_stmt->bind_param("ss", $challenge_id, $is_testdata);
                    $select_event_stmt->execute();
                    $select_event_stmt->store_result();
                    if ($select_event_stmt->num_rows > 0) {
                        $status = 1;
                    } else {
                        $status = 2;
                        $errorMsg = "challenge does not exists";
                    }
                    $select_event_stmt->close();
                }

                if ($status == 2) {
                    $data['status'] = FAILED;
                    $data['message'] = $errorMsg;
                    $data['data'] = $resArr;
                } else {

                    $event_query = "SELECT u.id,u.firstname,u.lastname from " . TABLE_USER . " as u 
                    JOIN " . TABLE_CHALLENGE_ACCEPT . " as es ON (u.id = es.student_id) WHERE es.challenge_id = ? 
                    and u.isDelete = " . $is_delete . " and u.isTestdata = ? and es.isDelete = " . $is_delete . " and es.isTestdata = ?";
                    if ($select_stmt = $this->connection->prepare($event_query)) {
                        $select_stmt->bind_param("sss", $challenge_id, $is_testdata, $is_testdata);
                        $select_stmt->execute();
                        $select_stmt->store_result();
                        if ($select_stmt->num_rows > 0) {
                            $status = 1;
                            $students = fetch_assoc_stmt($select_stmt);
                            $resArr = $students;
                            $errorMsg = "Accepted Student list fetched successfully";
                        } else {

                            $status = 2;
                            $errorMsg = "No students accepted this challenge";
                        }
                    } else {
                        echo "select=> " . $select_stmt->error;
                    }
                }
                $data['status'] = ($status > 1) ? FAILED : SUCCESS;
                $data['message'] = $errorMsg;
                $data['data'] = $resArr;
            }
        }


        return $data;
    }

    public function addCommentToChallenge($userData)
    {
        $status = 2;

        $id = validateObject($userData, 'id', "");
        $id = addslashes($id);

        $title = validateObject($userData, 'title', "");
        $title = addslashes($title);

        $challenge_id = validateObject($userData, 'challenge_id', "");
        $challenge_id = addslashes($challenge_id);

        $is_testdata = validateObject($userData, 'is_testdata', IS_TEST_DATA);
        $is_testdata = addslashes($is_testdata);

        $is_delete = DELETE_STATUS::NOT_DELETE;

        $secret_key = validateObject($userData, 'secret_key', "");
        $secret_key = addslashes($secret_key);

        $access_key = validateObject($userData, 'access_key', "");
        $access_key = addslashes($access_key);

        $device_token = validateObject($userData, 'device_token', 0);
        $device_token = addslashes($device_token);

        $device_make = validateObject($userData, 'device_type', 0);
        $device_make = addslashes($device_make);


        $data = array();
        $getCurrentDate = getDefaultDate();

        if ($challenge_id == '' || $id == '' || $title == '') {
            $data['status'] = FAILED;
            $data['message'] = DEV_ERROR;
        } else {

            $resArr = array();
            $security = new SecurityFunctions($this->connection);
            $isSecure = $security->checkForSecurityNew($access_key, $secret_key);

            if ($isSecure == NO) {
                $data['message'] = MALICIOUS_SOURCE;
                $data['status'] = FAILED;
            } else {
                $availablity_check_query = "SELECT id FROM " . TABLE_USER . " WHERE id = ? AND isDelete='" . $is_delete . "' AND isTestdata = ?";
                if ($check_availability_stmt = $this->connection->prepare($availablity_check_query)) {
                    $check_availability_stmt->bind_param("ss", $id, $is_testdata);
                    $check_availability_stmt->execute();
                    $check_availability_stmt->store_result();
                    if ($check_availability_stmt->num_rows > 0) {
                        $availibityCheck = true;
                        $status = 1;
                    } else {
                        $availibityCheck = false;
                        $status = 2;
                        $errorMsg = "user doesn't exists";
                    }
                    $check_availability_stmt->close();
                }

                if ($availibityCheck) {
                    $insertFields = "`challenge_id`, `user_id`, `title`, `createdDate`, `isDelete`, `isTestdata`";

                    $insert_query = "INSERT INTO " . TABLE_COMMENTS_CHALLENGES . " (" . $insertFields . ") VALUES (?,?,?,?,?,?)";
                    $insertStmt = $this->connection->prepare($insert_query);

                    if ($insertStmt = $this->connection->prepare($insert_query)) {
                        $insertStmt->bind_param('ssssss', $challenge_id, $id, $title, $getCurrentDate, $is_delete, $is_testdata);
                        if ($insertStmt->execute()) {
                            // echo "here inserted";
                            $comment_inserted_query = $insertStmt->insert_id;

                            $comment_query = "Select `id`, `challenge_id`, `user_id`, `title`, `createdDate` from " . TABLE_COMMENTS_CHALLENGES . "  
                            where id = ?  and isDelete='" . $is_delete . "' AND isTestdata = ?";
                            if ($select_stmt = $this->connection->prepare($comment_query)) {

                                $select_stmt->bind_param("ss", $comment_inserted_query, $is_testdata);
                                $select_stmt->execute();
                                $select_stmt->store_result();


                                if ($select_stmt->num_rows > 0) {

                                    while ($val = fetch_assoc_all_values($select_stmt)) {

                                        $resArr = $val;
                                    }
                                    $status = 1;
                                    $errorMsg = "comments added successfully";
                                }
                            } else {
                                echo "select=> " . $select_stmt->error;
                            }
                            $select_stmt->close();
                        } else {
                            $status = 2;
                            $errorMsg = "Failed to add comments." . $insertStmt->error;
                            $resArr = null;
                        }
                    } else {
                        $status = 2;
                        $errorMsg = "Failed to add comments." . $insertStmt->error;
                        $resArr = null;
                    }
                }
            }
            $data['status'] = ($status > 1) ? FAILED : SUCCESS;
            $data['message'] = $errorMsg;
            $data['data'] = $resArr;
        }
        return $data;
    }

    public function getAllCommentsbyChallengeId($userData)
    {
        $status = 2;

        $challenge_id = validateObject($userData, 'challenge_id', "");
        $challenge_id = addslashes($challenge_id);

        $is_testdata = validateObject($userData, 'is_testdata', IS_TEST_DATA);
        $is_testdata = addslashes($is_testdata);

        $is_delete = DELETE_STATUS::NOT_DELETE;

        $secret_key = validateObject($userData, 'secret_key', "");
        $secret_key = addslashes($secret_key);

        $access_key = validateObject($userData, 'access_key', "");
        $access_key = addslashes($access_key);

        $device_token = validateObject($userData, 'device_token', 0);
        $device_token = addslashes($device_token);

        $device_type = validateObject($userData, 'device_type', 0);
        $device_type = addslashes($device_type);

        $data = array();
        $resArr = array();

        $security = new SecurityFunctions($this->connection);
        $isSecure = $security->checkForSecurityNew($access_key, $secret_key);

        if ($isSecure == NO) {
            $data['message'] = MALICIOUS_SOURCE;
            $data['status'] = FAILED;
        } else {

            $select_event_query = "Select id from " . TABLE_CHALLENGES . "  where id = ? and isDelete='" . $is_delete . "' AND isTestdata = ? ";
            if ($select_event_stmt = $this->connection->prepare($select_event_query)) {
                $select_event_stmt->bind_param("ss", $challenge_id, $is_testdata);
                $select_event_stmt->execute();
                $select_event_stmt->store_result();
                if ($select_event_stmt->num_rows > 0) {
                    $status = 1;
                } else {
                    $status = 2;
                    $errorMsg = "challenge does not exists";
                }
                $select_event_stmt->close();
            }



            if ($status == 2) {
                $data['status'] = FAILED;
                $data['message'] = $errorMsg;
            } else {
                $event_query = "SELECT c.id'comment_id',c.title'comment_description',u.id'user_id',u.firstname,u.lastname,u.profile_image,u.profile_url  
                FROM " . TABLE_COMMENTS_CHALLENGES . " as c JOIN " . TABLE_USER . " as u ON (c.user_id = u.id) 
                WHERE c.challenge_id = ? AND u.isDelete = " . DELETE_STATUS::NOT_DELETE . " AND u.isTestdata = ? 
                AND c.isDelete = " . DELETE_STATUS::NOT_DELETE . " AND c.isTestdata = ?";
                if ($select_stmt = $this->connection->prepare($event_query)) {

                    $select_stmt->bind_param("sss", $challenge_id, $is_testdata, $is_testdata);
                    $select_stmt->execute();
                    $select_stmt->store_result();


                    if ($select_stmt->num_rows > 0) {
                        $comments = fetch_assoc_stmt($select_stmt);
                        $resArr = $comments;
                        $status = 1;
                        $errorMsg = "comments fetched successfully";
                    } else {
                        $status = 1;
                        $errorMsg = "no comments found";
                    }
                } else {
                    echo "select=> " . $select_stmt->error;
                }
            }
            $data['status'] = ($status > 1) ? FAILED : SUCCESS;
            $data['message'] = $errorMsg;
            $data['data'] = $resArr;
        }

        return $data;
    }

    public function getStudentChallengeCount($userData)
    {
        $status = 2;

        $student_id = validateObject($userData, 'student_id', "");
        $student_id = addslashes($student_id);

        $is_testdata = validateObject($userData, 'is_testdata', IS_TEST_DATA);
        $is_testdata = addslashes($is_testdata);

        $is_delete = DELETE_STATUS::NOT_DELETE;

        $secret_key = validateObject($userData, 'secret_key', "");
        $secret_key = addslashes($secret_key);

        $access_key = validateObject($userData, 'access_key', "");
        $access_key = addslashes($access_key);

        $device_token = validateObject($userData, 'device_token', 0);
        $device_token = addslashes($device_token);

        $device_type = validateObject($userData, 'device_type', 0);
        $device_type = addslashes($device_type);

        $data = array();
        $resArr = array();

        $security = new SecurityFunctions($this->connection);
        $isSecure = $security->checkForSecurityNew($access_key, $secret_key);

        if ($isSecure == NO) {
            $data['message'] = MALICIOUS_SOURCE;
            $data['status'] = FAILED;
        } else {

            $select_event_query = "Select id from " . TABLE_USER . "  where id = ? and userType = 'student' and isDelete='" . $is_delete . "' AND isTestdata = ? ";
            if ($select_event_stmt = $this->connection->prepare($select_event_query)) {
                $select_event_stmt->bind_param("ss", $student_id, $is_testdata);
                $select_event_stmt->execute();
                $select_event_stmt->store_result();
                if ($select_event_stmt->num_rows > 0) {
                    $status = 1;
                } else {
                    $status = 2;
                    $errorMsg = "student does not exists";
                }
                $select_event_stmt->close();
            }



            if ($status == 2) {
                $data['status'] = FAILED;
                $data['message'] = $errorMsg;
            } else {
                $event_query = "SELECT COUNT(*)'Total_challenges' FROM ".TABLE_CHALLENGE_ACCEPT." as ca 
                JOIN ".TABLE_USER." as u ON (ca.student_id = u.id) 
                WHERE ca.student_id = ?
                AND u.isDelete = " . DELETE_STATUS::NOT_DELETE . " AND u.isTestdata = ? 
                AND ca.isDelete = " . DELETE_STATUS::NOT_DELETE . " AND ca.isTestdata = ?";
                if ($select_stmt = $this->connection->prepare($event_query)) {

                    $select_stmt->bind_param("sss", $student_id, $is_testdata, $is_testdata);
                    $select_stmt->execute();
                    $select_stmt->store_result();


                    if ($select_stmt->num_rows > 0) {
                        $comments = fetch_assoc_stmt($select_stmt);
                        $resArr = $comments;
                        $status = 1;
                        $errorMsg = "Challenges count fetched successfully";
                    } else {
                        $status = 1;
                        $errorMsg = "no challenges count found";
                    }
                } else {
                    echo "select=> " . $select_stmt->error;
                }
            }
            $data['status'] = ($status > 1) ? FAILED : SUCCESS;
            $data['message'] = $errorMsg;
            $data['data'] = $resArr;
        }

        return $data;
    }

    public function getParentsChallengeCount($userData)
    {
        $status = 2;

        $parent_id = validateObject($userData, 'parent_id', "");
        $parent_id = addslashes($parent_id);

        $is_testdata = validateObject($userData, 'is_testdata', IS_TEST_DATA);
        $is_testdata = addslashes($is_testdata);

        $is_delete = DELETE_STATUS::NOT_DELETE;

        $secret_key = validateObject($userData, 'secret_key', "");
        $secret_key = addslashes($secret_key);

        $access_key = validateObject($userData, 'access_key', "");
        $access_key = addslashes($access_key);

        $device_token = validateObject($userData, 'device_token', 0);
        $device_token = addslashes($device_token);

        $device_type = validateObject($userData, 'device_type', 0);
        $device_type = addslashes($device_type);

        $data = array();
        $resArr = array();

        $security = new SecurityFunctions($this->connection);
        $isSecure = $security->checkForSecurityNew($access_key, $secret_key);

        if ($isSecure == NO) {
            $data['message'] = MALICIOUS_SOURCE;
            $data['status'] = FAILED;
        } else {

            $select_event_query = "Select id from " . TABLE_USER . "  where id = ? and userType = 'parents' and isDelete='" . $is_delete . "' AND isTestdata = ? ";
            if ($select_event_stmt = $this->connection->prepare($select_event_query)) {
                $select_event_stmt->bind_param("ss", $parent_id, $is_testdata);
                $select_event_stmt->execute();
                $select_event_stmt->store_result();
                if ($select_event_stmt->num_rows > 0) {
                    $status = 1;
                } else {
                    $status = 2;
                    $errorMsg = "parent does not exists";
                }
                $select_event_stmt->close();
            }



            if ($status == 2) {
                $data['status'] = FAILED;
                $data['message'] = $errorMsg;
            } else {
                $event_query = "SELECT COUNT(*)'Total_challenges' FROM ".TABLE_CHALLENGES." as ca 
                JOIN ".TABLE_USER." as u ON (ca.created_by = u.id) 
                WHERE ca.created_by = ?
                AND u.isDelete = " . DELETE_STATUS::NOT_DELETE . " AND u.isTestdata = ? 
                AND ca.isDelete = " . DELETE_STATUS::NOT_DELETE . " AND ca.isTestdata = ?";
                if ($select_stmt = $this->connection->prepare($event_query)) {

                    $select_stmt->bind_param("sss", $parent_id, $is_testdata, $is_testdata);
                    $select_stmt->execute();
                    $select_stmt->store_result();


                    if ($select_stmt->num_rows > 0) {
                        $comments = fetch_assoc_stmt($select_stmt);
                        $resArr = $comments;
                        $status = 1;
                        $errorMsg = "Challenges count fetched successfully";
                    } else {
                        $status = 1;
                        $errorMsg = "no challenges count found";
                    }
                } else {
                    echo "select=> " . $select_stmt->error;
                }
            }
            $data['status'] = ($status > 1) ? FAILED : SUCCESS;
            $data['message'] = $errorMsg;
            $data['data'] = $resArr;
        }

        return $data;
    }
}
