import {Component} from '@angular/core';
import { Injectable } from '@angular/core';

import {bootstrapApplication} from '@angular/platform-browser';
import data from '../src/assets/resumename.json';
import {marked, Renderer} from 'marked';
import { compileClassDebugInfo } from '@angular/compiler';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-header',
  template: `
  <div class="no-print">
    <div class="title">
    
      <table style="width: 100%;">
        <tr>
          <td style="width: 1em"></td>
          <td class="tableImage">
            <div>
              <a href="index.html"><img class="returntohome" src="Logos/TreadTheDawnLogoShipOnlyDuplicate-export.png" alt="TTDG logo"/></a>
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
      <h2 style="margin-bottom: 0px;">Summary</h2>
        <p style="margin-top: 0px;">
          I am a game developer with a passion for problem solving and working
          with computers. I’ve released three games in Unity and Godot using C#,
          including multiplayer, 2D puzzle, and arcade style games. I have also
          developed a media converter to enable the user to watch videos in
          vanilla Minecraft. Some of my favorite games are Jedi: Survivor, Portal,
          and Redout 2.
        </p>
      </div>
      
      <div class="AboutMeDiv">
      <h2 style="margin-bottom: 0px;">Skills</h2>
        <ul class="horizontalList">
          @for(ss of skillsets; track ss){
      <li class="barItem">
      
      <p style="margin-right: 2em; margin-top: 0px;"><b>{{ss.name}}</b>: {{createKeywords(ss.skills)}}</p>
    </li>
    }
        </ul>
    </div>
    </td>
</table>  `
})
export class AboutMe{

  skillsets = data.skills.sets

  createKeywords(keywords : string[]): string {
    let s : string = ""

    for(let i = 0; i < keywords.length; i++){
      s += keywords[i]
      if(i < keywords.length-1){
        s+=", "
      }

    }
    return s
  }
}

@Component({
  selector: 'employment',
  template: `
  <div>
    <h2>Professional Experience</h2>
    
    @for(job of employment; track job){
      <div style="break-inside: avoid;">
        <h3>
          <a href="{{job.url}}" target="_blank" class="ProjectTitle bi bi-link">{{job.employer}} | {{createDate(job.start, job.end)}}</a>
        </h3>

        <h4><i [innerHTML]="parseMarkdown(job.position)"></i></h4>
        <p [innerHTML]="parseMarkdown(job.summary)"></p>
        <ul>
          @for(h of job.highlights; track h){
            <li [innerHTML]="parseMarkdown(h)"></li>
          }
        </ul>
        <hr/>
      </div>
    }
  </div>
  `,
})
export class Employment{
  employment = data.employment.history

 createDate(s: string, e?: string): string {
    let out: string = ""
    let start: Date = new Date(s)
    const year = start.getFullYear();
    const month = (start.getMonth() + 1).toString().padStart(2, '0');

    out = month + "/" + year
    if (e != null && e != undefined) {
      console.log(e)
      let end: Date = new Date(e)  // ✅ Create end Date object
      console.log(end)
      const endYear = end.getFullYear();  // ✅ Use end date
      console.log(endYear)
      const endMonth = (end.getMonth() + 1).toString().padStart(2, '0');  // ✅ Use end date
        console.log(endMonth)
        if (endYear == year && endMonth == month) {
            return out
        }

        out += " - " + endMonth + "/" + endYear
    } else {
        out += " - present"
    }

    return out
}


  fixHtml(s: string | Promise<string>): string {
    if(s instanceof Promise){
      s.then(value => {
        return this.fixHtml(value)
      })
      return ""
    }

    s = s.replace("<p>", "")
    s = s.replace("</p>", "")
    s = s.replace("<a href", "<a target=\"_blank\" href")

    return s
  }

  parseMarkdown(s: string) {
    if(s.includes(" - ")) {
      return this.fixHtml(marked.parse(s))
      
    } else {
      return this.fixHtml(marked.parseInline(s))
    }
  }
}

