import { Component } from '@angular/core';

import { Video } from './video';
import { VideoService } from './video.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test-YouTube-List';

  videos: Video[];

  constructor(
  	private videoService: VideoService,
  ) { }

  ngOnInit() {
    this.getVideos();
  }

  getVideos(): void {
    this.videoService.getHeroes()
    .subscribe(videos => this.videos = videos);
  }
}
