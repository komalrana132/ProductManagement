<?php
include_once "SecurityFunctions.php";
include_once "HelperFunctions.php";

class EventFunctions
{
    protected $connection;

    function __construct(mysqli $con)
    {
        $this->connection = $con;
    }
    public function call_service($service, $postData)
    {
        switch ($service) {
            case "AddEvent": {
                    return $this->addEvent($postData);
                }
                break;

            case "EditEvent": {
                    return $this->editEvent($postData);
                }
                break;

            case "RemoveEvent": {
                    return $this->removeEvent($postData);
                }
                break;

            case "GetAllEvents": {
                    return $this->getAllEvents($postData);
                }
                break;

            case "SubscribeEvent": {
                    return $this->subscribeEvent($postData);
                }
                break;

            case "GetAllStudentSubscribeEvent": {
                    return $this->getAllStudentSubscribeEvent($postData);
                }
                break;

            case "AddCommentToEvent": {
                    return $this->addCommentToEvent($postData);
                }
                break;

            case "GetAllCommentsofEvent": {
                    return $this->getAllCommentsbyEventId($postData);
                }
                break;

            default: {
                    $message = "No service found";
                    $status = FAILED;
                    $data['status'] = $status;
                    $data['message'] = $message;
                    return $data;
                }
        }
    }

    public function addEvent($userData)
    {
        $status = 2;

        $title = validateObject($userData, 'title', "");
        $title = addslashes($title);

        $description = validateObject($userData, 'description', "");
        $description = addslashes($description);

        $event_date = validateObject($userData, 'event_date', "");
        $event_date = addslashes($event_date);

        $start_time = validateObject($userData, 'start_time', "");
        $start_time = addslashes($start_time);

        $end_time = validateObject($userData, 'end_time', "");
        $end_time = addslashes($end_time);

        $venue = validateObject($userData, 'venue', "");
        $venue = addslashes($venue);

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

        if ($title == '' || $description == '' || $start_time == '' || $event_date == '' || $end_time == '') {
            $data['status'] = FAILED;
            $data['message'] = DEV_ERROR;
        } else {

            $resArr = array();

            $start_time = new DateTime("$event_date $start_time");
            $start_time = $start_time->format('Y-m-d H:i:s');

            $end_time = new DateTime("$event_date $end_time");
            $end_time = $end_time->format('Y-m-d H:i:s');

            $currentDate = getDefaultDate();

            $security = new SecurityFunctions($this->connection);
            $isSecure = $security->checkForSecurityNew($access_key, $secret_key);

            if ($isSecure == NO) {
                $data['message'] = MALICIOUS_SOURCE;
                $data['status'] = FAILED;
            } else {
                $insertFields = " `title`, `description`, `event_date`,`start_time`, `end_time`, `venue`, `other_info`, `createdDate`, `isDelete`, `isTestdata`";

                $insert_query = "INSERT INTO " . TABLE_EVENTS . " (" . $insertFields . ") VALUES (?,?,?,?,?,?,?,?,?,?)";
                $insertStmt = $this->connection->prepare($insert_query);

                if ($insertStmt = $this->connection->prepare($insert_query)) {
                    $insertStmt->bind_param('ssssssssss', $title, $description, $event_date, $start_time, $end_time, $venue, $other_info, $currentDate, $is_delete, $is_testdata);
                    if ($insertStmt->execute()) {
                        // echo "here inserted";
                        $event_inserted_id = $insertStmt->insert_id;

                        $event_query = "SELECT `id`, `title`, `description`, `event_date`, `start_time`, `end_time`, `venue`, `other_info`, `createdDate`
                            FROM " . TABLE_EVENTS . " WHERE id = ?  and isDelete='" . $is_delete . "' AND isTestdata = ?";
                        if ($select_stmt = $this->connection->prepare($event_query)) {

                            $select_stmt->bind_param("ss", $event_inserted_id, $is_testdata);
                            $select_stmt->execute();
                            $select_stmt->store_result();


                            if ($select_stmt->num_rows > 0) {

                                while ($val = fetch_assoc_all_values($select_stmt)) {

                                    $resArr = $val;
                                }
                                $status = 1;
                                $errorMsg = "Event registered successfully";
                            }
                        } else {
                            echo "select=> " . $select_stmt->error;
                        }
                        $select_stmt->close();
                    } else {
                        $status = 2;
                        $errorMsg = "Failed to register Event." . $insertStmt->error;
                        $resArr = null;
                    }
                } else {
                    $status = 2;
                    $errorMsg = "Failed to register Event." . $insertStmt->error;
                    $resArr = null;
                }
            }
            $data['status'] = ($status > 1) ? FAILED : SUCCESS;
            $data['message'] = $errorMsg;
            $data['data'] = $resArr;
        }
        return $data;
    }

