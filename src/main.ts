import {Component} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import data from '../src/assets/resumename.json';
import {marked} from 'marked';

@Component({
  selector: 'app-header',
  template: `
  <div class="no-print">
    <div class="title">
      <table style="width: 100%">
        <tr>
          <td class="tableImage">
            <div>
              <a href="index.html"
                ><img
                  class="returntohome"
                  src="Logos/TreadTheDawnLogoShipOnlyDuplicate-export.png"
                  alt="TTDG logo"
              /></a>
            </div>
          </td>

          <td style="text-align: left">
            <div>
              <h1>Tread the Dawn Games</h1>
              <p>An independent one-man-show developing games with Godot.</p>
            </div>
          </td>
          <td style="text-align: right">
            <div>
              <ul class="horizontalList">
                <li style="display: block">
                  <a href="https://treadthedawngames.itch.io" target="_blank"
                    ><img
                      src="Logos/itchio-textless-black.svg"
                      class="blackIcon"
                  /></a>
                </li>
                <li style="display: block">
                  <a href="https://github.com/TreadTheDawnGames" target="_blank"
                    ><img src="Logos/github-mark.svg" class="blackIcon"
                  /></a>
                </li>
                <li style="display: block">
                  <a
                    href="https://www.linkedin.com/in/caspian-tyler/"
                    target="_blank"
                    ><img src="Logos/LI-In-Bug.png" class="blackIcon"
                  /></a>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
  `
})
export class Header{}

@Component({
  selector: 'proj-nav-bar',
  template: `
      <div class="barThing no-print">
      <ul class="horizontalList">
        @for(project of projects; track project){
          
        <li class="barItem">
        <a
        href="{{project.url}}"
        target="_blank"
        class="barButton"
        >{{stripLabels(project.title)}}</a
        >
        </li>
        }
      </ul>
    </div>
  `
})
export class ProjectsNavBar{
  projects = data.projects.slice(0, 10)
  prefixes = ["Open Source: ", "Prototype: "]

  stripLabels(s : string): string {
    this.prefixes.forEach(prefix => {
      if(s.startsWith(prefix)){
        s = s.slice(prefix.length)
      }
    });
    return s
  }
}

@Component({
  selector: 'app-about-me',
  template: `
  <table>
  <td class="print-only" style="width: 125%;">
    <div class="print-only" >
      <h1>Caspian Tyler</h1>
      <h2>Game Developer</h2>
      <p>
        <ul style="display: inline;">
          <li >
            Jacksonville, FL
          </li>
          <li>
            Caspian&#64;treadthedawn.games
          </li>
          <li>
            <img src="Logos/LI-In-Bug.png" style="float:left; width: 1em; margin-right:0.25em;"/>
            LinkedIn.com/in/caspian-tyler/
          </li>
          <li>
            <img src="Logos/github-mark.svg" style="float:left; width: 1em; margin-right:0.25em"/>
            GitHub.com/TreadTheDawnGames
          </li>
          <li>
            <img src="Logos/itchio-textless-black.svg" style="float:left; width: 1em; margin-right:0.25em"/>
            TreadThedawnGames.itch.io
          </li>
          
        </ul>
    </div>
  </td>

  <td>
    <div class="AboutMeDiv">
      <h2>About Me</h2>
        <p>
          I am a game developer with a passion for problem solving and working
          with computers. I’ve released three games in Unity and Godot using C#,
          including multiplayer, 2D puzzle, and arcade style games. I have also
          developed a media converter to enable the user to watch videos in
          vanilla Minecraft. Some of my favorite games are Jedi: Survivor, Portal,
          and Redout 2.
        </p>
      </div>
    </td>
</table>  `
})
export class AboutMe{}

@Component({
  selector: 'employment',
  template: `
    <h2>Professional Experience</h2>
    @for(job of employment; track job){
      <h3>
      <a href="{{job.url}}" target="_blank" class="ProjectTitle bi bi-link">{{job.employer}}</a>
      </h3>
      
      <h4>{{job.position}}</h4>
      <p>
      {{job.summary}}
      <ul>
        @for(h of job.highlights; track h){
          <li [innerHTML]="parseMarkdown(h)"></li>
          }
      </ul>
      <p>------------------------------------------------------------------</p>
      }
  `,
})
export class Employment{
  employment = data.employment.history
  
  parseMarkdown(s: string) {
    return marked.parse(s)
  }
}

@Component({
  selector:'app-projects',
  template: `
      <h2>Projects</h2>

  @for(project of projects; track project){
<h5>
  <i class="bi bi-link">
    <a href={{project.url}} target="_blank" class="ProjectTitle">{{project.title}} - {{project.start}}</a>
  </i>
</h5>
<p>{{project.role}}</p>
{{project.summary}}
<ul>
@for (h of project.highlights; track h){
  <li><p>{{h}}</p></li>
}
</ul>

@for (k of project.keywords; track k){
{{k}}
}
<p>------------------------------------------------------------------</p>
}
  `,
})
export class Projects {projects = data.projects

  
}


@Component({
  selector: 'app-root',
  imports: [Header, ProjectsNavBar, AboutMe, Employment, Projects],
  template: `
    <app-header/>
    <proj-nav-bar/>
    <app-about-me style=""/>
    <div class="centerOnPage">
      <employment/>
      <app-projects/>
    </div>
<br/>
<br/>
<br/>
<br/>
<div class="footer no-print">
  <a href="#" style="text-decoration: none; color: white;">Back to top ^^^</a>
</div>
  `,
})
export class Page {}




bootstrapApplication(Page);