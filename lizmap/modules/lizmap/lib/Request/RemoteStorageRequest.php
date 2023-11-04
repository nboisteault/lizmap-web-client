<?php
/**
 * Utilities for upload, delete and retreive resources from remote storage.
 *
 * @author
 * @copyright 2012-2016 3liz
 *
 * @see      http://3liz.com
 *
 * @license Mozilla Public License : http://www.mozilla.org/MPL/
 */

namespace Lizmap\Request;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7;

class RemoteStorageRequest
{
    protected static $webDAVNamespace = 'DAV:';

    protected static $fileNameExpression = 'file_name(@selected_file_path)';
    protected static $appContext;

    /**
     * @param string $storageUrl remote destination path
     * @param string $file       the file path to upload
     *
     * @return array{0: null|string, 1: int, 2: string} Array url of the uploaded file (0: string), HTTP code (1: int), message (2: string)
     */
    public static function uploadToWebDAVStorage($storageUrl, $file)
    {
        $resource = null;
        $http_code = 400;
        $message = null;
        $returnUrl = null;
        // checks on file
        if (!is_file($file)) {
            \jLog::log($file.' The file is not valid', 'error');

            return array(null, 400, 'The file is not valid');
        }

        try {
            $resource = Psr7\Utils::tryFopen($file, 'r');
        } catch (\RuntimeException $e) {
            \jLog::log($e->getMessage(), 'error');

            return array(null, 400, 'Error on file upload');
        }

        // get profile connection parameters
        $profile = self::getProfile('webdav');

        if ($profile) {
            // baseUri check
            if (strpos($storageUrl, $profile['baseUri']) === 0) {
                $opt = array();
                $headers = array();
                $headers['User-Agent'] = 'lizmap-user-agent';

                if (array_key_exists('user', $profile) && array_key_exists('password', $profile)) {
                    $opt['auth'] = array();
                    array_push($opt['auth'], $profile['user']);
                    array_push($opt['auth'], $profile['password']);
                }
                $opt['headers'] = $headers;

                $stream = \GuzzleHttp\Psr7\Utils::streamFor($resource);
                $opt['body'] = $stream;

                $client = new Client();

                try {
                    $response = $client->request('PUT', $storageUrl, $opt);
                    $returnUrl = $storageUrl;
                    $http_code = $response->getStatusCode();
                } catch (\GuzzleHttp\Exception\RequestException $e) {
                    $message = 'Error on file upload '.$e->getMessage();
                    if ($e->hasResponse()) {
                        $http_code = $e->getResponse()->getStatusCode();
                    }
                } catch (\Exception $e) {
                    $http_code = 500;
                    $message = 'Error on file upload '.$e->getMessage();
                }
            } else {
                $message = 'Invalid path '.$storageUrl;
            }
        } else {
            $message = 'WebDAV configuration not found';
        }
        if ($message) {
            \jLog::log($message, 'error');
        }

        return array($returnUrl, $http_code, $message);
    }

    /**
     * @param string $storageUrl storage url
     * @param string $fileName   the file to delete
     *
     * @return array{0: int, 1: string} Array HTTP code(0: int), message (1: string)
     */
    public static function deleteFromWebDAVStorage($storageUrl, $fileName)
    {
        $http_code = null;
        $message = '';

        $profile = self::getProfile('webdav');

        if ($profile) {
            // check if remote endpoint match the baseUri configuration
            if (strpos($storageUrl, $profile['baseUri']) !== 0) {
                $http_code = 500;
                $message = 'Invalid file '.$fileName;
                \jLog::log($message, 'error');
            } else {
                if (!self::isFileRemoteWebDAVResource($storageUrl, $fileName)) {
                    $http_code = 404;
                    $message = 'Resource '.$fileName.' is not a file';
                    \jLog::log($message, 'error');
                } else {
                    // deleting file
                    $opt = array();
                    $headers = array();
                    $headers['User-Agent'] = 'lizmap-user-agent';
                    if (array_key_exists('user', $profile) && array_key_exists('password', $profile)) {
                        $opt['auth'] = array();
                        array_push($opt['auth'], $profile['user']);
                        array_push($opt['auth'], $profile['password']);
                    }
                    $opt['headers'] = $headers;

                    $client = new Client();

                    try {
                        $response = $client->request('DELETE', $storageUrl.$fileName, $opt);
                        $http_code = $response->getStatusCode();
                    } catch (\GuzzleHttp\Exception\RequestException $e) {
                        $message = 'Error on deleting remote file '.$e->getMessage();
                        if ($e->hasResponse()) {
                            $http_code = $e->getResponse()->getStatusCode();
                        }
                    } catch (\Exception $e) {
                        $http_code = 500;
                        $message = 'Error on deleting remote file '.$e->getMessage();
                    }
                }
            }
        }

        return array($http_code, $message);
    }

