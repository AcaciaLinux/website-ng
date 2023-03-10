import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = {
    branchAPIURL: 'https://api.acacialinux.org/',
    artifactsURL: "https://artifacts.acacialinux.org/artifacts.json",
    isDarkMode: false
  }

  //The currently held authkey from the branch masterserver
  public authKey: string = "";
  public username: string = "";

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)){
      this.checkForDarkMode();
    }
  }

  checkForDarkMode() {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    this.config.isDarkMode = mql.matches;
    mql.addListener((e) => {
      this.config.isDarkMode = e.matches;
    });
  }

  getBranchAPIURL() {
    return this.config.branchAPIURL;
  }

  getArtifactsURL() {
    return this.config.artifactsURL;
  }

  isDarkMode(): boolean{
    return this.config.isDarkMode;
  }
}
