<?php
class Security {
    public static function encrypt($input, $key) {
        $encrypted_string=openssl_encrypt($input,"AES-128-ECB",$key);
//        echo $encrypted_string;
        return $encrypted_string;
    }
    private static function pkcs5_pad ($text, $blocksize) {
        $pad = $blocksize - (strlen($text) % $blocksize);
        return $text . str_repeat(chr($pad), $pad);
    }
    public static function decrypt($sStr, $sKey) {
        $decrypted_string=openssl_decrypt($sStr,"AES-128-ECB",$sKey);
        return $decrypted_string;
    }
}
?>