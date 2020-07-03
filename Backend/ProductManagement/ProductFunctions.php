<?php
include_once "SecurityFunctions.php";
include_once "HelperFunctions.php";

class ProductFunctions
{
    protected $connection;

    function __construct(mysqli $con)
    {
        $this->connection = $con;
    }
    public function call_service($service, $postData)
    {
        switch ($service) {
            

            case "AddProduct": {
                return $this->addProduct($postData);
            }
            break;

            case "GetProductdetails": {
                    return $this->getProductDetails($postData);
                }
                break;

                case "GetProductImage": {
                    return $this->getProductimages($postData);
                }
                break;

                case "RemoveProduct": {
                    return $this->removeProduct($postData);
                }
                break;


            default: {
                    return null;
                }
        }
    }

    public function addProduct($userData)
    {

        $connection = $this->connection;
        $status = 2;
        $errorMsg = "";
        $resArr = array();
        $fileInfo = array();
        $user_id =  $userData['user_id'];
        $secret_key =  $userData['secret_key'];
        $name =  $userData['name'];
        $price =  $userData['price'];
        $description = $userData['description'];
        $quantity =  $userData['quantity'];
        $access_key = $userData['access_key'];
        $device_type = $userData['device_type'];
        $device_token = $userData['device_token'];
        $is_delete = DELETE_STATUS::NOT_DELETE;
        $is_testdata = IS_TEST_DATA;

        if ($user_id == '') {
            $resArr['status'] = FAILED;
            $resArr['message'] = DEV_ERROR;
        } else {
            $security = new SecurityFunctions($this->connection);
            $isSecure = $security->checkForSecurityNew($access_key, $secret_key);


            if ($isSecure == NO) {
                $data['message'] = MALICIOUS_SOURCE;
                $data['status'] = FAILED;
            } else {
                $select_user_exist_query = "Select u.id, u.firstname, u.lastname, u.email, u.guid, u.password, u.profile_image
            from " . TABLE_USER . " as u  where  u.id = ?  and u.isDelete='" . DELETE_STATUS::NOT_DELETE . "' AND u.isTestdata = ? ";
                if ($select_user_exist_stmt = $this->connection->prepare($select_user_exist_query)) {
                    $select_user_exist_stmt->bind_param("ss", $user_id, $is_testdata);
                    $select_user_exist_stmt->execute();
                    $select_user_exist_stmt->store_result();
                    if ($select_user_exist_stmt->num_rows > 0) {
                        $user = fetch_assoc_all_values($select_user_exist_stmt);
                        $status = 1;
                    } else {
                        $status = 2;
                        $errorMsg = "No User Found";
                    }
                    $select_user_exist_stmt->close();
                }
            }

            if ($status == 2) {
                $data['status'] = FAILED;
                $data['message'] = $errorMsg;
            } else {
                $getCurrentDate = getDefaultDate();
                $keyMedia = 'images';
                $isQuerySuccess = false;

                // print_r($_FILES[$keyMedia]);
                // exit;
                if (!empty($_FILES[$keyMedia]['name'])) {

                    $mediaCount = count($_FILES[$keyMedia]['name']);
                    $isQuerySuccess = true;


                    $thumb_image_name = $_FILES[$keyMedia]['name'][0];
                    $thumb_image_url = URL_PRODUCT_IMAGES . $thumb_image_name;
                    $insertFields = "`user_id`, `product_name`, `description`, `price`, `quantity`, `thumb_image_name`, `thumb_image_url`, `createdDate`, `isDelete`, `isTestdata`";
                    $insert_product_query = "INSERT INTO " . TABLE_PRODUCT . " (" . $insertFields . ") VALUES (?,?,?,?,?,?,?,?,?,?)";

                    if ($insertStmt = $this->connection->prepare($insert_product_query)) {

                        $insertStmt->bind_param('ssssssssss', $user_id, $name, $description, $price, $quantity, $thumb_image_name, $thumb_image_url, $getCurrentDate, $is_delete, $is_testdata);
                        if ($insertStmt->execute()) {
                            $product_inserted_id = $insertStmt->insert_id;
                            for ($i = 0; $i < $mediaCount; $i++) {
                                $filename = $_FILES[$keyMedia]['name'][$i];
                                $fileUrl = URL_PRODUCT_IMAGES . $filename;

                                // Upload file
                                $moved = move_uploaded_file($_FILES[$keyMedia]['tmp_name'][$i], SERVER_PRODUCT_IMAGES . $filename);
                                if ($moved == true) {
                                    $insertFields = " `product_id`, `product_image`, `product_url`, `createdDate`, `isDelete`, `isTestdata`";
                                    $insert_query = "INSERT INTO " . TABLE_PRODUCT_IMAGES . " (" . $insertFields . ") VALUES (?,?,?,?,?,?)";
                                    $insertStmt = $this->connection->prepare($insert_query);

                                    if ($insertStmt = $this->connection->prepare($insert_query)) {
                                        $insertStmt->bind_param('ssssss', $product_inserted_id, $filename, $fileUrl, $getCurrentDate, $is_delete, $is_testdata);
                                        if ($insertStmt->execute()) {
                                            $status = 1;
                                        } else {
                                            $status = 2;
                                            $errorMsg = "Failed to upload images.";
                                            $resArr = null;
                                        }
                                    } else {
                                        $insertStmt->error = "";
                                        $status = 2;
                                        $errorMsg = "Failed to upload images." . $insertStmt->error;
                                        $resArr = null;
                                    }
                                }
                            }
                            $status = 1;
                            $errorMsg = "product updated successfully";
                        } else {
                            $status = 2;
                            $errorMsg = "Failed to register product.". $insertStmt->error;
                            $resArr = null;
                        }
                    } else {
                        // $insertStmt->error = "";
                        $status = 2;
                        $errorMsg = "Failed to register product." . $insertStmt->error;
                        $resArr = null;
                    }
                } else {
                    $mediaCount = 0;
                    $errorMsg = "no images selected";
                    $status = 2;
                }

                $data['status'] = ($status > 1 ? FAILED : SUCCESS);
                $data['message'] = $errorMsg;
                $data['data'] = $resArr;
            }
        }
        return $data;
    }