@Component({
  selector:'app-projects',
  template: `
  <div>
      <h2>Projects</h2>

  @for(project of projects; track project){
  <div style="break-inside: avoid;">
    <h3 class="bi bi-link">
        <a href={{project.url}} target="_blank" class="ProjectTitle">{{project.title}} | {{createDate(project.start, project.end)}}</a>
    </h3>

    <h4><i [innerHTML]="parseMarkdown(project.role)"></i></h4>
    <p [innerHTML]="parseMarkdown(project.summary)"></p>

    <ul>
      @for (h of project.highlights; track h){
        <li [innerHTML]="parseMarkdown(h)"></li>
      }
    </ul>

<p style="font-size:0.75em;">
{{createKeywords(project.keywords)}}
</p>
<hr/>
</div>
}
</div>
  `,
})
export class Projects {
  projects = data.projects

  createKeywords(keywords : string[]): string {
    let s : string = ""

    for(let i = 0; i < keywords.length; i++){
      s += keywords[i]
      if(i < keywords.length-1){
        s+=", "
      }

    }
    return s
  }

  createDate(s : string, e? : string): string {
    let out : string = ""
    let start : Date = new Date(s)

      const year = start.getFullYear();
      const month = (start.getMonth() + 1).toString().padStart(2, '0');
    out = month +"/"+year
    

    if(e != null){
            
      const endYear = start.getFullYear();
      const endMonth = (start.getMonth() + 1).toString().padStart(2, '0');
      if(endYear == year && endMonth == month){
        return out
      }

      out += " - " + endMonth +"/"+ endYear
    }
    else{
      out += " - present"
    }

    return out
  }

  fixHtml(s: string | Promise<string>): string {
    if(s instanceof Promise){
      s.then(value => {
        return this.fixHtml(value)
      })
      return ""
    }

    s = s.replace("<p>", "")
    s = s.replace("</p>", "")
    s = s.replace("<a href", "<a target=\"_blank\" href")

    return s
  }

  parseMarkdown(s: string) {
    if(s.includes(" - ")) {
      return this.fixHtml(marked.parse(s))
      
    } else {
      return this.fixHtml(marked.parseInline(s))
    }
  }

}

@Component({
  selector: 'app-footer',
  template: `
  <br/>
<br/>
<br/>
<br/>
<div class="footer no-print">
  <a href="#" style="text-decoration: none; color: white;">Back to top ^^^</a>
</div>
`
})
export class Footer{}

@Component({
  selector: 'app-print-button',
  template: `
  <div class="fab-container">
    <button class="fab" (click)="downloadResume()"><i class="bi bi-download"></i></button>
    <button class="fab"(click)="printPage()"><i class="bi bi-printer"></i></button>
  </div>
`
})
export class PrintButton{
  constructor(private titleService: Title) {}

 resumeName(): string {
  const now = new Date();

  // Format date as YYYY-MM-DD
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');

  return `CaspianTylerResume_${year}-${month}-${day}.pdf`;
}

  downloadResume(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', `/Resume/CaspianTylerResume.pdf`);
    link.setAttribute('download', this.resumeName());
    document.body.appendChild(link);
    link.click();
    link.remove();
  }  
  
  printPage() {
    let prevName = this.titleService.getTitle()
    this.titleService.setTitle(this.resumeName())
    window.print();
    this.titleService.setTitle(prevName)
  
}
}


@Component({
  selector: 'app-root',
  imports: [Header, ProjectsNavBar, AboutMe, Employment, Projects, PrintButton, Footer],
  template: `
    <app-header/>
    <proj-nav-bar/>
    <div class="centerOnPage">
    <app-about-me style=""/>
      <employment/>
      <app-projects/>
    </div>
    <app-print-button class="no-print"/>
    <app-footer class="no-print"></app-footer>
  `,
})
export class Page {}




bootstrapApplication(Page);