    /**
     * check if resource is a file on remote webdav storage.
     *
     * @param string $storageUrl remote destination path
     * @param string $fileName   the file to check
     *
     * @return bool
     */
    public static function isFileRemoteWebDAVResource($storageUrl, $fileName)
    {
        $profile = self::getProfile('webdav');

        if ($profile) {
            $opt = array();
            $headers = array();
            $headers['User-Agent'] = 'lizmap-user-agent';
            if (array_key_exists('user', $profile) && array_key_exists('password', $profile)) {
                $opt['auth'] = array();
                array_push($opt['auth'], $profile['user']);
                array_push($opt['auth'], $profile['password']);
            }
            $opt['headers'] = $headers;

            $client = new Client();

            try {
                $response = $client->request('PROPFIND', $storageUrl.$fileName, $opt);
            } catch (\GuzzleHttp\Exception\RequestException $e) {
                return false;
            } catch (\Exception $e) {
                return false;
            }

            $xml = simplexml_load_string($response->getBody());

            $children = $xml->children(self::$webDAVNamespace);

            if (isset($children->response)) {
                $response = $children->response;
                $response->registerXPathNamespace('dav', self::$webDAVNamespace);
                $resourcetype = $response->xpath('//dav:resourcetype');
                if (isset($resourcetype) && count($resourcetype) == 1) {
                    $resourcetype[0]->rewind();
                    $resourceTp = $resourcetype[0];
                    $resourceTpChild = $resourceTp->children(self::$webDAVNamespace);

                    // not clear how to identify if resource is a file
                    // it seems that if the node "resourcetype" has no children
                    // then the resource is a file

                    // TODO further investigation on this control
                    $isFile = true;
                    foreach ($resourceTpChild as $chh) {
                        $nodeName = $chh->getName();
                        if (trim($nodeName) != '') {
                            $isFile = false;

                            break;
                        }
                    }

                    return $isFile;
                }
            }
        }

        return false;
    }

    public static function getRemoteFile($storageUrl, $fileName)
    {
        $profile = self::getProfile('webdav');
        if ($profile) {
            if (strpos($storageUrl, $profile['baseUri']) === 0) {
                if (!self::isFileRemoteWebDAVResource($storageUrl, $fileName)) {
                    $http_code = 404;
                    $message = 'Resource '.$fileName.' is not a file';
                    \jLog::log($message, 'error');
                } else {
                    $opt = array();
                    $headers = array();
                    $headers['User-Agent'] = 'lizmap-user-agent';

                    if (array_key_exists('user', $profile) && array_key_exists('password', $profile)) {
                        $opt['auth'] = array();
                        array_push($opt['auth'], $profile['user']);
                        array_push($opt['auth'], $profile['password']);
                    }
                    $opt['headers'] = $headers;

                    \jFile::createDir(\jApp::tempPath('davDownloads/'));
                    $tempFile = \jApp::tempPath('davDownloads/'.uniqid('dav_', true).'-'.$fileName);

                    $output = Psr7\Utils::streamFor(fopen($tempFile, 'w+'));
                    $opt['sink'] = $output;

                    $client = new Client();

                    try {
                        $response = $client->request('GET', $storageUrl.$fileName, $opt);

                        return $tempFile;
                    } catch (\GuzzleHttp\Exception\RequestException $e) {
                        \jLog::log($e->getMessage(), 'error');

                        return null;
                    } catch (\Exception $e) {
                        \jLog::log($e->getMessage(), 'error');

                        return null;
                    }
                }
            }
        }

        return null;
    }

    /**
     * Check if remote storage is reacheable on setted configuration.
     *
     * @return bool
     */
    public static function checkWebDAVStorageConnection()
    {
        $profile = self::getProfile('webdav');
        if ($profile) {
            $opt = array();
            $headers = array();
            $headers['User-Agent'] = 'lizmap-user-agent';

            if (array_key_exists('user', $profile) && array_key_exists('password', $profile)) {
                $opt['auth'] = array();
                array_push($opt['auth'], $profile['user']);
                array_push($opt['auth'], $profile['password']);
            }
            $opt['headers'] = $headers;

            $client = new Client();

            try {
                $response = $client->request('GET', $profile['baseUri'], $opt);

                return true;
            } catch (\GuzzleHttp\Exception\RequestException $e) {
                return false;
            } catch (\Exception $e) {
                return false;
            }
        }

        return false;
    }

    public static function getAppContext()
    {
        if (!self::$appContext) {
            self::$appContext = \lizmap::getAppContext();
        }

        return self::$appContext;
    }

    public static function getProfile($storageType, $profileName = 'default')
    {
        $context = self::getAppContext();
        $profile = null;

        try {
            $profile = $context->getProfile($storageType, $profileName, true);
            if ($profile && is_array($profile) && array_key_exists('enabled', $profile) && $profile['enabled'] == 1 && array_key_exists('baseUri', $profile)) {
                return $profile;
            }
        } catch (\Exception $e) {
            $profile = null;
        }

        return $profile;
    }

    /**
     * Return the WebDav Url or null if fails
     * The function assumes that the last part of the url is the filename and is defined as "file_name(@selected_file_path)".
     *
     * @param string      $storageUrl remote destination folder
     * @param null|string $filename   file name, if null return the base path
     *
     * @return null|string
     */
    public static function getRemoteUrl($storageUrl, $filename = null)
    {
        $storeLen = strlen($storageUrl);
        $fileNameLen = strlen(self::$fileNameExpression);
        if ($fileNameLen < $storeLen && substr_compare($storageUrl, self::$fileNameExpression, $storeLen - $fileNameLen, $fileNameLen) === 0) {
            if ($filename) {
                // TODO @selected_file_path property is not evaluated, for now replace the expression with the file name
                return str_replace('file_name(@selected_file_path)', "'".$filename."'", $storageUrl);
            }

            return str_replace('file_name(@selected_file_path)', "''", $storageUrl);
        }

        return null;
    }
}