    public function editEvent($userData)
    {
        $status = 2;

        $id = validateObject($userData, 'id', "");
        $id = addslashes($id);

        $title = validateObject($userData, 'title', "");
        $title = addslashes($title);

        $description = validateObject($userData, 'description', "");
        $description = addslashes($description);

        $event_date = validateObject($userData, 'event_date', "");
        $event_date = addslashes($event_date);

        $start_time = validateObject($userData, 'start_time', "");
        $start_time = addslashes($start_time);

        $end_time = validateObject($userData, 'end_time', "");
        $end_time = addslashes($end_time);

        $venue = validateObject($userData, 'venue', "");
        $venue = addslashes($venue);

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

        if ($id == '' || $title == '' || $description == '' || $start_time == '' ||  $event_date == '' || $end_time == '') {
            $data['status'] = FAILED;
            $data['message'] = DEV_ERROR;
        } else {
            $event_query = "SELECT `id`, `title`, `description`, `event_date`, `start_time`, `end_time`, `venue`, `other_info`, `createdDate`
                            FROM " . TABLE_EVENTS . " WHERE id = ?  and isDelete='" . $is_delete . "' AND isTestdata = ?";
            if ($select_stmt = $this->connection->prepare($event_query)) {

                $select_stmt->bind_param("ss", $id, $is_testdata);
                $select_stmt->execute();
                $select_stmt->store_result();


                if ($select_stmt->num_rows > 0) {
                    $status = 1;
                } else {
                    $status = 2;
                    $errorMsg = "Event doesn't exists";
                }
            } else {
                echo "select=> " . $select_stmt->error;
            }


            if ($status == 2) {
                $data['status'] = FAILED;
                $data['message'] = $errorMsg;
                $data['data'] = $resArr;
            } else {
                $event_date = new DateTime("$event_date");
                $event_date = $event_date->format('Y-m-d H:i:s');

                $start_time = new DateTime("$start_time");
                $start_time = $start_time->format('Y-m-d H:i:s');

                $end_time = new DateTime("$end_time");
                $end_time = $end_time->format('Y-m-d H:i:s');


                $security = new SecurityFunctions($this->connection);
                $isSecure = $security->checkForSecurityNew($access_key, $secret_key);

                if ($isSecure == NO) {
                    $data['message'] = MALICIOUS_SOURCE;
                    $data['status'] = FAILED;
                } else {

                    $update_query = "UPDATE " . TABLE_EVENTS . " SET `title`=?,`description`=?,`event_date`=?,`start_time`=?,
                    `end_time`=?,`venue`=?,`other_info`=? 
                    WHERE id = ?  and isDelete='" . $is_delete . "' AND isTestdata = ?";

                    if ($updateStmt = $this->connection->prepare($update_query)) {
                        $updateStmt->bind_param('sssssssss', $title, $description, $event_date, $start_time, $end_time, $venue, $other_info, $id, $is_testdata);
                        if ($updateStmt->execute()) {
                            // echo "here inserted";

                            $event_query = "SELECT `id`, `title`, `description`, `event_date`, `start_time`, `end_time`, `venue`, `other_info`, `createdDate`
                            FROM " . TABLE_EVENTS . " WHERE id = ?  and isDelete='" . $is_delete . "' AND isTestdata = ?";
                            if ($select_stmt = $this->connection->prepare($event_query)) {

                                $select_stmt->bind_param("ss", $id, $is_testdata);
                                $select_stmt->execute();
                                $select_stmt->store_result();


                                if ($select_stmt->num_rows > 0) {

                                    while ($val = fetch_assoc_all_values($select_stmt)) {

                                        $resArr = $val;
                                    }
                                    $status = 1;
                                    $errorMsg = "Event updated successfully";
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

    public function removeEvent($userData)
    {
        $status = 2;

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
            $event_query = "SELECT `id`, `title`, `description`, `event_date`, `start_time`, `end_time`, `venue`, `other_info`, `createdDate`
                            FROM " . TABLE_EVENTS . " WHERE id = ?  and isDelete='" . $is_delete . "' AND isTestdata = ?";
            if ($select_stmt = $this->connection->prepare($event_query)) {

                $select_stmt->bind_param("ss", $id, $is_testdata);
                $select_stmt->execute();
                $select_stmt->store_result();


                if ($select_stmt->num_rows > 0) {
                    $status = 1;
                } else {
                    $status = 2;
                    $errorMsg = "Event doesn't exists";
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
                    $update_query = "UPDATE " . TABLE_EVENTS . " SET `isDelete`=? 
                    WHERE id = ?  and isDelete='" . $is_delete . "' AND isTestdata = ?";

                    if ($updateStmt = $this->connection->prepare($update_query)) {
                        $updateStmt->bind_param('sss', $delete, $id, $is_testdata);
                        if ($updateStmt->execute()) {
                            // echo "here inserted";

                            $event_query = "SELECT `id`, `title`, `description`, `event_date`, `start_time`, `end_time`, `venue`, `other_info`, `createdDate`
                            FROM " . TABLE_EVENTS . " WHERE id = ?  and isDelete='" . $delete . "' AND isTestdata = ?";
                            if ($select_stmt = $this->connection->prepare($event_query)) {

                                $select_stmt->bind_param("ss", $id, $is_testdata);
                                $select_stmt->execute();
                                $select_stmt->store_result();


                                if ($select_stmt->num_rows > 0) {

                                    while ($val = fetch_assoc_all_values($select_stmt)) {

                                        $resArr = $val;
                                    }
                                    $status = 1;
                                    $errorMsg = "Event removed successfully";
                                }
                            } else {
                                echo "select=> " . $select_stmt->error;
                            }
                            $select_stmt->close();
                        } else {
                            $status = 2;
                            $errorMsg = "Failed to remove Event." . $updateStmt->error;
                            $resArr = null;
                        }
                    } else {
                        $status = 2;
                        $errorMsg = "Failed to remove Event." . $updateStmt->error;
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

    public function getAllEvents($userData)
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
            $event_query = "SELECT `id`, `title`, `description`, `event_date`, `start_time`, `end_time`, `venue`,  `other_info`
                            FROM " . TABLE_EVENTS . " WHERE  isDelete='" . $is_delete . "' AND isTestdata = ?";
            if ($select_stmt = $this->connection->prepare($event_query)) {

                $select_stmt->bind_param("s", $is_testdata);
                $select_stmt->execute();
                $select_stmt->store_result();


                if ($select_stmt->num_rows > 0) {
                    $events = fetch_assoc_stmt($select_stmt);
                    $resArr = $events;
                    $status = 1;
                    $errorMsg = "events fetched successfully";
                } else {
                    $status = 2;
                    $errorMsg = "Event doesn't exists";
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

    public function subscribeEvent($userData)
    {
        $status = 2;

        $event_id = validateObject($userData, 'event_id', "");
        $event_id = addslashes($event_id);

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

        if ($event_id == '' || $student_id == '') {
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
                        $event_query = "SELECT id FROM " . TABLE_EVENTS . " WHERE id = ?  and isDelete='" . $is_delete . "' AND isTestdata = ?";
                        if ($select_stmt = $this->connection->prepare($event_query)) {
                            $select_stmt->bind_param("ss", $event_id, $is_testdata);
                            $select_stmt->execute();
                            $select_stmt->store_result();
                            if ($select_stmt->num_rows > 0) {
                                $status = 1;
                            } else {
                                $status = 2;
                                $errorMsg = "Event doesn't exists";
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

                    $event_query = "SELECT id FROM " . TABLE_EVENT_SUBSCRIBE . " WHERE event_id = ? and student_id = ? and isDelete='" . $is_delete . "' AND isTestdata = ?";
                    if ($select_stmt = $this->connection->prepare($event_query)) {
                        $select_stmt->bind_param("sss", $event_id, $student_id, $is_testdata);
                        $select_stmt->execute();
                        $select_stmt->store_result();
                        if ($select_stmt->num_rows > 0) {
                            $status = 2;
                            $errorMsg = "Student Already subscribed event";
                        } else {
                            $insertFields = "`event_id`, `student_id`, `createdDate`, `isDelete`, `isTestdata`";
                            $insert_query = "INSERT INTO " . TABLE_EVENT_SUBSCRIBE . " (" . $insertFields . ") VALUES (?,?,?,?,?)";
                            $insertStmt = $this->connection->prepare($insert_query);

                            if ($insertStmt = $this->connection->prepare($insert_query)) {
                                $insertStmt->bind_param('sssss', $event_id, $student_id, $currentDate, $is_delete, $is_testdata);
                                if ($insertStmt->execute()) {
                                    $status = 1;
                                    $errorMsg = "event subscribed successfully";
                                } else {
                                    $status = 2;
                                    $errorMsg = "Failed to subscribe event." . $insertStmt->error;
                                }
                            } else {
                                $status = 2;
                                $errorMsg = "Failed to subscribe event." . $insertStmt->error;
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

    public function getAllStudentSubscribeEvent($userData)
    {
        $status = 2;

        $event_id = validateObject($userData, 'event_id', "");
        $event_id = addslashes($event_id);

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

        if ($event_id == '') {
            $data['status'] = FAILED;
            $data['message'] = DEV_ERROR;
        } else {

            if ($isSecure == NO) {
                $data['message'] = MALICIOUS_SOURCE;
                $data['status'] = FAILED;
            } else {

                $select_event_query = "Select id from " . TABLE_EVENTS . "  where id = ? and isDelete='" . $is_delete . "' AND isTestdata = ? ";
                if ($select_event_stmt = $this->connection->prepare($select_event_query)) {
                    $select_event_stmt->bind_param("ss", $event_id, $is_testdata);
                    $select_event_stmt->execute();
                    $select_event_stmt->store_result();
                    if ($select_event_stmt->num_rows > 0) {
                        $status = 1;
                    } else {
                        $status = 2;
                        $errorMsg = "event does not exists";
                    }
                    $select_event_stmt->close();
                }

                if ($status == 2) {
                    $data['status'] = FAILED;
                    $data['message'] = $errorMsg;
                    $data['data'] = $resArr;
                } else {

                    $event_query = "SELECT u.id,u.firstname,u.lastname from " . TABLE_USER . " as u 
                    JOIN " . TABLE_EVENT_SUBSCRIBE . " as es ON (u.id = es.student_id) WHERE es.event_id = ? 
                    and u.isDelete = " . $is_delete . " and u.isTestdata = ? and es.isDelete = " . $is_delete . " and es.isTestdata = ?";
                    if ($select_stmt = $this->connection->prepare($event_query)) {
                        $select_stmt->bind_param("sss", $event_id, $is_testdata, $is_testdata);
                        $select_stmt->execute();
                        $select_stmt->store_result();
                        if ($select_stmt->num_rows > 0) {
                            $status = 1;
                            $students = fetch_assoc_stmt($select_stmt);
                            $resArr = $students;
                            $errorMsg = "Subscriber list fetched successfully";
                        } else {

                            $status = 2;
                            $errorMsg = "No subscriber available";
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

    public function addCommentToEvent($userData)
    {
        $status = 2;

        $id = validateObject($userData, 'id', "");
        $id = addslashes($id);

        $title = validateObject($userData, 'title', "");
        $title = addslashes($title);

        $event_id = validateObject($userData, 'event_id', "");
        $event_id = addslashes($event_id);

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

        if ($event_id == '' || $id == '' || $title == '') {
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
                    $insertFields = "`event_id`, `user_id`, `title`, `createdDate`, `isDelete`, `isTestdata`";

                    $insert_query = "INSERT INTO " . TABLE_COMMENTS_EVENT . " (" . $insertFields . ") VALUES (?,?,?,?,?,?)";
                    $insertStmt = $this->connection->prepare($insert_query);

                    if ($insertStmt = $this->connection->prepare($insert_query)) {
                        $insertStmt->bind_param('ssssss', $event_id, $id, $title, $getCurrentDate, $is_delete, $is_testdata);
                        if ($insertStmt->execute()) {
                            // echo "here inserted";
                            $comment_inserted_query = $insertStmt->insert_id;

                            $comment_query = "Select `id`, `event_id`, `user_id`, `title`, `createdDate` from " . TABLE_COMMENTS_EVENT . "  
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

    public function getAllCommentsbyEventId($userData)
    {
        $status = 2;

        $event_id = validateObject($userData, 'event_id', "");
        $event_id = addslashes($event_id);

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

            $select_event_query = "Select id from " . TABLE_EVENTS . "  where id = ? and isDelete='" . $is_delete . "' AND isTestdata = ? ";
            if ($select_event_stmt = $this->connection->prepare($select_event_query)) {
                $select_event_stmt->bind_param("ss", $event_id, $is_testdata);
                $select_event_stmt->execute();
                $select_event_stmt->store_result();
                if ($select_event_stmt->num_rows > 0) {
                    $status = 1;
                } else {
                    $status = 2;
                    $errorMsg = "event does not exists";
                }
                $select_event_stmt->close();
            }



            if ($status == 2) {
                $data['status'] = FAILED;
                $data['message'] = $errorMsg;
            } else {
                $event_query = "SELECT c.id'comment_id',c.title'comment_description',u.id'user_id',u.firstname,u.lastname,u.profile_image,u.profile_url  
                FROM ".TABLE_COMMENTS_EVENT." as c JOIN ".TABLE_USER." as u ON (c.user_id = u.id) 
                WHERE c.event_id = ? AND u.isDelete = ".DELETE_STATUS::NOT_DELETE." AND u.isTestdata = ? 
                AND c.isDelete = ".DELETE_STATUS::NOT_DELETE." AND c.isTestdata = ?";
                if ($select_stmt = $this->connection->prepare($event_query)) {

                    $select_stmt->bind_param("sss", $event_id, $is_testdata,$is_testdata);
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
}