    public function getProductDetails($userData)
    {
        $status = 2;

        $user_id = validateObject($userData, 'user_id', "");
        $user_id = addslashes($user_id);

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

        if ($user_id == '') {
            $data['status'] = FAILED;
            $data['message'] = DEV_ERROR;
        } else {

            if ($isSecure == NO) {
                $data['message'] = MALICIOUS_SOURCE;
                $data['status'] = FAILED;
            } else {

                $select_event_query = "Select id from " . TABLE_USER . "  where id = ? and isDelete='" . $is_delete . "' AND isTestdata = ? ";
                if ($select_event_stmt = $this->connection->prepare($select_event_query)) {
                    $select_event_stmt->bind_param("ss", $user_id, $is_testdata);
                    $select_event_stmt->execute();
                    $select_event_stmt->store_result();
                    if ($select_event_stmt->num_rows > 0) {
                        $status = 1;
                    } else {
                        $status = 2;
                        $errorMsg = "user does not exist";
                    }
                    $select_event_stmt->close();
                }

                if ($status == 2) {
                    $data['status'] = FAILED;
                    $data['message'] = $errorMsg;
                    $data['data'] = $resArr;
                } else {

                    $event_query = "select p.id,p.product_name,p.description,p.price,p.quantity,p.thumb_image_name,p.thumb_image_url,p.createdDate 
                    from ".TABLE_PRODUCT." as p 
                    WHERE p.user_id = ? and p.isDelete = " . $is_delete . " and p.isTestdata = ?";
                    if ($select_stmt = $this->connection->prepare($event_query)) {
                        $select_stmt->bind_param("ss", $user_id, $is_testdata);
                        $select_stmt->execute();
                        $select_stmt->store_result();
                        if ($select_stmt->num_rows > 0) {
                            $status = 1;
                            $products = fetch_assoc_stmt($select_stmt);
                            $resArr['products'] = $products;
                            $errorMsg = "products list fetched successfully";
                        } else {

                            $status = 2;
                            $errorMsg = "No products added";
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

    public function getProductimages($userData){
        $status = 2;

        $product_id = validateObject($userData, 'product_id', "");
        $product_id = addslashes($product_id);

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

        if ($product_id == '') {
            $data['status'] = FAILED;
            $data['message'] = DEV_ERROR;
        } else {

            if ($isSecure == NO) {
                $data['message'] = MALICIOUS_SOURCE;
                $data['status'] = FAILED;
            } else {

                $select_event_query = "Select id from " . TABLE_PRODUCT . "  where id = ? and isDelete='" . $is_delete . "' AND isTestdata = ? ";
                if ($select_event_stmt = $this->connection->prepare($select_event_query)) {
                    $select_event_stmt->bind_param("ss", $product_id, $is_testdata);
                    $select_event_stmt->execute();
                    $select_event_stmt->store_result();
                    if ($select_event_stmt->num_rows > 0) {
                        $status = 1;
                    } else {
                        $status = 2;
                        $errorMsg = "product does not exist";
                    }
                    $select_event_stmt->close();
                }

                if ($status == 2) {
                    $data['status'] = FAILED;
                    $data['message'] = $errorMsg;
                    $data['data'] = $resArr;
                } else {

                    $event_query = "select p.product_image,p.product_url 
                    from ".TABLE_PRODUCT_IMAGES." as p 
                    WHERE p.product_id = ? and p.isDelete = " . $is_delete . " and p.isTestdata = ?";
                    if ($select_stmt = $this->connection->prepare($event_query)) {
                        $select_stmt->bind_param("ss", $product_id, $is_testdata);
                        $select_stmt->execute();
                        $select_stmt->store_result();
                        if ($select_stmt->num_rows > 0) {
                            $status = 1;
                            $images = fetch_assoc_stmt($select_stmt);
                            $resArr['product_id'] = $product_id;
                            $resArr['images'] = $images;
                            $errorMsg = "products images list fetched successfully";
                        } else {

                            $status = 2;
                            $errorMsg = "No products images added";
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

    public function editProduct($userData)
    {
        $status = 2;

        $id = validateObject($userData, 'id', "");
        $id = addslashes($id);

        $product_id = validateObject($userData, 'product_id', "");
        $product_id = addslashes($product_id);

        $title = validateObject($userData, 'name', "");
        $title = addslashes($title);

        $description = validateObject($userData, 'description', "");
        $description = addslashes($description);

        $quantity = validateObject($userData, 'quantity', "");
        $quantity = addslashes($quantity);

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

    public function removeProduct($userData)
    {
        $status = 2;
        $errorMsg = "";

        $id = validateObject($userData, 'product_id', "");
        $id = addslashes($id);

        $user_id = validateObject($userData, 'user_id', "");
        $user_id = addslashes($user_id);

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
                            FROM " . TABLE_PRODUCT . " WHERE id = ?  and isDelete='" . $is_delete . "' AND isTestdata = ?";
            if ($select_stmt = $this->connection->prepare($challenge_id_query)) {

                $select_stmt->bind_param("ss", $id, $is_testdata);
                $select_stmt->execute();
                $select_stmt->store_result();


                if ($select_stmt->num_rows > 0) {
                    $status = 1;
                } else {
                    $status = 2;
                    $errorMsg = "product doesn't exists";
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
                    $update_query = "UPDATE " . TABLE_PRODUCT . " SET `isDelete`= ? 
                    WHERE id = ?  and isDelete='" . $is_delete . "' AND isTestdata = ?";

                    if ($updateStmt = $this->connection->prepare($update_query)) {
                        $updateStmt->bind_param('sss', $delete, $id, $is_testdata);
                        if ($updateStmt->execute()) {


                            // $event_query = "SELECT c.id, CONCAT(u.firstname, ' ',u.lastname)'created_by',c.title,c.description,
                            // c.subject_info,c.other_info,c.completion_date,c.notes,c.points_of_completion 
                            // FROM " . TABLE_CHALLENGES . " as c JOIN users as u ON (u.id = c.created_by) 
                            // WHERE c.id = ? AND c.isDelete = " . $delete . " AND c.isTestdata = ? 
                            // AND u.isDelete = " . $is_delete . " AND u.isTestdata = ?";
                            // if ($select_stmt = $this->connection->prepare($event_query)) {

                            //     $select_stmt->bind_param("sss", $id, $is_testdata, $is_testdata);
                            //     $select_stmt->execute();
                            //     $select_stmt->store_result();


                            //     if ($select_stmt->num_rows > 0) {

                            //         while ($val = fetch_assoc_all_values($select_stmt)) {

                            //             $resArr = $val;
                            //         }
                            //         $status = 1;
                            //         $errorMsg = "challenge removed successfully";
                            //     }
                            // } else {
                            //     echo "select=> " . $select_stmt->error;
                            // }
                            $response = $this->getProductDetails($userData);
                            $status = $response['status'];
                            $errorMsg = $response['message'];
                            $resArr = $response['data'];
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

}




