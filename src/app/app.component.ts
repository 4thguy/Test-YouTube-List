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

  multiplier = 4;
  rows = 1;
  limit = 0;

  videos: Video[];

  constructor(
  	private videoService: VideoService,
  ) { }

  ngOnInit() {
    this.videos = [];
    this.getVideos();
  }

  getVideos(): void {
    this.videoService.getHeroes()
      .subscribe(videos => this.videos = videos);
  }

  moreAvailable(): boolean {
    if (this.videos == undefined) {
      return false;
    }
    return (this.videos.length - 1 <= this.limit);
  }
  calculateLimit(): void {
    if (this.videos == undefined) {
      this.limit = 0;
      this.rows = 1;
    } else {
      this.limit = this.multiplier * this.rows;
      this.limit = Math.min(this.limit, this.videos.length - 1);
    }
  }
  clickMore(): void {
    this.rows++;
    this.calculateLimit();
  }
}
