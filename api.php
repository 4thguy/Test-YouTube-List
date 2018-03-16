<?php

include "vendor/autoload.php";

function video_sort($a, $b)
{
    $aP = $a->snippet->publishedAt;
    $bP = $b->snippet->publishedAt;

    if ($aP == $bP) {
        return 0;
    }
    return ($aP < $bP) ? 1 : -1;
}

$youtube = new Madcoda\Youtube\Youtube(array('key' => ''));

$channels = [];

$toReturn = array();

$page = 1;
$maxSize = 50;
$earliestVideoDate = PHP_INT_MAX;

foreach ($channels as $key => $channel) {
    if (strlen($channel) != 24) {
        $channel = $youtube->getChannelByName($channel);
        $channel = $channel->id;
    }
    $videos = $youtube->searchChannelVideos('', $channel, $maxSize, 'date');
    foreach ($videos as $key => $video) {
        $currentVideoDate = strtotime($video->snippet->publishedAt);
        if ($key > $maxSize) {
            if ($earliestVideoDate < $currentVideoDate) {
                array_push($toReturn, $video);
            }
        } else {
            array_push($toReturn, $video);
        }
        if ($earliestVideoDate > $currentVideoDate) {
            $earliestVideoDate = $currentVideoDate;
        }
    }
}

usort($toReturn, "video_sort");

$toReturn = array_slice($toReturn, $maxSize * ($page - 1), $maxSize);

echo json_encode($toReturn);
