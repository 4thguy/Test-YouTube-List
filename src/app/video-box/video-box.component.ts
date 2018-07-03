import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../video';

@Component({
  selector: 'app-video-box',
  templateUrl: './video-box.component.html',
  styleUrls: ['./video-box.component.css']
})
export class VideoBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //var resolutions = ['default', 'mqdefault', 'hqdefault', 'sddefault', 'maxresdefault']

  generateVidUrl(videoId: string) {
    return 'https://www.youtube.com/watch?v=' + videoId;
  }

  generateVidDate(videoDate: number) {
    return new Date(videoDate * 1000).toDateString();
  }

  generateImgUrl(videoId: string) {
    return 'https://i.ytimg.com/vi/' + videoId +'/default.jpg';
  }

  @Input() video: Video;
}
