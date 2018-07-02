<?php

include "vendor/autoload.php";

function video_sort($a, $b)
{
    return $b['publishedAt'] - $a['publishedAt'];
}

$youtube = new Madcoda\Youtube\Youtube(array('key' => ''));

$channels = [];

$toReturn = array();

$maxSize = 50;

foreach ($channels as $key => $channel) {
    if (strlen($channel) != 0) {
        $videos = array();
        switch (substr($channel, 0, 2)) {
            case 'UC':
                $videos = $youtube->searchChannelVideos('', $channel, $maxSize, 'date');
                foreach ($videos as $key => $video) {
                    $foundVideo = array(
                        'id' => $video->id->videoId,
                        'title' => $video->snippet->title,
                        'publishedAt' => strtotime($video->snippet->publishedAt),
                        'channelId' => $video->snippet->channelId,
                        'channelTitle' => $video->snippet->channelTitle,
                    );
                    $toReturn[$video->id->videoId] = $foundVideo;
                }
                break;
            case 'PL':
                $videos = $youtube->getPlaylistItemsByPlaylistId($channel, $maxSize);
                foreach ($videos as $key => $video) {
                    $foundVideo = array(
                        'id' => $video->snippet->resourceId->videoId,
                        'title' => $video->snippet->title,
                        'publishedAt' => strtotime($video->snippet->publishedAt),
                        'channelId' => $video->snippet->channelId,
                        'channelTitle' => $video->snippet->channelTitle,
                    );
                    $toReturn[$video->id->videoId] = $foundVideo;
                }
                break;
            default:
                # code...
                break;
        }
    } else { /*
        if (strlen($channel) != 24) {
            $channel = $youtube->getChannelByName($key);
            $channel = $channel->id;
            $channels[$key] = $channel;
        } */
    }
}

usort($toReturn, "video_sort");

echo json_encode($toReturn);
